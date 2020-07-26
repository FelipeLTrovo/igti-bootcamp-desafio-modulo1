'use strict';

let allUsers = [];
let filteredUsers = [];
let countMale = 0;
let countFemale = 0;
let inputUser = null;
let resultsArea = null;
let statisticsArea = null;
let totalAge = 0;
let avg = 0;
let button = null;


window.addEventListener('load', () =>{
    inputUser = document.querySelector('#filterUser');
    resultsArea = document.querySelector('#resultsArea');
    statisticsArea = document.querySelector('#statisticsArea');
    button = document.querySelector('#button');
    fetchUsers();
    
});


async function fetchUsers() {
    let res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo/');
    let json = await res.json();
    allUsers = json.results.map(user => {
        const {name, picture, dob, gender} = user;
        return {
            name: `${name.first} ${name.last}`,
            picture,
            age: dob.age,
            gender
        };
    });
    filterUser();
    filteredUsers = allUsers;
    render();
};

 function countUsersByGender(){
    countMale = filteredUsers.filter(user => user.gender === 'male').length;
    countFemale = filteredUsers.filter(user => user.gender === 'female').length;
};

function sumUsersAge(){
        totalAge = filteredUsers.reduce((accumulator, current) => {
        return accumulator + current.age;
        }, 0);
};

function filterUser(){
    inputUser.addEventListener('keyup', handleTyping);

    function handleTyping(event){
            if (inputUser.value.length >= 1){
                inputUser.disabled = false;
                button.classList.remove('disabled');
            }
            else{
                button.classList.add('disabled');
            }
            let typedText = inputUser.value.toLowerCase();
            filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(typedText));
            if(event.key === "Enter"){
                render();
            };
        
    };
    button.addEventListener('click', render);
};

function render(){
    renderUsers();
    renderStatistics();
};


function renderUsers(){
    let resultsHTML = '<div class="bordered">';
    resultsHTML+= `<h2>${filteredUsers.length} usuário(s) encontrado(s) </h2>`;
    resultsHTML+= '<ul>';
    filteredUsers.forEach(user => {
        resultsHTML+= `<li> <img src="${user.picture.thumbnail}" /> ${user.name}, ${user.age} anos </li>`
    });
    resultsHTML+= '</ul>'
    resultsHTML+= '</div>'
    resultsArea.innerHTML = resultsHTML;
};

function renderStatistics(){
    countUsersByGender();
    sumUsersAge();
    avg = (totalAge/(countMale + countFemale)).toFixed(2);
    let statisticsHTML = `<div class="bordered">
                         <ul>
                         <h2>Estatísticas</h2>
                         <li>Sexo masculino: ${countMale}<li>
                         <li>Sexo feminino: ${countFemale}<li>
                         <li>Soma das idades: ${totalAge}<li>
                         <li>Média das idades: ${avg}<li>
                         </ul>
                         </div>`
    statisticsArea.innerHTML = statisticsHTML;
};



