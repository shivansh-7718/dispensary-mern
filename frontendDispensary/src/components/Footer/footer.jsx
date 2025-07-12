import React from 'react'
import './footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import CloudIcon from '@mui/icons-material/Cloud';
const Footer = () => {

    const todayDate=new Date();
  return (
    <div className="footer">
        <div className="footer-left">
            <img className ="footer-logo" src="https://erp.psit.ac.in/assets/img/psit.png" />
            <div className="footer-text-white">Pranveer Singh Institute Of Technology</div>
            <div className="footer-text-white">Kanpur</div>
            <div className="footer-text-smaller">Kanpur, Bhauti -209305</div>
            <div className="footer-text-smaller"><PhoneIcon/>1346-257400</div>
            <div className="footer-text-smaller"><LanguageIcon/>www.xyz.ac.in</div>
        </div>

        <div className="footer-center">
            <div className="important-link">Important Links</div>
            <a href="" target='_blank'>Anti-Ragging Initiative</a>
            <a href="" target='_blank'>Career-Counciling and Placements</a>
            <a href="" target='_blank'>Right To Information</a>
            <a href="" target='_blank'>Special Cell</a>
            <a href="" target='_blank'>Grievance Cell</a>
            <a href="" target='_blank'>Contact Us</a>
            <a href="" target='_blank'>College Official Website</a>
        </div>

         <div className="footer-right">
            <div className="footer-right-name"><CloudIcon/>PSIT Kanpur</div>
            <div className="today-date-footer">{todayDate.toDateString()}</div>
         </div>
    </div>
  )
}

export default Footer