import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function WeatherInfo() {
  const weather = useSelector(state => state.weather);
  const timestamp = useSelector(state => state.timestamp);
  const city = weather.city ? weather.city : <>&nbsp;</>;
  const date = new Date(timestamp).toDateString();
  const weatherIcon = `images/${weather.icon}_2x.png`;
  const status = useSelector(state => state.status);
  const error = useSelector(state => state.error) || <>&nbsp;</>;

  return (
    <div className='text-center'>
      <h3>{city}</h3>
      <p>{date}</p>
      <p><img alt='weather icon' src={weatherIcon} /></p>
      <p>{weather.description}</p>
      <p>Temperature: {weather.temperature}&#8451;</p>
      <p>Wind Speed: {weather.windSpeed}km/hr</p>
      <p className='has-error'>{error}</p>
    </div>
  );
}

export default WeatherInfo;