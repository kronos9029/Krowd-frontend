import React from 'react'
import { Button, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FooterLogin from '../../component/footer/FooterLogin'
import NavbarFunderaise from '../../component/navbar/NavbarFunderaise'
import './ProcessBar.css'
export default function CreateFundraiserPage() {
    return (
        <>
            <NavbarFunderaise />
            <div >
                <Container className="pt-5 pb-5">
                    <Row className='justify-content-md-center text-center'>
                        <h3 >Step 1 of 4</h3>
                        <ProgressBar variant="success" className='RSI__ProcessBar-create' />
                        <ProgressBar  className='RSI__ProcessBar-create1' />
                        <ProgressBar  className='RSI__ProcessBar-create2' />
                        <ProgressBar  className='RSI__ProcessBar-create3' />
                    </Row>
                    <div className="pt-5 pb-3">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-3 text-left">
                                        <h3>Let’s start with the basics </h3>
                                    </div>
                                    <div className="form-group pt-3 text-left">
                                        <h5> What's your name?</h5>
                                    </div>
                                    <div className="row g-3 align-items-center">

                                        <div className="col-6">
                                            <input type="text" id="inputFirstname" placeholder='Firstname' className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" id="inputLastname" placeholder='Lastname' className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container">
                            <div className="row">

                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-3 text-left">
                                        <h5> Where do you live?
                                        </h5>
                                    </div>
                                    <fieldset>

                                        <div className="mb-3">
                                            <select id="disabledSelect" className="form-select" >
                                                <option disabled>Select your country</option>
                                                <option>Viet Nam</option>
                                                <option>select</option>
                                                <option>select</option>
                                            </select>

                                            <div className="row g-3 align-items-center pt-3">

                                                <div className="col-auto">
                                                    <h5><i className="fa fa-search pt-2" aria-hidden="true"> Search your postcode</i></h5>
                                                </div>
                                                <div >
                                                    <input placeholder='Search...' className="form-control" type="text" aria-label="Search" /></div>
                                            </div>

                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-3">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-3 text-left">
                                        <h5>What are you fundraising for?</h5>
                                    </div>

                                    <div className="row g-3 align-items-center">

                                        <select id="disabledSelect" className="form-select" >
                                            <option disabled>Choose a category</option>
                                            <option>Catgory</option>
                                            <option>Catgory</option>
                                            <option>select</option>
                                            <option>select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-1">
                                        <Link to="/create/fundraiser/goal"><Button variant='success' className="btn btn-primary btn-block w-100" type="submit">Next</Button></Link>
                                    </div>
                                     <p> By continuing, you agree to the GoFundMe <a className='link-a-funder'>terms</a>  and  <a className='link-a-funder' >privacy policy.</a></p>                                    </div>

                                </div>
                            </div>
                        </div>
                
                </Container>
            </div>
            {/* <FooterLogin /> */}
        </>

    )
}
