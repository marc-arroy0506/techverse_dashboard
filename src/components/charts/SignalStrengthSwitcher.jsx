import React from 'react'
import { useState, useEffect } from 'react';
import SignalStrength from './SignalStrength';

export default function SignalStrengthSwitcher(props) {
    const [activeChart, setActiveChart] = useState('default');
    const data = props.rows;

    
    //get uniqueSSIDs
    const uniqueSSIDs = data.reduce((accumulator, item) => {
        if (!accumulator.addresses[item.Address]) {
          accumulator.addresses[item.Address] = true;
          if (item.SSID && !accumulator.ssids.includes(item.SSID)) {
            
            accumulator.ssids.push(item.SSID);
          }
        }
        return accumulator;
      }, { addresses: {}, ssids: [] }).ssids;


    // const uniqueAddresses = data.reduce((accumulator, item) => {
    //     // Check if the current item's Address is not already in the accumulator
    //     const addressExists = accumulator.some(obj => obj.Address === item.Address);
        
    //     if (!addressExists) {
    //       // Get the unique SSID associated with the current Address
    //       const associatedSSID = data.find(obj => obj.Address === item.Address && obj.SSID)?.SSID;
          
    //       // Add the current Address and associated SSID to the accumulator
    //       accumulator.push({ Address: item.Address, SSID: associatedSSID });
    //     }
        
    //     return accumulator;
    //   }, []);

    //chart switching
    const renderChart = () => {
        
        if (activeChart === 'default') {
            return <h2 style={{ margin:"auto" }}>Select an SSID for Signal Strength chart</h2>;
        } else {
            return <SignalStrength ssid={activeChart} rows={data}/>;
        }

    };

    return (
        <div>
            <nav className='chartSwitch'>
                <ul>
                    {uniqueSSIDs.map((item,index) =>
                        <li key={index}>
                            <button onClick={() => setActiveChart(item)}>{item}</button>
                        </li>
                        )}
                </ul>
            </nav>

            {renderChart()}
        </div>
    )
}
