import React, { Component } from "react";
import { MDBContainer, MDBCollapse, MDBCardBody } from "mdbreact";
import { Row, Col } from 'react-bootstrap';

import {
    Badge,
} from "reactstrap";
class CollapsePage extends Component {
    state = {
        collapseID: "collapse"
    }
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        const { collapseID } = this.state;
        return (

            <MDBContainer className="mt-5">
                <Row className="justify-content-md-center pt-5">
                    <Col xxl={6} xl={6} md={6}  >
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse1")}>
                                <Badge className="badge-circle " color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How much can I invest?
                                <i className={collapseID === "collapse1" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4>
                            <MDBCollapse  id="collapse1" isOpen={collapseID}>
                                <MDBCardBody>
                                    Pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                    terry richardson ad squid. 3 wolf moon officia aute, non
                                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                                    laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                                    bird on it squid single-origin coffee nulla assumenda shoreditch
                                    et. Nihil anim keffiyeh helvetica, craft beer labore wes
                                    anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                    butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                                    raw denim aesthetic synth nesciunt you probably haven&apos;t
                                    heard of them accusamus labore sustainable VHS.
                                </MDBCardBody>
                            </MDBCollapse>
                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse2")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                What is Republic?
                                <i className={collapseID === "collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse2" isOpen={collapseID}>
                                <MDBCardBody>
                                    Republic is a startup investing platform for everyone. We allow regular people — not just a few wealthy accredited investors — to invest in highly vetted private startups, with as little as $10 or as much as $100,000 per investment.

                                    Republic was created to democratize fundraising while expanding equity investing to the masses, giving anyone the chance to back the next unicorn company. More about Republic
                                </MDBCardBody>
                            </MDBCollapse>


                        </Row>

                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse3")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How do startups get listed on Republic?
                                <i className={collapseID === "collapse3" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse3" isOpen={collapseID}>
                                <MDBCardBody>
                                    As part of our commitment to broadening investing access, Republic allows investments starting at $10 — the lowest in the industry.

                                    Ultimately, every startup fundraising on Republic sets it own minimum investment, often starting at $25 or $100.

                                    Additionally, the SEC limits the maximum amount you can invest across all startups using the Reg CF legal framework based on your financial situation. Sign up to find out your limit
                                </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse4")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How much money can I make?
                                <i className={collapseID === "collapse4" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse4" isOpen={collapseID}>
                                <MDBCardBody>
                                    Let's start with the facts: there are no guaranteed returns in angel investing. That's why experienced investors diversify their startup portfolios: while most early-stage companies will likely fail, some may grow, and few may become “unicorns”, bringing in formidable returns (1,000x, even 50,000x or more).

                                    Though these outsized outcomes are extremely rare, smaller but still profitable exits through acquisition are also a possibility. In either case, your investment is high-risk, high-reward.
                                </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse5")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                Who can invest
                                <i className={collapseID === "collapse5" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse5" isOpen={collapseID}>
                                <MDBCardBody>
                                    Republic is an open platform, welcoming anyone over the age of 18 years old to invest.

                                    We have a diversified investor base with regard to age, gender, income, background, nationality and point of view.

                                    Each company on Republic decides what other requirements there are to invest in each unique campaign; please refer to each company’s deal page for details on who can invest.
                                </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                    </Col>

                    <Col xxl={6} xl={6} md={6} >
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse6")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                What do I need to start?
                            <i className={collapseID === "collapse6" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4>
                            <MDBCollapse id="collapse6" isOpen={collapseID}>
                                <MDBCardBody>
                                Sign up! We work hard to make private investing — a process that used to take days, involve lawyers, and cost thousands — as easy as online shopping. It takes seconds to join Republic and start investing, and you can pay with your credit card. Become an investor

We encourage you to review our educational materials and do your own diligence on the companies in which you invest. How should I invest
                                </MDBCardBody>
                            </MDBCollapse>
                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse7")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How is it different from other crowdfunding sites?
                                <i className={collapseID === "collapse7" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse7" isOpen={collapseID}>
                                <MDBCardBody>
                                Republic is an investment (or equity) crowdfunding platform, meaning that on Republic people invest expecting a return. They find companies they believe will succeed, and buy a piece of the company’s future.

In contrast, sites like GoFundMe, Kickstarter and Indiegogo are only offering you a one-time perk or a product for your donation or pledge.
                                </MDBCardBody>
                            </MDBCollapse>


                        </Row>

                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse8")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How much does it cost? (it’s free)
                                <i className={collapseID === "collapse8" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse8" isOpen={collapseID}>
                                <MDBCardBody>
                                Republic is free for investors, with no hidden fees or future costs. Republic only charges fees to the fundraising company.
                                </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse9")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                Why do companies want to raise on Republic?
                                <i className={collapseID === "collapse9" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse9" isOpen={collapseID}>
                                <MDBCardBody>
                                    Because of our strong and engaged network of investors, loyal partners and trusted brand, companies choose Republic over other platforms.

                                    “Republic’s network and team are incredible”
                                    — Damon Nam, Coinvest

                                    “Awesome platform and user experience”
                                    — Janet Wu, Silkroll

                                    “Exactly what founders need to be successful”
                                    — Desiree Vargas Wrigley, Pearachute

                                    “You guys have built something really powerful”
                                    — Michael Liu, RMR Labs

                                    Our many partners in the venture ecosystem refer their portfolio companies to Republic, because crowdfunding has unique benefits compared to traditional venture capital.

                                    Thanks to the publicity of the fundraising campaign and the number of investors, companies enjoy a long-lasting marketing effect, with hundreds of investors bringing more than just their money: they bring their network, their expertise and their ongoing support, and often transform into brand ambassadors.
                                </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                        <Row>
                            <h4 className='pt-3' onClick={this.toggleCollapse("collapse10")}>
                                <Badge className="badge-circle mr-3" color="success">
                                    <i className="ni ni-settings-gear-65" />
                                </Badge>
                                How is it different from the public stock market
                                <i className={collapseID === "collapse10" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down"} />
                            </h4 >
                            <MDBCollapse id="collapse10" isOpen={collapseID}>
                                <MDBCardBody>
                                    Startups are private companies whose securities are not publicly traded. Public stock markets list only public companies — that went through an IPO — usually long after they've experienced their most aggressive growth.

                                    Becoming an equity investor on Republic allows you to buy a stake at an earlier stage of a private, pre-IPO startup with lots of room to grow. While placing your capital at risk of total loss, you are betting on the opportunity for exponential financial upside.                            </MDBCardBody>
                            </MDBCollapse>

                        </Row>
                    </Col>

                </Row>
            </MDBContainer>
        );
    }
}

export default CollapsePage;