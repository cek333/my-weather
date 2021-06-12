import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

function CityForm() {
  const defaultCity = useSelector(state => state.weather.city);
  const [city, setCity] = useState(defaultCity);

  return (
    <form>
      <label htmlFor='city'>Enter City</label>
      <input type='text' id='city' placeholder='Please enter city.' value={city} />
      <button className='muted-button' type='submit'>Refresh Weather</button>
    </form>
  );
}

export default CityForm;