# Assign a Regular Key Pair

The XRP Ledger allows an account to authorize a secondary key pair, called a _[regular key pair](cryptographic-keys.html)_, to sign future transactions. If the private key of a regular key pair is compromised, you can remove or replace it without changing the rest of your [account](accounts.html) and re-establishing its relationships to other accounts. You can also rotate a regular key pair proactively. (Neither of those things is possible for the master key pair of an account, which is intrinsically linked to the account's address.)

For more information about master and regular key pairs, see [Cryptographic Keys](cryptographic-keys.html).

This tutorial walks through the steps required to assign a regular key pair to your account:

1. [Generate a key pair](#1-generate-a-key-pair)
2. [Assign the key pair to your account as a regular key pair](#2-assign-the-key-pair-to-your-account-as-a-regular-key-pair)
3. [Verify the regular key pair](#3-verify-the-regular-key-pair)
4. [Explore next steps](#see-also)


## 1. Generate a Key Pair

Use the [wallet_propose method][] to generate the key pair that you'll assign to your account as a regular key pair.

### Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

```WebSocket
{
  "command": "wallet_propose"
}
```

```JSON-RPC
{
  "method": "wallet_propose"
}
```

```Commandline
#Syntax: wallet_propose
rippled wallet_propose
```

<!-- MULTICODE_BLOCK_END -->


### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "result": {
    "account_id": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
    "key_type": "secp256k1",
    "master_key": "KNEW BENT LYNN LED GAD BEN KENT SHAM HOBO RINK WALT ALLY",
    "master_seed": "sh8i92YRnEjJy3fpFkL8txQSCVo79",
    "master_seed_hex": "966C0F68643EFBA50D58D191D4CA8AA7",
    "public_key": "aBRNH5wUurfhZcoyR6nRwDSa95gMBkovBJ8V4cp1C1pM28H7EPL1",
    "public_key_hex": "03AEEFE1E8ED4BBC009DE996AC03A8C6B5713B1554794056C66E5B8D1753C7DD0E"
  },
  "status": "success",
  "type": "response"
}
```

*JSON-RPC*

```json
{
    "result": {
        "account_id": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
        "key_type": "secp256k1",
        "master_key": "KNEW BENT LYNN LED GAD BEN KENT SHAM HOBO RINK WALT ALLY",
        "master_seed": "sh8i92YRnEjJy3fpFkL8txQSCVo79",
        "master_seed_hex": "966C0F68643EFBA50D58D191D4CA8AA7",
        "public_key": "aBRNH5wUurfhZcoyR6nRwDSa95gMBkovBJ8V4cp1C1pM28H7EPL1",
        "public_key_hex": "03AEEFE1E8ED4BBC009DE996AC03A8C6B5713B1554794056C66E5B8D1753C7DD0E",
        "status": "success"
    }
}
```

*Commandline*

```json
{
   "result" : {
      "account_id" : "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
      "key_type" : "secp256k1",
      "master_key" : "KNEW BENT LYNN LED GAD BEN KENT SHAM HOBO RINK WALT ALLY",
      "master_seed" : "sh8i92YRnEjJy3fpFkL8txQSCVo79",
      "master_seed_hex" : "966C0F68643EFBA50D58D191D4CA8AA7",
      "public_key" : "aBRNH5wUurfhZcoyR6nRwDSa95gMBkovBJ8V4cp1C1pM28H7EPL1",
      "public_key_hex" : "03AEEFE1E8ED4BBC009DE996AC03A8C6B5713B1554794056C66E5B8D1753C7DD0E",
      "status" : "success"
   }
}
```

<!-- MULTICODE_BLOCK_END -->

In the next step, you'll use the `account_id` from this response to assign the key pair as a regular key pair to your account. Also, save the `master_seed` value somewhere securely. (Everything else, you can forget about.)


## 2. Assign the Key Pair to Your Account as a Regular Key Pair

Use a [SetRegularKey transaction][] to assign the key pair you generated in step 1 to your account as a regular key pair.

When assigning a regular key pair to your account for the first time, the SetRegularKey transaction requires signing with your account's master private key (secret). There are [several ways of securely signing transactions](set-up-secure-signing.html), but this tutorial uses a local `rippled` server.

When you send subsequent SetRegularKey transactions, you can sign using the existing regular private key to replace or [remove itself](change-or-remove-a-regular-key-pair.html). Note that you should still not submit your regular private key across the network.


### Sign Your Transaction

The most secure way to sign a transaction is to do it locally with a [client library](client-libraries.html). Alternatively, if you run your own `rippled` node you can sign the transaction using the [sign method](sign.html), but this must be done through a trusted and encrypted connection, or through a local (same-machine) connection.

In all cases, note the signed transaction's identifying hash for later.
<!---->

Populate the request fields with the following values:

| Request Field | Value                                                        |
|:--------------|:-------------------------------------------------------------|
| `Account`     | The address of your account.                                 |
| `RegularKey`  | `account_id` generated in step 1.                            |
| `secret`      | `master_key`, `master_seed`, or `master_seed_hex` (master private key) for your account. |


#### Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "command": "sign",
  "tx_json": {
      "TransactionType": "SetRegularKey",
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7"
      },
   "secret": "ssCATR7CBvn4GLd1UuU2bqqQffHki"
}
```

*JSON-RPC*

```json
{
   "method": "sign",
   "params": [
      {
         "tx_json": {
            "TransactionType": "SetRegularKey",
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
            "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7"
         },
         "secret": "ssCATR7CBvn4GLd1UuU2bqqQffHki"
      }
   ]
}
```

*Commandline*

```sh
#Syntax: sign secret tx_json
rippled sign ssCATR7CBvn4GLd1UuU2bqqQffHki '{"TransactionType": "SetRegularKey", "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93", "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7"}'
```

<!-- MULTICODE_BLOCK_END -->


#### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "result": {
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
      "Sequence": 4,
      "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
      "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
    }
  },
  "status": "success",
  "type": "response"
}
```

*JSON-RPC*

```json
{
    "result": {
        "status": "success",
        "tx_blob": "1200052280000000240000000768400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402201453CA3D4D17F0EE3828B9E3D6ACF65327F5D4FC2BA30953CACF6CBCB4145E3502202F2154BED1D7462CAC1E3DBB31864E48C3BA0B3133ACA5E37EC54F0D0C339E2D8114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
        "tx_json": {
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
            "Fee": "10",
            "Flags": 2147483648,
            "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
            "Sequence": 4,
            "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
            "TransactionType": "SetRegularKey",
            "TxnSignature": "304402201453CA3D4D17F0EE3828B9E3D6ACF65327F5D4FC2BA30953CACF6CBCB4145E3502202F2154BED1D7462CAC1E3DBB31864E48C3BA0B3133ACA5E37EC54F0D0C339E2D",
            "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
        }
    }
}
```

*Commandline*

```json
{
   "result" : {
      "status" : "success",
      "tx_blob" : "1200052280000000240000000768400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402201453CA3D4D17F0EE3828B9E3D6ACF65327F5D4FC2BA30953CACF6CBCB4145E3502202F2154BED1D7462CAC1E3DBB31864E48C3BA0B3133ACA5E37EC54F0D0C339E2D8114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
      "tx_json" : {
         "Account" : "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
         "Fee" : "10",
         "Flags" : 2147483648,
         "RegularKey" : "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
         "Sequence" : 4,
         "SigningPubKey" : "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
         "TransactionType" : "SetRegularKey",
         "TxnSignature" : "304402201453CA3D4D17F0EE3828B9E3D6ACF65327F5D4FC2BA30953CACF6CBCB4145E3502202F2154BED1D7462CAC1E3DBB31864E48C3BA0B3133ACA5E37EC54F0D0C339E2D",
         "hash" : "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
      }
   }
}
```

<!-- MULTICODE_BLOCK_END -->

The `sign` command response contains a `tx_blob` value, as shown above. The offline signing response contains a `signedTransaction` value. Both are signed binary representations (blobs) of the transaction.

Next, use the `submit` command to transmit the transaction blob (`tx_blob` or `signedTransaction`) to the network.


### Submit Your Transaction

Take the `signedTransaction` value from the offline signing response or the `tx_blob` value from the `sign` command response and submit it as the `tx_blob` value using the [submit method][].

#### Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
    "command": "submit",
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540"
}
```

*JSON-RPC*

```json
{
   "method":"submit",
   "params": [
      {
         "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540"
      }
   ]
}
```

*Commandline*

```sh
#Syntax: submit tx_blob
rippled submit 1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540
```

<!-- MULTICODE_BLOCK_END -->


#### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
      "Sequence": 4,
      "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
      "TransactionType": "SetRegularKey",
      "TxnSignature": "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
      "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
    }
  },
  "status": "success",
  "type": "response"
}
```

*JSON-RPC*

```json
{
    "result": {
       "engine_result": "tesSUCCESS",
       "engine_result_code": 0,
       "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
        "status": "success",
        "tx_blob": "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
        "tx_json": {
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
            "Fee": "10",
            "Flags": 2147483648,
            "RegularKey": "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
            "Sequence": 4,
            "SigningPubKey": "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
            "TransactionType": "SetRegularKey",
            "TxnSignature": "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
            "hash": "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
        }
    }
}
```

*Commandline*

```json
{
   "result" : {
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" : "1200052280000000240000000468400000000000000A73210384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A7446304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C268114830923439D307E642CED308FD91EF701A7BAA74788141620D685FB08D81A70D0B668749CF2E130EA7540",
      "tx_json" : {
         "Account" : "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
         "Fee" : "10",
         "Flags" : 2147483648,
         "RegularKey" : "rsprUqu6BHAffAeG4HpSdjBNvnA6gdnZV7",
         "Sequence" : 4,
         "SigningPubKey" : "0384CA3C528F10C75F26E0917F001338BD3C9AA1A39B9FBD583DFFFD96CF2E2D7A",
         "TransactionType" : "SetRegularKey",
         "TxnSignature" : "304402204BCD5663F3A2BA02D2CE374439096EC6D27273522CD6E6E0BDBFB518730EAAE402200ECD02D8D2525D6FA4642613E71E395ECCEA01C42C35A668BF092A00EB649C26",
         "hash" : "AB73BBF7C99061678B59FB48D72CA0F5FC6DD2815B6736C6E9EB94439EC236CE"
      }
   }
}
```

<!-- MULTICODE_BLOCK_END -->


Note that the response contains a `hash` of the transaction, which you can use to [look up the transaction's final outcome](tx.html).


## 3. Verify the Regular Key Pair

At this point, the regular key pair is assigned to your account and you should be able to send transactions using the regular key pair. **To avoid losing control of your account,** it is important that you test your regular key before you take any additional steps such as [disabling the master key pair](disable-master-key-pair.html). If you make a mistake and lose access to your account, no one can restore it for you.

To verify that your account has the regular key pair set correctly, submit an [AccountSet transaction][] from your account, signing it with the regular private key you assigned to your account in step 2. As in step 1, this tutorial uses a local `rippled` server as a [way of securely signing transactions](set-up-secure-signing.html).


### Sign Your Transaction

The most secure way to sign a transaction is to do it locally with a [client library](client-libraries.html). Alternatively, if you run your own `rippled` node you can sign the transaction using the [sign method](sign.html), but this must be done through a trusted and encrypted connection, or through a local (same-machine) connection.

In all cases, note the signed transaction's identifying hash for later.
<!---->

Populate the request fields with the following values:

| Request Field | Value                                                        |
|:--------------|:-------------------------------------------------------------|
| `Account`     | The address of your account.                               |
| `secret`      | `master_key`, `master_seed`, or `master_seed_hex` (regular private key) generated in step 1 and assigned to your account in step 2. |


#### Request Format

Here's an example of the request format. Note that the request does not include any `AccountSet` options. This means that a successful transaction has no effect other than to confirm that the regular key pair is set correctly for your account (and to destroy the transaction cost).


<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "command": "sign",
  "tx_json": {
      "TransactionType": "AccountSet",
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93"
      },
   "secret": "sh8i92YRnEjJy3fpFkL8txQSCVo79"
}
```

*JSON-RPC*

```json
{
   "method": "sign",
   "params": [
      {
         "tx_json": {
            "TransactionType": "AccountSet",
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93"
         },
         "secret": "sh8i92YRnEjJy3fpFkL8txQSCVo79"
      }
   ]
}
```

*Commandline*

```sh
#Syntax: sign secret tx_json
rippled sign sh8i92YRnEjJy3fpFkL8txQSCVo79 '{"TransactionType": "AccountSet", "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93"}'
```

<!-- MULTICODE_BLOCK_END -->


#### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "result": {
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 4,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "AccountSet",
      "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
      "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
    }
  },
  "status": "success",
  "type": "response"
}
```

*JSON-RPC*

```json
{
    "result": {
        "status": "success",
        "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
        "tx_json": {
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
            "Fee": "10",
            "Flags": 2147483648,
            "Sequence": 4,
            "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
            "TransactionType": "AccountSet",
            "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
            "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
        }
    }
}
```

*Commandline*

```json
{
   "result" : {
      "status" : "success",
      "tx_blob" : "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
      "tx_json" : {
         "Account" : "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
         "Fee" : "10",
         "Flags" : 2147483648,
         "Sequence" : 4,
         "SigningPubKey" : "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
         "TransactionType" : "AccountSet",
         "TxnSignature" : "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
         "hash" : "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
      }
   }
}
```

<!-- MULTICODE_BLOCK_END -->

The `sign` command response contains a `tx_blob` value, as shown above. The offline signing response contains a `signedTransaction` value. Both are signed binary representations (blobs) of the transaction.

Next, use the `submit` command to transmit the transaction blob (`tx_blob` or `signedTransaction`) to the network.


### Submit Your Transaction

Take the `signedTransaction` value from the offline signing response or the `tx_blob` value from the `sign` command response and submit it as the `tx_blob` value using the [submit method][].

#### Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
    "command": "submit",
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E"
}
```

*JSON-RPC*

```json
{
   "method":"submit",
   "params": [
      {
         "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E"
      }
   ]
}
```

*Commandline*

```sh
#Syntax: submit tx_blob
rippled submit 1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E
```

<!-- MULTICODE_BLOCK_END -->


#### Response Format

An example of a successful response:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```json
{
  "result": {
    "engine_result": "tesSUCCESS",
    "engine_result_code": 0,
    "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
    "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
    "tx_json": {
      "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
      "Fee": "10",
      "Flags": 2147483648,
      "Sequence": 4,
      "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
      "TransactionType": "AccountSet",
      "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
      "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
    }
  },
  "status": "success",
  "type": "response"
}
```

*JSON-RPC*

```json
{
    "result": {
        "engine_result": "tesSUCCESS",
        "engine_result_code": 0,
        "engine_result_message": "The transaction was applied. Only final in a validated ledger.",
        "status": "success",
        "tx_blob": "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
        "tx_json": {
            "Account": "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
            "Fee": "10",
            "Flags": 2147483648,
            "Sequence": 4,
            "SigningPubKey": "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
            "TransactionType": "AccountSet",
            "TxnSignature": "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
            "hash": "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
        }
    }
}
```

*Commandline*

```json
{
   "result" : {
      "engine_result" : "tesSUCCESS",
      "engine_result_code" : 0,
      "engine_result_message" : "The transaction was applied. Only final in a validated ledger.",
      "status" : "success",
      "tx_blob" : "1200032280000000240000000468400000000000000A73210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB88114623B8DA4A0BFB3B61AB423391A182DC693DC159E",
      "tx_json" : {
         "Account" : "rUAi7pipxGpYfPNg3LtPcf2ApiS8aw9A93",
         "Fee" : "10",
         "Flags" : 2147483648,
         "Sequence" : 4,
         "SigningPubKey" : "0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020",
         "TransactionType" : "AccountSet",
         "TxnSignature" : "3045022100A50E867D3B1B5A39F23F1ABCA5C7C3EC755442FDAA357EFD897B865ACA7686DB02206077BF459BCE39BCCBFE1A128DA986D1E00CBEC5F0D6B0E11710F60BE2976FB8",
         "hash" : "D9B305CB6E861D0994A5CDD4726129D91AC4277111DC444DE4CEE44AD4674A9F"
      }
   }
}
```

<!-- MULTICODE_BLOCK_END -->

If the transaction fails with the following [result codes](transaction-results.html), here are some things to check:

- **`tefBAD_AUTH`**: The regular key you signed your test transaction with doesn't match the regular key you set in the previous step. Check that the secret and address for your regular key pair match and double-check which values you used in each step.
- **`tefBAD_AUTH_MASTER`** or **`temBAD_AUTH_MASTER`**: Your account doesn't have a regular key assigned. Check that the SetRegularKey transaction executed successfully. You can also use the [account_info method][] to confirm that your regular key is set in the `RegularKey` field as expected.

For possible causes of other result codes, see [Transaction Results](transaction-results.html).


## See Also

Now that you're familiar with the benefits of assigning a regular key pair to an account, consider taking a look at these related topics and tutorials:

- **Concepts:**
    - [Cryptographic Keys](cryptographic-keys.html)
    - [Multi-Signing](multi-signing.html)
    - [Issuing and Operational Addresses](issuing-and-operational-addresses.html)
- **Tutorials:**
    - [Change or Remove a Regular Key Pair](change-or-remove-a-regular-key-pair.html)
    - [Set Up Multi-Signing](set-up-multi-signing.html)
    - [List XRP as an Exchange](list-xrp-as-an-exchange.html)
- **References:**
    - [wallet_propose method][]
    - [sign method][]
    - [SetRegularKey transaction][]
    - [AccountRoot object](accountroot.html) where the regular key is stored in the field `RegularKey`





<!---->
<!---->
[Address]: basic-data-types.html#addresses
[アドレス]: basic-data-types.html#アドレス
[admin command]: admin-rippled-methods.html
[base58]: base58-encodings.html
[common fields]: transaction-common-fields.html
[共通フィールド]: transaction-common-fields.html
[Currency Amount]: basic-data-types.html#specifying-currency-amounts
[通貨額]: basic-data-types.html#通貨額の指定
[通貨額の指定]: basic-data-types.html#通貨額の指定
[Currency Code]: currency-formats.html#currency-codes
[通貨コード]: currency-formats.html#通貨コード
[drops of XRP]: basic-data-types.html#specifying-currency-amounts
[fee levels]: transaction-cost.html#fee-levels
[XRPのdrop数]: basic-data-types.html#通貨額の指定
[Hash]: basic-data-types.html#hashes
[ハッシュ]: basic-data-types.html#ハッシュ
[identifying hash]: transaction-basics.html#identifying-transactions
[識別用ハッシュ]: transaction-basics.html#トランザクションの識別
[Internal Type]: serialization.html
[内部の型]: serialization.html
[Ledger Index]: basic-data-types.html#ledger-index
[ledger index]: basic-data-types.html#ledger-index
[レジャーインデックス]: basic-data-types.html#レジャーインデックス
[ledger format]: ledger-object-types.html
[レジャーフォーマット]: ledger-data-formats.html
[Marker]: markers-and-pagination.html
[マーカー]: markers-and-pagination.html
[node public key]: peer-protocol.html#node-key-pair
[ノード公開鍵]: peer-protocol.html#ノードキーペア
[node key pair]: peer-protocol.html#node-key-pair
[ノードキーペア]: peer-protocol.html#ノードキーペア
[peer reservation]: peer-protocol.html#fixed-peers-and-peer-reservations
[peer reservations]: peer-protocol.html#fixed-peers-and-peer-reservations
[ピアリザベーション]: peer-protocol.html#固定ピアとピアリザベーション
[public servers]: public-servers.html
[公開サーバー]: public-servers.html
[result code]: transaction-results.html
[seconds since the Ripple Epoch]: basic-data-types.html#specifying-time
[Reporting Mode]: rippled-server-modes.html#reporting-mode
[Rippleエポック以降の経過秒数]: basic-data-types.html#時間の指定
[Sequence Number]: basic-data-types.html#account-sequence
[シーケンス番号]: basic-data-types.html#アカウントシーケンス
[SHA-512Half]: basic-data-types.html#hashes
[SHA-512ハーフ]: basic-data-types.html#ハッシュ
[Specifying Currency Amounts]: basic-data-types.html#specifying-currency-amounts
[Specifying Ledgers]: basic-data-types.html#specifying-ledgers
[レジャーの指定]: basic-data-types.html#レジャーの指定
[Specifying Time]: basic-data-types.html#specifying-time
[時間の指定]: basic-data-types.html#時間の指定
[stand-alone mode]: rippled-server-modes.html#stand-alone-mode
[standard format]: response-formatting.html
[標準フォーマット]: response-formatting.html
[Transaction Cost]: transaction-cost.html
[transaction cost]: transaction-cost.html
[トランザクションコスト]: transaction-cost.html
[universal error types]: error-formatting.html#universal-errors
[汎用エラータイプ]: error-formatting.html#汎用エラー
[XRP, in drops]: basic-data-types.html#specifying-currency-amounts
[XRP、drop単位]: basic-data-types.html#通貨額の指定
[NFToken]: nftoken.html

<!-- API object types -->




[AccountRoot object]: accountroot.html
  



[Amendments object]: amendments.html
  



[Check object]: check.html
  



[DepositPreauth object]: depositpreauth.html
  



[DirectoryNode object]: directorynode.html
  



[Escrow object]: escrow.html
  



[FeeSettings object]: feesettings.html
  



[LedgerHashes object]: ledgerhashes.html
  



[NegativeUNL object]: negativeunl.html
  



[NFTokenOffer object]: nftokenoffer.html
  



[NFTokenPage object]: nftokenpage.html
  



[Offer object]: offer.html
  



[PayChannel object]: paychannel.html
  



[RippleState object]: ripplestate.html
  



[SignerList object]: signerlist.html
  



[Ticket object]: ticket.html
  




<!---->
[crypto-condition]: https://tools.ietf.org/html/draft-thomas-crypto-conditions-04
[crypto-conditions]: https://tools.ietf.org/html/draft-thomas-crypto-conditions-04
[Crypto-Conditions Specification]: https://tools.ietf.org/html/draft-thomas-crypto-conditions-04
[hexadecimal]: https://en.wikipedia.org/wiki/Hexadecimal
[Interledger Protocol]: https://interledger.org/
[RFC-1751]: https://tools.ietf.org/html/rfc1751
[ripple-lib]: https://github.com/XRPLF/xrpl.js

<!---->



[account_channels method]: account_channels.html
[account_channels command]: account_channels.html


[account_currencies method]: account_currencies.html
[account_currencies command]: account_currencies.html


[account_info method]: account_info.html
[account_info command]: account_info.html


[account_lines method]: account_lines.html
[account_lines command]: account_lines.html


[account_objects method]: account_objects.html
[account_objects command]: account_objects.html


[account_offers method]: account_offers.html
[account_offers command]: account_offers.html


[account_tx method]: account_tx.html
[account_tx command]: account_tx.html


[book_offers method]: book_offers.html
[book_offers command]: book_offers.html


[can_delete method]: can_delete.html
[can_delete command]: can_delete.html


[channel_authorize method]: channel_authorize.html
[channel_authorize command]: channel_authorize.html


[channel_verify method]: channel_verify.html
[channel_verify command]: channel_verify.html


[connect method]: connect.html
[connect command]: connect.html


[consensus_info method]: consensus_info.html
[consensus_info command]: consensus_info.html


[crawl_shards method]: crawl_shards.html
[crawl_shards command]: crawl_shards.html


[deposit_authorized method]: deposit_authorized.html
[deposit_authorized command]: deposit_authorized.html


[download_shard method]: download_shard.html
[download_shard command]: download_shard.html


[feature method]: feature.html
[feature command]: feature.html


[fee method]: fee.html
[fee command]: fee.html


[fetch_info method]: fetch_info.html
[fetch_info command]: fetch_info.html


[gateway_balances method]: gateway_balances.html
[gateway_balances command]: gateway_balances.html


[get_counts method]: get_counts.html
[get_counts command]: get_counts.html


[json method]: json.html
[json command]: json.html


[ledger method]: ledger.html
[ledger command]: ledger.html


[ledger_accept method]: ledger_accept.html
[ledger_accept command]: ledger_accept.html


[ledger_cleaner method]: ledger_cleaner.html
[ledger_cleaner command]: ledger_cleaner.html


[ledger_closed method]: ledger_closed.html
[ledger_closed command]: ledger_closed.html


[ledger_current method]: ledger_current.html
[ledger_current command]: ledger_current.html


[ledger_data method]: ledger_data.html
[ledger_data command]: ledger_data.html


[ledger_entry method]: ledger_entry.html
[ledger_entry command]: ledger_entry.html


[ledger_request method]: ledger_request.html
[ledger_request command]: ledger_request.html


[log_level method]: log_level.html
[log_level command]: log_level.html


[logrotate method]: logrotate.html
[logrotate command]: logrotate.html


[manifest method]: manifest.html
[manifest command]: manifest.html


[noripple_check method]: noripple_check.html
[noripple_check command]: noripple_check.html


[path_find method]: path_find.html
[path_find command]: path_find.html


[peer_reservations_add method]: peer_reservations_add.html
[peer_reservations_add command]: peer_reservations_add.html


[peer_reservations_del method]: peer_reservations_del.html
[peer_reservations_del command]: peer_reservations_del.html


[peer_reservations_list method]: peer_reservations_list.html
[peer_reservations_list command]: peer_reservations_list.html


[peers method]: peers.html
[peers command]: peers.html


[ping method]: ping.html
[ping command]: ping.html


[print method]: print.html
[print command]: print.html


[random method]: random.html
[random command]: random.html


[ripple_path_find method]: ripple_path_find.html
[ripple_path_find command]: ripple_path_find.html


[server_info method]: server_info.html
[server_info command]: server_info.html


[server_state method]: server_state.html
[server_state command]: server_state.html


[sign method]: sign.html
[sign command]: sign.html


[sign_for method]: sign_for.html
[sign_for command]: sign_for.html


[stop method]: stop.html
[stop command]: stop.html


[submit method]: submit.html
[submit command]: submit.html


[submit_multisigned method]: submit_multisigned.html
[submit_multisigned command]: submit_multisigned.html


[subscribe method]: subscribe.html
[subscribe command]: subscribe.html


[transaction_entry method]: transaction_entry.html
[transaction_entry command]: transaction_entry.html


[tx method]: tx.html
[tx command]: tx.html


[tx_history method]: tx_history.html
[tx_history command]: tx_history.html


[unsubscribe method]: unsubscribe.html
[unsubscribe command]: unsubscribe.html


[validation_create method]: validation_create.html
[validation_create command]: validation_create.html


[validation_seed method]: validation_seed.html
[validation_seed command]: validation_seed.html


[validator_info method]: validator_info.html
[validator_info command]: validator_info.html


[validator_list_sites method]: validator_list_sites.html
[validator_list_sites command]: validator_list_sites.html


[validators method]: validators.html
[validators command]: validators.html


[wallet_propose method]: wallet_propose.html
[wallet_propose command]: wallet_propose.html



<!---->



[Checks amendment]: known-amendments.html#checks

[CheckCashMakesTrustLine amendment]: known-amendments.html#checkcashmakestrustline

[CryptoConditions amendment]: known-amendments.html#cryptoconditions

[CryptoConditionsSuite amendment]: known-amendments.html#cryptoconditionssuite

[DeletableAccounts amendment]: known-amendments.html#deletableaccounts

[DepositAuth amendment]: known-amendments.html#depositauth

[DepositPreauth amendment]: known-amendments.html#depositpreauth

[EnforceInvariants amendment]: known-amendments.html#enforceinvariants

[Escrow amendment]: known-amendments.html#escrow

[FeeEscalation amendment]: known-amendments.html#feeescalation

[fix1201 amendment]: known-amendments.html#fix1201

[fix1368 amendment]: known-amendments.html#fix1368

[fix1373 amendment]: known-amendments.html#fix1373

[fix1512 amendment]: known-amendments.html#fix1512

[fix1513 amendment]: known-amendments.html#fix1513

[fix1515 amendment]: known-amendments.html#fix1515

[fix1523 amendment]: known-amendments.html#fix1523

[fix1528 amendment]: known-amendments.html#fix1528

[fix1543 amendment]: known-amendments.html#fix1543

[fix1571 amendment]: known-amendments.html#fix1571

[fix1578 amendment]: known-amendments.html#fix1578

[fix1623 amendment]: known-amendments.html#fix1623

[fixCheckThreading amendment]: known-amendments.html#fixcheckthreading

[fixMasterKeyAsRegularKey amendment]: known-amendments.html#fixmasterkeyasregularkey

[fixPayChanRecipientOwnerDir amendment]: known-amendments.html#fixpaychanrecipientownerdir

[fixQualityUpperBound amendment]: known-amendments.html#fixqualityupperbound

[fixTakerDryOfferRemoval amendment]: known-amendments.html#fixtakerdryofferremoval

[Flow amendment]: known-amendments.html#flow

[FlowCross amendment]: known-amendments.html#flowcross

[FlowV2 amendment]: known-amendments.html#flowv2

[MultiSign amendment]: known-amendments.html#multisign

[MultiSignReserve amendment]: known-amendments.html#multisignreserve

[NegativeUNL amendment]: known-amendments.html#negativeunl

[OwnerPaysFee amendment]: known-amendments.html#ownerpaysfee

[PayChan amendment]: known-amendments.html#paychan

[RequireFullyCanonicalSig amendment]: known-amendments.html#requirefullycanonicalsig

[SHAMapV2 amendment]: known-amendments.html#shamapv2

[SortedDirectories amendment]: known-amendments.html#sorteddirectories

[SusPay amendment]: known-amendments.html#suspay

[TicketBatch amendment]: known-amendments.html#ticketbatch

[Tickets amendment]: known-amendments.html#tickets

[TickSize amendment]: known-amendments.html#ticksize

[TrustSetAuth amendment]: known-amendments.html#trustsetauth
			





[AccountDelete]: accountdelete.html
[AccountDelete transaction]: accountdelete.html
[AccountDelete transactions]: accountdelete.html


[AccountSet]: accountset.html
[AccountSet transaction]: accountset.html
[AccountSet transactions]: accountset.html


[CheckCancel]: checkcancel.html
[CheckCancel transaction]: checkcancel.html
[CheckCancel transactions]: checkcancel.html


[CheckCash]: checkcash.html
[CheckCash transaction]: checkcash.html
[CheckCash transactions]: checkcash.html


[CheckCreate]: checkcreate.html
[CheckCreate transaction]: checkcreate.html
[CheckCreate transactions]: checkcreate.html


[DepositPreauth]: depositpreauth.html
[DepositPreauth transaction]: depositpreauth.html
[DepositPreauth transactions]: depositpreauth.html


[EscrowCancel]: escrowcancel.html
[EscrowCancel transaction]: escrowcancel.html
[EscrowCancel transactions]: escrowcancel.html


[EscrowCreate]: escrowcreate.html
[EscrowCreate transaction]: escrowcreate.html
[EscrowCreate transactions]: escrowcreate.html


[EscrowFinish]: escrowfinish.html
[EscrowFinish transaction]: escrowfinish.html
[EscrowFinish transactions]: escrowfinish.html


[NFTokenAcceptOffer]: nftokenacceptoffer.html
[NFTokenAcceptOffer transaction]: nftokenacceptoffer.html
[NFTokenAcceptOffer transactions]: nftokenacceptoffer.html


[NFTokenBurn]: nftokenburn.html
[NFTokenBurn transaction]: nftokenburn.html
[NFTokenBurn transactions]: nftokenburn.html


[NFTokenCancelOffer]: nftokencanceloffer.html
[NFTokenCancelOffer transaction]: nftokencanceloffer.html
[NFTokenCancelOffer transactions]: nftokencanceloffer.html


[NFTokenCreateOffer]: nftokencreateoffer.html
[NFTokenCreateOffer transaction]: nftokencreateoffer.html
[NFTokenCreateOffer transactions]: nftokencreateoffer.html


[NFTokenMint]: nftokenmint.html
[NFTokenMint transaction]: nftokenmint.html
[NFTokenMint transactions]: nftokenmint.html


[OfferCancel]: offercancel.html
[OfferCancel transaction]: offercancel.html
[OfferCancel transactions]: offercancel.html


[OfferCreate]: offercreate.html
[OfferCreate transaction]: offercreate.html
[OfferCreate transactions]: offercreate.html


[Payment]: payment.html
[Payment transaction]: payment.html
[Payment transactions]: payment.html


[PaymentChannelClaim]: paymentchannelclaim.html
[PaymentChannelClaim transaction]: paymentchannelclaim.html
[PaymentChannelClaim transactions]: paymentchannelclaim.html


[PaymentChannelCreate]: paymentchannelcreate.html
[PaymentChannelCreate transaction]: paymentchannelcreate.html
[PaymentChannelCreate transactions]: paymentchannelcreate.html


[PaymentChannelFund]: paymentchannelfund.html
[PaymentChannelFund transaction]: paymentchannelfund.html
[PaymentChannelFund transactions]: paymentchannelfund.html


[SetRegularKey]: setregularkey.html
[SetRegularKey transaction]: setregularkey.html
[SetRegularKey transactions]: setregularkey.html


[SignerListSet]: signerlistset.html
[SignerListSet transaction]: signerlistset.html
[SignerListSet transactions]: signerlistset.html


[TicketCreate]: ticketcreate.html
[TicketCreate transaction]: ticketcreate.html
[TicketCreate transactions]: ticketcreate.html


[TrustSet]: trustset.html
[TrustSet transaction]: trustset.html
[TrustSet transactions]: trustset.html




[EnableAmendment]: enableamendment.html
[EnableAmendment pseudo-transaction]: enableamendment.html
[EnableAmendment pseudo-transactions]: enableamendment.html
[EnableAmendment疑似トランザクション]: enableamendment.html

[SetFee]: setfee.html
[SetFee pseudo-transaction]: setfee.html
[SetFee pseudo-transactions]: setfee.html
[SetFee疑似トランザクション]: setfee.html

[UNLModify]: unlmodify.html
[UNLModify pseudo-transaction]: unlmodify.html
[UNLModify pseudo-transactions]: unlmodify.html
[UNLModify疑似トランザクション]: unlmodify.html
			
<!-- rippled release notes links -->




[New in: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[Introduced in: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[Updated in: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[Removed in: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_RED"
[導入: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[新規: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[更新: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_BLUE"
[削除: rippled 0.26.0]: https://github.com/ripple/rippled/releases/tag/0.26.0 "BADGE_RED"

[New in: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[Introduced in: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[Updated in: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[Removed in: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_RED"
[導入: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[新規: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[更新: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_BLUE"
[削除: rippled 0.26.1]: https://github.com/ripple/rippled/releases/tag/0.26.1 "BADGE_RED"

[New in: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[Introduced in: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[Updated in: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[Removed in: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_RED"
[導入: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[新規: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[更新: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_BLUE"
[削除: rippled 0.26.2]: https://github.com/ripple/rippled/releases/tag/0.26.2 "BADGE_RED"

[New in: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[Introduced in: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[Updated in: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[Removed in: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_RED"
[導入: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[新規: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[更新: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_BLUE"
[削除: rippled 0.26.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.3-sp1 "BADGE_RED"

[New in: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[Introduced in: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[Updated in: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[Removed in: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_RED"
[導入: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[新規: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[更新: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_BLUE"
[削除: rippled 0.26.4]: https://github.com/ripple/rippled/releases/tag/0.26.4 "BADGE_RED"

[New in: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[Introduced in: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[Updated in: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[Removed in: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_RED"
[導入: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[新規: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[更新: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_BLUE"
[削除: rippled 0.26.4-sp1]: https://github.com/ripple/rippled/releases/tag/0.26.4-sp1 "BADGE_RED"

[New in: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[Introduced in: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[Updated in: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[Removed in: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_RED"
[導入: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[新規: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[更新: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_BLUE"
[削除: rippled 0.27.0]: https://github.com/ripple/rippled/releases/tag/0.27.0 "BADGE_RED"

[New in: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[Introduced in: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[Updated in: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[Removed in: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_RED"
[導入: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[新規: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[更新: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_BLUE"
[削除: rippled 0.27.1]: https://github.com/ripple/rippled/releases/tag/0.27.1 "BADGE_RED"

[New in: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[Introduced in: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[Updated in: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[Removed in: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_RED"
[導入: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[新規: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[更新: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_BLUE"
[削除: rippled 0.27.2]: https://github.com/ripple/rippled/releases/tag/0.27.2 "BADGE_RED"

[New in: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[Introduced in: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[Updated in: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[Removed in: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_RED"
[導入: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[新規: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[更新: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_BLUE"
[削除: rippled 0.27.3]: https://github.com/ripple/rippled/releases/tag/0.27.3 "BADGE_RED"

[New in: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[Introduced in: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[Updated in: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[Removed in: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_RED"
[導入: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[新規: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[更新: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_BLUE"
[削除: rippled 0.27.3-sp1]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp1 "BADGE_RED"

[New in: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[Introduced in: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[Updated in: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[Removed in: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_RED"
[導入: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[新規: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[更新: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_BLUE"
[削除: rippled 0.27.3-sp2]: https://github.com/ripple/rippled/releases/tag/0.27.3-sp2 "BADGE_RED"

[New in: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[Introduced in: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[Updated in: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[Removed in: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_RED"
[導入: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[新規: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[更新: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_BLUE"
[削除: rippled 0.27.4]: https://github.com/ripple/rippled/releases/tag/0.27.4 "BADGE_RED"

[New in: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[Introduced in: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[Updated in: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[Removed in: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_RED"
[導入: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[新規: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[更新: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_BLUE"
[削除: rippled 0.28.0]: https://github.com/ripple/rippled/releases/tag/0.28.0 "BADGE_RED"

[New in: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[Introduced in: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[Updated in: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[Removed in: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_RED"
[導入: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[新規: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[更新: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_BLUE"
[削除: rippled 0.28.2]: https://github.com/ripple/rippled/releases/tag/0.28.2 "BADGE_RED"

[New in: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[Introduced in: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[Updated in: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[Removed in: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_RED"
[導入: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[新規: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[更新: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_BLUE"
[削除: rippled 0.29.0]: https://github.com/ripple/rippled/releases/tag/0.29.0 "BADGE_RED"

[New in: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[Introduced in: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[Updated in: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[Removed in: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_RED"
[導入: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[新規: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[更新: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_BLUE"
[削除: rippled 0.29.0-hf1]: https://github.com/ripple/rippled/releases/tag/0.29.0-hf1 "BADGE_RED"

[New in: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[Introduced in: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[Updated in: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[Removed in: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_RED"
[導入: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[新規: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[更新: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_BLUE"
[削除: rippled 0.30.0]: https://github.com/ripple/rippled/releases/tag/0.30.0 "BADGE_RED"

[New in: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[Introduced in: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[Updated in: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[Removed in: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_RED"
[導入: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[新規: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[更新: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_BLUE"
[削除: rippled 0.30.1]: https://github.com/ripple/rippled/releases/tag/0.30.1 "BADGE_RED"

[New in: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[Introduced in: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[Updated in: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[Removed in: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_RED"
[導入: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[新規: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[更新: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_BLUE"
[削除: rippled 0.31.0]: https://github.com/ripple/rippled/releases/tag/0.31.0 "BADGE_RED"

[New in: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[Introduced in: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[Updated in: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[Removed in: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_RED"
[導入: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[新規: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[更新: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_BLUE"
[削除: rippled 0.32.0]: https://github.com/ripple/rippled/releases/tag/0.32.0 "BADGE_RED"

[New in: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[Introduced in: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[Updated in: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[Removed in: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_RED"
[導入: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[新規: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[更新: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_BLUE"
[削除: rippled 0.32.1]: https://github.com/ripple/rippled/releases/tag/0.32.1 "BADGE_RED"

[New in: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[Introduced in: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[Updated in: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[Removed in: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_RED"
[導入: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[新規: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[更新: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_BLUE"
[削除: rippled 0.33.0]: https://github.com/ripple/rippled/releases/tag/0.33.0 "BADGE_RED"

[New in: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[Introduced in: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[Updated in: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[Removed in: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_RED"
[導入: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[新規: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[更新: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_BLUE"
[削除: rippled 0.50.0]: https://github.com/ripple/rippled/releases/tag/0.50.0 "BADGE_RED"

[New in: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[Introduced in: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[Updated in: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[Removed in: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_RED"
[導入: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[新規: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[更新: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_BLUE"
[削除: rippled 0.70.0]: https://github.com/ripple/rippled/releases/tag/0.70.0 "BADGE_RED"

[New in: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[Introduced in: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[Updated in: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[Removed in: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_RED"
[導入: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[新規: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[更新: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_BLUE"
[削除: rippled 0.70.2]: https://github.com/ripple/rippled/releases/tag/0.70.2 "BADGE_RED"

[New in: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[Introduced in: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[Updated in: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[Removed in: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_RED"
[導入: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[新規: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[更新: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_BLUE"
[削除: rippled 0.80.0]: https://github.com/ripple/rippled/releases/tag/0.80.0 "BADGE_RED"

[New in: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[Introduced in: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[Updated in: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[Removed in: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_RED"
[導入: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[新規: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[更新: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_BLUE"
[削除: rippled 0.80.1]: https://github.com/ripple/rippled/releases/tag/0.80.1 "BADGE_RED"

[New in: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[Introduced in: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[Updated in: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[Removed in: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_RED"
[導入: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[新規: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[更新: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_BLUE"
[削除: rippled 0.90.0]: https://github.com/ripple/rippled/releases/tag/0.90.0 "BADGE_RED"

[New in: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[Introduced in: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[Updated in: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[Removed in: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_RED"
[導入: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[新規: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[更新: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_BLUE"
[削除: rippled 1.0.0]: https://github.com/ripple/rippled/releases/tag/1.0.0 "BADGE_RED"

[New in: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[Introduced in: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[Updated in: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[Removed in: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_RED"
[導入: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[新規: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[更新: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_BLUE"
[削除: rippled 1.1.0]: https://github.com/ripple/rippled/releases/tag/1.1.0 "BADGE_RED"

[New in: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[Introduced in: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[Updated in: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[Removed in: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_RED"
[導入: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[新規: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[更新: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_BLUE"
[削除: rippled 1.2.0]: https://github.com/ripple/rippled/releases/tag/1.2.0 "BADGE_RED"

[New in: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[Introduced in: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[Updated in: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[Removed in: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_RED"
[導入: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[新規: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[更新: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_BLUE"
[削除: rippled 1.2.1]: https://github.com/ripple/rippled/releases/tag/1.2.1 "BADGE_RED"

[New in: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[Introduced in: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[Updated in: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[Removed in: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_RED"
[導入: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[新規: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[更新: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_BLUE"
[削除: rippled 1.3.1]: https://github.com/ripple/rippled/releases/tag/1.3.1 "BADGE_RED"

[New in: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[Introduced in: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[Updated in: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[Removed in: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_RED"
[導入: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[新規: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[更新: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_BLUE"
[削除: rippled 1.4.0]: https://github.com/ripple/rippled/releases/tag/1.4.0 "BADGE_RED"

[New in: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[Introduced in: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[Updated in: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[Removed in: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_RED"
[導入: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[新規: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[更新: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_BLUE"
[削除: rippled 1.5.0]: https://github.com/ripple/rippled/releases/tag/1.5.0 "BADGE_RED"

[New in: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[Introduced in: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[Updated in: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[Removed in: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_RED"
[導入: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[新規: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[更新: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_BLUE"
[削除: rippled 1.6.0]: https://github.com/ripple/rippled/releases/tag/1.6.0 "BADGE_RED"

[New in: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[Introduced in: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[Updated in: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[Removed in: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_RED"
[導入: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[新規: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[更新: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_BLUE"
[削除: rippled 1.7.0]: https://github.com/ripple/rippled/releases/tag/1.7.0 "BADGE_RED"

[New in: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[Introduced in: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[Updated in: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[Removed in: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_RED"
[導入: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[新規: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[更新: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_BLUE"
[削除: rippled 1.7.2]: https://github.com/ripple/rippled/releases/tag/1.7.2 "BADGE_RED"

[New in: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[Introduced in: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[Updated in: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[Removed in: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_RED"
[導入: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[新規: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[更新: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_BLUE"
[削除: rippled 1.8.1]: https://github.com/ripple/rippled/releases/tag/1.8.1 "BADGE_RED"
