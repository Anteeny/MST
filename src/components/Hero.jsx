import React from 'react';
import './Hero.css';
import Resizable from './Resizable';

const Hero = ({
  id,
  puck,
  title = "Reflecting Your Truest Nature",
  subtitle = "We envision a world where individuals live from their authentic God-designed identity and express their highest potential in every area of life.",
  buttonText = "Explore courses",
  buttonUrl = "/courses",
  imageUrl = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  containerWidth,
  paddingY,
  gap,
  titleSize,
  subtitleSize,
  buttonPadding,
  buttonBgColor,
  imageHeight,
  imageWidth,
  imageBorderRadius
}) => {
  const isEditing = puck?.isEditing;

  return (
    <section className="hero" style={paddingY ? { padding: `${paddingY} 0` } : {}}>
      <Resizable
        id={id}
        widthPropName="containerWidth"
        currentWidth={containerWidth || "90%"}
        isEditing={isEditing}
      >
        <div 
          className="container hero-container" 
          style={{
            width: '100%',
            maxWidth: '100%',
            ...(gap ? { gap: gap } : {})
          }}
        >
          <div className="hero-content">
            <h1 className="heading-xl hero-title" style={titleSize ? { fontSize: titleSize } : {}}>{title}</h1>
            <p className="hero-subtitle" style={subtitleSize ? { fontSize: subtitleSize } : {}}>{subtitle}</p>
            <div className="hero-actions">
              <a 
                href={buttonUrl} 
                className="btn btn-primary btn-lg"
                style={{
                  ...(buttonPadding ? { padding: buttonPadding } : {}),
                  ...(buttonBgColor ? { backgroundColor: buttonBgColor } : {})
                }}
              >
                {buttonText}
              </a>
            </div>
          </div>
          <div className="hero-image-container-wrapper">
            <Resizable
              id={id}
              widthPropName="imageWidth"
              heightPropName="imageHeight"
              currentWidth={imageWidth || "100%"}
              currentHeight={imageHeight || "420px"}
              isEditing={isEditing}
            >
              <div className="hero-image-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img
                  src={imageUrl}
                  alt="Supportive community group"
                  className="hero-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'relative',
                    zIndex: 2,
                    ...(imageBorderRadius ? { borderRadius: imageBorderRadius } : {})
                  }}
                />
                <div 
                  className="hero-decoration"
                  style={{
                    ...(imageBorderRadius ? { borderRadius: imageBorderRadius } : {}),
                    position: 'absolute',
                    top: '-24px',
                    right: '-24px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--color-primary)',
                    zIndex: 1
                  }}
                ></div>
              </div>
            </Resizable>
          </div>
        </div>
      </Resizable>
    </section>
  );
};

export default Hero;
