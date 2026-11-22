const movieName = document.getElementById("movie")
const  genre = document.getElementById("genre")
const year = document.getElementById("year")
const addButton = document.getElementById("btn")
const table = document.getElementById("movieList")
const search = document.getElementById("search")

let movies = JSON.parse(localStorage.getItem("movies")) || []

function saveMovies(){
  localStorage.setItem("movies", JSON.stringify(movies))
}

function renderMovies(list = movies){
  table.innerHTML = ""

  list.forEach(item => {
     const row = document.createElement("tr")

row.innerHTML = `<td>${item.movie}</td>
<td>${item.genree}</td>
<td>${item.yearr}</td>
<td><button class= "del-btn" id= "${item.id}">Delete</button></td>`



const del = row.querySelector(".del-btn")
del.addEventListener("click", () =>{
  movies = movies.filter((movie) => movie.id !== item.id)
  saveMovies()
 searchFilter()
  });
  table.appendChild(row)
})
}

function searchFilter(){
  const format = search.value.trim().toLowerCase()

  const filter = movies.filter((m) => {
    const matchMovie = m.movie.toLowerCase().includes(format)
     const matchGenre = m.genree.toLowerCase().includes(format)
     return matchMovie || matchGenre

  renderMovies(filter)
}

search.addEventListener("input", searchFilter)
addButton.addEventListener("click", function addMovies(){
  let movie =  movieName.value
  let genree = genre.value
  let yearr =  year.value

  if((movie.trim() ==="")){
    alert("Please fill in a movie name")
    return;
  }

  const newMovies ={
    id: Date.now(),
    movie,
    genree,
    yearr
  }

  movies.push(newMovies)
  saveMovies()
  renderMovies()

  movieName.value = ""
  genre.value = ""
  year.value = ""
})


renderMovies();


