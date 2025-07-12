import React from 'react'
import './searchbox.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbox = (props) => {
    const placeholder = props.placeholder ? props.placeholder: "";
    const value=props.value?props.value:"";

    const handleOnChange = (event)=>{
        if(props.onChange){
            props.onChange(event.target.value)
        }
    }

    const handleClick=()=>{
      if(props.handleClick){
        props.handleClick();
      }
    }
  return (
   
    <div className="page-searchBox">
        <input className='input-box'  value={value} onChange={(event)=>handleOnChange(event)} placeholder={placeholder} />
        <div className="search-btn" onClick={handleClick}><SearchIcon/></div>
    </div>
  )
}

export default Searchbox