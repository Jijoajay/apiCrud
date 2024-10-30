import "../Styles/EditUser.css";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader, FormGroup, Label, Form, Input } from 'reactstrap';
import axios from 'axios';
const EditUser = ({ toggleOffCanvas2,
    setOffCanvasIsOpen2,
    offCanvasIsOpen2,
    selectedUsers,
    setSelectedUsers,
    updatedUsers,
    setUpdatedUsers }) => {


    async function updateUser(userId, newDetails) {
        try {
            // Fetch the current user data
            const userResponse = await axios.get(`https://schoolmanagementsystem-p1od.onrender.com/api/getAccountMasterById/${userId}`);
            const user = userResponse.data[0];

            // Prepare the updated data by merging current and new details
            const updatedData = {
                ...user,
                ...newDetails,
            };

            // Update the user data with PUT request
            await axios.put(`https://schoolmanagementsystem-p1od.onrender.com/api/updateAccountMaster/${userId}`, updatedData);

            alert('User updated successfully!');
        } catch (error) {
            alert('Error updating entry: ' + error.message);
            console.error('Error updating user:', error);
        }
    }



    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedUsers((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleUpdateSubmit(e) {
        e.preventDefault();
        if (selectedUsers) {
            updateUser(selectedUsers._id, updatedUsers);
        }
    }


    return (
        <div >
            <Offcanvas isOpen={offCanvasIsOpen2} toggle={toggleOffCanvas2} direction="end" className="centeredEditUserOffCanvas">
                <OffcanvasHeader toggle={toggleOffCanvas2} className="editUserTitle">
                    <strong>Edit Details</strong>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Form
                        onSubmit={handleUpdateSubmit}
                    >
                        <FormGroup>
                            <Label for="accountHead">
                                Account Head
                            </Label>
                            <Input
                                id="accountHead"
                                name="accountHead"
                                placeholder="Change Account Head"
                                type="text"
                                value={updatedUsers.accountHead || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="subAccountHead">
                                Sub Account Head
                            </Label>
                            <Input
                                id="subAccountHead"
                                name="subAccountHead"
                                placeholder="Change Sub Account Head"
                                type="text"
                                value={updatedUsers.subAccountHead || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                placeholder="Change Creation Date"
                                type="date"
                                value={updatedUsers.createdAt || ""}
                                onChange={handleInputChange}
                            />
                        </FormGroup>

                        <div className="editUserbtnsParent">
                            <button className="btn btn-danger">Discard</button>
                            <Button type="submit" color="success">
                                Update
                            </Button>
                        </div>
                    </Form>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}

export default EditUser
