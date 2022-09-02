const btn = document.querySelector('#btn');

const output = document.querySelector('.container');

const url = 'battles.json';

//console.log(btn);

btn.onclick = ()=>{

   //console.log('clicked');

   fetch(url)

   .then(res => res.json())

   .then(data => {

       addData(data);

   })

}

function addData(data){

    
    let html = `<div>${JSON.stringify(data)}</div>`;
    output.innerHTML = html;
 
 }