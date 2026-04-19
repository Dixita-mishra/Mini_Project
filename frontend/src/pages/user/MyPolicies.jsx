import React, { useEffect, useState } from 'react';
import { MdDownload, MdRefresh, MdInfo, MdDelete } from 'react-icons/md';
import { getUserData, saveUserData } from '../../utils/storage';



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
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const data = getUserData();
    setPolicies(data.policies || []);
  }, []);

  const handleDelete = (id) => {
    const data = getUserData();
    data.policies = (data.policies || []).filter((p) => p.id !== id);

    data.notifications.unshift({
      id: Date.now(),
      message: `Policy removed`,
      time: new Date().toLocaleString(),
    });

    saveUserData(data);
    setPolicies(data.policies);
  };

  const formattedPolicies = policies.map((p) => ({
    id: p.id || `POL-${Date.now()}`,
    name: p.name || 'Unnamed Policy',
    type: p.name?.includes('Motor')
      ? 'Motor'
      : p.name?.includes('Home')
      ? 'Home'
      : p.name?.includes('Medical')
      ? 'Health'
      : 'General',
    status: p.status || 'active',
    icon: p.name?.includes('Motor')
      ? '🚗'
      : p.name?.includes('Home')
      ? '🏠'
      : p.name?.includes('Medical')
      ? '⚕️'
      : '🛡️',
    color: p.name?.includes('Motor')
      ? 'blue'
      : p.name?.includes('Home')
      ? 'amber'
      : p.name?.includes('Medical')
      ? 'emerald'
      : 'blue',
    premium: p.premium || '₹10,000',
    coverage: p.coverage || '₹5,00,000',
    start: p.start || new Date().toLocaleDateString(),
    end: p.end || 'Valid',
    agent: p.agent || 'Self Purchase',
    features: p.features || ['Basic Coverage'],
    boughtAt: p.boughtAt || '',
  }));

  const filtered = formattedPolicies.filter(
    (p) => filter === 'All' || p.status === filter
  );

  const activeCount = formattedPolicies.filter((p) => p.status === 'active').length;
  const expiredCount = formattedPolicies.filter((p) => p.status === 'expired').length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>My Policies</h1>
          <p>{activeCount} active · {expiredCount} expired</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['All', 'active', 'expired'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}{' '}
            {f === 'All'
              ? `(${formattedPolicies.length})`
              : `(${formattedPolicies.filter((p) => p.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="policy-cards-grid">
        {filtered.length === 0 ? (
          <div className="chart-card">
            <h3>No policies found</h3>
            <p>Buy a policy first to see it here.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} className={`policy-card ${p.color}`}>
              <div className="policy-card-header">
                <div className={`policy-type-icon ${p.color}`} style={{ fontSize: 22 }}>
                  {p.icon}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="policy-id">{p.id}</div>
                  <span className={`badge badge-${p.status}`} style={{ marginTop: 4 }}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
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

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.status === 'expired' && (
                    <button className="btn btn-primary btn-sm">
                      <MdRefresh /> Renew
                    </button>
                  )}
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelected(p)}>
                    <MdInfo /> Details
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selected && <DetailModal policy={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default MyPolicies;
