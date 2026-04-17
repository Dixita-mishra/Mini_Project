import React from "react";
import { getUserData, saveUserData } from "../../utils/storage";

const BuyPolicy = () => {

  const handleBuyPolicy = (policyName) => {
    const data = getUserData();

    const newPolicy = {
      id: Date.now(),
      name: policyName,
      status: "active",
      boughtAt: new Date().toLocaleString()
    };

    data.policies.push(newPolicy);

    saveUserData(data);

    alert(policyName + " purchased ✅");
  };

  return (
    <div>
      <h1>Buy Policy</h1>

      <div onClick={() => handleBuyPolicy("Motor & Car Insurance")}>
        🚗 Motor & Car Insurance
      </div>

      <div onClick={() => handleBuyPolicy("Home Insurance")}>
        🏠 Home Insurance
      </div>

      <div onClick={() => handleBuyPolicy("Medical Insurance")}>
        🏥 Medical Insurance
      </div>

    </div>
  );
};

export default BuyPolicy;