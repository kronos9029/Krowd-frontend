import React from 'react'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarFunderaise from '../../component/navbar/NavbarFunderaise'
import './ProcessBar.css'
export default function RegisterPageMedia() {
    return (
        <>
            <NavbarFunderaise />
            <div >

                <Container className="pt-5 pb-5">
                    {/*       
                    <Row className='justify-content-md-center text-center'>
                  
                   <h3 >Step 2 of 4</h3>
                        <ProgressBar variant="success" className='RSI__ProcessBar-create' />
                        <ProgressBar  className='RSI__ProcessBar-create11' />
                        <ProgressBar  className='RSI__ProcessBar-create2' />
                        <ProgressBar  className='RSI__ProcessBar-create3' />

           
                    </Row> */}

                    {/* <Row className='justify-content-md-center pt-2 text-center'>
                    <Button className='button-funder'>Back</Button>
                    </Row> */}
                    <div className="pt-5 pb-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-3 text-left">
                                        <p>Great progress, Dat. </p>
                                    </div>

                                    <div className="form-group pt-2 text-left">
                                        <h5>Create an account to save and continue</h5>
                                    </div>
                                    <div className="row g-3 pt-3  align-items-center">

                                        <div className="col-12">
                                            <input type="text" placeholder='Email' className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>

                                    </div>
                                    <div className="row g-3  pt-3 align-items-center">

                                        <div className="col-12">
                                            <input type="text" placeholder='Password' className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>

                                    </div>
                                    <div className="form-group pt-3 text-left">
                                        <ul className='Box-p'>
                                        <p>Your password must have:</p> 
                                           <li>At least 12 characters</li> 
                                           <li>1 uppercase letter</li> 
                                           <li>1 lowercase letter</li> 
                                           <li>1 number</li> 
                                           <li>1 sysbol</li> 
                                        </ul>
                                    </div>
                                    <div className="form-group pt-3 text-left">
                                        <p>Receive tips to help you make the most of your fundraiser, and updates about important causes. Unsubscribe anytime.</p>
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
                                        <Link to="/create/fundraiser/sign-up?redirect=media"><Button variant='success' className="btn btn-primary btn-block w-100" type="submit">Next</Button></Link>
                                        <p> By continuing, you agree to the GoFundMe <a className='link-a-funder'>terms</a>  and  <a className='link-a-funder' >privacy policy.</a></p>                                    </div>
                                        <h5 className="small-xl pt-3 text-center">
                                        <Link to='/login'> Already have an account?<span style={{color:"blue"}}> Log in</span>  </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                </Container>
            </div>
            {/* <FooterLogin /> */}
        </>

    )
}
