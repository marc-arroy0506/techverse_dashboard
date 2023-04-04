import React from 'react';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Header from './Header';
import Channels from './charts/Channels';
import Band from './charts/Band';
import Table from './Table';
import SignalStrengthSwitcher from './charts/SignalStrengthSwitcher';
import BitRateSwitcher from './charts/BitRateSwitcher';


const Dashboard = (props) => {
    const [activeChart, setActiveChart] = useState('signalChart');
    const [isConnected, setIsConnected] = useState(false);
    const [data, setData] = useState([]);

    const url = "https://techversestorage.blob.core.windows.net/techversecontainer/Samplefile.csv?sp=racw&st=2023-04-01T23:44:19Z&se=2023-04-30T07:44:19Z&spr=https&sv=2021-12-02&sr=b&sig=l8PvKCXflMZ8g4gZlxWJCJjG5WWSfToZYGpqGjJK97g%3D";

    //parse CSV from url
    useEffect(() => {

        // Parse the CSV data
        Papa.parse(url, {
            header: true,
            download: true,
            complete: function (results) {
                //console.log(results.data)
                setData(results.data);

            },
            error: function (error) {
                console.error('Failed to parse CSV data', error);
            }
        });

    }, []);

    //check connection interval
    useEffect(() => {
        checkConnection();
        const intervalId = setInterval(() => {
          checkConnection();
        }, 20 * 1000); // Check the connection every 20 seconds
      
        return () => clearInterval(intervalId);
      }, []);


    //chart switching
    const renderChart = () => {
        switch (activeChart) {
            case 'signalChart':
                return <SignalStrengthSwitcher rows={data} />;
            case 'bitRateChart':
                return <BitRateSwitcher rows={data} />;
            case 'channelsChart':
                return <Channels rows={data} />;
            case 'bandChart':
                return <Band rows={data} />;
            // Add more cases for other charts
            default:
                return null;
        }
    };

    //check the connection with the server
    const checkConnection = async () => {
        try {
          const response = await fetch(url);
          if (response.status === 200) {
            setIsConnected(true);
          } else {
            setIsConnected(false);
          }
        } catch (error) {
          setIsConnected(false);
        }
      };
      
    return (
        <>
            <Header connection={isConnected}  handleLogout={props.handleLogout}></Header>

            <div className='tableWrapper'>
                <Table rows={data}></Table>
            </div>
            
            <nav className='dashSwitch'>
                <ul>
                    <li>
                        <button onClick={() => setActiveChart('signalChart')}>Signal Strength</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveChart('bitRateChart')}>Network Bitrate</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveChart('channelsChart')}>Channel Distribution</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveChart('bandChart')}>Band Distribution</button>
                    </li>
                    {/* Add more buttons for other charts */}
                </ul>
            </nav>

            <div className='chart'>
                {renderChart()}
            </div>

        </>
    );
}

export default Dashboard;
