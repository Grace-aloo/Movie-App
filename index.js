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
    //list.classList.add('nav flex-column')
    const films = document.createElement('li')
    //films.classList.add('nav-item')
    films.innerHTML = film.title;
    const we = document.getElementById('menu')
    we.append(list)
    list.appendChild(films)
    films.addEventListener("click",() => {
        getSingleFilm(film)
    })
}

function getSingleFilm(film){

    const title = document.getElementById('title')
    //title.classList.add('card-title')
    title.innerHTML = film.title

    const poster =document.getElementById('image')
    //poster.classList.add( 'card-img-top')
    poster.src = film.poster

    const runtime = document.getElementById('runtimeTitle')
    //runtime.classList.add('card-text')
    runtime.innerHTML = 'Runtime'
    const runbody = document.getElementById('body')
    runbody.innerHTML = film.runtime
    const showtimeTitle = document.getElementById('showtimeTitle')
   // showtimeTitle.innerHTML = 'Showtime'
    const shbody= document.getElementById('shbody')
    shbody.innerHTML = film.showtime

    const desTitle = document.getElementById('destitle')
   // showtimeTitle.innerHTML = 'Description'
    const desbody= document.getElementById('desbody')
    desbody.innerHTML = film.description


    // const description = document.createElement('p')
    // //description.classList.add('card-text')
    // description.innerHTML = ``

    const btn = document.getElementById('button')
    let available = film.capacity-film.tickets_sold
    btn.innerHTML =`tickets available: ${available}`
    btn.addEventListener('click',() => {
        
        btn.innerHTML =`tickets available: ${available}`
        if (available == 0 && film.tickets_sold == film.capacity){
            btn.innerHTML = 'sold out';
        }
        else{
            available--
            film.tickets_sold ++
            updatetickets(film)
        }

        // updatetickets(available)
        

    })
    const me = document.getElementById('moviedisplay')
    //me.append(cardDiv)
    //cardDiv.append(title)
   // cardDiv.append(poster)   
    //cardDiv.append(runtime)
    //me.append(description)
    //cardDiv.append(btn)

    

}
function updatetickets(film){
    console.log(film);
    fetch(`http://localhost:3000/films/${film.id}`,{
         method: 'PATCH',
         headers:{
            'Content-Type':'application/json'
       },
         body: JSON.stringify(film)
     })
     .then(res => res.json())
     .then(film => getSingleFilm(film))
}