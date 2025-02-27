import React, { useState } from "react";
import { MdSwitchAccount } from "react-icons/md";
import "./Profile.css";

const user = {
  name: "Sundar",
  email: "Sundar@gmail.com",
  phone: "9361415241",
  address: "Eachanari South Street, Coimbatore City, Pincode-625579",
};

const Profile = () => {
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const handleLogout = () => {
    
    alert("Logged out successfully!");
  };

  const toggleAccountSettings = () => {
    setShowAccountSettings((prevState) => !prevState);
  };

  return (
    <div className="profile-container">
      <h2>
        <MdSwitchAccount /> My Account
      </h2>

      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <div className="profile-actions">
        <button className="account-btn" onClick={toggleAccountSettings}>
          Account Settings
        </button>
        
      </div>

      {showAccountSettings && (
        <div className="account-settings">
          <h3>Account Settings</h3>
          <p><strong>Email Notifications:</strong> Enabled</p>
          <p><strong>Password:</strong> ********** (Change your password)</p>
          <p><strong>Payment Methods:</strong> Credit Card ending in 1234</p>
          <p><strong>Shipping Address:</strong> {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
