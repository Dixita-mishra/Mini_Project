import React from "react";
import { getUserData, saveUserData } from "../../utils/storage";

const BuyPolicy = () => {
  const handleBuyPolicy = (policyName) => {
    const data = getUserData();

    const newPolicy = {
      id: Date.now(),
      name: policyName,
      status: "active",
      boughtAt: new Date().toLocaleString(),
    };

    data.policies.push(newPolicy);

    data.notifications.unshift({
      id: Date.now(),
      message: `${policyName} policy purchased`,
      time: new Date().toLocaleString(),
    });

    saveUserData(data);

    alert(policyName + " purchased successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buy Policy</h1>

      <div
        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", cursor: "pointer" }}
        onClick={() => handleBuyPolicy("Motor & Car Insurance")}
      >
        Motor & Car Insurance
      </div>

      <div
        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", cursor: "pointer" }}
        onClick={() => handleBuyPolicy("Home Insurance")}
      >
        Home Insurance
      </div>

      <div
        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", cursor: "pointer" }}
        onClick={() => handleBuyPolicy("Medical Insurance")}
      >
        Medical Insurance
      </div>
    </div>
  );
};

export default BuyPolicy;