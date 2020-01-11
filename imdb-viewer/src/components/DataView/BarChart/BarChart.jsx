import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const BarChart = ({ labels, data }) => {
    const options = {
        chart: {
            backgroundColor: '#222',
            type: 'bar',
            
        },
        legend: {
            itemStyle:{'color':'white'}
        },
        title: {
            text: ''
        },
        xAxis: {
            min: 0,
            categories: labels,
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        tooltip: {
            formatter: function () {
                const { index } = this.point;
                const list = this.point.series.userOptions.items[index];
                const tooltip = list.reduce((acc, item) => {
                    return acc + `<b>${item}</b><br/>`
                },'')
                return tooltip;
            },
            shared: false
        },
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function() {
                      return false;
                    }
                },
                stacking: 'normal'
            }
        },
        series: data
    }
    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}

export default BarChart;