import { popular_cinima } from "/.components/popular/index.js";
import { rel_grid } from "/.components/grid_box/index.js";
import { ru } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


let img_big_box = document.querySelector(`.img_big_box`)
// let person_id = 1245
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const person_id = url.searchParams.get("id");
const actor_promo = document.querySelector('.actor_promo');

// *************

const personID = url.searchParams.get("id");
const currentYear = new Date().getFullYear();
const page_title = document.querySelector("#page-title")
const bg_poster = document.querySelector('.bg-poster');
const movie_banner = document.querySelector('.left__banner');
const movie_title = document.querySelector('.movie-title');
const movie_location = document.querySelector('#movie-name');
const movie_original_title = document.querySelector('.movie__original-title');
const birthday = document.querySelector('.information-list .birthday');
const birth_place = document.querySelector('.information-list .birth-place');
const homepage = document.querySelector('.information-list .homepage');
const known_for = document.querySelector('.information-list .known-for');
const movie_descripton = document.querySelector('.biography');
const add_to_favourite = document.querySelector('.add-to-favourite');
const favourite_count = document.querySelector('#favourite-count');
const backdrops_wrapper = document.querySelector('.backdrops-wrapper');
// *************

fetch(
    `https://api.themoviedb.org/3/person/${personID}?language=ru-RU&append_to_response=tagged_images%2Cexternal_ids%2Cimages%2Ctagged_images%2Cawards`,
    // "https://api.themoviedb.org/3/person/{person_id}/images",
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then(res => {
		let person = res
		console.log(person);
		page_title.innerHTML = person.name 
		bg_poster.style.backgroundImage = person.backdrop_path ? `url(https://image.tmdb.org/t/p/original${person.backdrop_path})` : `url(/public/default-bg.png)`
		movie_banner.style.backgroundImage = person.profile_path ? `url(https://image.tmdb.org/t/p/original${person.profile_path})` : `url(/public/default-poster.jpg)`
		movie_title.innerHTML =  person.also_known_as[0]
		movie_location.innerHTML =  person.also_known_as[0]
		movie_original_title.innerHTML = person.name
		movie_descripton.innerHTML = person.biography ? person.biography : "Биография отсутствует"
		const formattedDate = format(parseISO(person.birthday), 'd MMMM yyyy');
		birthday.innerHTML = `${formattedDate} (${(currentYear - parseISO(person.birthday).getFullYear())}) `
		homepage.innerHTML = person.homepage ? `<a target="_blank" href='${person.homepage}'>${person.homepage}</a>` : "-"
		birth_place.innerHTML = person.place_of_birth
		known_for.innerHTML = person.known_for_department == "Acting" ? "Актёр" : person.known_for_department
		favourite_count.innerHTML = person.popularity.toFixed(0)
		// let backdrops = person.images.profiles

		// if (backdrops.length !== 0) {
		// 	for (let i = 0; i < 6; i++) {
		// 		const backdrop = backdrops[i];
		// 		if (backdrop) {
		// 			const div = document.createElement("div")
		// 			if (i === 5) {
		// 				const span = document.createElement("span")
		// 				const bg = document.createElement("div")
		// 				span.innerHTML = "+" + (backdrops.length - 6)
		// 				div.append(span, bg)
		// 			}
		// 			div.style.backgroundImage = backdrop.file_path ? `url(https://image.tmdb.org/t/p/original${backdrop.file_path})` : `url(/public/default-poster.svg)`
		// 			backdrops_wrapper.append(div)
		// 		}
		// 	}
		// } else {
		// 	backdrops_wrapper.parentElement.firstElementChild.nextElementSibling.innerHTML = "Фотографииотсутствуют"
		// }
	})





const anticipated_swiper = document.querySelector(".best_movies_box .anticipated-movies__content .swiper")
const anticipated_swiper_container = document.querySelector(".best_movies_box .anticipated-movies__content .swiper-wrapper")
fetch(
    `https://api.themoviedb.org/3/person/${person_id}/movie_credits`,
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?`,
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
        .then(res => {
            console.log(res.cast);
            popular_cinima(res.cast, anticipated_swiper_container)
            // popular_cinima(res.cast, best_movies_films, best_movies_film_page)
    
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


        // console.log(res.cast);
    })




// *******************************************************

const actor_img_grid = document.querySelector(`.actor_img_grid`);

fetch(
    `https://api.themoviedb.org/3/person/${person_id}/images`,
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?`,
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then((res) => {
        // console.log(res.profiles);
        rel_grid(res.profiles, actor_img_grid, 4)
    })







// **************
const swipe_btns = document.querySelectorAll(".swipe__buttons button")
const actor_information = document.querySelector(".actor-information")
const actor_biography = document.querySelector(".actor-biography")

const info_list = document.querySelectorAll('.information-list .info_list');
const biography = document.querySelector('.biography');




swipe_btns.forEach(el => {
    el.onclick = () => {
        swipe_btns.forEach(btn => btn.classList.remove("active"))
        el.classList.add("active")
        let key = el.getAttribute("data-activity")
        if (key === "information") {
            actor_biography.classList.remove("active")
            actor_information.classList.add("active")
        } else {
            actor_information.classList.remove("active")
            actor_biography.classList.add("active")
        }

    }
})


fetch(
    `https://api.themoviedb.org/3/person/${person_id}?language=ru-RU`,

    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);

        for (const el of info_list) {
            let data_atr = el.getAttribute("data-infor")
            el.innerHTML = res[data_atr] ? res[data_atr] : `_`
            // console.log(res[data_atr]);
        }
        biography.innerHTML = res.biography

    })


// ***************
// let favorites = document.querySelector(`.favorites`)
// let img = favorites.querySelector(`img`)

// favorite(person_id, favorites)

// rel_like(img)
// function rel_like(img) {
//     let favorites = localStorage.getItem('favoriteActors');
    
//     if (!favorites) {
//         favorites = [];
//     } else {
//         favorites = JSON.parse(favorites);
//     }

//     let index = favorites.includes(person_id);

//     if (index) {
//         img.src = `/heart2.svg`
//     } else {
//         img.src = `/heart1.svg`
//     }


// }


// function favorite(person_id, btn) {
//     btn.onclick = () => {

//         let favorites = localStorage.getItem('favoriteActors');

//         if (!favorites) {
//             favorites = [];
//         } else {
//             favorites = JSON.parse(favorites);
//         }

//         let index = favorites.indexOf(person_id);

//         if (index === -1) {
//             favorites.push(person_id);
//             console.log(`delite`);
//         } else {
//             favorites.splice(index, 1);
//             console.log(`add`);
//         }

//         localStorage.setItem('favoriteActors', JSON.stringify(favorites));
// rel_like(img)
    
//     }
// }