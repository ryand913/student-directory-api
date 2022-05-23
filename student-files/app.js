const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
const studentLength = 12;
const search = document.querySelector(".search-container");
const apiURL = 'https://randomuser.me/api/?nat=us&results=12';
let globalData = '';

function fetchData(url) {
    return fetch(url)
             .then(res => res.json())
  }
fetchData(apiURL)
    .then(data => studentsAppend(data.results))
    .then(searchBar);


function studentsAppend(attributes){

    const values = attributes.map(attribute =>`<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${attribute.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${attribute.name.first} ${attribute.name.last}</h3>
        <p class="card-text">${attribute.email}</p>
        <p class="card-text cap">${attribute.location.city}, ${attribute.location.state}</p>
    </div>
    </div>`).join('')

    gallery.insertAdjacentHTML("beforeend",values);
    const cards = document.querySelectorAll(".card");
    const modal = document.querySelector(".modal-container");
    for (let i = 0; i < studentLength; i++) {
        cards[i].addEventListener("click", e => {
            modalDisplay(attributes, i); 
        })

    };
}

function modalDisplay(attributes, position){

        const values = attributes.map(attribute =>
            `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${attribute.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${attribute.name.first} ${attribute.name.last}</h3>
                    <p class="modal-text">${attribute.email}</p>
                    <p class="modal-text cap">${attribute.location.city}</p>
                    <hr>
                    <p class="modal-text">${attribute.cell}</p>
                    <p class="modal-text">${attribute.location.street.number} ${attribute.location.street.name}, ${attribute.location.city}, ${attribute.location.state}, ${attribute.location.postcode}</p>
                    <p class="modal-text">Birthday: ${dateFormat(attribute.dob.date)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`).filter((list,index) => position === index);
            body.insertAdjacentHTML("beforeend",values);
            let currentModal = document.querySelector(".modal-container");
            document.addEventListener("click", e =>{
                const body = document.querySelector("body");         
                if(e.target && e.target.id === 'modal-next'){
                    console.log(currentModal.parentElement)
                    body.removeChild(currentModal);
                    modalDisplay(attributes,(position + 1));
                }
                else if (e.target && e.target.id === 'modal-prev'){
                    body.removeChild(currentModal);
                    modalDisplay(attributes,(position - 1));                   
                    }
                });
        closeButton();

}

function closeButton(){
const closeBtn = document.querySelector("#modal-close-btn");
const modal = document.querySelector(".modal-container");
if(closeBtn){
closeBtn.addEventListener("click", e => { 
body.removeChild(modal);
});
}
}

function dateFormat(number){
    let newdate = 
        number.split('T')[0].replace(/-/g,'/').split('/');
    const convertdate = `${newdate[1]}\/${newdate[2]}\/${newdate[0]} `
    return convertdate
}

function searchBar(){
    if(search){
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
search.insertAdjacentHTML("beforeend",searchHTML);

    const searchInput = document.querySelector("#search-input");
    const renderedCards = document.querySelectorAll(".card");
    const gallery = document.querySelector(".gallery");

    searchInput.addEventListener("keyup", e => {
        for(let i = 0; i < renderedCards.length; i++){

            if(e.target.value !== null && !renderedCards[i].children[1].children[0].textContent.toLowerCase().
            includes(e.target.value.toLowerCase())){
                renderedCards[i].style.display = 'none';
            }
            else if (searchInput.value === ''){
                renderedCards[i].style.display = '';
            }
            else if(e.target.value !== null && renderedCards[i].children[1].children[0].textContent.toLowerCase().
            includes(e.target.value.toLowerCase())){
                renderedCards[i].style.display = '';
                }
            }
        
        });
    }
}






