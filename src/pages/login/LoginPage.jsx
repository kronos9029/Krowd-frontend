import React from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../component/footer/Footer'
import FooterLogin from '../../component/footer/FooterLogin'
import Navbar from '../../component/navbar/Navbar'

export default function LoginPage() {
    return (
        <>
          <Navbar/>

            <div >
                <Container className="pt-5 pb-5">
                    <Row className='justify-content-md-center text-center'>
                        <h1 >Log in</h1>
                    </Row>
                
                    <div className="pt-5 pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <div className="form-group pt-1">
                                        <button className="btn btn-primary btn-block w-100" type="submit"> Log In with FaceBook</button>
                                    </div>
                                    <div className="form-group pt-3">
                                        <button className="btn btn-primary btn-block w-100" type="submit"> Log In with Twiter</button>
                                    </div>
                                    <div className="form-group pt-3 text-center">
                                    OR LOGIN WITH GMAIL

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-1 pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <div className="card card-body">
                                        <form id="submitForm" action="#" method="post" data-parsley-validate="" data-parsley-errors-messages-disabled="true" noValidate="" _lpchecked="1">
                                            <input type="hidden" name="_csrf" value="7635eb83-1f95-4b32-8788-abec2724a9a4" />
                                            <div className="form-group required pt-4">
                                                <input type="text" className="form-control" placeholder='Email' id="username" required="" name="username" value="" />
                                            </div>
                                            <div className="form-group required pt-4">
                                                <input type="password" className="form-control"  placeholder='Password' required="" id="password" name="password" value="" />
                                            </div>
                                            <div className="form-group mt-4 mb-4">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="remember-me" name="remember-me" data-parsley-multiple="remember-me" />
                                                    <label clss="custom-control-label " for="remember-me"> Remember me? </label>
                                                </div>
                                            </div>
                                            <div className="form-group pt-1">
                                               <Link to="/"><button className="btn btn-primary btn-block w-100" type="submit"> Log In </button> </Link> 
                                            </div>
                                        </form>
                                        <h5 className="small-xl pt-3 text-center">
                                            <Link to='/register'> Do you have any account ?<span style={{ color: "blue" }}> Sign up</span>  </Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <FooterLogin />
        </>

    )
}
