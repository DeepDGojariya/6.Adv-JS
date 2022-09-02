// import fetch from "node-fetch";
const API_URL = 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json'




function createElement(results){
  let table = document.getElementById("myTable");
  results.map(result=>{
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = result['Airport_Name'];
    cell2.innerHTML = result['valueMatch'];  
  })
}


const fetchData = async(url)=>{
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function findAirportData(data){
    let results=[]
    data.forEach(element => {
        if(element.Statistics.Flights.Cancelled+
            element.Statistics.Flights.Delayed+
            element.Statistics.Flights.Diverted+
            element.Statistics.Flights['On Time'] === element.Statistics.Flights.Total){
                results.push({"Airport_Name":element.Airport.Name,"valueMatch":true})
        }
        else{
            results.push({"Airport_Name":element.Airport.Name,"valueMatch":false})
        }
    });
    createElement(results)
}

document.getElementById("btn").addEventListener("click",()=>{
    fetchData(API_URL).then(val =>
        findAirportData(val))
    
})


