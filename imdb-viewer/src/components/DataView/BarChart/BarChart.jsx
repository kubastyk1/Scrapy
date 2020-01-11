import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const BarChart = ({ labels, data }) => {
    const options = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Actors'
        },
        xAxis: {
            min: 0,
            categories: labels
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
    return <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
    </div>
}

export default BarChart;