import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import 'chartjs-plugin-labels';
import './style.scss';

var Chart = require('chart.js');

class LineChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }

        this.canvasRef = React.createRef();
        this.makeChart = this.makeChart.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(!isEqual(prevProps.data, this.props.data)) {
            this.setState({data: this.props.data}, () => {
                this.makeChart()
            });
        }
    }

    componentDidMount() {  
        this.makeChart();
    }

    makeChart() {
        let {data} = this.state; 
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext('2d');
        let gradient = ctx.createLinearGradient(0, 0, 0, 400);

        gradient.addColorStop(0, 'rgba(252, 232, 192, 1)');
        gradient.addColorStop(0.25, 'rgba(252, 232, 192, 0.2)');
        gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0)');

        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [data.astro.sunrise, '01:00 PM', data.astro.sunset],
                datasets: [{
                    backgroundColor: gradient,
                    data: [0,10,0],
                    pointRadius: 0,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgba(252, 232, 192, 1)',
                    pointBorderWidth: 0,
                    pointStyle: 'circle',
                    borderColor: 'rgba(252, 232, 192, 1)'
                }]
            },
            options: {
                plugins: {
                    labels: {
                        render: function(args) {
                            console.log('args', args);
                            return args.value + '%'
                        }
                    }
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            max: 20,
                            min: 0
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            <div className='chartWrapper2'>
                <div className='chartAreaWrapper2'>
                    <canvas className='canvas' ref={this.canvasRef}></canvas>
                </div>
            </div>
        )
    }
}

export default LineChart;