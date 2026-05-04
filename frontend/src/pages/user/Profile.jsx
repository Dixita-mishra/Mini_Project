<<<<<<< HEAD
import React, { useState } from 'react';
import { MdEdit, MdSave, MdCamera } from 'react-icons/md';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    dob: '', gender: 'Male', address: '',
    city: '', state: '', pincode: '', pan: '', aadhar: '',
    nominee: '', nomineeRelation: 'Spouse',
  });

  const handleChange = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>
        <div className="page-header-actions">
          {editing
            ? <button className="btn btn-success" onClick={() => setEditing(false)}><MdSave /> Save Changes</button>
            : <button className="btn btn-primary" onClick={() => setEditing(true)}><MdEdit /> Edit Profile</button>
          }
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div style={{ position: 'relative' }}>
          <div className="profile-avatar-lg">JS</div>
          {editing && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'var(--blue-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--bg-secondary)' }}>
              <MdCamera style={{ fontSize: 13, color: '#fff' }} />
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2>{form.name}</h2>
          <p>{form.email} · {form.phone}</p>
          <div className="profile-tags">
            <span className="profile-tag" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--emerald-light)', border: '1px solid rgba(16,185,129,0.2)' }}>✓ KYC Verified</span>
            <span className="profile-tag" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--blue-light)', border: '1px solid rgba(59,130,246,0.2)' }}>3 Active Policies</span>
            <span className="profile-tag" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--amber-light)', border: '1px solid rgba(245,158,11,0.2)' }}>Member since Jan 2024</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Client ID</div>
          <div style={{ fontWeight: 700, color: 'var(--blue-light)', fontSize: 15 }}>USR-1001</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Personal Info */}
        <div className="settings-section">
          <div className="settings-section-title">Personal Information</div>
          <div className="settings-section-desc">Your basic personal details</div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} disabled={!editing} onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input className="form-input" type="date" value={form.dob} disabled={!editing} onChange={e => handleChange('dob', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" value={form.gender} disabled={!editing} onChange={e => handleChange('gender', e.target.value)}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
=======
import React, { useEffect, useState } from "react";
import { getUserData, saveUserData } from "../../utils/storage";
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdSave } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const data = getUserData();
    setProfile({
      name: data.profile?.name || data.profile?.fullName || "",
      email: data.profile?.email || "",
      phone: data.profile?.phone || "",
      address: data.profile?.address || ""
    });
  }, []);

  const handleSave = () => {
    const data = getUserData();

    data.profile = {
      ...data.profile,
      name: profile.name,
      fullName: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address
    };

    saveUserData(data);
    alert("✅ Profile updated successfully");
  };

  const fieldStyle = {
    width: "100%",
    padding: "14px 16px 14px 44px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    background: "rgba(255,255,255,0.75)",
    fontSize: 14,
    color: "#0f172a",
    outline: "none"
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>My Profile</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Manage your personal details and keep your account information updated.
        </p>
      </div>

      <div
        className="chart-card"
        style={{
          maxWidth: 820,
          borderRadius: 26,
          padding: 0,
          overflow: "hidden",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 10px 35px rgba(15, 23, 42, 0.08)"
        }}
      >
        <div
          style={{
            padding: "28px 28px 22px",
            background: "linear-gradient(135deg, rgba(2,132,199,0.95), rgba(56,189,248,0.9))",
            color: "#fff"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800
              }}
            >
              {(profile.name || "U").charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{profile.name || "User"}</h2>
              <p style={{ margin: "6px 0 0 0", fontSize: 13, opacity: 0.95 }}>
                Keep your details updated for a better policy experience
              </p>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Contact Info */}
        <div className="settings-section">
          <div className="settings-section-title">Contact Details</div>
          <div className="settings-section-desc">Your contact and location information</div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" value={form.email} disabled={!editing} onChange={e => handleChange('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input className="form-input" value={form.phone} disabled={!editing} onChange={e => handleChange('phone', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="form-textarea" value={form.address} disabled={!editing} onChange={e => handleChange('address', e.target.value)} rows={2} />
          </div>
        </div>

        {/* KYC Details */}
        <div className="settings-section">
          <div className="settings-section-title">KYC & Identity</div>
          <div className="settings-section-desc">Government-issued identity documents</div>
          <div className="form-group">
            <label className="form-label">PAN Number</label>
            <input className="form-input" value={form.pan} disabled onChange={e => handleChange('pan', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Aadhaar Number (Masked)</label>
            <input className="form-input" value={form.aadhar} disabled />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(16,185,129,0.1)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: 'var(--emerald-light)', fontWeight: 600 }}>
            ✓ KYC Verified on 15 Jan 2024
          </div>
        </div>

        {/* Nominee */}
        <div className="settings-section">
          <div className="settings-section-title">Nominee Details</div>
          <div className="settings-section-desc">Person to receive benefits in your absence</div>
          <div className="form-group">
            <label className="form-label">Nominee Name</label>
            <input className="form-input" value={form.nominee} disabled={!editing} onChange={e => handleChange('nominee', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Relationship</label>
            <select className="form-select" value={form.nomineeRelation} disabled={!editing} onChange={e => handleChange('nomineeRelation', e.target.value)}>
              <option>Spouse</option><option>Parent</option><option>Child</option><option>Sibling</option><option>Other</option>
            </select>
=======
        <div style={{ padding: 28 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 18
            }}
          >
            <div>
              <label className="form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <MdPerson style={{ position: "absolute", top: 14, left: 14, fontSize: 20, color: "#64748b" }} />
                <input
                  style={fieldStyle}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Email</label>
              <div style={{ position: "relative" }}>
                <MdEmail style={{ position: "absolute", top: 14, left: 14, fontSize: 20, color: "#64748b" }} />
                <input
                  style={fieldStyle}
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Phone</label>
              <div style={{ position: "relative" }}>
                <MdPhone style={{ position: "absolute", top: 14, left: 14, fontSize: 20, color: "#64748b" }} />
                <input
                  style={fieldStyle}
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Address</label>
              <div style={{ position: "relative" }}>
                <MdLocationOn style={{ position: "absolute", top: 14, left: 14, fontSize: 20, color: "#64748b" }} />
                <textarea
                  style={{ ...fieldStyle, minHeight: 120, resize: "none" }}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "none",
                borderRadius: 14,
                padding: "13px 20px",
                background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(2,132,199,0.28)"
              }}
            >
              <MdSave style={{ fontSize: 18 }} />
              Save Profile
            </button>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
