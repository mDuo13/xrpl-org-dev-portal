import * as React from 'react';

import benefits from './home-benefits.yaml';
import adfeatures from './home-advanced-features.yaml';
import newfeatures from './home-new-features.yaml';
import getstarted from './home-get-started.yaml';
import { XRPLCard } from '../_components/XRPLCard.tsx';

export default function XRPLHome() {
  return (
    <div class="overflow-hidden page-home">
      <section class="container-new pb-26-until-sm mt-10 mb-10-sm text-center">
        <div class="w-100">
          <img id="home-hero-graphic" alt="X" />
        </div>
        <div class="col-lg-5 mx-auto text-center pl-0 pr-0">
          <div class="d-flex flex-column-reverse">
            <h1 class="mb-10">Community<br class="until-sm"/> Powered Utility</h1>
            <h6 class="eyebrow mb-3">XRPL | XRP Ledger</h6>
          </div>
          <a href="docs.html" class="btn btn-primary btn-arrow">Start Building</a>
        </div>
      </section>
      <div class="position-relative d-none-sm">
        <img src={require('../img/backgrounds/home-purple.svg')} id="home-purple" />
        <img src={require('../img/backgrounds/home-green.svg')} id="home-green" />
      </div>
      <section class="container-new py-26">
        <div class="col-lg-6 offset-lg-3 pl-0-sm pr-0-sm p-8-sm p-10-until-sm">
          <h2 class="h4 mb-8 h2-sm">The XRP Ledger: A Scalable, Sustainable Blockchain</h2>
          <h6 class="longform mb-10">The XRP Ledger (XRPL) is a decentralized, public blockchain led by a global developer community.</h6>
          <p class="mb-0">It’s fast, energy efficient, and reliable. With ease of development, low transaction costs, and a knowledgeable community, it provides developers with a strong open-source foundation for executing on the most demanding projects—without hurting the environment.</p>
        </div>
      </section>
      <section class="container-new py-26">
        <div class="d-flex flex-column-reverse col-sm-8 p-0">
          <h3 class="h4 h2-sm">Why developers choose the XRP Ledger</h3>
          <h6 class="eyebrow mb-3">Discover Benefits</h6>
        </div>
        <ul class="mt-10 card-grid card-grid-3xN" id="benefits-list">
          {benefits.map((benefit, idx) => (
            <BenefitItem benefit={benefit} key={idx} idx={idx} />
          ))}
        </ul>
      </section>
      <section class="container-new py-26">
        <div class="d-flex flex-column-reverse col-sm-8 p-0">
          <h3 class="h4 h2-sm">Activate the power of the XRP Ledger and find the building blocks for your next innovation</h3>
          <h6 class="eyebrow mb-3">Explore Advanced Features</h6>
        </div>
        <div class="row row-cols-1 row-cols-lg-3 card-deck mt-10" id="advanced-features">
          {adfeatures.map((card, idx) => (
            <XRPLCard card={card} key={idx} idx={idx} />
          ))}
        </div>
      </section>
      <section class="container-new py-26">
        <div class="d-flex flex-column-reverse col-sm-8 p-0">
          <h3 class="h4 h2-sm">Choose a path to start building on the XRPL</h3>
          <h6 class="eyebrow mb-3">Get Started</h6>
        </div>
        <div class="row row-cols-1 row-cols-lg-3 card-deck mt-10" id="get-started">
          {getstarted.map((card, idx) => (
            <XRPLCard card={card} key={idx} idx={idx} />
          ))}
        </div>
      </section>
      <section class="container-new py-26">
        <div class="col-lg-6 offset-lg-3 p-6-sm p-10-until-sm br-8 cta-card">
          <img src={require('../img/backgrounds/cta-home-purple.svg')} className="d-none-sm cta cta-top-left" />
          <img src={require('../img/backgrounds/cta-home-green.svg')} className="cta cta-bottom-right" />
          <div class="z-index-1 position-relative">
            <h2 class="h4 mb-8-sm mb-10-until-sm">Our Shared Vision for XRPL’s Future</h2>
            <p class="mb-10">Together, we're building the greenest infrastructure to drive blockchain innovation that doesn't sacrifice utility or performance, to bring the developer community's vision to life.</p>
            <a class="btn btn-primary btn-arrow" href="overview.html">Learn More</a>
          </div>
        </div>
      </section>
      <section class="container-new py-26">
        <div class="d-flex flex-column-reverse col-sm-8 p-0">
          <h3 class="h4 h2-sm">Explore what the community is building to enable new features and use cases on XRPL</h3>
          <h6 class="eyebrow mb-3">Preview New Features</h6>
        </div>
        <ul class="mt-10 card-grid card-grid-3xN">
          {newfeatures.map((feat, idx) => (
            <NewFeatureItem feat={feat} key={idx} idx={idx} />
          ))}
        </ul>
      </section>
      <section class="container-new py-26">
        <div class="col-md-6 offset-md-3 p-8-sm p-10-until-sm br-8 cta-card">
          <img src={require('../img/backgrounds/cta-home-magenta.svg')} className="cta cta-bottom-right" />
          <div class="z-index-1 position-relative">
            <div class="d-flex flex-column-reverse">
              <h2 class="h4 mb-8-sm mb-10-until-sm">XRPL.org: by the community, for the community</h2>
              <h5 class="eyebrow mb-3">Get Involved</h5>
            </div>
            <p class="mb-10">XRPL.org is a community-driven resource by and for developers who build on the XRP Ledger (XRPL).</p>
            <a class="btn btn-primary btn-arrow" href="contribute.html">Join the Community</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function BenefitItem(props) {
  const benefit = props.benefit;
  const idx = props.idx;

  return (
    <li class="col ls-none">
      <img id={benefit.id} alt={`${benefit.id} Icon`} />
      <h4 class="mt-3 mb-0 h5" dangerouslySetInnerHTML={{ __html: benefit.title }}></h4>
      <p class="mt-6-until-sm mt-3 mb-0" dangerouslySetInnerHTML={{ __html: benefit.description }}></p>
    </li>
  )
}

function NewFeatureItem(props) {
  const feat = props.feat;
  const idx = props.idx;

  return (
    <li class="col ls-none pt-2">
      <a class="label chip-green" href={feat.href}>{feat.chip}</a>
      <h4 class="mt-3 mb-0 h5">{feat.title}</h4>
      <p class="mt-6-until-sm mt-3 mb-0" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
    </li>
  )
}
