import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [country, setCountry] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [deathCases, setDeathCases] = useState("");
  const [recoveredCases, setRecoveredCases] = useState("");
  const [userInput, setUserInput] = useState("");
  const [countryInfo, setCountryInfo]= useState({});
  const [flag, setFlag]= useState("");
  const [image, setImage]= useState("");
  const [clicked, setClick] = useState(false)


  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data)=>{
      setData(data);
    });
  },[]);


  const setData = ({
    country,
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered,
    countryInfo,
    flag,
  }) => {
    setCountry(country);
    setCases(cases);
    setRecovered(recovered);
    setDeaths(deaths);
    setTodayCases(todayCases);
    setDeathCases(todayDeaths);
    setRecoveredCases(todayRecovered);
    setCountryInfo(countryInfo);
    setFlag(flag)
  };


  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  
  const handleSubmit = (props) => {
    props.preventDefault();
    fetch(`https://disease.sh/v3/covid-19/countries/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        let image= data.countryInfo.flag;
        setImage(image);
        console.log(data);
        console.log(image);
        
      });
  };

  // if(country){
  //   setClick(clicked=>{
  //     clicked = true
  //   })
  // }

  // onClick={() => setClick((clicked) => !clicked)}

  return (
    <div className="covidData">
      <h1>COVID-19 CASES COUNTRY WISE</h1>
      <div className="covidData__input">
        <form onSubmit={handleSubmit}>
          {/* input county name */}
          <input onChange={handleSearch} placeholder="Enter Country Name" />
          <br />
          <button type="submit" >Search</button>
        </form>
      </div>
  
      {/* Showing the details of the country */}
      <div className="covidData__country__info">
        <div>
        <p>Country Name : {country} </p>
        
        <p>Cases : {cases}</p>
  
        <p>Deaths : {deaths}</p>
  
        <p>Recovered : {recovered}</p>
  
        <p>Cases Today : {todayCases}</p>
  
        <p>Deaths Today : {deathCases}</p>
  
        <p>Recovered Today : {recoveredCases}</p>
        </div>
        <div>
        {
          image ?
          <img src={image} alt="_blank"/> 
          :
          " "
        }
        </div>
        
        
      </div>
    </div>
  );
}

export default App
