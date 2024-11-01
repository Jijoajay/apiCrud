import React, { useState,useEffect,useParams } from 'react'
import axios from 'axios';
import { Editdata } from './Editdata';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Databox = ({userData,id,getData}) => {
    const navigation = useNavigate()
    const[editOpen,seteditOpen] = useState(false)
    const {
        accessTo: {
          isStudent,
          isTransaction,
          isReports,
          isAccountMaster,
          isAccountView,
        },
        name,
        phoneNumber,
        userName,
        password
      } = userData;
      console.log('isaccount',isAccountMaster);
      console.log('user data from databox',userData);
      
    function openEditform(){
        seteditOpen(!editOpen)
    }
    const deleteData = async() => {
        try{
            await axios.delete(`https://schoolmanagementsystem-p1od.onrender.com/api/deleteUser/${id}`)
            navigation('/')
            toast.success('Data deleted Successfully',{autoClose:1000})
        }
        catch{
            toast.error('Error Occured while deleting')
        }
    }

  return (
    <>
    <div className="box">
        <div className="boxheader ps-4 pe-4 pt-2">
            <p style={{color:'#3474eb',fontWeight:"600",fontSize:'20px'}}>User</p>
            <div className="delete" style={{display:'flex',justifyContent:'space-between',width:'200px'}}>
                <button className='btn btn-warning w-25' onClick={openEditform}>Edit</button>
                <button className='btn btn-danger' onClick={deleteData} >Delete</button>
            </div>
        </div>
        {editOpen && <div className="roww d-flex justify-content-center">
            <Editdata value = {userData} id ={id} closeEditform = {openEditform} fetchData={getData}/></div>}
        <br />
        <div className="boxbody d-flex">
            <div className="keysection w-25 d-flex justify-content-center flex-column">
                <div className="key w-100 ps-4 "><p style={{fontWeight:"500",fontSize:'20px'}}>Name :</p></div>
                <div className="key w-100 ps-4 "><p style={{fontWeight:"500",fontSize:'20px'}}>Phone Number :</p></div>
                <div className="key w-100 ps-4 "><p style={{fontWeight:"500",fontSize:'20px'}}>Username :</p></div>
                <div className="key w-100 ps-4 "><p style={{fontWeight:"500",fontSize:'20px'}}>Password :</p></div>
            </div>
            <div className="valuesection w-75">
                <div className="key w-100 ps-4 "><p>{name}</p></div>
                <div className="key w-100 ps-4 pt-2"><p>{phoneNumber}</p></div>
                <div className="key w-100 ps-4 pt-2"><p>{userName}</p></div>
                <div className="key w-100 ps-4 pt-2"><p>{password}</p></div>
            </div>
        </div>
        <div className="boxfooter d-flex justify-content-around pb-2 mt-3">
            <div className="input">
            <b>Student :</b><input type="checkbox" checked={isStudent} className='check ms-3'/>
            </div>
            <div className="input">
            <b>Paid ?</b> :<input type='checkbox'checked={isTransaction} className='check ms-3'/>
            </div>
            <div className="input">
            <b>Account :</b><input type='checkbox'checked={isAccountView} className='check ms-3'/>
            </div>
            <div className="input">
            <b>Report:</b><input type='checkbox' checked={isReports} className='check ms-3'/>
            </div>
            <div className="input">
            <b>Accountmaster:</b><input type='checkbox' checked={isAccountMaster} className='check ms-3'/>
            </div>
        </div>
        <div className="boxfooter"></div>
    </div>
    </>
  )
}
