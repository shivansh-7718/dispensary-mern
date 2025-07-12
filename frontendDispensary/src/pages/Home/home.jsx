import React, { useState } from 'react'
import './home.css'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CollectionsIcon from '@mui/icons-material/Collections';
import Aboutus from '../../components/Aboutus/aboutus';
import Staff from '../../components/Staffs/staff';
import Facility from '../../components/Facilities/facility';
import NearByHospitals from '../../components/Nearbyhospitals/nearByHospitals';
import Gallery from '../../components/Gallery/gallery';
import { Link } from 'react-router-dom';

const Home = (props) => {

    const[page,setPage]=useState("About")
    let [rightSideHeader,setRightSideHeader]=useState("About Us");

    let userInfo=localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null;

    const handleChangeTab=(pagename)=>{
        setPage(pagename);
        switch(pagename){
            case "About":
                setRightSideHeader("About us");
                break;
            case "Staff":
                setRightSideHeader("Our Staffs");
                break;
            case "Facilities":
                setRightSideHeader("Facilities");
                break;
            case "NearByHospitals":
                setRightSideHeader("Near By Hospitals");
                break;
            case "Gallery":
                setRightSideHeader("Gallery");
                break;
        }
    }

    const getComponent =()=>{
        switch(page){
            case "About":
                return <Aboutus/>
            case "Staff":
                return <Staff showLoader={props.showLoader} hideLoader={props.hideLoader}/>;
            case "Facilities":
                return <Facility showLoader={props.showLoader} hideLoader={props.hideLoader}/>    
            case "NearByHospitals":
                return <NearByHospitals showLoader={props.showLoader} hideLoader={props.hideLoader}/>
            case "Gallery":
                return <Gallery showLoader={props.showLoader} hideLoader={props.hideLoader}/>

                default:
                    return null;
        }
    }





  return (
    <div className="home">
        <div className="home-block">
            <div className="home-left-page">
                {
                    userInfo?.role==='admin' || userInfo?.role==='staff'  && <Link to={'/admin/dashboard'} className={`home-left-option`}>
                    <HomeIcon/>Dashboard
                </Link>
                }
                
                {
                    userInfo?.role==='student'  && <Link to={`/student/${userInfo?._id}`} className={`home-left-option`}>
                    <HomeIcon/>Profile
                </Link>
                }
                
                <div className={`home-left-option ${page==="About"?"active-opt":null}`} onClick={()=>{handleChangeTab("About")}}>
                    <HomeIcon/>About Us
                </div>
                <div className={`home-left-option ${page==="Staff"?"active-opt":null}`}onClick={()=>{handleChangeTab("Staff")}}>
                    <PeopleAltIcon/>Staffs
                </div>
                <div className={`home-left-option ${page==="Facilities"?"active-opt":null}`}onClick={()=>{handleChangeTab("Facilities")}}>
                    <GroupsIcon/>Facilities
                </div>
                <div className={`home-left-option ${page==="NearByHospitals"?"active-opt":null}`}onClick={()=>{handleChangeTab("NearByHospitals")}}>
                    <LocalHospitalIcon/>Near By Hospitals
                </div>
                <div className={`home-left-option ${page==="Gallery"?"active-opt":null}`}onClick={()=>{handleChangeTab("Gallery")}}>
                    <CollectionsIcon/>Gallery
                </div>
            </div>
            <div className="home-right-page">
                <div className="home-right-header">
                    {rightSideHeader}
                </div>
                <div className='home-right-section' >
                    {getComponent()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home