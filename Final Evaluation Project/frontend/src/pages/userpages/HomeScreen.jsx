import { useEffect, useState } from "react";
import homestyles from "./cssModules/home.module.css";
import { useHomeStore } from "../../../store/home.js";
import { useAuthStore } from "../../../store/authUser.js";
import { useNavigate } from "react-router-dom";

import ToggleButton from "react-toggle-button";

import CreateDialog from "../../components/createDialog.jsx";
import DeleteDialog from "../../components/DeleteDialog.jsx";

import Dropdown from "../../components/Dropdown.jsx";
import ShareDialog from "../../components/shareDialog.jsx";
import useWorkspaceStore from "../../../store/share.js";

// Import the shareDialog

const HomeScreen = () => {
  const [activeBox, setActiveBox] = useState(null); // To manage both folder and form boxes
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ type: null, id: null });
  const [formName, setFormName] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false); // Manage share dialog visibility
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  const navigate = useNavigate();
  const {
    folders,
    forms,
    fetchHome,
    createFolder,
    folderById,
    createForm,
    deleteFolder,
    deleteForm,
  } = useHomeStore();

  const { user, authCheck } = useAuthStore();
  const { fetchAccessList, fetchWorkspace } = useWorkspaceStore();
  const { username } = user;
  const { id } = fetchAccessList;

  useEffect(() => {
    
    
    fetchHome()// Fetch data for the selected workspace
    authCheck();
    fetchAccessList();
  }, [selectedWorkspaceId, fetchHome, fetchWorkspace, authCheck, fetchAccessList]);

  const handleWorkspaceSelect = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    console.log("Selected Workspace ID:", workspaceId);
  };



  // Dynamic box handler
  const toggleBox = (type) => {
    setDeleteDialog({ type: null, id: null }); // Close delete dialog if active
    setActiveBox((prev) => (prev === type ? null : type));
  };

  // Delete dialog handler
  const openDeleteDialog = (type, id) => {
    setActiveBox(null); // Close other dialogs
    setDeleteDialog({ type, id });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ type: null, id: null });
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      const { type, id } = deleteDialog;
      if (type === "folder") {
        await deleteFolder(id);
      } else if (type === "form") {
        await deleteForm(id);
      }
    } catch (error) {
      console.error(`Failed to delete ${deleteDialog.type}:`, error);
    } finally {
      closeDeleteDialog();
    }
  };

  // Handle folder creation
  const handleCreateFolder = async () => {
    try {
      await createFolder({ name: folderName });
      setFolderName(""); // Clear the input
      setActiveBox(null); // Close the box
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

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

  const handleCreateForm = async () => {
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
  };

  const handleFormClick = (formId) => {
    navigate(`/buildform/${formId}`);
  };

  const isDialogActive = !!(activeBox || deleteDialog.type);

  const options = [
    { value: "settings", label: "Settings" },
    { value: "logout", label: "Log Out" },
  ];

  const toggleShareDialog = () => {
    setIsShareDialogOpen((prev) => !prev); // Toggle share dialog visibility
  };

  return (
    <div className={homestyles.homebody}>
      <header className={homestyles.header}>
        <div className={homestyles.dropdown}>
          <Dropdown username={username}  onWorkspaceSelect={handleWorkspaceSelect}/>
        </div>
        <div className={homestyles.btn}>
          <div>
            <ToggleButton />
          </div>
          <button
            className={homestyles.share}
            onClick={toggleShareDialog} // Toggle share dialog when Share button is clicked
          >
            Share
          </button>
        </div>
      </header>

      {"IF userID selected render user ID" ?   (<div className={homestyles.container}>
        <div className={homestyles.workspace}>
          <div className={homestyles.folderbar}>
            <button
              className={homestyles.create1}
              onClick={() => toggleBox("folder")}
            >
              <img src="/create.png" alt="Create" /> Create a folder
            </button>
            <div className={homestyles.folders}>
              {folders?.map((folder) => (
                <div key={folder._id} className={homestyles.folderc}>
                  <button
                    className={homestyles.folder}
                    onClick={() => handleFolderClick(folder._id)}
                  >
                    {folder.name}
                  </button>
                  <button
                    className={homestyles.x}
                    onClick={() => openDeleteDialog("folder", folder._id)}
                  >
                    <img src="/delete.png" alt="Delete" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={homestyles.container0}>
            <button
              className={homestyles.createform}
              onClick={() => toggleBox("form")}
            >
              <img src="/plus.png" alt="Create" /> Create a typebot
            </button>
            <div className={homestyles.forms}>
              {activeBox === "folder" && (
                <CreateDialog
                  title="Create New Folder"
                  placeholder="Enter folder name"
                  value={folderName}
                  setValue={setFolderName}
                  onConfirm={handleCreateFolder}
                  onCancel={() => toggleBox(null)}
                />
              )}

              {activeBox === "form" && (
                <CreateDialog
                  title="Create New Type Bot"
                  placeholder="Enter type bot name"
                  value={formName}
                  setValue={setFormName}
                  onConfirm={handleCreateForm}
                  onCancel={() => toggleBox(null)}
                />
              )}

              {deleteDialog.type && (
                <DeleteDialog
                  type={deleteDialog.type}
                  onConfirm={handleConfirmDelete}
                  onCancel={closeDeleteDialog}
                />
              )}

              {/* Hide `.fc` if any dialog is active */}
              {!isDialogActive &&
                forms?.map((form) => (
                  <div key={form._id} className={homestyles.fc}>
                    <button
                      className={homestyles.x2}
                      onClick={() => openDeleteDialog("form", form._id)}
                    >
                      <img src="/delete.png" alt="Delete" />
                    </button>
                    <button
                      className={homestyles.form}
                      onClick={() => handleFormClick(form._id)}
                    >
                      {form.name}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> )
      : "populate data from workspace ID"
    }


      {isShareDialogOpen && <ShareDialog />}
    </div>
  );
};

export default HomeScreen;
