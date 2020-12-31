import React from 'react';
import lodashGet from 'lodash.get';
import Loader from 'react-loader-spinner';
import SearchBox from '../Search Box/search_box';
import Col from '../Flex/col_flex';
import Row from '../Flex/row_flex';
import {getHourlyForecast} from '../../services/apiService';
import LineChart from '../Line Chart/line_chart';
import SunsetSunrise from '../Sunset Sunrise/sunset_sunrise';
import {days} from '../../util';
import './style.scss';

function DayCard(props) {
	let data = props.data;
	return (
		<Col className='day-card align-items-center' onClick={props.changeCurrentDay}>
			<div className='day'>{days[new Date(data.date_epoch * 1000).getDay()]}</div>
			<Row>
				<div className='max'>{Math.floor(data.day.maxtemp_c)+'°'}</div>
				<div className='min'>{Math.floor(data.day.mintemp_c)+'°'}</div>
			</Row>
			<div className='weather-icon cloudy mt-10' style={{marginLeft: '0px'}}></div>
			<div className='condition'>{data.day.condition.text}</div>
		</Col>
	)
}

function DayWeatherCard(props) {
	let data = props.data;

	return (
		<Col className='day-card-big'>
			<Row>
				<div className='big-temp'>{data.day.avgtemp_c+'°C'}</div>
				<div className='weather-icon-big sunny'></div>
			</Row>

			<LineChart data={data} />

			<Row className='space-between'>
				<Col className='humidity align-start'>
					<div className='title'>Humidity</div>
					<div className='value'>{data.day.avghumidity + ' %'}</div>
				</Col>
				<Col className='humidity align-start'>
					<div className='title'>Wind Speed</div>
					<div className='value'>{data.day.maxwind_mph + ' mph'}</div>
				</Col>
			</Row>

			<SunsetSunrise data={data} />
		</Col>
	)
}

class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentCity: '',
			currentDay: '',
			data: null,
			loader: true
		}
	}

	openCity(city) {
		getHourlyForecast(city.name).then(res => {
			let data = lodashGet(res, 'data', null);
			this.setState({data, loader: false});
		})
	}

	changeCurrentDay(day) {
		this.setState({currentDay: day});
	}

	render() {
		let {data, currentDay, loader} = this.state;
		return (
			<Col className='home'>
				<SearchBox openCity={this.openCity.bind(this)} />
				{loader ? <Loader type="Rings" color="#00BFFF" height={80} width={80} /> : null}
				{data ? 
					<Row className='day-cards'>
						{data.forecast.forecastday.map(day => (
							<DayCard data={day} changeCurrentDay={this.changeCurrentDay.bind(this, day)} />
						))}
					</Row>
				: null}

				{currentDay && <DayWeatherCard data={currentDay} />}
			</Col>
		)
	}
}

export default Home;