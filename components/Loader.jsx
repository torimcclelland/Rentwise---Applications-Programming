import React from 'react';
import { RotateLoader } from 'react-spinners';

const Loader = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <RotateLoader
      color="#034974"
      speedMultiplier={0.5}
    />
    <p style={{
      marginTop: '20px',
      fontSize: '1.2rem',
      color: '#034974',
      fontFamily: 'Inter'
    }}>
      Hang tight! We're getting things ready for you!
    </p>
  </div>
);

export default Loader;
