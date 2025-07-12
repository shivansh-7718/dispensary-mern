import React, { useEffect, useState } from "react";
import "./nearByHospital.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modals/modal";
import NearByModal from "./NearByModal/nearByModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const NearByHospital = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const[clickedItem,setClickedItem]=useState(null);

  const onOfModal = () => {
    if(modal){
        setClickedItem(null);
    }
    setModal((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/hospital/get")
      .then((resp) => {
        setData(resp.data.hospitals);
      })
      .catch((err) => {
        toast.error(err?.resp?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit=(item)=>{
    setClickedItem(item);
    setModal(true);
  }

  const filterOutData=(id)=>{
    let newArr=data.filter((item)=>item._id!==id);
    setData(newArr);
}
const handleDelete=async(id)=>{
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/hospital/delete/${id}`,{withCredentials:true}).then((resp)=>{
        filterOutData(id)
    }).catch(err=>{
        toast.error(err?.resp?.data?.error)
      }).finally(()=>{
        props.hideLoader();
      })
}

  return (
    <div className="admin-facility">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back to Dashboard
        </Link>
      </div>

      <div className="admin-facility-header">
        <div>Near By Hospitals</div>
        <div className="add-facility-btn" onClick={onOfModal}>
          Add
        </div>
      </div>

      <div className="admin-facility-rows">
        {
        data.map((item, index) => {
          return (
            <div className="admin-facility-row" key={item._id}>
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.name}</div>
                <div>Address:{item.address}</div>
                <div>{item.contact}</div>
                <div style={{ marginTop: "10px" }}>Added By : {item?.addedBy?.name}</div>
              </div>

              <div className="admin-facility-btn">
                <div onClick={()=>{handleEdit(item)}}>
                  <EditIcon sx={{ cursor: "pointer" }} />
                </div>
                <div onClick={()=>{handleDelete(item._id)}}>
                  <DeleteIcon sx={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
      {modal && (
        <Modal
          header={clickedItem?"Update Hospitals":"Add Hospitals"}
          handleClose={onOfModal}
          children={<NearByModal clickedItem={clickedItem} />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default NearByHospital;
