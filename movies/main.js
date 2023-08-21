

import { now_cinima } from "./.components/Now_cinema/index.js";
import { popular_cinima, popular_actor } from "./.components/popular/index.js";


const cont = document.querySelector(`.now_kino`);
let now_kino_btn = document.querySelector(`.now_kino_btn`)

fetch(
  //  "https://api.themoviedb.org/3/movie/movie_id?language=en-US",

  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",

  {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
  }
)
  .then((res) => res.json())
  .then((res) => now_cinima(res.results, cont, now_kino_btn))

const janr = document.querySelector(`.janr`);

// grabScroll(janr)
// *********************************

// ****************************
// const new_treyler_vids = document.querySelector(`.new_treyler_vids`);
// const iframe = document.querySelector(`iframe`)

// fetch(

//   "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",

//   {
//     headers: {
//       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((res) => treyler_vid(res.results[0].id, iframe))




// const content__wrapper = document.querySelector(`.swiper-treyler`)
// fetch(

//   "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",

//   {
//     headers: {
//       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((res) => treyler_vid(res.results, content__wrapper))


// **********************************
const popular_cinima_pl = document.querySelector(`.popular_film`);
const popular_film_page = document.querySelector(`.popular_film_page`);

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
  }
)
  .then((res) => res.json())
  .then((res) => { popular_cinima(res.results, popular_cinima_pl, popular_film_page) })

// ***************************
const popular_actor_box = document.querySelector(`.popular_actor`);

fetch(
  "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
  {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
  }
)
  .then((res) => res.json())
  .then((res) => { popular_actor(res.results, popular_actor_box) })
// ****************************






let search = `Elemental`;

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const Input = document.querySelector("input");
  const inputValue = Input.value;

  fetch(
    `https://api.themoviedb.org/3/search/multi?&query=${inputValue}`,
    {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      
      // popular_actor(res.results, popular_actor_box)
    })
    
  });
  
  
  
  
  
  // **********************************************************
  const expected_films_pl = document.querySelector(`.expected_films`);
  const expected_film_page = document.querySelector(`.expected_film_page`);
  
  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?&language=ru-RU",
    {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
      },
    }
    )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
    console.log(res)
    popular_cinima(res, expected_films_pl, expected_film_page)
  })
