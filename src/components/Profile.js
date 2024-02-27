import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost/php_codes/profile.php');
      const userData = response.data;
      setName(userData.name || '');
      setDob(userData.dob || '');
      setContactNumber(userData.contactNumber || '');
      setEmail(userData.email);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleUpdateProfile = async () => {

    const url = 'http://localhost/php_codes/update.php';
    let fData = new FormData();
    fData.append('name', name);
    fData.append('dob',dob );
    fData.append('contactNumber',contactNumber );
    axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));

  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" className="form-control" value={email} readOnly />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input type="text" className="form-control" value={dob} onChange={e => setDob(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Contact Number:</label>
        <input type="text" className="form-control" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
    </div>
  );
};

export default Profile;
