import React from 'react'
import { Chart } from 'chart.js';
import { useEffect, useState } from 'react';

export default function Channels(props) {
    Chart.defaults.color = "#ffffff";
    const [data, setData] = useState([]);
    //Build chart
    useEffect(() => {
        // JS - Destroy exiting Chart Instance to reuse <canvas> element
        let chartStatus = Chart.getChart("channelsChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const ctx = document.getElementById('channelsChart').getContext('2d');
        let data = props.rows;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...new Set(data.map((item) => item.Address))],
                //data.map((item) => item.SSID),
                datasets: [{
                    label: 'Channel',
                    data: data.map((item) => item.Channel),
                    borderWidth: 1
                }]
            },
            options: {

                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Channels being used by Addresses',
                        font: {
                            size: 22,
                        },

                    }
                },
                scales: {
                    x: {
                      ticks: {
                        color: "white",
                        font: {
                            size: 11,
                        }
                      }
                    },
                    y: {
                      ticks: {
                        color: "white",
                        font: {
                            size: 16,
                        }
                      }
                    }
                  }
                
            }
        });
    }, [props.rows]);

    return (
        <canvas id="channelsChart" style={{ width: "100%", maxHeight: "400px" }}></canvas>
    )
}
