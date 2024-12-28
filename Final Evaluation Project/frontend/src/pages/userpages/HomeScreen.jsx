import { useEffect, useState } from "react";
import homestyles from "./cssModules/home.module.css";
import { useFormFolderStore } from "../../../store/forms";

const HomeScreen = () => {
  const [folderBox, setFolderBox] = useState(false);
  const [formCon, setFormCon] = useState(true);
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const {
    folders,
    forms,
    isLoadingFolders,
    isLoadingForms,
    fetchHome,
    createFolder,
    folderById,
  } = useFormFolderStore();

  // Fetch folders and forms on component mount
  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  // Open and close folder creation modal
  function openFolderBox() {
    setFolderBox(true);
    setFormCon(false);
  }

  function closeFolderBox() {
    setFolderBox(false);
    setFormCon(true);
  }

  // Handle folder creation
  async function handleCreateFolder() {
    try {
      await createFolder({ name: folderName });
      setFolderName(""); // Clear the input
      closeFolderBox(); // Close the modal
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  }

  // Handle folder selection (fetch forms inside the folder)
  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    folderById(folderId); // Fetch forms for the selected folder
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
                folders?.map((folder, index) =>
                  folder ? (
                    <button
                      key={index}
                      onClick={() => handleFolderClick(folder._id)} // Pass folder ID to fetch forms
                    >
                      {folder.name}
                    </button>
                  ) : null // Skip undefined folders
                )
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
                    <button onClick={() => closeFolderBox()}>Cancel</button>
                  </div>
                </div>
              )}

              {formCon && selectedFolderId && (
                <div className={homestyles.formList}>
                  {isLoadingForms ? (
                    <p>Loading forms...</p>
                  ) : (
                    forms?.map((form, index) => (
                      <div key={index} className={homestyles.form}>
                        {form.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
