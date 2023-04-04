import React, { useState, useEffect } from 'react';

const Header = (props) => {
  const [time, setTime] = useState(null);
  //const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    // Set the initial time after the component has been mounted
    setTime(new Date());

    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  /**This will ensure that the server-rendered HTML does not contain any time-related content, and the time will be displayed after the component has been mounted on the client-side. */
  const localTime = time ? time.toLocaleTimeString() : '';

  return (
    <div className='Header'>
      <h1 className='header'>Techverse Dashboard</h1>
      <span className='time'>Calgary, AB (GMT-6) <span style={{color:"aquamarine"}}>{localTime}</span> </span>
      <span className='connection-status'>
        <p>Server Connection: {props.connection ? <span style={{color:"rgb(95, 216, 95)"}}>Good</span> : <span style={{color:"rgb(230, 21, 21)"}}>Bad</span>}</p>
        
      </span>
      <span className='logoutB'><button onClick={props.handleLogout}>Logout</button></span>
    </div>
  );
}

export default Header;
