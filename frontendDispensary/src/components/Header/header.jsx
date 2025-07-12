import React,{useState,useEffect} from 'react'
import './header.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios';


const Header = (props) => {
    const location=useLocation();
    const[eventpopup,setEventpopup]=useState(false);
    const[helpline,setHelpline]=useState(false);
    const[events,setEvents]=useState([]);


    const navigate=useNavigate();
    const handleOpenPopup=(popup)=>{
        if(popup==="event"){
            setEventpopup(true);
        }else{
            setHelpline(true);
        }
    }

    const fetchEvents=async()=>{
        await axios.get('http://localhost:4000/api/notification/get').then(response=>{
            setEvents(response.data.notifications);

        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if(eventpopup){
            fetchEvents();
        }
    },[eventpopup])

    const handleClosePopup=(popup)=>{
        if(popup==="event"){
            setEventpopup(false);
        }else{
            setHelpline(false);
        }
    }

    const handleLogin=()=>{
        navigate('/login')
    }

    const handleLogout=async()=>{
        props.showLoader();
        await axios.post('http://localhost:4000/api/auth/logout',{},{withCredentials:true}).then(response=>{
            console.log(response)
            props.handleLogin(false);
            localStorage.clear();
            navigate('/');
        }).catch(err=>{
            console.log(err)
            toast.error(err?.response?.data?.error)
        }).finally(()=>{
            props.hideLoader();
        })
    }
  return (
    <div className='header'>
        <div className="header-college-details">
            <div className="header-college-details-left">
                <img className='header-college-details-left-logo' src="https://erp.psit.ac.in/assets/img/psit.png" alt='collegeLogo'/>
                <div>
                    <div className="header-college-details-name">प्रणवीर सिंह इंस्टीट्यूट ऑफ टेक्नोलॉजी </div>
                    <div className="header-college-details-name">कानपुर</div>
                    <div className="header-college-details-name">Pranveer Singh Institute Of Technology</div>
                    <div className="header-college-details-name">Kanpur</div>
                </div>
            </div>

            <div className="header-college-details-right">
                <div className="header-college-social-media">
                    <a target='_blank' href="https://www.youtube.com/@psitkanpur"><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJklEQVR4Ae2WpVaFQRSFcaeS4QVwIjTiLbgk7D1w9xeg4FQcOu6acHeXtNnDmsFd7in/WetLI+f7dbYDAFEsAUvgoeAQ5k5iSQFpIH1kkMyQFXJMTsgpwTuc6jlHes2M3qNP71mge7g76DLNg8gygZ1QckGmuSdZJ7Azq8RDCSQTCJGgBCoFBWqVQLegQJcSmPnWIr9oICMXcIr4C4FJJbD9rUX+NtzX+CIQlfVbgS0lcP4jAVNt/UCA7acCZ0oAPxfQdXMLFNUBvpHflvgbAVM7h0B6zrfeD3kB+Ucg/xLKf4biPyLJX3GH9GFUogRSBQUSTSBZEwskQpFs1USyl6E0gRSRJtJPhsnci1B69oVQeqzXzOo9+kmj3juBeDw2BkSxBCyBO+9s03HRLVCoAAAAAElFTkSuQmCC' className='header-social-media-image'/></a>
                    <a target='_blank' href="https://www.instagram.com/psitkanpur/?hl=en"><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABWVBMVEVyHVFHcEx0Fvp8Fv1yFP1/FfyLCOyfBOmtAeS7AuDHAd3UANjZAs7rD6xyFvzjANTqAMHoA7l2F/yPFfx8GPmfD/zFF/XVWujoZuLyZt3pRt/yGdHyA8j1AKTViPj/9Pr////8g9f9A7r3DZz5vO794Pf+ruj9B6uzFPv7JLv+AJr+BI/+YMP/1vD+AIThG+n9GZn/vd3/YZz+AXP+GoT/r8r+AmT/b5z+HHH+I3f+G2P/ur7+FFD+Klb+fYv/wcr+LUf+LWX+AFn+Nzr+Ohz+RT7+inP+Si7/ztD+TxL/zbv+Wy//9fH+WgL+c1X+ZyX+PUv+Bzv+VXD+cxr/6eL+aQT+eAX+nDj+gwD+gxH+fSL+rYn+jwD+iwL+XhX/3rn/1bH9ZR/+lwP+nwH+xHH8ZC3+qAH+sAD+wAP+x1P+zGb+pl79mQn+uAD9J3T+ygD9O1n8pRL9twuaEkMNAAAAc3RSTlMBAF3G///////////GW9j//9nY/1r///////////7//////8b/////////////////////////////////////////////////////////////////////////////////xf///1v////////Y/9j/2VzGSus+GgAAAeNJREFUeAFFjEWiU0EQRc/tqu74V9wZ4TBiB6wG3wpzVoQ7zHCXeELypHH+KVchJAESaEs0IUv0Zv+7fwLgSAOk9ZFghcnfDw4AAg18cyhWCKNVob9NCZjQLWVrEGhJbJGDoCBpMwCrJTETAKBWgdeRGb4dmJW56PdI/KU1K4X15N+AFsW0+3/WVm7Pa0Pmu4Fh7HcbRIjMIhr3FItUGAH4SNZKjK32YjKpK3Iv0yUY0b8g0Vs0oK+8wbeyMBAQwVeo44R1z7XWq6rqpn5jiTmAeQO3iceg9zkYzKvc71iEmMFbqCJJ4tDcKFrLjX5D/MEdq8GpIUUgd/tgGboTgiUDPDZ44SXNpr0gWRcAgqEmEPJRNVPOxYaOth0oAHdCxWoOzslH+RCvlafYMgFUHvAIHoCjz16io80BrH/j0AAcJ9KWKkhn5sRyGjsDtr/sqyrsWNO1cW9/cDNLZgHLSzVvn+wMq9qbKKwy7TiIaKTW56pzW6Oa+N1OKEQdvvl2RyOE4DEOZurd1cHNeab27tyjOPfhFlucXP04ovF97B6jTOzdJwFLaNAff7N6c8incH1VpiSR67q2VgjzUU7JgbMTiQtFKmgAsCAuczlflmVZn7iGBFc1awB/p4tqUS3LDb8OPwBrSrZIO/KHZwAAAABJRU5ErkJggg==' className='header-social-media-image'/></a>
                    <a target='_blank' href="https://x.com/psitkanpur"><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC' className='header-social-media-image'/></a>
                </div>
                <input type='text' className='header-input-tags'/>
            </div>
        </div>

        <div className="navbar">
            <Link to={'/'} className={`navbar-links ${location.pathname==="/"?'active-link':null}`}>
                Home
            </Link>
            <div onClick={props.isLogin?handleLogout:handleLogin} className={`navbar-links ${location.pathname==="/login"?'active-link':null}`}>
                {props.isLogin?"Logout":"Login"}
            </div>
            <Link to={'/stock'} className={`navbar-links ${location.pathname==="/stock"?'active-link':null}`}>
                Stock View
            </Link>
            <div className="navbar-links event-link" onMouseEnter={()=>{handleOpenPopup("event")}} onMouseLeave={()=>{handleClosePopup("event")}}>
                <div className="navbar-link-opt">New Events <ArrowDropDownIcon/></div>
                {
                    eventpopup && <div className="navbar-dropdown-popup event-pop">
                    {
                        events.map((item,index)=>{
                            return(
                                <div className='popup-notification'>{item.title} </div>
                            )
                        })
                    }
                    
                </div>
                }
            </div>
            <div className="navbar-links event-link" onMouseEnter={()=>{handleOpenPopup("helpline")}} onMouseLeave={()=>{handleClosePopup("helpline")}}>
                <div className="navbar-link-opt">Helpline <ArrowDropDownIcon/></div>
                {
                    helpline && <div className="navbar-dropdown-popup helpline-pop">
                    <div className='popup-notification'>Disaster management: 1007</div>
                </div>
                }
            </div>
        </div>

        {
            location.pathname==="/" && <div className="header-banner">
            <img src={"https://erp.psit.ac.in/assets/img/bg-14.jpg"} className='header-banner-image'/>
           </div>
        }

        <ToastContainer/>
    </div>
  )
}

export default Header