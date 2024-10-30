
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../Styles/AccountMasters.css";
import { FormGroup, Label, Input } from 'reactstrap';
import AddData from './AddData';
import EditUser from './EditUser';

const AccountMasters = () => {
    const [data, setData] = useState([]);
    const [accountHead, setAccountHead] = useState("ALL");
    const [newAccountHead, setNewAccountHead] = useState("");
    const [newSubAccountHead, setNewSubAccountHead] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [offCanvasIsOpen, setOffCanvasIsOpen] = useState(false);
    const [offCanvasIsOpen2, setOffCanvasIsOpen2] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [updatedUsers, setUpdatedUsers] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [newUserData, setNewUserData] = useState([]);
    const [dateWarning, setDateWarning] = useState(false);
    const [addedDetails, setAddedDetails] = useState([]);

    function toggleOffCanvas() {
        setOffCanvasIsOpen(!offCanvasIsOpen);
        setAddedDetails([]);
    }
    
    function toggleOffCanvas2(info) {
        setOffCanvasIsOpen2(!offCanvasIsOpen2);
        setSelectedUsers(info);
        setUpdatedUsers(info);
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`https://schoolmanagementsystem-p1od.onrender.com/api/getAccountMaster?accountHead=${accountHead}&search=${(searchQuery).toLowerCase()}`);
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching users from API:", error);
            }
        }
        fetchUsers();
    }, [accountHead, newAccountHead, newSubAccountHead, searchQuery, updatedUsers]);

    async function handleDeleteSelected() {
        try {
            await axios.post(`https://schoolmanagementsystem-p1od.onrender.com/api/deleteAccountMaster`, { "selectedIds": selectedIds })
            // const updatedData = data.filter((item) => !selectedIds.includes(item._id));
            const response = await axios.get(`https://schoolmanagementsystem-p1od.onrender.com/api/getAccountMaster?accountHead=${accountHead}&search=${(searchQuery).toLowerCase()}`);
            setData(response.data.data);
            setSelectedIds([]);
        } catch (error) {
            alert("Error Deleting Entries", error.response ? error.response.data : error.message);
            console.error("Error deleting entries:", error.response ? error.response.data : error.message);
        }
    }

    const handleCheckboxChange = (id) => {
        setSelectedIds(prevSelectedIds =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter(selectedId => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start.getTime() === end.getTime()) {
                setDateWarning(true);
            } else {
                setDateWarning(false);
                const filteredData = data.filter(entry => {
                    const entryDate = new Date(entry.createdAt);
                    return entryDate >= start && entryDate <= end;
                });
                setData(filteredData);
            }
        } else {
            setDateWarning(false);
        }
    }, [startDate, endDate, data])


    return (
        <div className="mainParentaaaa">
            <div className="accountMastersMainParent container">
                <div className="accountMastersTitleParent">
                    <br />
                    <h1 className="accountMastersTitle">Account Masters</h1>
                </div>
                <div className="filterOptions">
                    <FormGroup className="dropDownOption">
                        <Label for="exampleSelect">
                            <strong>Account Head</strong>
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            value={accountHead}
                            onChange={(e) => setAccountHead(e.target.value)}
                        >
                            <option value="">ALL</option>
                            <option value="HM">HM</option>
                            <option value="CATHEDRAL MANAGEMENT">CATHEDRAL MANAGEMENT</option>
                            <option value="TESTING HEAD">TESTING HEAD</option>
                            <option value="CAY">CAY</option>
                            <option value="DONTKNOW FUND">DONTKNOW FUND</option>
                            <option value="CATHEDRAL FUND">CATHEDRAL FUND</option>
                            <option value="TRUST FUND">TRUST FUND</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="search">
                            <strong>Search</strong>
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search Sub Accountant"
                            type="search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">
                            <strong>From</strong>
                        </Label>
                        <Input
                            id="startDate"
                            name="from"
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">
                            <strong> To</strong>
                        </Label>
                        <Input
                            id="endDate"
                            name="to"
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>
                    <div className="filterButtonParent">
                        <Button variant="contained" onClick={toggleOffCanvas}>
                            + New Account Head
                        </Button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {dateWarning && <p>Start Date and End Date cannot be the same.</p>}
                </div>

                {selectedIds.length > 0 && (
                    <div className="deleteButtonParent">
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteSelected}
                        >
                            Delete Selected
                        </Button>
                    </div>
                )}

                {data.length > 0 ? (
                    <TableContainer component={Paper} className="tableParent">
                        <Table aria-label="account masters table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="accountMasterTableHead">Created on</TableCell>
                                    <TableCell className="accountMasterTableHead">Account Head</TableCell>
                                    <TableCell className="accountMasterTableHead">Sub Account Head</TableCell>
                                    <TableCell className="accountMasterTableHead">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((info) => (
                                    <TableRow key={info._id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedIds.includes(info._id)}
                                                onChange={() => handleCheckboxChange(info._id)}
                                            />
                                        </TableCell>
                                        <TableCell className="accountMasterTableData">{new Date(info.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="accountMasterTableData">{info.accountHead.toUpperCase()}</TableCell>
                                        <TableCell className="accountMasterTableData">
                                            {info.subAccountHead.length > 1
                                                ? info.subAccountHead.slice(0, 5).map(item => item.toUpperCase()).join(', ')
                                                : info.subAccountHead.map(item => item.toUpperCase())
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => toggleOffCanvas2(info)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <p>No data found</p>
                )}

                <AddData
                    toggleOffCanvas={toggleOffCanvas}
                    setOffCanvasIsOpen={setOffCanvasIsOpen}
                    offCanvasIsOpen={offCanvasIsOpen}
                    newAccountHead={newAccountHead}
                    setNewAccountHead={setNewAccountHead}
                    newSubAccountHead={newSubAccountHead}
                    setNewSubAccountHead={setNewSubAccountHead}
                    addedDetails={addedDetails}
                    setAddedDetails={setAddedDetails}
                />

                {offCanvasIsOpen2 && (
                    <div >
                        <EditUser
                            toggleOffCanvas2={toggleOffCanvas2}
                            setOffCanvasIsOpen2={setOffCanvasIsOpen2}
                            offCanvasIsOpen2={offCanvasIsOpen2}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                            updatedUsers={updatedUsers}
                            setUpdatedUsers={setUpdatedUsers}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default AccountMasters;
