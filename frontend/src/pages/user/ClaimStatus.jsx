import React, { useEffect, useState } from "react";
import { getUserData, saveUserData } from "../../utils/storage";

const ClaimStatus = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const data = getUserData();
    setClaims(data.claims || []);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const data = getUserData();

    data.claims = data.claims.map((claim) =>
      claim.id === id ? { ...claim, status: newStatus.toLowerCase() } : claim
    );

    data.notifications.unshift({
      id: Date.now(),
      message: `Claim ${id} marked as ${newStatus}`,
      time: new Date().toLocaleString(),
    });

    saveUserData(data);
    setClaims(data.claims);
  };

  const handleDelete = (id) => {
    const data = getUserData();

    data.claims = data.claims.filter((claim) => claim.id !== id);

    data.notifications.unshift({
      id: Date.now(),
      message: `Claim ${id} deleted`,
      time: new Date().toLocaleString(),
    });

    saveUserData(data);
    setClaims(data.claims);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Claim Status</h1>

      {claims.length === 0 ? (
        <p>No claims found ❌</p>
      ) : (
        claims.map((claim) => (
          <div
            key={claim.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{claim.id}</h3>
            <p><strong>Policy:</strong> {claim.plan}</p>
            <p><strong>Type:</strong> {claim.type}</p>
            <p><strong>Amount:</strong> {claim.amount}</p>
            <p><strong>Description:</strong> {claim.description}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ fontWeight: "bold" }}>
                {claim.status}
              </span>
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
  
  <button
    style={{
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#10b981",
      color: "white",
      cursor: "pointer"
    }}
    onClick={() => handleStatusChange(claim.id, "Approved")}
  >
    ✔ Approve
  </button>

  <button
    style={{
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#ef4444",
      color: "white",
      cursor: "pointer"
    }}
    onClick={() => handleStatusChange(claim.id, "Rejected")}
  >
    ✖ Reject
  </button>

  <button
    style={{
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#f59e0b",
      color: "white",
      cursor: "pointer"
    }}
    onClick={() => handleStatusChange(claim.id, "Pending")}
  >
    ⏳ Pending
  </button>

  <button
    style={{
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#6b7280",
      color: "white",
      cursor: "pointer"
    }}
    onClick={() => handleDelete(claim.id)}
  >
    🗑 Delete
  </button>

</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClaimStatus;