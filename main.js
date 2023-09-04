const API_KEY = import.meta.env.VITE_API_KEY_2

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import { now_cinima } from "./.components/Now_cinema/index.js";
import { popular_cinima, popular_actor } from "./.components/popular/index.js";
import { relod_treyler } from "./modules/treyler.js";


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

// **********************************

export const getData = async (path) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0`
      }
    };

    const res = await axios.get("https://api.themoviedb.org/3" + path, options)

    return res
  } catch (e) {
    throw new Error('Something went wrong ' + e.message)
  }
}

const swiper_container = document.querySelector(".popular-movies .swiper")
const swiper = document.querySelector(".popular-movies .swiper-wrapper")
const anticipated_swiper = document.querySelector(".anticipated-movies__content .swiper")
const anticipated_swiper_container = document.querySelector(".anticipated-movies__content .swiper-wrapper")
const popular_movies = document.querySelectorAll(".popular-movies .categories__list li")
const swiperFunctions = reloadSwiper();
console.log();
function reloadSwiper() {
  let popular_movies_swipe = new Swiper(swiper_container, {
    modules: [Navigation, Pagination],
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,
    grabCursor: true,

    touchRatio: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      100: {
        spaceBetween: 5,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      300: {
        spaceBetween: 10,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      458: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 15,
      },
      650: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 15,
      },
      900: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      }
    },
  });

  function checkChanges(newTranslate) {
    popular_movies_swipe.setTranslate(newTranslate);
  }

  return {
    checkChanges: checkChanges,
    popular_movies_swipe: popular_movies_swipe
  };
}
// fetch(
//   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
//   {
//     headers: {
//       Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((res) => { 
//   })


getData(`/movie/upcoming?api_key=${API_KEY}&language=ru-RU`)
	.then(res => {
		popular_cinima(res.data.results, anticipated_swiper_container)

		new Swiper(anticipated_swiper, {
			modules: [Navigation, Pagination],
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 20,
			grabCursor: true,
			loop: true,

			navigation: {
				nextEl: ".anticipated-movies__content .swiper-button-next",
				prevEl: ".anticipated-movies__content .swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			breakpoints: {
				100: {
					spaceBetween: 5,
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				300: {
					spaceBetween: 10,
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				450: {
					slidesPerGroup: 2,
					slidesPerView: 2,
					spaceBetween: 15,
				},
				800: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 15,
				},
				900: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 20,
				}
			},
		});
	})


popular_movies.forEach(el => {
  popular_movies[0].classList.add("active")
  getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU`)
    .then(res => {
      popular_cinima(res.data.results, swiper)
      reloadSwiper(swiper_container)
    })
  el.onclick = () => {
    swiperFunctions.checkChanges("10")
    let date = el.getAttribute("data-date")
    if (date === "all") {
      getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU`)
        .then(res => {
          popular_cinima(res.data.results, swiper)
          reloadSwiper(swiper_container)
          popular_movies.forEach(el => el.classList.remove("active"))
          el.classList.add("active")
        })
    } else {
      getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU&primary_release_year=${date}&certification_country=US&certification.lte=PG-13`)
        .then(res => {
          popular_movies.forEach(el => el.classList.remove("active"))
          el.classList.add("active")
          popular_cinima(res.data.results, swiper)
          reloadSwiper(swiper_container)
        })
    }
  }
})

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

const trailers = document.querySelector(`.new-trailers`);

fetch(
  // `https://api.themoviedb.org/3//movie/${item.id}/videos`,
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
  }
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.results);
    relod_treyler(res.results, trailers)
  })





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





  // ***************************
//   let searchs = document.querySelector(`.search`)
// let user_box_search = document.querySelector(`.user_box_search`)
// user_box_search.onclick = () => {
//   console.log(555);
//   searchs.style.display = `block`
// }
