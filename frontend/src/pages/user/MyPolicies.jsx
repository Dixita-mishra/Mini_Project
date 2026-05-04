<<<<<<< HEAD
import React, { useState } from 'react';
import { MdDownload, MdRefresh, MdInfo } from 'react-icons/md';

const myPolicies = [];

const DetailModal = ({ policy, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <span className="modal-title">{policy.icon} {policy.name}</span>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
      <div className="modal-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            ['Policy ID', policy.id], ['Type', policy.type], ['Start Date', policy.start],
            ['End Date', policy.end], ['Annual Premium', policy.premium], ['Coverage', policy.coverage],
            ['Agent', policy.agent],
          ].map(([l, v]) => (
            <div key={l} style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Policy Features</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {policy.features.map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--emerald)', fontSize: 16 }}>✓</span>{f}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
        <button className="btn btn-primary"><MdDownload /> Download PDF</button>
      </div>
    </div>
  </div>
);

const MyPolicies = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = myPolicies.filter(p => filter === 'All' || p.status === filter);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>My Policies</h1>
          <p>{myPolicies.filter(p => p.status === 'active').length} active · {myPolicies.filter(p => p.status === 'expired').length} expired</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['All', 'active', 'expired',].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} btn-sm`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} {f === 'All' ? `(${myPolicies.length})` : `(${myPolicies.filter(p => p.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="policy-cards-grid">
        {filtered.map(p => (
          <div key={p.id} className={`policy-card ${p.color}`}>
            <div className="policy-card-header">
              <div className={`policy-type-icon ${p.color}`} style={{ fontSize: 22 }}>{p.icon}</div>
              <div style={{ textAlign: 'right' }}>
                <div className="policy-id">{p.id}</div>
                <span className={`badge badge-${p.status}`} style={{ marginTop: 4 }}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span>
              </div>
            </div>
            <div className="policy-name">{p.name}</div>
            <div className="policy-type">{p.type} Insurance</div>
            <div className="policy-meta">
              <div className="policy-meta-item">
                <label>Coverage</label>
                <span style={{ color: 'var(--emerald-light)' }}>{p.coverage}</span>
              </div>
              <div className="policy-meta-item">
                <label>Valid Until</label>
                <span>{p.end}</span>
              </div>
              <div className="policy-meta-item">
                <label>Agent</label>
                <span style={{ fontSize: 12 }}>{p.agent}</span>
              </div>
              <div className="policy-meta-item">
                <label>Start Date</label>
                <span>{p.start}</span>
              </div>
            </div>
            <div className="policy-footer">
              <div>
                <div className="policy-premium">{p.premium}</div>
                <div className="policy-premium-label">Annual Premium</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.status === 'expired' && <button className="btn btn-primary btn-sm"><MdRefresh /> Renew</button>}
                <button className="btn btn-secondary btn-sm" onClick={() => setSelected(p)}><MdInfo /> Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <DetailModal policy={selected} onClose={() => setSelected(null)} />}
=======
import React, { useEffect, useState } from "react";
import { getUserData } from "../../utils/storage";
import {
  MdDirectionsCar,
  MdHome,
  MdHealthAndSafety,
  MdFlight,
  MdShield,
  MdLaptopMac,
  MdClose,
  MdCheckCircle
} from "react-icons/md";

const getPolicyIcon = (name) => {
  if (name.toLowerCase().includes("motor") || name.toLowerCase().includes("car")) {
    return <MdDirectionsCar style={{ color: "#f87171", fontSize: 34 }} />;
  }
  if (name.toLowerCase().includes("home")) {
    return <MdHome style={{ color: "#fbbf24", fontSize: 34 }} />;
  }
  if (name.toLowerCase().includes("medical") || name.toLowerCase().includes("health")) {
    return <MdHealthAndSafety style={{ color: "#34d399", fontSize: 34 }} />;
  }
  if (name.toLowerCase().includes("travel")) {
    return <MdFlight style={{ color: "#60a5fa", fontSize: 34 }} />;
  }
  if (name.toLowerCase().includes("cyber")) {
    return <MdLaptopMac style={{ color: "#4b5563", fontSize: 34 }} />;
  }
  return <MdShield style={{ color: "#a78bfa", fontSize: 34 }} />;
};

const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    const data = getUserData();
    setPolicies(data.policies || []);
  }, []);

  return (
    <div className="page-container">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>My Policies</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          View all your purchased insurance policies and their status.
        </p>
      </div>

      {policies.length === 0 ? (
        <div className="chart-card">
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <h3>No policies purchased yet</h3>
            <p>Buy a policy first to see it here.</p>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px"
          }}
        >
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="chart-card"
              onClick={() => setSelectedPolicy(policy)}
              style={{
                cursor: "pointer",
                borderRadius: "20px",
                padding: "20px",
                transition: "0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {getPolicyIcon(policy.name)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{policy.name}</h3>
                  <span className={`badge badge-${policy.status || "active"}`}>
                    {(policy.status || "active").charAt(0).toUpperCase() + (policy.status || "active").slice(1)}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Purchased: {policy.boughtAt || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPolicy && (
        <div
          onClick={() => setSelectedPolicy(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 500,
              maxWidth: "95%",
              background: "#fff",
              borderRadius: 22,
              padding: 26,
              boxShadow: "0 20px 50px rgba(0,0,0,0.20)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0 }}>{selectedPolicy.name}</h2>
              <button
                onClick={() => setSelectedPolicy(null)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "none",
                  background: "#f1f5f9",
                  cursor: "pointer"
                }}
              >
                <MdClose />
              </button>
            </div>

            <div style={{ marginBottom: 12, color: "var(--text-secondary)" }}>
              <strong>Status:</strong> {selectedPolicy.status}
            </div>
            <div style={{ marginBottom: 18, color: "var(--text-secondary)" }}>
              <strong>Purchased On:</strong> {selectedPolicy.boughtAt}
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 16,
                marginBottom: 20
              }}
            >
              <h4 style={{ marginTop: 0 }}>Benefits</h4>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MdCheckCircle style={{ color: "#22c55e" }} />
                  <span>Active policy protection</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MdCheckCircle style={{ color: "#22c55e" }} />
                  <span>Quick claim support</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MdCheckCircle style={{ color: "#22c55e" }} />
                  <span>Easy renewal assistance</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => alert("Renew feature coming soon")}
              >
                Renew Policy
              </button>

              <button
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => setSelectedPolicy(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
    </div>
  );
};

<<<<<<< HEAD
export default MyPolicies;
=======
export default MyPolicies;
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
