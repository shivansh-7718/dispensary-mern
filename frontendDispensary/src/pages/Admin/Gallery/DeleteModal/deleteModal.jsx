import React from 'react'
import './deleteModal.css'
import axios from 'axios'

const DeleteModal = (props) => {


  const handleDelete=async()=>{
    if(props.clickedItem){
      await axios.delete(`http://localhost:4000/api/gallary/delete/${props.clickedItem._id}`,{withCredentials:true}).then((resp)=>{
        window.location.reload();
      }).catch(err=>{
        alert("Something Went Wrong")
        console.log(err)
      })
    }
  }



  return (
    <div className="addModal">
        <div className="addModal-card">
            <div>Delete Images</div>
            <div className="modal-add-btns">
                <div className="cancel-modal-btn" onClick={()=>{props.onClose()}}>Cancel</div>
                <div className="cancel-modal-btn" onClick={handleDelete} >Delete</div>
            </div>

        </div>
    </div>
  )
}

export default DeleteModal