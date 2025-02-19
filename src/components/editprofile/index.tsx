import React from 'react'
import Header from '../header'
import { Link } from 'react-router-dom'
import andrew from "../../assets/images/andew.png"

function Editprofile() {
  return (
    <>
        <Header/>
        <div className='EditProfieOuter'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='LeftditPro'>
                        <h3>My Profile</h3>
                        <ul>
                            <li><Link to="#">Profile</Link></li>
                            <li><Link to="#">Invoices/Payment</Link></li>
                            <li><Link to="#">Drafts Posts</Link></li>
                            <li><Link to="#">Rating & Feedback</Link></li>
                            <li><Link to="#">Contact us</Link></li>
                            <li><Link to="#">Notification Settings</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='RightditPro'>
                        <h3>Profile</h3>
                        <div className='ProfileEdit'>
                        <div className='ProfileEditHead'>
                                <span><img src={andrew} alt=""/></span>
                                <div>
                                    <h4>Andrew Globerman</h4>
                                    <h5>UIUX Designer . available</h5>
                                </div>
                            </div>
                            <h6>Basic Info</h6>
                            <ul>
                                <li>
                                    <span>Name</span>
                                    <label>Andrew Globerman</label>
                                </li>
                                <li>
                                    <span>Email Id</span>
                                    <label>Andre.g@gmail.com</label>
                                </li>
                                <li>
                                    <span>Phone Number</span>
                                    <label>+15443404656</label>
                                </li>
                                <li>
                                    <span>Address</span>
                                    <label>Lorem Ipsum, Palm Road, New York</label>
                                </li>
                                <li>
                                    <span>Account Type</span>
                                    <label>Public</label>
                                </li>
                            </ul>
                            <div className='deletAcount'>
                                <span><i className="fas fa-trash-alt"></i> Delete Account</span>
                            </div>
                        </div>

                        <div className='AboutEdit'>
                            <h4>About</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, augue eget scelerisque efficitur.</p>
                        </div>
                        <div className='SocialMediEdit'>
                            <ul>
                                <li><span>Instagram Link</span> <Link to="#">+ Add Links</Link></li>
                                <li><span>Linkedin</span> <Link to="#">+ Add Links</Link></li>
                                <li><span>Facebook</span> <Link to="#">+ Add Links</Link></li>
                                <li><span>Twitter</span> <Link to="#">+ Add Links</Link></li>
                            </ul>
                            </div>
                            <div className='AboutEdit'>
                            <h4>Pay Rates</h4>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='FormGroup'>
                                        <label>Base</label>
                                        <input type='text' placeholder='$50'/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='FormGroup'>
                                        <label>Overtine</label>
                                        <input type='text' placeholder='$50'/>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='FormGroup'>
                                        <label>Sun / Holiday</label>
                                        <input type='text' placeholder='$50'/>
                                    </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Editprofile
