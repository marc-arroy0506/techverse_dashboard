import React from 'react'
import { useEffect, useState } from 'react';

const Table =(props)=> {
    const [data, setData] = useState([]);
    useEffect(() =>{
        setData(props.rows);
    }, [props.rows]);
  return (
    <table className='dataTable'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>SSID</th>
          <th>Address</th>
          <th>Signal</th>
          <th>Encrypted</th>
          <th>Channel</th>
          <th>Mode</th>
          <th>Frequency</th>
          <th>Bitrate</th>
          <th>Quality</th>

        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Date}</td>
            <td>{row.Time}</td>
            <td>{row.SSID}</td>
            <td>{row.Address}</td>
            <td>{row.Signal}</td>
            <td>{row.Encrypted}</td>
            <td>{row.Channel}</td>
            <td>{row.Mode}</td>
            <td>{row.Frequency}</td>
            <td>{row.Bitrates}</td>
            <td>{row.Quality}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table