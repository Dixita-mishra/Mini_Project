<<<<<<< HEAD
import React, { useState } from 'react';
import { MdSend, MdPhone, MdEmail, MdChat, MdExpandMore, MdExpandLess } from 'react-icons/md';

const faqs = [
  { q: 'How do I file a claim?', a: 'Go to "My Claims" from the sidebar and click "File New Claim". Follow the 3-step process: select your policy, enter claim details, and upload supporting documents. Your claim will be reviewed within 3-5 business days.' },
  { q: 'When will my claim be settled?', a: 'Simple claims are settled within 7 working days after document verification. Complex or high-value claims may take up to 30 days. You can track the status in real-time from the "My Claims" page.' },
  { q: 'How do I renew an expired policy?', a: 'Go to "My Policies", find the expired policy card, and click the "Renew" button. You\'ll be guided through the renewal process. Note that some policies may require a fresh medical examination.' },
  { q: 'Can I add a nominee to my policy?', a: 'Yes! Go to "My Profile" and edit the Nominee Details section. You can add or change your nominee at any time, and the changes will be reflected in all your policies.' },
  { q: 'What documents are required to register a claim?', a: 'Required documents vary by claim type. Generally, you\'ll need: filled claim form, original bills and receipts, doctor\'s report (for health claims), FIR copy (for theft/accident), and a valid photo ID.' },
  { q: 'How do I download my policy document?', a: 'Open "My Policies", click "Details" on any policy, and then click "Download PDF". Your policy document will be downloaded as a PDF file.' },
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [ticket, setTicket] = useState({ subject: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (ticket.subject && ticket.message) setSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>Support & Help</h1>
          <p>We're here to help you. Reach out or find answers below.</p>
        </div>
      </div>

      {/* Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '📞', label: 'Call Us', val: '+91 1800-XXX-XXXX', sub: 'Mon–Sat, 9AM–7PM', color: '#3b82f6', action: 'Call Now' },
          { icon: '📧', label: 'Email Support', val: 'support@insureiq.com', sub: 'Response within 24 hours', color: '#10b981', action: 'Send Email' },
          { icon: '💬', label: 'Live Chat', val: 'Chat with us', sub: 'Average wait: 2 minutes', color: '#8b5cf6', action: 'Start Chat' },
        ].map(c => (
          <div key={c.label} className="info-box" style={{ flexDirection: 'column', textAlign: 'center', padding: 24 }}>
            <div className="info-box-icon" style={{ background: `${c.color}22`, margin: '0 auto 12px', width: 56, height: 56, fontSize: 24 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 13, color: c.color, fontWeight: 600, marginBottom: 4 }}>{c.val}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>{c.sub}</div>
            <button className="btn btn-secondary btn-sm" style={{ margin: '0 auto' }}>{c.action}</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* FAQ */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Frequently Asked Questions</div>
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                {openFaq === i ? <MdExpandLess /> : <MdExpandMore />}
              </div>
              {openFaq === i && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>

        {/* Raise Ticket */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Raise a Support Ticket</div>
          {submitted ? (
            <div className="chart-card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Ticket Submitted!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Your ticket <strong style={{ color: 'var(--blue-light)' }}>TKT-{Math.floor(Math.random() * 9000) + 1000}</strong> has been raised. Our team will respond within 24 hours.</p>
              <button className="btn btn-secondary btn-sm" style={{ margin: '16px auto' }} onClick={() => { setSubmitted(false); setTicket({ subject: '', category: '', message: '' }); }}>Raise Another</button>
            </div>
          ) : (
            <div className="chart-card">
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="Brief description of your issue" value={ticket.subject} onChange={e => setTicket({ ...ticket, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={ticket.category} onChange={e => setTicket({ ...ticket, category: e.target.value })}>
                  <option value="">— Select category —</option>
                  <option>Policy Enquiry</option><option>Claim Issue</option><option>Payment Problem</option>
                  <option>Document Request</option><option>Renewal Help</option><option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Describe your issue in detail..." value={ticket.message} onChange={e => setTicket({ ...ticket, message: e.target.value })} rows={5} />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmit}>
                <MdSend /> Submit Ticket
              </button>
            </div>
          )}

          {/* Support Hours */}
          <div className="chart-card" style={{ marginTop: 16 }}>
            <div className="chart-title" style={{ marginBottom: 12 }}>Support Hours</div>
            {[
              { day: 'Mon – Fri', hours: '9:00 AM – 8:00 PM', active: true },
              { day: 'Saturday',  hours: '9:00 AM – 6:00 PM', active: true },
              { day: 'Sunday',    hours: 'Closed', active: false },
              { day: 'Public Holidays', hours: 'Emergency Only', active: false },
            ].map(s => (
              <div key={s.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.day}</span>
                <span style={{ color: s.active ? 'var(--emerald-light)' : 'var(--rose-light)', fontWeight: 600 }}>{s.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
=======
import React from "react";
import { MdCall, MdEmail, MdChat, MdHelpOutline, MdArrowForward } from "react-icons/md";

const Support = () => {
  const supportCards = [
    {
      title: "Call Support",
      icon: <MdCall style={{ fontSize: 34, color: "#0284c7" }} />,
      text: "Talk directly to our support team for policy, claim, or payment help.",
      action: () => alert("📞 Support Number: +91 98765 43210"),
      color: "rgba(2,132,199,0.12)"
    },
    {
      title: "Email Support",
      icon: <MdEmail style={{ fontSize: 34, color: "#16a34a" }} />,
      text: "Send us your issue details and we will get back to you quickly.",
      action: () => alert("📧 support@easyinsure.com"),
      color: "rgba(34,197,94,0.12)"
    },
    {
      title: "Live Chat",
      icon: <MdChat style={{ fontSize: 34, color: "#f59e0b" }} />,
      text: "Get instant help from our support desk through live chat.",
      action: () => alert("💬 Live chat feature coming soon"),
      color: "rgba(245,158,11,0.12)"
    },
    {
      title: "FAQs",
      icon: <MdHelpOutline style={{ fontSize: 34, color: "#8b5cf6" }} />,
      text: "Find answers to the most common insurance related questions.",
      action: () => alert("❓ FAQ section coming soon"),
      color: "rgba(139,92,246,0.12)"
    }
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Support Center</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Need help with policies, payments, claims, or account issues? Choose any support option below.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20
        }}
      >
        {supportCards.map((card) => (
          <div
            key={card.title}
            className="chart-card"
            onClick={card.action}
            style={{
              padding: 24,
              borderRadius: 24,
              cursor: "pointer",
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
              transition: "all 0.25s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 16px 34px rgba(15,23,42,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(15,23,42,0.06)";
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: "18px",
                background: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18
              }}
            >
              {card.icon}
            </div>

            <h3 style={{ marginBottom: 10, fontSize: 18, fontWeight: 800 }}>{card.title}</h3>

            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
              {card.text}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#0284c7",
                fontSize: 13,
                fontWeight: 700
              }}
            >
              Get Help <MdArrowForward />
            </div>
          </div>
        ))}
      </div>
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
    </div>
  );
};

<<<<<<< HEAD
export default Support;
=======
export default Support;
>>>>>>> 75ae30bfff395c6740f8c31abd13bb919a3e4cb6
