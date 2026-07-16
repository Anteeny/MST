import React from 'react';
import './Partners.css';
import Resizable from './Resizable';

import icsnigLogo from '../assets/partner_icsnig.jpg';
import yaleLogo from '../assets/partner_yale.png';
import disasterreadyLogo from '../assets/partner_disasterready.png';
import lpmvLogo from '../assets/partner_lpmv.jpg';

const defaultPartnersList = [
  { name: "ICS NIG", logoUrl: icsnigLogo, logoWidth: "80px", logoHeight: "50px" },
  { name: "Yale University", logoUrl: yaleLogo, logoWidth: "140px", logoHeight: "50px" },
  { name: "DisasterReady", logoUrl: disasterreadyLogo, logoWidth: "110px", logoHeight: "50px" },
  { name: "LPMV", logoUrl: lpmvLogo, logoWidth: "90px", logoHeight: "50px" }
];

const Partners = ({
  id,
  puck,
  title = "Trusted by top universities and organizations",
  partners = defaultPartnersList,
  containerWidth,
  paddingY,
  gap,
  titleSize
}) => {
  const isEditing = puck?.isEditing;

  return (
    <section className="partners" style={paddingY ? { padding: `${paddingY} 0` } : {}}>
      <Resizable
        id={id}
        widthPropName="containerWidth"
        currentWidth={containerWidth || "100%"}
        isEditing={isEditing}
      >
        <div className="container" style={{ width: '100%', maxWidth: '100%' }}>
          <h2 className="partners-title" style={titleSize ? { fontSize: titleSize } : {}}>{title}</h2>
          <div className="partners-grid" style={gap ? { gap: gap } : {}}>
          {partners.map((partner, index) => {
            const name = typeof partner === 'string' ? partner : partner.name;
            const logoUrl = typeof partner === 'object' ? partner.logoUrl : null;
            const logoWidth = typeof partner === 'object' ? partner.logoWidth || 'auto' : 'auto';
            const logoHeight = typeof partner === 'object' ? partner.logoHeight || 'auto' : 'auto';
            return (
              <div 
                key={index} 
                className="partner-logo"
                style={{
                  width: logoWidth,
                  height: logoHeight,
                  display: logoUrl ? 'flex' : 'block',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt={name} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                ) : (
                  name
                )}
              </div>
            );
          })}
        </div>
      </div>
      </Resizable>
    </section>
  );
};

export default Partners;
