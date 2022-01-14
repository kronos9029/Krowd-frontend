import React from 'react'
import Fundedcompanies from '../cointainer/fundedcompanies/Fundedcompanies'
import Header from '../cointainer/header/header'
import RegulationCrowdfunding from '../cointainer/regulationCrowdfunding/RegulationCrowdfunding'
import Invertco from '../cointainer/startup/Invertco'
import CTA from '../component/callaction/CTA'
import Collabration from '../component/collab/Collabration'
import Footer from '../component/footer/Footer'
import FooterSection from '../component/footerSection/FooterSection'
import Revenue from '../component/whatrsi/Revenue'
import "./Index.css";

export default function Index() {
    return (
        <>
         
          <div className="App">

            <div className="gradient__bg">
            <Header />
            <Invertco />
            <RegulationCrowdfunding />
            <CTA />
            <Revenue />
            <Collabration />
            <Fundedcompanies />
            <FooterSection />
            <Footer />
        </div>
        
        </div>
        </>

    )
}
