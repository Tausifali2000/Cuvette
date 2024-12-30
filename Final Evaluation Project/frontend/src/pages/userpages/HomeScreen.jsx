import { useEffect, useState } from "react";
import homestyles from "./cssModules/home.module.css";
import { useHomeStore } from "../../../store/home.js";
import { useAuthStore } from "../../../store/authUser.js";
import { useNavigate } from "react-router-dom";


const HomeScreen = () => {
  const [activeBox, setActiveBox] = useState(null); // To manage both folder and form boxes
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [formName, setFormName] = useState("");

  const navigate = useNavigate();
  const {
    folders,
    forms,
    isLoadingFolders,
    isLoadingForms,
    fetchHome,
    createFolder,
    folderById,
    createForm,
  } = useHomeStore();

  const { user, authCheck, isCheckingAuth } = useAuthStore();

  // Fetch folders and forms on component mount
  useEffect(() => {
    fetchHome();
    authCheck(); // Perform auth check to load user data
  }, [fetchHome, authCheck]);

  // Dynamic box handler
  function toggleBox(type) {
    if (type === activeBox) {
      setActiveBox(null); // Close the box if it's already active
    } else {
      setActiveBox(type); // Set the active box type
    }
  }

  // Handle folder creation
  async function handleCreateFolder() {
    try {
      await createFolder({ name: folderName });
      setFolderName(""); // Clear the input
      setActiveBox(null); // Close the box
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  }

  const handleFolderClick = async (folderId) => {
    try {
      setSelectedFolderId(folderId || null); // Update selected folder ID
      if (folderId) {
        await folderById(folderId); // Fetch forms inside the folder
      } else {
        await fetchHome(); // Fetch standalone forms
      }
    } catch (error) {
      console.error("Error fetching folder forms:", error);
    }
  };

  async function handleCreateForm() {
    try {
      const formData = {
        name: formName,
        folderId: selectedFolderId, // Pass the selected folder ID or null for standalone forms
      };

      await createForm(formData); // Call the store action
      setFormName(""); // Clear the input field
      setActiveBox(null); // Close the box
    } catch (error) {
      console.error("Error creating form:", error);
    }
  }

  async function handleFormClick(formId) {
    navigate(`/buildform/${formId}`);
  }




  return (
    <div className={homestyles.homebody}>
      <header className={homestyles.homeheader}>
       <div className={homestyles.dropdown}>
            {user.username}'s Workspace
             
        </div>
        <div className={homestyles.btn}>
          <div>light and dark</div>
          <button>Share</button>
        </div>
      </header>

      <div className={homestyles.container}>
        <div className={homestyles.workspace}>
          <div className={homestyles.foldernames}>
            <button onClick={() => toggleBox("folder")}>Create a folder</button>
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
            <button
              className={homestyles.createform}
              onClick={() => toggleBox("form")}
            >
              Create a typebot
            </button>
            <div className={homestyles.forms}>
              {activeBox === "folder" && (
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
                    <button onClick={() => toggleBox(null)}>Cancel</button>
                  </div>
                </div>
              )}

              {activeBox === "form" && (
                <div className={homestyles.folderbox}>
                  <h1>Create New Type Bot</h1>
                  <input
                    type="text"
                    placeholder="Enter type bot name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <div className={homestyles.folderboxbtn}>
                    <button onClick={handleCreateForm}>Done</button>
                    <button onClick={() => toggleBox(null)}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Display standalone forms when no folder is selected */}
              {activeBox === null && (
                <div className={homestyles.formList}>
                  {isLoadingForms ? (
                    <p>Loading forms...</p>
                  ) : selectedFolderId ? (
                    // Display forms in the selected folder
                    forms?.map((form, index) => (
                      <button
                        key={index}
                        onClick={() => handleFormClick(form._id)} // Pass form ID for navigation
                        className={homestyles.form}
                      >
                        {form.name}
                      </button>
                    ))
                  ) : (
                    // Display standalone forms
                    forms?.map((form, index) => (
                      <button
                        key={index}
                        onClick={() => handleFormClick(form._id)} // Pass form ID for navigation
                        className={homestyles.form}
                      >
                        {form.name}
                      </button>
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
