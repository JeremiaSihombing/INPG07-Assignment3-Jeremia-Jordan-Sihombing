var activeCasesDOM;
var activeCasesDOM;
var newCasesDOM;
var recoveredCasesDOM;
var totalCasesDOM;
var totalDeathDOM;
var totalTestsDOM;

var COUNTRIES = [];

const APIKEY = "" // diisi api key

const getDate=()=>{
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd
}

const getAllStatistic=()=>{
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': "APIKEY",
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };

  fetch('https://covid-193.p.rapidapi.com/statistics', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

const getAllCountries=()=>{
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': APIKEY,
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };

  fetch('https://covid-193.p.rapidapi.com/countries', options)
    .then(response => response.json())
    .then(response => COUNTRIES = response.response)
    .catch(err => console.error(err));
}

const getCountryHistory=(country='Indonesia', day=getDate())=>{
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e737458cf6mshce79b005d30db83p1e6239jsnde3f260800c1',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };
  const data = {
    country: country,
    day: day
  };
  const searchParams = new URLSearchParams(data);

  fetch('https://covid-193.p.rapidapi.com/history?'+ searchParams, options)
    .then(response => response.json())
    .then(response => loadDataToDOM(response['response'][0]))
    .catch(err => console.error(err));
}

function formatNumber(number){
  return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(number)
}

const loadDataToDOM = (data)=>{
  activeCasesDOM.innerText = formatNumber(data['cases']['active'])
  if(data['cases']['new']){
    newCasesDOM.innerText = formatNumber(data['cases']['new'])
  }else{
    newCasesDOM.innerText = "0" 
  }
  recoveredCasesDOM.innerText =   formatNumber(data['cases']['recovered'])
  totalCasesDOM.innerText =   formatNumber(data['cases']['total'])
  totalDeathDOM.innerText = formatNumber(data['deaths']['total'])
  totalTestsDOM.innerText = formatNumber(data['tests']['total'])
}

window.addEventListener('DOMContentLoaded', (event) => {
    activeCasesDOM = document.getElementById('active_cases')
    newCasesDOM = document.getElementById('new_cases')
    recoveredCasesDOM = document.getElementById('recovered_cases')
    totalCasesDOM = document.getElementById('total_cases')
    totalDeathDOM = document.getElementById('total_death')
    totalTestsDOM = document.getElementById('total_tests')

    getCountryHistory()
    getAllCountries()

    
    document.getElementById("searchData").addEventListener("click", function(e){
      e.preventDefault()
      const country = document.getElementById('country').value
      const date = document.getElementById('date').value

      if(!country){
        alert('Negara tidak boleh kosong !')
        return;
      }

      if(COUNTRIES.includes(country)){
        if(date){
          getCountryHistory(country, date)
        }else{
          getCountryHistory(country)
        }
      }else{
        alert('Negara tidak ditemukan !')
        return
      }
              
    });

});

