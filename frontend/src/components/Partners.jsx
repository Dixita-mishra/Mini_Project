import React from 'react';

const partnersData = [
  { name: "ADITYA BIRLA HEALTH",      logo: "https://logo.clearbit.com/adityabirlacapital.com" },
  { name: "Care Health",              logo: "https://logo.clearbit.com/careinsurance.com" },
  { name: "Manipal Cigna",            logo: "https://logo.clearbit.com/manipalcigna.com" },
  { name: "STAR Health",              logo: "https://logo.clearbit.com/starhealth.in" },
  { name: "Niva Bupa",                logo: "https://logo.clearbit.com/nivabupa.com" },

  { name: "BAJAJ Allianz Life",       logo: "https://logo.clearbit.com/bajajallianzlife.com" },
  { name: "Bandhan Life",             logo: "https://logo.clearbit.com/bandhanlife.com" },
  { name: "Digit Life",               logo: "https://logo.clearbit.com/godigit.com" },
  { name: "FUTURE GENERALI LIFE",     logo: "https://logo.clearbit.com/futuregenerali.in" },
  { name: "HDFC Life",                logo: "https://logo.clearbit.com/hdfclife.com" },
  { name: "ICICI PRUDENTIAL",         logo: "https://logo.clearbit.com/iciciprulife.com" },
  { name: "IndiaFirst",               logo: "https://logo.clearbit.com/indiafirstlife.com" },
  { name: "Kotak Life",               logo: "https://logo.clearbit.com/insurance.kotak.com" },
  { name: "LIC",                      logo: "https://logo.clearbit.com/licindia.in" },
  { name: "PNB MetLife",              logo: "https://logo.clearbit.com/pnbmetlife.com" },
  { name: "Pramerica",                logo: "https://logo.clearbit.com/pramericalife.in" },
  { name: "SBI Life",                 logo: "https://logo.clearbit.com/sbilife.co.in" },
  { name: "Shriram Life",             logo: "https://logo.clearbit.com/shriramlife.com" },
  { name: "Star Union Dai-ichi",      logo: "https://logo.clearbit.com/sudlife.in" },
  { name: "TATA AIA",                 logo: "https://logo.clearbit.com/tataaia.com" },

  { name: "ADITYA BIRLA CAPITAL",     logo: "https://logo.clearbit.com/adityabirlacapital.com" },
  { name: "Ageas Federal",            logo: "https://logo.clearbit.com/ageasfederal.com" },
  { name: "AVIVA",                    logo: "https://logo.clearbit.com/avivaindia.com" },
  { name: "AXIS MAX",                 logo: "https://logo.clearbit.com/axismaxlife.com" },
  { name: "BAJAJ Allianz Gen",        logo: "https://logo.clearbit.com/bajajallianz.com" },
  { name: "Bharti AXA",               logo: "https://logo.clearbit.com/bharti-axagi.co.in" },
  { name: "Canara HSBC",              logo: "https://logo.clearbit.com/canarahsbclife.com" },
  { name: "Chola MS",                 logo: "https://logo.clearbit.com/cholainsurance.com" },
  { name: "Digit",                    logo: "https://logo.clearbit.com/godigit.com" },
  { name: "ECGC",                     logo: "https://logo.clearbit.com/ecgc.in" },
  { name: "Edelweiss",                logo: "https://logo.clearbit.com/edelweissinsurance.com" },
  { name: "FUTURE GENERALI GEN",      logo: "https://logo.clearbit.com/futuregenerali.in" },
  { name: "HDFC ERGO",                logo: "https://logo.clearbit.com/hdfcergo.com" },
  { name: "ICICI Lombard",            logo: "https://logo.clearbit.com/icicilombard.com" },
  { name: "IFFCO-TOKIO",              logo: "https://logo.clearbit.com/iffco-tokio.co.in" },
  { name: "Liberty",                  logo: "https://logo.clearbit.com/libertyinsurance.in" },
  { name: "MAGMA",                    logo: "https://logo.clearbit.com/magmahdi.com" },
  { name: "National Insurance",       logo: "https://logo.clearbit.com/nationalinsurance.nic.co.in" },
  { name: "Oriental Insurance",       logo: "https://logo.clearbit.com/orientalinsurance.org.in" },
  { name: "RAHEJA QBE",               logo: "https://logo.clearbit.com/rahejaqbe.com" },
  { name: "Royal Sundaram",           logo: "https://logo.clearbit.com/royalsundaram.in" },
  { name: "SBI General",              logo: "https://logo.clearbit.com/sbigeneral.in" },
  { name: "Shriram General",          logo: "https://logo.clearbit.com/shriramgi.com" },
  { name: "TATA AIG",                 logo: "https://logo.clearbit.com/tataaig.com" },
  { name: "The New India Assurance",  logo: "https://logo.clearbit.com/newindia.co.in" },
  { name: "United India",             logo: "https://logo.clearbit.com/uiic.co.in" },
  { name: "Universal Sompo",          logo: "https://logo.clearbit.com/universalsompo.com" },
  { name: "Zuno",                     logo: "https://logo.clearbit.com/zuno.in" },
  { name: "ZURICH Kotak",             logo: "https://logo.clearbit.com/zurichkotak.com" }
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
          Leading insurers for your financial freedom
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
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;