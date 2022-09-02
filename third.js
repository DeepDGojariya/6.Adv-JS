// import fetch from 'node-fetch';
const API_URL = 'https://api.nobelprize.org/v1/prize.json'


function createElement(winners){
    let table = document.getElementById("myTable");
    winners.map(winner=>{
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = winner;
      cell2.innerHTML = "Chemistry";  
    })
  }
  

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function findNobelWinners(data) {
    let winners = []
    data.prizes.forEach(prize => {
        if (prize.year > 2000 && prize.year < 2019 && prize.category === 'chemistry') {
            prize.laureates.forEach(laureate => {
                winners.push(laureate.firstname)
            });
        }
    });
    createElement(winners)
}

document.getElementById("btn").addEventListener("click",()=>{
    fetchData(API_URL).then(val =>
        findNobelWinners(val))
})
