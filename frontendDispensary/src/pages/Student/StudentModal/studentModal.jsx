import React from 'react'

const StudentModal = (props) => {
  return (
    <div className="record-modal">

   

    <div className="student-details-scroll">
      <div className="student-modal-detail">
        <div className="student-modal-header">
        {props.selectedHistory.createdAt.slice(0, 10).split("-").reverse().join("-")}
        </div>

        <div className="student-modal-body-student">
          <div className="student-modal-body-header">
            <div>Medicine Name</div>
            <div>Quantity</div>
          </div>

          <div className="student-modal-body-item">
            {
              props.selectedHistory.medicine.map((item,index)=>{
                return(
                  <div className="student-item-modal">
              <div>{item.name}</div>
              <div>{item.requiredQuantity}</div>
            </div>
                )
              })
            }
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default StudentModal