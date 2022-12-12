document.addEventListener("DOMContentLoaded",() => {
    getFilms()

})
const url ="http://localhost:3000/films"

function getFilms(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(film => {
            displayFilmName(film)
        });
    })
}

function displayFilmName(film){
    const list = document.createElement('ul')
    const films = document.createElement('li')
    films.innerHTML = film.title;
    const we = document.getElementById('menu')
    we.append(list)
    list.appendChild(films)
    films.addEventListener("click",() => {
        getSingleFilm(film)
    })
}

function getSingleFilm(film){
    const title = document.createElement('h1')
    title.innerHTML = film.title

    const poster =document.createElement('img')
    poster.src = film.poster

    const runtime = document.createElement('p')
    runtime.innerHTML = `runtime : ${film.runtime} 
    showtime : ${film.showtime}`

    const description = document.createElement('p')
    description.innerHTML = `description : ${ film.description}`

    const me = document.getElementById('moviedisplay')
    me.append(title)
    me.append(poster)   
    me.append(runtime)
    me.append(description)

}