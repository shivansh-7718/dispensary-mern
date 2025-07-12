import React, { useState } from 'react'
import './resgisterStudent.css'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Searchbox from '../../../components/Searchbox/searchbox';
import Modal from '../../../components/Modals/modal';
import Reports from './Report/reports';
import {toast,ToastContainer} from 'react-toastify';
import axios from 'axios';

const RegisterStudent = (props) => {

    const[studentDetail,setStudentDetail]=useState({_id:"",email:"",name:"",roll:"",mobileNo:"", fatherName:"",fatherMobile:"",address:"",previous_health:"",bloodGroup:""});
    

    const handleOnChangeInputField=(event,key)=>{
        setStudentDetail({...studentDetail,[key]: event.target.value})
    }


    const [searchStudent, setSearchStudent]=useState("");
    const [reportModal,setReportModal]=useState(false);

    const openCloseModal =()=>{
        setReportModal(prev=>!prev)
    }

    const handleOnChange=(value)=>{
        setSearchStudent(value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const handleSearch=async()=>{
        if (searchStudent.trim().length === 0) return toast.error("Please enter correct roll number.");
        props.showLoader();
        await axios.get(`http://localhost:4000/api/auth/get-student-by-roll/${searchStudent}`,{withCredentials:true}).then((resp)=>{
            console.log(resp)
            // toast.success(resp.data.message);
            setStudentDetail({...studentDetail,...resp.data.student})
        }).catch(err=>{
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"", fatherName:"",fatherMobile:"",address:"",previous_health:"",bloodGroup:""});
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader()
        })
    }

    const handleUpdateFunc = async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name, Mobile No and Roll cant be empty");
        props.showLoader();
        const {_id,updatedAt,...student} = {...studentDetail};
        await axios.put(`http://localhost:4000/api/auth/update-student/${_id}`,student,{withCredentials:true}).then((resp)=>{
          toast.success(resp.data.message);  
}).catch(err=>{
    toast.error(err?.response?.data?.error);
    console.log(err)
}).finally(()=>{
    props.hideLoader()
})
    }


    const registerStudent=async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || studentDetail.roll.trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name, Mobile No, Email and Roll cant be empty");
        props.showLoader();
        await axios.post('http://localhost:4000/api/auth/registerStudentByStaff',studentDetail,{withCredentials:true}).then((resp)=>{
            toast.success(resp.data.message);
        }).catch(err=>{
            console.log(err);
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"", fatherName:"",fatherMobile:"",address:"",previous_health:"",bloodGroup:""});
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })
    }

  return (
    <div className="register-student">
        <div className="go-back"><Link to={'/admin/dashboard'}><ArrowBackIcon/>Back to Dashboard</Link></div>

        <Searchbox handleClick={handleSearch} placeholder={"Search by Roll No."} value={searchStudent} onChange={handleOnChange}/>

        <div className="register-form-block">
            <div className="register-form-header">Register Student</div>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className="register-form-div">
                    <div className="register-input-box">
                        <input value={studentDetail.name} onChange={(event)=>handleOnChangeInputField(event,"name")} className='input-box-register' placeholder='Student Name' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.roll} onChange={(event)=>handleOnChangeInputField(event,"roll")} className='input-box-register' placeholder='Roll No.' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.fatherName} onChange={(event)=>handleOnChangeInputField(event,"fatherName")} className='input-box-register' placeholder='Fathers Name' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.address} onChange={(event)=>handleOnChangeInputField(event,"address")} className='input-box-register' placeholder='Address' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.age} onChange={(event)=>handleOnChangeInputField(event,"age")} className='input-box-register' placeholder='Age' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input disabled={studentDetail?._id} value={studentDetail.email} onChange={(event)=>handleOnChangeInputField(event,"email")} className='input-box-register' placeholder='Email' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.mobileNo} onChange={(event)=>handleOnChangeInputField(event,"mobileNo")} className='input-box-register' placeholder='MobileNo' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.fatherMobile} onChange={(event)=>handleOnChangeInputField(event,"fatherMobile")} className='input-box-register' placeholder='Fathers MobileNo' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.previous_health} onChange={(event)=>handleOnChangeInputField(event,"previous_health")} className='input-box-register' placeholder='Previous Health Issues' type='text'/>
                    </div>
                    <div className="register-input-box">
                        <input value={studentDetail.bloodGroup} onChange={(event)=>handleOnChangeInputField(event,"bloodGroup")} className='input-box-register' placeholder='Blood Group' type='text'/>
                    </div>
                </div>
                {

                    studentDetail?._id? <div className="block-divs">
                    <button type='submit' className='form-btn reg-btn' onClick={handleUpdateFunc}>Update</button>
                    <button type='submit' className='form-btn reg-btn' onClick={openCloseModal}>Report</button>
                    </div>
                    : <button type='submit' className='form-btn reg-btn'onClick={registerStudent}>Register</button>
                }
            </form>
        </div>
        {reportModal && <Modal header="Report" handleClose={openCloseModal} children={<Reports studentDetail={studentDetail}/>}/>}
        <ToastContainer/>
    </div>
  )
}

export default RegisterStudent