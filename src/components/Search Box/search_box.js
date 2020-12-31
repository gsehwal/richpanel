import React from 'react';
import lodashGet from 'lodash.get';
import {cities} from '../../util';
import Row from '../Flex/row_flex';
import Col from '../Flex/col_flex';
import { getCurrentWeather } from "../../services/apiService";
import {kelvinToCelcius} from '../../util';
import './style.scss';

class SearchBox extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			filteredCities: []
		}
		this.changeCity = this.changeCity.bind(this);
		this.fetchCurrentWeatherForCities = this.fetchCurrentWeatherForCities.bind(this);
	}

	changeCity(e) {
		let {city} = this.state;
		let filteredCities = [];
		city = e.target.value;
		this.setState({filteredCities: []});

		if(city.length > 0) {
			filteredCities = [...cities].filter(city => {
				return city.toLowerCase().includes(e.target.value.toLowerCase());
			});
			
			filteredCities = filteredCities.map(city => {
				return {name: city, temp: null, weather: null};
			});

			if(filteredCities.length > 2) {
				filteredCities.splice(2);
			}

			this.fetchCurrentWeatherForCities(filteredCities);
		}

		this.setState({city, filteredCities});
	}

	fetchCurrentWeatherForCities(filteredCities) {
		let citiesFetched = 0;
		let citiesToFetch = [...filteredCities];
		citiesToFetch.forEach(async city => {
			let weather = await getCurrentWeather(city.name);
			city.temp = lodashGet(weather, 'data.main.temp', null);;
			city.weather = lodashGet(weather, 'data.weather.0.main', null);
			citiesFetched++;
			if(citiesFetched === citiesToFetch.length) {
				this.setState({filteredCities: citiesToFetch});
			}
		});
	}

	getWeatherIcon(weather) {
		if(!weather) return;
		switch(weather.toLowerCase()) {
			case 'rain': return <div className='weather-icon rainy'></div>
			case 'clear': return <div className='weather-icon sunny'></div>
			default: return <div className='weather-icon cloudy'></div>
		}
	}

	openCity(city) {
		console.log('click');
		this.setState({city: '', filteredCities: []});
		this.props.openCity(city);
	}

	render() {
		let {city, filteredCities} = this.state;
		return (
			<Row className='search-box space-between align-items-center'>
				<div className='location-icon'></div>
				<div className='full-width input-container'>
					<input className='search-input' value={city} onChange={this.changeCity} />
					{filteredCities.length > 0 &&
						<Col className='search-results'>
							{filteredCities.map((city, i) => (
								<Row className='search-result' onClick={this.openCity.bind(this, city)}>
									<div>{city.name}</div>
									<Row className='space-between'>
										<Col className='align-end'>
											<div className='temp'>{city.temp ? kelvinToCelcius(city.temp)+'° C' : ''}</div>
											<div className='weather'>{city.weather}</div>
										</Col>
										{this.getWeatherIcon(city.weather)}
									</Row>
								</Row>
							))}
						</Col>
					}
				</div>
				<div className='search-icon'></div>
			</Row>
		)
	}
}

export default SearchBox;