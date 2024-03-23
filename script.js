const SearchInout =  document.getElementById("searchinput");
const btn = document.querySelector("button");
const movieContiner = document.getElementById("movieContainer"); 
const pages = document.getElementById("page");   

const API_KEY =`e80a36da`
const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

//creating function for debounce for optimization
//debounce is good eg of colsures
const debounce = (fn , delay) =>{
    let timer;
        return function(){  
        if(timer) clearTimeout(timer);
        timer =  setTimeout(()=>{
                fn();
            },delay)
        }
}

    async function fetchMovies(page = 1){
    const response = await fetch(`${BASE_URL}&s=${SearchInout.value}&page=${page}`);
    const data  =  await response.json();

    const {Response , Search, totalResults } = data ;

    Response === "False" ? responseIsFalse() : displayMovies(Search,totalResults, page);


     
    console.log(data);

}

SearchInout.addEventListener('input',debounce(fetchMovies,1000))

function responseIsFalse(){
    movieContiner.innerHTML = `<h2>No Movies found by this search value "${SearchInout.value}" </h2>`
}

function displayMovies(Search,totalResults,page){
    movieContiner.innerHTML = "";

    Search.forEach((movie) => {
       const card  = CreateCard(movie);
       movieContiner.appendChild(card);

    }); 

    displayPageiniation(totalResults,page);
     
}



const CreateCard = (movie) =>{
    const cardv = document.createElement("div");
    
    cardv.className = "card";
    cardv.innerHTML = `
    <div class= "image-div">
    <img src="${movie.Poster}" alt="${movie.Title}"/>
    </div>
    <div class="card-body">
        <h3>${movie.Title}</h3>
        <h4> Released in : ${movie.Year}</h4>
    </div>` ;

    return cardv;
}

let currentPage = 1;

const displayPageiniation = (totalResults,currentPage)=> {

    const totalPages = Math.ceil(totalResults / 10 );

    pages.innerHTML = `
    <button ${currentPage === 1 ? "disabled": ""} onclick="fetchMovies(${currentPage - 1})">Previous page </button>
    <span>${currentPage} of ${totalPages}</span>
    
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="fetchMovies(${currentPage + 1})">Next</button>
    `
}