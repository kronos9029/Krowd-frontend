import React from 'react'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarFunderaise from '../../component/navbar/NavbarFunderaise'
import './ProcessBar.css'
export default function FundraiserGoalPage() {
    return (
        <>
            <NavbarFunderaise />
            <div >
                
                <Container className="pt-5 pb-5">
      
                    <Row className='justify-content-md-center text-center'>
                  
                   <h3 >Step 2 of 4</h3>
                        <ProgressBar variant="success" className='RSI__ProcessBar-create' />
                        <ProgressBar  className='RSI__ProcessBar-create11' />
                        <ProgressBar  className='RSI__ProcessBar-create2' />
                        <ProgressBar  className='RSI__ProcessBar-create3' />

           
                    </Row>
                    
                    <Row className='justify-content-md-center pt-2 text-center'>
                    <Button className='button-funder'>Back</Button>
                    </Row>
                    <div className="pt-5 pb-5">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-3 text-left">
                                        <h3>Set your fundraising goal </h3>
                                    </div>
                                
                                    <div className="form-group pt-3 text-left">
                                        <h5>How much would you like to raise?</h5>
                                    </div>
                                    <div className="row g-3 align-items-center">

                                        <div className="col-12">
                                            <input type="number" min="0" id="inputMoney" placeholder='Enter Goal Ammount' className="form-control" aria-describedby="passwordHelpInline" />
                                        </div>
                                     
                                    </div>
                                    <div className="form-group pt-3 text-left">
                                        <p>Keep in mind that transaction fees, including credit and debit charges, are deducted from each donation.</p>
                                    </div>
                                    <div className="form-group pt-3 text-left">
                                        <p className='Box-p'>To receive money raised, please make sure the person withdrawing has an address and bank account in the selected country of residence.</p>
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
                                        <Link to="/create/fundraiser/sign-up/media"><Button variant='success' className="btn btn-primary btn-block w-100" type="submit">Next</Button></Link>
                                    </div>
                            
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
 