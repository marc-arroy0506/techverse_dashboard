import React from 'react'
import { Chart } from 'chart.js';
import { useEffect, useState } from 'react';

export default function SignalStrength(props) {
    Chart.defaults.color = "#ffffff";

    //Build chart
    useEffect(() => {
        // JS - Destroy exiting Chart Instance to reuse <canvas> element
        let chartStatus = Chart.getChart("signalChart"); // <canvas> id
        if (chartStatus != undefined) {
            chartStatus.destroy();
        }
        const ctx = document.getElementById('signalChart').getContext('2d');
        let data = props.rows;
        const filteredRows = data.filter(row => row.SSID == props.ssid);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: filteredRows.map((item) => item.Date + item.Time),
                datasets: [{
                    label: 'Signal Strength',
                    data: filteredRows.map((item) => item.Signal),
                    borderWidth: 1
                }]
            },
            options: {

                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: props.ssid +' - Signal Strength over time',
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
        <canvas id="signalChart" style={{ width: "100%", maxHeight: "400px" }}></canvas>
    )
}
