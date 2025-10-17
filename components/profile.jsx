import React from 'react';
import PropTypes from 'prop-types';

const ProfileCircle = ({ src, size = 64, alt = 'Profile Image', style = {} }) => {
  const dimension = `${size}px`;

  const containerStyle = {
    width: dimension,
    height: dimension,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-block',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease',
    ...style,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img src={src} alt={alt} style={imageStyle} />
    </div>
  );
};

ProfileCircle.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  alt: PropTypes.string,
  style: PropTypes.object,
};

export default ProfileCircle;
