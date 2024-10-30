import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const Editdata = ({ value, id ,onSubmitclick }) => {
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
    password,
  } = value;

  const [updatedname, setupdatedname] = useState(name || '');
  const [updatednum, setupdatednum] = useState(phoneNumber || '');
  const [updatedpass, setupdatedpass] = useState(password || '');
  const [updateduser, setupdateduser] = useState(userName || '');
  const [updatedstudentcheck, setstudentcheck] = useState(isStudent || false);
  const [updatedTransactioncheck, setTransactioncheck] = useState(isTransaction || false);
  const [updatedaccountview, setaccountview] = useState(isAccountView || false);
  const [updatedreportcheck, setreportcheck] = useState(isReports || false);
  const [updatedaccountmastercheck, setaccountmastercheck] = useState(isAccountMaster || false);

  console.log('This is id from editdataform', id);

  async function editData(e) {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if (
      updatedname.trim() !== '' &&
      updateduser.trim() !== '' &&
      updatedpass.trim() !== '' &&
      updatednum.trim() !== ''
    ) {
      try {
        await axios.put(`https://schoolmanagementsystem-p1od.onrender.com/api/updateUser/${id}`, {
          name: updatedname,
          userName: updateduser,
          password: updatedpass,
          phoneNumber: updatednum,
          accessTo: {
            isStudent: updatedstudentcheck,
            isTransaction: updatedTransactioncheck,
            isReports: updatedreportcheck,
            isAccountMaster: updatedaccountmastercheck,
            isAccountView: updatedaccountview,
          },
        });
        toast.success('Data successfully Updated',{autoClose:2000});
        console.log('Editdata function executed');
        onSubmitclick()
      } catch (error) {
        toast.error('Error occurred while Updating data:',{autoClose:2000});
      }
    } else {
      toast.error('Input field Cannot be left empty',{autoClose:2000});
    }
  }

  return (
    <>
    <ToastContainer/>
      <form className="form" onSubmit={editData}>
        <p className="form-title">Edit Your Details</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={updatedname}
            onChange={(e) => setupdatedname(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Phone number"
            value={updatednum}
            onChange={(e) => setupdatednum(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Username"
            value={updateduser}
            onChange={(e) => setupdateduser(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            value={updatedpass}
            onChange={(e) => setupdatedpass(e.target.value)}
          />
        </div>
        <div className="rowforchecks">
          <ul className="options">
            <li className="option">
              <input id="isStudent" type="checkbox" checked={updatedstudentcheck}
                onChange={(e) => setstudentcheck(e.target.checked)} />
              <label htmlFor="isStudent">Are you Student?</label>
            </li>
            <li className="option">
              <input id="isTransaction" type="checkbox" checked={updatedTransactioncheck}
                onChange={(e) => setTransactioncheck(e.target.checked)} />
              <label htmlFor="isTransaction">Transaction Completed</label>
            </li>
            <li className="option">
              <input id="isAccountView" type="checkbox" checked={updatedaccountview}
                onChange={(e) => setaccountview(e.target.checked)} />
              <label htmlFor="isAccountView">Account</label>
            </li>
            <li className="option">
              <input id="isReports" type="checkbox" checked={updatedreportcheck}
                onChange={(e) => setreportcheck(e.target.checked)} />
              <label htmlFor="isReports">Report</label>
            </li>
            <li className="option">
              <input id="isAccountMaster" type="checkbox" checked={updatedaccountmastercheck}
                onChange={(e) => setaccountmastercheck(e.target.checked)} />
              <label htmlFor="isAccountMaster">Account Master</label>
            </li>
          </ul>
        </div>
        <br />
        <button type="submit" className="submit">
          Update
        </button>
      </form>
    </>
  );
};
