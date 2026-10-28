import React, { useState } from 'react';
import { EnquiryType } from './data/site';
import { Header, Hero, Intro, Residences, FurnishedResidence, FurnishingCollection, Gallery, Location, Footer, scrollTo } from './components/Sections';
import { Enquiry } from './components/Enquiry';

export default function App() {
  const [enquiry, setEnquiry] = useState<{ type: EnquiryType; unit?: string }>({ type: 'leasing' });

  const openEnquiry = (type: EnquiryType, unit?: string) => {
    setEnquiry({ type, unit });
    scrollTo('enquire');
  };

  return (
    <>
      <Header onEnquire={openEnquiry} />
      <main>
        <Hero onEnquire={openEnquiry} />
        <Intro />
        <Residences onEnquire={openEnquiry} />
        <FurnishedResidence onEnquire={openEnquiry} />
        <FurnishingCollection onEnquire={openEnquiry} />
        <Gallery />
        <Enquiry type={enquiry.type} unit={enquiry.unit} />
        <Location />
      </main>
      <Footer onEnquire={openEnquiry} />
    </>
  );
}
