import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfilePage = () => {
    const userId = 1; // Static userId for demonstration purposes

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [nicNumber, setNicNumber] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        // Fetch user profile details on component mount
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.userDetails.email);
                    setFullName(data.userDetails.fullname);
                    setUsername(data.user.username);
                    setNicNumber(data.userDetails.nic);
                    setAddress(data.userDetails.address);
                    setContactNumber(data.userDetails.mobilenumber);
                } else {
                    console.error('Failed to fetch profile');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    fullname: fullName,
                    address,
                    mobilenumber: contactNumber,
                    nic: nicNumber
                })
            });
            if (response.ok) {
                console.log('Profile saved');
                setIsEditable(false);
            } else {
                console.error('Failed to save profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            const newPassword = prompt("Enter your new password:"); // Prompt user to enter new password
            if (!newPassword) {
                console.log('Password change cancelled');
                return;
            }
            const response = await fetch(`http://localhost:3000/api/users/${userId}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: newPassword })
            });
            if (response.ok) {
                console.log('Password change initiated');
            } else {
                console.error('Failed to change password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Account deletion initiated');
                // Perform additional cleanup or redirection after deletion if necessary
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditProfile = () => {
        setIsEditable(true);
    };

    return (
        <ProfileContainer>
            <Title>My Profile</Title>
            <ProfileSection>
                <ProfilePicture>
                    <img src={require('../images/avatar.jpeg')} alt="Profile" />
                </ProfilePicture>
                <ProfileInfo>
                    <FormGroup>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>NIC Number:</label>
                        <input
                            type="text"
                            value={nicNumber}
                            onChange={(e) => setNicNumber(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            disabled={!isEditable}
                        />
                    </FormGroup>

                    <ButtonGroup>
                        {isEditable ? (
                            <Button onClick={handleSaveProfile}>Save Profile</Button>
                        ) : (
                            <Button onClick={handleEditProfile}>Edit Profile</Button>
                        )}
                        <Button onClick={handleChangePassword}>Change Password</Button>
                        <DeleteButton onClick={handleDeleteAccount}>Delete Account</DeleteButton>
                    </ButtonGroup>
                </ProfileInfo>
            </ProfileSection>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
`;

const ProfilePicture = styled.div`
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        object-fit: cover;
        border: 4px solid #007bff;
    }
`;

const ProfileInfo = styled.div`
    flex: 1;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;

    &:hover {
        background-color: #0056b3;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

export default ProfilePage;
