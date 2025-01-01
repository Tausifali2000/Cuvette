import React, { useState } from "react";
import styles from "./cssModules/settings.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHomeStore } from "../../../store/home.js";
import { useAuthStore } from "../../../store/authUser.js";

const Settings = () => {
  const { logout, user } = useAuthStore(); // User object from the auth store
  const { updateUser } = useHomeStore(); // Update user method from the home store
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || ""); // Populate initial values
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    try {
      if (!user?._id) {
        toast.error("User ID is not available");
        return;
      }

      const updateData = {
        name,
        email,
        ...(oldPassword && newPassword && { oldPassword, newPassword }), // Include passwords if provided
      };

      await updateUser(user._id, updateData); // Pass user ID directly from auth
      toast.success("User details updated successfully!");
    } catch (error) {
      toast.error("Failed to update user details.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/name.png" alt="" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <img src="/Logout.png" alt="" />
        Log out
      </button>
    </div>
  );
};

export default Settings;
