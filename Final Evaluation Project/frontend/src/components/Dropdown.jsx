import React, { useState } from "react";
import Select from "react-select";
import { useAuthStore } from "../../store/authUser";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import toast from "react-hot-toast";
import dropStyles from "./dropdown";

const Dropdown = ({ username }) => {
  const [selectedOption, setOption] = useState(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate(); // Initialize navigate

  const handleDropdownChange = async (option) => {
    setOption(option);
    if (option.value === "logout") {
      await logout(); // Call the logout function
      toast.success("Logged out successfully!");
    } else if (option.value === "settings") {
      navigate("/home/settings"); // Navigate to the settings page
    }
  };

  const options = [
    { value: "settings", label: "Settings" },
    { value: "logout", label: "Log Out" },
  ];

  return (
    <div className="dropdown">
      <Select
        options={options}
        value={selectedOption}
        placeholder={`${username}'s Workspace`}
        onChange={handleDropdownChange}
        styles={dropStyles}
        components={{
          IndicatorSeparator: () => null, // Remove the default separator
        }}
      />
    </div>
  );
};

export default Dropdown;
