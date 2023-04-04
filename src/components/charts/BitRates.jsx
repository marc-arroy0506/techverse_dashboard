import React from 'react'
import { Chart } from 'chart.js';
import { useEffect, useState } from 'react';

export default function BitRates(props) {
    Chart.defaults.color = "#ffffff";
    //Build chart
    useEffect(() => {
        // JS - Destroy exiting Chart Instance to reuse <canvas> element
        let chartStatus = Chart.getChart("bitRateChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const ctx = document.getElementById('bitRateChart').getContext('2d');
        let data = props.rows;
        const filteredRows = data.filter(row => row.SSID == props.ssid);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: filteredRows.map((item) => item.Date + item.Time),
                datasets: [{
                    label: 'Bitrate Mb/s',
                    data: filteredRows.map((item) => {
                        if (item.Bitrates) {
                            // Use a regular expression to match the numeric portion of the string
                            const bitrate = item.Bitrates.match(/\d+/)[0];
                            return Number(bitrate);
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
                        text: props.ssid+'Bitrate over time',
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
    }, [props.rows,props.ssid]);

    return (
        <canvas id="bitRateChart" style={{ width: "100%", maxHeight: "400px" }}></canvas>
    )
}
