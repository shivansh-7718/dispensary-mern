import React, { useEffect, useState } from 'react'
import './manageMedicine.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'
import Searchbox from '../../../components/Searchbox/searchbox';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../../../components/Modals/modal'
import MedicineModal from './MedicineModal/medicineModal';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';

const ManageMedicine = (props) => {

    const[medicineSearch,setMedicineSearch]=useState("")
    const[addModal,setAddModal]=useState(false)
    const[data,setData]=useState([])
    const[clickedMedicine,setClickedMedicine]=useState(null)

    const onOffmodal =()=>{
      if(addModal){
        setClickedMedicine(null)
      }
      setAddModal(prev=>!prev)
    }

    const onChangeValue=(value)=>{
        setMedicineSearch(value)
    }

    const fetchData=async()=>{
      props.showLoader();
      await axios.get(`http://localhost:4000/api/medicine/search-by-name?name=${medicineSearch}`).then((resp)=>{
        setData(resp.data.medicines)
      }).catch(err=>{
        toast.error(err?.resp?.data?.error)
      }).finally(()=>{
        props.hideLoader();
      })
    }

    useEffect(()=>{
      fetchData();
    },[medicineSearch]);

    const handleEdit=(item)=>{
      setClickedMedicine(item)
      setAddModal(true)
    }

    const filterOutMedicine=(id)=>{
      let newArr=data.filter((item)=>item._id!==id);
      setData(newArr)
    }

    const handleDelete=async(id)=>{
      props.showLoader();
      await axios.delete(`http://localhost:4000/api/medicine/delete/${id}`,{withCredentials:true}).then((resp)=>{
        filterOutMedicine(id)
      }).catch(err=>{
        toast.error(err?.resp?.data?.error)
      }).finally(()=>{
        props.hideLoader();
      })
    }


  return (
    <div className="manageMedicine">
         <div className="go-back"><Link to={'/admin/dashboard'}><ArrowBackIcon/>Back to Dashboard</Link></div>

         <div className="top-manage-medicine">
            <Searchbox placeholder="Search Medicine" value={medicineSearch} onChange={onChangeValue}/>
            <div className="add-manage-medicine" onClick={onOffmodal}>Add</div>
         </div>

         <div className="manageMedicine-card">
         <div className="report-form-rows">
        <div className="report-form-header">
          <div className="">Sr.no</div>
          <div className="">Medicine Name</div>
          <div className="">Added By</div>
          <div className="">Quantity</div>
          <div className="">Edit</div>
          <div className="">Delete</div>
        </div>

        <div className="report-form-row-block">
          {
            data.map((item,index)=>{
              return(
                <div className="report-form-row">
            <div className="xx">{index+1}</div>
            <div className="col-2-mng">{item.name}</div>
            <div className="col-2-mng">{item?.addedBy?.name}</div>
            <div className="col-3-mng">{item.quantity}</div>
            <div onClick={()=>handleEdit(item)} className="edit-icon"><EditIcon/></div>
            <div onClick={()=>handleDelete(item._id)} className="delete-icon"><DeleteIcon/></div>
          </div>

              );
            })
          }
          {
            data.length===0 && <div className="report-form-row">
            <div className="xx">No any Medicine yet</div>
          </div>
          }

          
        </div>
      </div>
         </div>  
        {
          addModal &&  <Modal header="Add Medicine"  handleClose={onOffmodal} children={<MedicineModal clickedMedicine={clickedMedicine} showLoader={props.showLoader} hideLoader={props.hideLoader}/>}/>
        }
        <ToastContainer/>
    </div>
  )
}

export default ManageMedicine