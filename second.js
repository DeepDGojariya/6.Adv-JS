// import fetch from 'node-fetch';

let url = 'https://api.github.com/search/repositories?q='


function createElement(obj){
  let table = document.getElementById("myTable");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  
  cell1.innerHTML = obj.name;
  cell2.innerHTML = obj.full_name;
  cell3.innerHTML = obj.private;
  cell4.innerHTML = `
                    Owner-Login: ${obj.owner.name}, 
                    Owner-Name: ${obj.owner.name}, 
                    Owner-Following: ${obj.owner.followingCount}, 
                    Owner-Followers: ${obj.owner.followersCount}
                    `;
  cell5.innerHTML = obj.licenseName;
  cell6.innerHTML = obj.score;
  cell7.innerHTML = obj.numberOfBranch;
}



async function subAPI(url, target = null) {
    
    let response = await fetch(url)
    let data = await response.json()
    if (target) {
        return data[target]
    } else {
        return data.length
    }
}

async function usingAsyncAwait(url) {
    
    let response = await fetch(url)
    let data = await response.json()
    data = data.items[0]
    let obj = {
        "name": data.name,
        "full_name": data.full_name,
        "private": data.private,
        "owner": {
            "login": data.owner.login,
            "name": await subAPI(data.owner.url, "name"),
            "followersCount": await subAPI(data.owner.url, "followers"),
            "followingCount": await subAPI(data.owner.url, "following")
        },
        "licenseName": data.license.name,
        "score": data.score,
        "numberOfBranch": await subAPI(data.url + "/branches")
    }
    
    createElement(obj)
}


document.getElementById('aa-btn').addEventListener("click",()=>{
    url+=document.getElementById('userinput').value
    usingAsyncAwait(url)
    url = 'https://api.github.com/search/repositories?q='
})





