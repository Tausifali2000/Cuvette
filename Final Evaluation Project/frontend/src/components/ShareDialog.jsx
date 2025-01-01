import { useState } from 'react';
import styles from './cssModule/share.module.css';
import useWorkspaceStore from '../../store/share.js';
import toast from 'react-hot-toast';

const ShareDialog = () => {
  const [email, setEmail] = useState(''); // Store the email input
  const [permission, setPermission] = useState('edit'); // Default permission is 'edit'
  const { shareWorkspace, message } = useWorkspaceStore(); // Use the store

  const handleEmailChange = (e) => setEmail(e.target.value); // Handle email input change
  const handlePermissionChange = (e) => setPermission(e.target.value); // Handle permission change

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await shareWorkspace(email, permission);
   
    } catch (error) {
      console.error('Failed to share workspace:', error);
      toast.error('Error sharing workspace. Please try again later.', error);
    }
  };

  return (
    <dialog open className={styles.dialog}>
      <div className={styles.container}>
        <h1 className={styles.title}>Invite by Email</h1>
        <div className={styles.dropdownContainer}>
          <select
            value={permission}
            onChange={handlePermissionChange}
            className={styles.dropdown}
          >
            <option value="edit">Edit</option>
            <option value="view">View</option>
          </select>
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email id"
          className={styles.emailInput}
        />
        <button onClick={handleSubmit} className={styles.sendInviteButton}>
          Send Invite
        </button>
      </div>

      <h2 className={styles.subtitle}>Invite by Link</h2>
      <button className={styles.copyLinkButton}>Copy Link</button>
    </dialog>
  );
};

export default ShareDialog;
