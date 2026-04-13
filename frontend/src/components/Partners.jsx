import React from 'react';

const categorizedPartners = {
  "Health & Medical": [
    "ADITYA BIRLA HEALTH", "care Health", "Manipal Cigna", "STAR Health", "niva Bupa"
  ],
  "Life & Term Insurance": [
    "BAJAJ Allianz Life", "Bandhan Life", "digit Life", "FUTURE GENERALI LIFE", 
    "HDFC Life", "ICICI PRUDENTIAL", "IndiaFirst", "kotak life", "LIC", 
    "pnb MetLife", "Pramerica", "SBI Life", "SHRIRAM Life", "Star Union Dai-ichi", "TATA AIA"
  ],
  "Motor & General Coverage": [
    "ADITYA BIRLA CAPITAL", "ageasFEDERAL", "AVIVA", "AXIS MAX", "BAJAJ Allianz Gen", 
    "bharti AXA", "Canara HSBC", "Chola MS", "digit", "ECGC", "edelweiss", 
    "FUTURE GENERALI GEN", "Galaxy", "HDFC ERGO", "ICICI Lombard", "IFFCO-TOKIO", 
    "IndusInd", "Liberty", "MAGMA", "National Insurance", "Oriental Insurance", 
    "RAHEJA QBE", "Royal Sundaram", "SBI general", "SHRIRAM General", "TATA AIG", 
    "The New India Assurance", "UNITED INDIA", "Universal Sompo", "zuno", "ZURICH kotak"
  ]
};

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
          Leading insurers categorized for your specific needs
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {Object.entries(categorizedPartners).map(([category, partners]) => (
          <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ 
              fontSize: '20px', fontWeight: 800, color: '#334155', 
              marginBottom: '20px', borderBottom: '2px solid #e2e8f0', 
              paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {category}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '20px',
              width: '100%'
            }}>
              {partners.map((partner, index) => (
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
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(partner)}&background=random&color=fff&size=48&rounded=true&bold=true`} 
                    alt={`${partner} Logo`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
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
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
