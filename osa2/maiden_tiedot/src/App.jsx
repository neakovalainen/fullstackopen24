// did ex 2.20 and code should work, but couldn't get authorized access to openweathermap

import { useState, useEffect } from 'react'
import countryInfo from './services/countries'

const Countries = (props) => {
  console.log(props.countries)

  const filtered = props.countries.filter(props.handleFiltering)
  
  if (filtered.length > 10) {
    return (
      <div>
        <p>
          too many results, please specify
        </p>
      </div>
    )
  }

  if (filtered.length > 1) {

    if (props.showMore) {
      console.log(props.showMore)
      return (
        <AdditionalInfo filtered={props.showMore} />)
    }

    return (
      <div>
      {props.countries.filter(props.handleFiltering).map(country =>
        <div key={country.cca2}>
          <p key={country.cca2}>
          {country.name.common}
          </p>
          <form onSubmit={() => {props.setShowMore(country)}}>
            <button type="submit">show more</button>
          </form>
        </div>
      )}

      </div>
    )}



  if (filtered.length == 1) {
    console.log('languages', filtered[0].languages)
    console.log(filtered)
    return (
      <AdditionalInfo filtered={filtered[0]} />
    )
  }
}

const AdditionalInfo = (props) => {
  const [weather, setWeather] = useState(null)
  const [lat, lon] = props.filtered.latlng
  const kelvinsToCelsius = K => {
    return K - 273.15
  }
  useEffect(() => {
    countryInfo
    .getWeather(lat, lon)
    .then(weather => {
      setWeather(weather)
    })
  })
  console.log(weather)

  const weather_details = weather
    ? (<>
      <h4> Weather in {props.filtered.capital[0]}</h4>
      <p>Temperature {kelvinsToCelsius(weather.current.temp)}</p>
      <p><img src={`http://openweathermap.org/img/wn/${weather.current.weather.icon}.png`} alt={current.weather.main} /></p>
      <p>Wind {weather.current.wind_speed}m/s</p>
    </>)
    : null

  return (
    <div>
    <h2> {props.filtered.name.common} </h2>
    <p>{props.filtered.capital[0]}</p>
    <p>area {props.filtered.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.entries(props.filtered.languages).map(([key, value]) =>
        <li key={key}>
          {value}
        </li>
      )}
    </ul>
    <p id="biggerflag">{props.filtered.flag}</p>
    { weather_details }
  </div>
  )
}

const CountryFiltering = (props) => {
  return (
    <div>
      search countries
      <input
      value={props.filtering}
      onChange={props.addFilter}
      />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtering, setFiltering] = useState('')
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    console.log('is smth happening?')
    countryInfo
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  const addFilter = (event) => {
    setFiltering(event.target.value)
    setShowMore(null)
  }

  const handleFiltering = (value) => {
    if (value.name.common?.toUpperCase().includes(filtering.toUpperCase())) {
      return value
    }
  }

  return (
    <div>
      <h1> welcome to a country archive~</h1>
      <CountryFiltering filtering={filtering} addFilter={addFilter} />
      <Countries countries={countries} handleFiltering={handleFiltering} showMore={showMore} setShowMore={setShowMore}/>
    </div>
  )


}

export default App
