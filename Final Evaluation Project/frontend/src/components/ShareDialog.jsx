import { useState } from 'react';

import styles from './cssModule/share.module.css';
import useWorkspaceStore from '../../store/share.js';

const ShareDialog = () => {
  const [email, setEmail] = useState(''); // Store the email input
  const [permission, setPermission] = useState('view'); // Default permission is 'view'
  const { shareWorkspace, message, success } = useWorkspaceStore(); // Use the store

  const handleEmailChange = (e) => setEmail(e.target.value); // Handle email input change
  const handlePermissionChange = (e) => setPermission(e.target.value); // Handle permission change

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    try {
      // Call the shareWorkspace function from the store
      await shareWorkspace(email, permission);
      alert(message); // Alert the user with the message from the store
    } catch (error) {
      console.error('Failed to share workspace:', error);
      alert('Error sharing workspace. Please try again later.');
    }
  };

  return (
    <dialog open className={styles.dialog}>
      <div>
        <h1>Invite by email</h1>
        <div>
          <button onClick={() => setPermission('edit')}>Edit</button>
          <button onClick={() => setPermission('view')}>View</button>
        </div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email Id"
        />
        <button onClick={handleSubmit}>Send Invite</button>
      </div>
      <h2>Invite By Link</h2>
      <button>Copy Link</button>
    </dialog>
  );
};

export default ShareDialog;
