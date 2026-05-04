import React, { useEffect, useState } from "react";
import { getUserData, saveUserData } from "../../utils/storage";

const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);

  // load policies on page load
  useEffect(() => {
    const data = getUserData();
    setPolicies(data.policies || []);
  }, []);

  // delete policy
  const handleDelete = (id) => {
    const data = getUserData();

    data.policies = data.policies.filter((p) => p.id !== id);

    saveUserData(data);
    setPolicies(data.policies);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Policies</h1>

      {policies.length === 0 ? (
        <p>No policies found ❌</p>
      ) : (
        policies.map((policy) => (
          <div
            key={policy.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px"
            }}
          >
            <h3>{policy.name}</h3>
            <p>Status: {policy.status}</p>

            <button onClick={() => handleDelete(policy.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPolicies;