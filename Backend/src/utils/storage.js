export const getUserData = () => {
    const saved = localStorage.getItem("normalUserData");
  
    if (saved) return JSON.parse(saved);
  
    return {
      profile: {
        fullName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        address: "",
        pan: "",
        nomineeName: ""
      },
      policies: [],
      claims: [],
      notifications: []
    };
  };
  
  export const saveUserData = (data) => {
    localStorage.setItem("normalUserData", JSON.stringify(data));
  };