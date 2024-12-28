import { useEffect, useState } from "react";

import homestyles from "./cssModules/home.module.css";
import { useFormFolderStore } from "../../../store/forms";

const HomeScreen = () => {
  const [folderBox, setFolderBox] = useState(false);
  const [folderName, setFolderName] = useState("");

  const {
    folders,
    forms,
    isLoadingFolders,
    isLoadingForms,
    fetchHome,
    createFolder,
  } = useFormFolderStore();
  

  // Fetch folders and forms on component mount
  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  // Open folder creation modal
  const openFolderBox = () => {
    setFolderBox(true);
  };

  // Handle folder creation
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      return alert("Folder name is required.");
    }
    await createFolder({ name: folderName });
    setFolderName("");
    setFolderBox(false);
  };

  return (
    <div className={homestyles.homebody}>
      <header className={homestyles.homeheader}>
        <div className={homestyles.dropdown}>Workspacename</div>
        <div className={homestyles.btn}>
          <div>light and dark</div>
          <button>Share</button>
        </div>
      </header>

      <div className={homestyles.container}>
        <div className={homestyles.workspace}>
          {/* Folder Management */}
          <div className={homestyles.foldernames}>
            <button onClick={openFolderBox}>Create a folder</button>
            <div className={homestyles.folders}>
              {isLoadingFolders ? (
                <p>Loading folders...</p>
              ) : (
                folders.map((folder, index) => (
                  <button key={index}>
                    {folder.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Forms and Folder Creation */}
          <div className={homestyles.container0}>
            <div className={homestyles.createform}>Create a typebot</div>
            <div className={homestyles.forms}>
              {folderBox && (
                <div className={homestyles.folderbox}>
                  <h1>Create New Folder</h1>
                  <input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <div className={homestyles.folderboxbtn}>
                    <button onClick={handleCreateFolder}>Done</button>
                    <button onClick={() => setFolderBox(false)}>Cancel</button>
                  </div>
                </div>
              )}

              {!isLoadingForms && forms.length > 0 ? (
                forms.map((form, index) => (
                  <div key={index} className={homestyles.form}>
                    {form.name}
                  </div>
                ))
              ) : (
                <p>No forms available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
