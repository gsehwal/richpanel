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

        gradient.addColorStop(0, 'rgba(151, 202, 238, 1)');
        gradient.addColorStop(0.25, 'rgba(238, 246, 252, 0.3)');
        // gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0)');

        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...data.hour.map(x => {return moment(x.time_epoch * 1000).format('ha')})],
                datasets: [{
                    backgroundColor: gradient,
                    data: [...data.hour.map(x => {return x.temp_c;})],
                    pointRadius: 4,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgba(93, 166, 227, 1)',
                    pointBorderWidth: 2,
                    pointStyle: 'circle',
                    borderColor: 'rgba(93, 166, 227, 1)'
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
                            max: 50,
                            min: 0
                        }
                    }]
                }
            }
        })
    }

    render() {
        return (
            <div className='chartWrapper'>
                <div className='chartAreaWrapper'>
                    <canvas className='canvas' ref={this.canvasRef} width='1000' height='150'></canvas>
                </div>
            </div>
        )
    }
}

export default LineChart;