import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Signupform } from './Signupform';
import 'aos/dist/aos.css';

export const Filterheader = ({ searchvalue, toggleGetdata }) => {


    const [activeBorder, setActiveBorder] = useState('wholesale'); 
    const [data,setData] = useState([])
    const[fromdate,setfromdate] = useState('')
    const[todate,settodate] = useState('')
    function handleBorderChange(type) {
        setActiveBorder(type); 
    }

    const [Opensignup,setOpensignup] = useState(false)

    function newCustomer(){
        setOpensignup(!Opensignup)
    }

    return (
        <>
            <div className="filterparent ps-3 pe-3 mt-5">
                <div 
                    className="_child_ w-auto h-100 d-flex align-items-center"
                    // style={{ borderBottom: activeBorder === 'wholesale' ? '2px solid #3474EB' : '2px solid transparent' }}  
                    onClick={() => handleBorderChange('wholesale')} // Update the active state
                >
                    Wholesale Customer
                </div>
                <div 
                    className="_child_ w-auto h-100 d-flex align-items-center"
                    // style={{ borderBottom: activeBorder === 'retail' ? '2px solid #3474EB' : '2px solid transparent' }}  
                    onClick={() => handleBorderChange('retail')} // Update the active state
                >
                    Retail Customer
                </div>
                {/* <div className="_child_ w-auto ps-2" style={{ border: 'solid #cecece 1px', borderRadius: '6px' }}>
                    From:
                    <input 
                        type="date" 
                        style={{ color: '#505050' }} 
                        className='ps-2 border-0' 
                        onChange={(e)=>setfromdate(e.target.value)}
                    />
                </div>
                <div className="_child_ w-auto ps-2" style={{ border: 'solid #cecece 1px', borderRadius: '6px' }}>
                    To: 
                    <input 
                        type="date" 
                        style={{ color: '#505050', border: 'none' }} 
                        className='ps-2 border-0' 
                        onChange={(e)=>settodate(e.target.value)}
                    />
                </div> */}
                <div className="input-container ps-2 " 
                style={{ border: 'solid #cecece 1px', borderRadius: '6px' ,width:'200px'}}>
                <i className="bi bi-search m-0 p-0 "></i> {/* FontAwesome icon */}
            <input 
                type="text" 
                className='_filterinput_ ps-2 border-0 m-0 p-0' 
                placeholder="Search..."
                style={{outline:'none',width:"80%"}}
                onChange={(e)=>searchvalue(e.target.value)}
            />
        </div>
                <button
                    className="_child_ w-auto p-2 " 
                    onClick={newCustomer}
                    style={{
                        backgroundColor: '#3474EB',
                        color: "white",
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        border:'0'
                        
                    }}
                >
                    New Customer
                </button>
            </div>
            {Opensignup &&  <div className="rw d-flex " style={{marginLeft:'35%',marginTop:'20px'}}>
                <Signupform newCustomer={newCustomer} toggleGetdata={toggleGetdata} />

                            </div>}
        </>
    );
}
