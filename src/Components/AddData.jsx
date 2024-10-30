import React, { useState } from 'react';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader, FormGroup, Label, Input, Badge } from 'reactstrap';
import "../Styles/AccountMasters.css";
import axios from 'axios';
import "../Styles/AddData.css";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddData = ({ toggleOffCanvas,
    offCanvasIsOpen,
    newAccountHead,
    setNewAccountHead,
    newSubAccountHead,
    setNewSubAccountHead,
    addedDetails,
    setAddedDetails
}) => {


    async function newUserData() {
        try {
            const newUsers = await axios.post(`https://schoolmanagementsystem-p1od.onrender.com/api/addAccountMaster`, {
                accountHead: newAccountHead,
                subAccountHead: newSubAccountHead
            });

            toast.success('Data added successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setNewAccountHead("");
            setNewSubAccountHead("");
            // toggleOffCanvas();
            // fetchUsers();

        } catch (error) {
            toast.warning('Data added successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log("Error from adding data", error)
        }
    }

    const handleDiscard = () => {
        setNewAccountHead("");
        setNewSubAccountHead("");
        toggleOffCanvas();
        setAddedDetails([]);
    };

    function closeBadge(index) {
        setAddedDetails((prev) => prev.filter((_, i) => i !== index));
    }

    const newlyAddedDetails = function () {
        setAddedDetails((prev) => [
            ...prev,
            newSubAccountHead
        ]);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            newlyAddedDetails();
        }
    };

    return (
        < div >
            <Offcanvas isOpen={offCanvasIsOpen} toggle={toggleOffCanvas} className="centeredOffcanvas">
                <OffcanvasHeader toggle={toggleOffCanvas} style={{ width: "100%" }} className="titles">
                    <strong> New Account Head</strong>
                </OffcanvasHeader>
                <OffcanvasBody style={{ width: "100%" }}>
                    <div>
                        <FormGroup>
                            <Label for="accountHead">
                                Account Head
                            </Label>
                            <Input
                                id="accountHead"
                                name="accountHead"
                                placeholder="Enter Account Head"
                                type="text"
                                onChange={(e) => setNewAccountHead(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="subAccountHead">
                                Sub Account Head
                            </Label>
                            <Input
                                id="subAccountHead"
                                name="subAccountHead"
                                placeholder="Enter Sub Account Head"
                                type="text"
                                onChange={(e) => setNewSubAccountHead(e.target.value.split(","))}
                                onKeyDown={handleKeyDown}
                            />
                        </FormGroup>

                        <div className="btnContainer">
                            <button className="btn btn-danger" onClick={handleDiscard}>Discard</button>
                            <button className="btn btn-primary" onClick={newUserData}>Save</button>
                        </div>

                        <div className="badgeContainer">
                            {addedDetails.map((info, index) => (
                                <div key={index} >
                                    <Button color="primary" outline>
                                        {info}
                                        <Badge className="ml-2" onClick={() => closeBadge(index)}>
                                            X
                                        </Badge>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                </OffcanvasBody>
            </Offcanvas>
        </div >
    );
}

export default AddData;
