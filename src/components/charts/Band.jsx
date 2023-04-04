import React from 'react'
import { Chart } from 'chart.js';
import { useEffect, useState } from 'react';

export default function Band(props) {
    Chart.defaults.color = "#ffffff";
    const [data, setData] = useState([]);
    //Build chart
    useEffect(() => {
        // JS - Destroy exiting Chart Instance to reuse <canvas> element
        let chartStatus = Chart.getChart("bandChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const ctx = document.getElementById('bandChart').getContext('2d');
        let data = props.rows;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...new Set(data.map((item) => item.Address))],
                //data.map((item) => item.SSID),
                datasets: [{
                    label: 'Frequency GHz',
                    data: data.map((item) => {
                        if (item.Frequency) {
                            // Use a regular expression to match the numeric portion of the string
                            const band = item.Frequency.match(/\d+(\.\d+)?/)[0];
                            return Number(band);
                          } else {
                            return 0; // or any other value you want to use for missing data
                          }
                      }),
                    borderWidth: 1
                }]
            },
            options: {

                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Frequencies being used by Addresses',
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
        <canvas id="bandChart" style={{ width: "100%", maxHeight: "400px" }}></canvas>
    )
}
