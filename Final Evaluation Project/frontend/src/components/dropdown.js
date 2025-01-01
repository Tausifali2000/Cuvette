const dropStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "",
    border: "1px solid #FFFFFF29", // Match the `.dropdown` border style
    boxShadow: "none",
    cursor: "pointer",
    color: "white",
    padding: "5px 10px",
    width: "292px", // Match the `.dropdown` width
    height: "40px", // Match the `.dropdown` height
    fontSize: "16px", // Match the `.dropdown` font size
    textAlign: "center", // Align text
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black", // Match the transparent look but with a black background
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#333333"
      : state.data.value === "logout"
      ? "#1a1a1a"
      : "#1a1a1a", // Same default background for all options
    color: state.data.value === "logout" ? "#ff8c00" : "white", // Orange for logout, white for others
    fontSize: "14px",
    cursor: "pointer",
    padding: "10px",
    fontWeight: state.data.value === "logout" ? "bold" : "normal", // Bold text for logout
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
  }),
};

export default dropStyles;
