import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Filterheader } from './Filterheader';
import { toast, ToastContainer } from 'react-toastify';

export const sharecontext = createContext();

export const Main = () => {
  const navigate = useNavigate();
  const[searchvalue,setsearchvalue] = useState('')
  const [Data, setData] = useState([]);
  
  async function Getdata() {
    try {
      const response = await axios.get(`https://schoolmanagementsystem-p1od.onrender.com/api/getAllUser?search=${searchvalue}`);
      setData(response.data.data);
    } 
    catch {
      toast.error('Error occurs while fetching data');
    }
  }

  useEffect(() => {
    Getdata();
  }, [searchvalue]);

  function passIDtourl(id) {
    navigate(`/Deletepage/${id}`);
    // console.log('id',id);
  }

  return (

      <div className="parent">
        <div className="header ps-2 pe-2 ">
          <ToastContainer/>
          <Filterheader searchvalue = {setsearchvalue} toggleGetdata = {Getdata} />
        </div>
        <br />
        <div className="body container">
          <Table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Username</th>
                <th style={{ display: 'flex', justifyContent: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>

            {Data.map((item,index)=>
            <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.userName}</td>
              <td>
                  <div className="btnbody">
                    <button className="btn btn-warning" onClick={() => passIDtourl(item._id)}>Action</button>
                  </div>
                </td>
            </tr>)}          
            </tbody>
          </Table>
        </div>
      </div>
  );
};
