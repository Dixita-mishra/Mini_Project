import React from 'react';

// Health + Life Insurance ke liye tumhare logo paths
const partnersData = [
  // Health Insurance
  { name: "ADITYA BIRLA HEALTH", logo: "/logo/logo1.jpeg" },
  { name: "Care Health",         logo: "/logo/logo2.jpeg" },
  { name: "Manipal Cigna",       logo: "/logo/logo3.jpeg" },
  { name: "STAR Health",         logo: "/logo/logo4.jpeg" },
  { name: "Niva Bupa",           logo: "/logo/logo5.jpeg" },

  // Life Insurance
  { name: "HDFC Life",           logo: "/logo/logo6.jpeg" },
  { name: "ICICI PRUDENTIAL",    logo: "/logo/logo7.jpeg" },
  { name: "SBI Life",            logo: "/logo/logo8.jpeg" },
  { name: "LIC",                 logo: "/logo/logo9.jpeg" },
  { name: "BAJAJ Allianz Life",  logo: "/logo/logo10.jpeg" },
  { name: "Bandhan Life",        logo: "/logo/logo11.jpeg" },
  { name: "Digit Life",          logo: "/logo/logo12.jpeg" },
  { name: "FUTURE GENERALI LIFE",logo: "/logo/logo13.jpeg" },
  { name: "IndiaFirst",          logo: "/logo/logo14.jpeg" },
  { name: "Kotak Life",          logo: "/logo/logo16.jpeg" },
  { name: "Pramerica",           logo: "/logo/logo17.jpeg" },
  { name: "Shriram Life",        logo: "/logo/logo18.jpeg" },
  { name: "Star Union Dai-ichi", logo: "/logo/logo19.jpeg" },
  { name: "TATA AIA",            logo: "/logo/logo20.jpeg" }
];

const Partners = () => {
  return (
    <div style={{
      width: '100%',
      padding: '60px 20px',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.02)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--blue-dark)', marginBottom: '12px' }}>
          Our Partners
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Health & Life Insurance partners for your financial freedom
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'center'
      }}>
        {partnersData.map((partner, index) => (
          <div
            key={index}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.3s',
              cursor: 'pointer',
              minHeight: '110px',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
            }}
          >
            <img
              src={partner.logo}
              alt={`${partner.name} Logo`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'contain',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#334155',
              letterSpacing: '0.2px',
              lineHeight: '1.4',
              width: '100%',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto'
            }}>
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;