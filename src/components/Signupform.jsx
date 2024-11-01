// import axios from 'axios';
// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const Signupform = (newCustomer,toggleGetdata) => {

//     const[name,setname] = useState('')
//     const[num,setnum] = useState('')
//     const[pass,setpass] = useState('')
//     const[user,setuser] = useState('')
//     const[studentcheck,setstudentcheck] = useState(false)
//     const[Transactioncheck,setTransactioncheck] = useState(false)
//     const[accountview,setaccountview] = useState(false)
//     const[reportcheck,setreportcheck] = useState(false)
//     const[accountmastercheck,setaccountmastercheck] = useState(false)

//     async function postData(event){
//       event.preventDefault();
//         // if(name.trim() !=''||user.trim()!=''||pass.trim()!=''||num.trim()!=''){
//         try{
//             await axios.post('https://schoolmanagementsystem-p1od.onrender.com/api/addUser',{
//                 'name':name,
//                 'userName' :user,
//                 'password' :pass,
//                 'phoneNumber':num,
//                 'accessTo' :{
//                     'isStudent' : studentcheck,
//                     'isTransaction':Transactioncheck,
//                     'isAccountview':accountview,
//                     'isReports':reportcheck,
//                     'isAccountMaster':accountmastercheck
//                 }
//             })
//             toast.success("Data saved successfully!"); 
//             newCustomer()  
//             // console.log(newCustomer);
//             toggleGetdata()
//         }
//         catch{
//             toast.error('Error occured while posting data')
//             newCustomer()              }
//     // }
//     // else{
//         // toast.warn('Input field Cannot be left empty')
//     // }
// }

//   return (
//     <>
//     <ToastContainer/>
//       <form className="form" onSubmit={postData}>
          
//         <p className="form-title">Sign in to your account</p>
//         <div className="input-container">
//           <input type="text" placeholder="Enter Your Name" onChange={(e)=>setname(e.target.value)} />
//           <span></span>
//         </div>
//         <div className="input-container">
//           <input type="text" placeholder="Enter Phone number" onChange={(e)=>setnum(e.target.value)}/>
//         </div>
//         <div className="input-container">
//           <input type="text" placeholder="Enter Username" onChange={(e)=>setuser(e.target.value)}/>
//         </div>
//         <div className="input-container">
//           <input type="password" placeholder="Enter password" onChange={(e)=>setpass(e.target.value)}/>
//         </div><br />
//         <div className="rowforchecks w-100 d-flex justify-center flex-column">
    
//               <div className="just"><input id="uppercase" type="checkbox" className='me-2'
//               onChange={(e)=>setstudentcheck(e.target.checked)}/>
//               <label for="uppercase">Are you Student?</label></div> <br />
            
//              <div className="just"> <input id="uppercase" type="checkbox"  className='me-2'
//                onChange={(e)=>setTransactioncheck(e.target.checked)}/>
//               <label for="uppercase">Transaction Completed</label></div><br />
            
//               <div className="just"><input id="numbers" type="checkbox"  className='me-2'
//               onChange={(e)=>setaccountview(e.target.checked)}/>
//               <label for="numbers">Account</label></div><br />
            
//               <div className="just"><input id="symbols" type="checkbox"  className='me-2'
//               onChange={(e)=>setreportcheck(e.target.checked)}/>
//               <label for="symbols">Report</label></div><br />
            
//               <div className="just"><input id="exc-duplicate" type="checkbox"  className='me-2'
//               onChange={(e)=>setaccountmastercheck(e.target.checked)}/>
//               <label for="exc-duplicate">Account Master</label></div><br />
//         </div>
//         <button type="submit" className="submit" >
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };


import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signupform = ({ newCustomer, toggleGetdata }) => {
    const [name, setname] = useState('');
    const [num, setnum] = useState('');
    const [pass, setpass] = useState('');
    const [user, setuser] = useState('');
    const [studentcheck, setstudentcheck] = useState(false);
    const [Transactioncheck, setTransactioncheck] = useState(false);
    const [accountview, setaccountview] = useState(false);
    const [reportcheck, setreportcheck] = useState(false);
    const [accountmastercheck, setaccountmastercheck] = useState(false);
  console.log('new customer',newCustomer);
  console.log('get data',toggleGetdata);
  
  
    async function postData(event) {
        event.preventDefault();
        try {
            await axios.post('https://schoolmanagementsystem-p1od.onrender.com/api/addUser', {
                name,
                userName: user,
                password: pass,
                phoneNumber: num,
                accessTo: {
                    isStudent: studentcheck,
                    isTransaction: Transactioncheck,
                    isAccountview: accountview,
                    isReports: reportcheck,
                    isAccountMaster: accountmastercheck,
                },
            });
            toast.success("Data saved successfully!");
            newCustomer();  
            toggleGetdata();
        } catch {
            toast.error('Error occurred while posting data');
            newCustomer();
        }
    }

    return (
        <>
            <ToastContainer />
            <form className="form" onSubmit={postData}>
                <p className="form-title">Sign in to your account</p>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter Phone number"
                        onChange={(e) => setnum(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        onChange={(e) => setuser(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setpass(e.target.value)}
                    />
                </div>
                <br />
                <div className="rowforchecks w-100 d-flex justify-center flex-column">
                    <div className="just">
                        <input
                            id="uppercase"
                            type="checkbox"
                            className="me-2"
                            onChange={(e) => setstudentcheck(e.target.checked)}
                        />
                        <label htmlFor="uppercase">Are you Student?</label>
                    </div>
                    <br />
                    <div className="just">
                        <input
                            id="uppercase"
                            type="checkbox"
                            className="me-2"
                            onChange={(e) => setTransactioncheck(e.target.checked)}
                        />
                        <label htmlFor="uppercase">Transaction Completed</label>
                    </div>
                    <br />
                    <div className="just">
                        <input
                            id="numbers"
                            type="checkbox"
                            className="me-2"
                            onChange={(e) => setaccountview(e.target.checked)}
                        />
                        <label htmlFor="numbers">Account</label>
                    </div>
                    <br />
                    <div className="just">
                        <input
                            id="symbols"
                            type="checkbox"
                            className="me-2"
                            onChange={(e) => setreportcheck(e.target.checked)}
                        />
                        <label htmlFor="symbols">Report</label>
                    </div>
                    <br />
                    <div className="just">
                        <input
                            id="exc-duplicate"
                            type="checkbox"
                            className="me-2"
                            onChange={(e) => setaccountmastercheck(e.target.checked)}
                        />
                        <label htmlFor="exc-duplicate">Account Master</label>
                    </div>
                    <br />
                </div>
                <button type="submit" className="submit">
                    Submit
                </button>
            </form>
        </>
    );
};
