//a help form is form going to contain
//1 what is lifelog about 
//2 how to use lifelog
//3 contact us form
//4 faq section
//5 feedback form

import React from 'react'
import "./help.css"
import emailjs from '@emailjs/browser'
import { FaBook, FaQuestionCircle, FaEnvelope, FaBug } from "react-icons/fa"
import { FaUserPlus, FaSignInAlt, FaPen, FaCalendarAlt, FaSeedling } from "react-icons/fa"
const Help = () => {
    const sendBugReport = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        'service_ylyhbxg',
            'template_i18rfta',
            e.target,
            'rCQNE71t9m2bk_2ie'
    ).then(
        () => alert("Bug reported!"),
        () => alert("Failed to send")
    );
}
      const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_ylyhbxg',
            'template_i18rfta',
            e.target,
            'rCQNE71t9m2bk_2ie'
        ).then(
            () => {
                alert("Message sent!");
            },
            () => {
                alert("Failed to send.");
            }
        );
    }

    return (
        <div className='help'>
            <div className='title'>
                <h1>Help</h1>
                <p>Need help? We're here to assist you.</p>
            </div>

            <div className='what-is-lifelog'>
                <h2><FaBook className="icon" /> What is LifeLog?</h2>
                <p>LifeLog is a personal diary application that allows you to document your daily experiences, thoughts, and feelings. It provides a safe and private space for you to reflect on your life journey.</p>
            </div>

            <div className='how-to-use'>
                <h2><FaQuestionCircle className="icon" /> How to Use LifeLog?</h2>
                 <p><FaUserPlus className="step-icon"/> Create an account</p>
                 <p><FaSignInAlt className="step-icon"/> Log in to your account</p>
                 <p><FaPen className="step-icon"/> Start writing your daily entries</p>
                 <p><FaCalendarAlt className="step-icon"/> Use the calendar to view past entries</p>
                 <p><FaSeedling className="step-icon"/> Reflect on your experiences and growth</p>
            </div>

            <div className='contact-us'>
                <h2>Contact Us</h2>

                <form className='contact-form' onSubmit={sendEmail}>
                    <input type="text" name="name" placeholder='Your Name' required />
                    <input type="email" name="email" placeholder='Your Email' required />
                    <textarea name="message" placeholder='Your Message' required></textarea>
                    <button type="submit">Send</button>
                </form>

            </div>

            <div className='reportanissue'>
                <h2><FaBug className="icon" /> Report an Issue</h2>
                <form className='contact-form' onSubmit={sendBugReport}>
    <input name="name" type="text" placeholder='Your Name' required />
    <input name="email" type="email" placeholder='Your Email' required />
    <textarea name="message" placeholder='Your Message' required></textarea>
    <button type="submit">Send</button>
</form>
            </div>
                

            </div>
            
    )
}
export default Help