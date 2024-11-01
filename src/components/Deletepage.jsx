import React, { useEffect, useState } from 'react';
import { Filterheader } from './Filterheader';
import { Databox } from './Databox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Deletepage = () => {
    const { id } = useParams();
    const [userdata, setuserdata] = useState({});
    
    const getSelecteduserdata = async () => {
        try { 
          const response = await axios.get(`https://schoolmanagementsystem-p1od.onrender.com/api/getUserById/${id}/`);
          console.log("Response data:", response.data.data);
          setuserdata(response.data.data);
          toast.success('Data fetched successfully');
        } catch (err) {
          console.error("Error fetching user data:", err);
          toast.error('Error occurred while fetching user data');
        } 
      };
      
        useEffect(() => {
            
            getSelecteduserdata();
        }, [id]); 

    console.log('Passed Id:', id);

    return (
        <div className="container">
            <div className="header">
                <Filterheader />
            </div>
            <br />
            <div className="body">  
                {userdata && Object.entries(userdata).length > 0 && 
                <Databox userData={userdata} id = {id} getData={getSelecteduserdata}/>}  
            </div>
        </div>
    );
};
