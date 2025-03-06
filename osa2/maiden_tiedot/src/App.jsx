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
    return (
      <div>
      {props.countries.filter(props.handleFiltering).map(country =>
        <p key={country.cca2}>
        {country.name.common}
        </p>
      )}
      </div>
    )}
  if (filtered.length == 1) {
    console.log('languages', filtered[0].languages)
    console.log(filtered)
    return (
      <div>
        <h2> {filtered[0].name.common} </h2>
        <p>{filtered[0].capital[0]}</p>
        <p>area {filtered[0].area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(filtered[0].languages).map(([key, value]) =>
            <li key={value}>
              {value}
            </li>
          )}
        </ul>
        <p id="biggerflag">{filtered[0].flag}</p>
      </div>
    )
  }
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

  useEffect(() => {
    console.log('is smth happening?')
    countryInfo
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }, [])

  const addFilter = (event) => {
    console.log(event.target.value)
    setFiltering(event.target.value)
  }

  const handleFiltering = (value) => {
    console.log('filter', value.name.common)
    if (value.name.common?.toUpperCase().includes(filtering.toUpperCase())) {
      return value
    }
  }

  return (
    <div>
      <h1> welcome to a country archive~</h1>
      <CountryFiltering filtering={filtering} addFilter={addFilter} />
      <Countries countries={countries} handleFiltering={handleFiltering} />
    </div>
  )


}

export default App
