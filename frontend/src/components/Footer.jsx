import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.02)',
      color: '#334155',
      padding: '60px 0 30px',
      fontFamily: "'Inter', sans-serif",
      width: '100%',
      marginTop: 'auto',
      borderBottomLeftRadius: '24px',
      borderBottomRightRadius: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Top Grid Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Insurance Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>Insurance</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['General Insurance', 'Life Insurance', 'Term Insurance', 'Investment', 'Health Insurance', 'Other Insurance'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <MdAddCircleOutline style={{ fontSize: '15px', color: '#0284c7' }} />
                  <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#0ea5e9'} onMouseLeave={(e) => e.target.style.color = '#475569'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>Calculators</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Investment Calculators', 'Fitness Calculators', 'Income Tax Calculator', 'Term Insurance Calculator', 'EMI Calculator', 'LIC Calculator', 'Life Insurance Calculator', 'Health Insurance Calculator'].map(item => (
                <li key={item} style={{ fontSize: '14px', color: '#475569', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#0ea5e9'} onMouseLeave={(e) => e.target.style.color = '#475569'}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Articles', 'Customer reviews', 'Insurance companies', 'Newsroom', 'Awards', 'EasyInsure Life'].map(item => (
                <li key={item} style={{ fontSize: '14px', color: '#475569', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#0ea5e9'} onMouseLeave={(e) => e.target.style.color = '#475569'}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['About Us', 'Sitemap', 'Careers', 'Legal & Admin policies', 'ISNP', 'Contact us', 'Verify your advisor', 'Investor Relations'].map(item => (
                <li key={item} style={{ fontSize: '14px', color: '#475569', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#0ea5e9'} onMouseLeave={(e) => e.target.style.color = '#475569'}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info / Payment Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.6)',
          padding: '24px 30px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
        }}>
          {/* Payment Methods */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px', color: '#1e293b' }}>Payment Methods</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#fff', color: '#1a1f36', fontSize: '11px', fontWeight: 800, padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>VISA</span>
              <span style={{ background: '#fff', color: '#eb001b', fontSize: '11px', fontWeight: 800, padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>MasterCard</span>
              <span style={{ background: '#fff', color: '#1a1f36', fontSize: '11px', fontWeight: 800, padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>RuPay</span>
              <span style={{ background: '#fff', color: '#0079C1', fontSize: '11px', fontWeight: 800, padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>Paytm</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '50px', background: 'rgba(0,0,0,0.1)' }}></div>

          {/* Secured With */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px', color: '#1e293b' }}>Secured With</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#fff', border: '1px solid #4ade80', color: '#16a34a', fontSize: '11px', fontWeight: 800, padding: '6px 10px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>PCI DSS</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '50px', background: 'rgba(0,0,0,0.1)' }}></div>

          {/* Follow Us */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px', color: '#1e293b' }}>Follow us on</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Facebook', 'X', 'LinkedIn', 'YouTube'].map(social => (
                <div key={social} style={{
                  width: '32px', height: '32px', background: '#fff', borderRadius: '50%', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', cursor: 'pointer', color: '#334155',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }} title={social}>
                  {social.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6', marginBottom: '30px' }}>
          <p style={{ marginBottom: '10px' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', background: '#94a3b8', borderRadius: '50%', marginRight: '10px', verticalAlign: 'middle' }}></span>
            EasyInsure Insurance Brokers Private Limited CIN: U74999HR2026PTC053454 Registered Office - Business Tech Park, Sector - 44, Gurugram - 122001, Haryana Tel no. : 0124-4218302 Email ID: care@easyinsure.com
          </p>
          <p style={{ marginBottom: '10px' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', background: '#94a3b8', borderRadius: '50%', marginRight: '10px', verticalAlign: 'middle' }}></span>
            EasyInsure is registered as a Composite Broker | Registration No. 742, Registration Code No. IRDA/ DB 797/ 19, Valid till 09/06/2027, License category- Composite Broker
          </p>
          <p style={{ marginBottom: '14px' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', background: '#94a3b8', borderRadius: '50%', marginRight: '10px', verticalAlign: 'middle' }}></span>
            Visitors are hereby informed that their information submitted on the website may be shared with insurers. Product information is authentic and solely based on the information received from the insurers.
          </p>
          <p style={{ color: '#0f172a', fontWeight: 700, padding: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.6)' }}>
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS / FRAUDULENT OFFERS<br/>
            <span style={{ color: '#475569', fontWeight: 500, display: 'block', marginTop: '4px' }}>IRDAI or its officials do not involve in activities like selling insurance policies, announcing bonus or investment of premiums. Public receiving such phone calls are requested to lodge a police complaint.</span>
          </p>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: '#475569', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '24px' }}>
          © Copyright 2008-2026 easyinsure.com. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
