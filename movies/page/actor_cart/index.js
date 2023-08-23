import { popular_cinima } from "/.components/popular/index.js";
import { rel_grid } from "/.components/grid_box/index.js";




let img_big_box = document.querySelector(`.img_big_box`)
// let person_id = 64
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const person_id = url.searchParams.get("id");
const actor_promo = document.querySelector('.actor_promo');
fetch(
    `https://api.themoviedb.org/3/person/${person_id}?language=ru-RU`,
    // "https://api.themoviedb.org/3/person/{person_id}/images",
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then((res) => {
        // console.log(res);
        reloud_promo(res, actor_promo)
    })

function reloud_promo(arr, plase) {

    let promo_img = plase.querySelector(`.actor_promo_poster_img`)
    let ap_sp = document.querySelector(`.actor_promo_way span`)
    let actor_promo_name = plase.querySelector(`.actor_promo_name`)
    let actor_promo_name_arig = plase.querySelector(`.actor_promo_name_arig`)

    promo_img.src = arr.profile_path ? `https://image.tmdb.org/t/p/original${arr.profile_path}` : `/public/free_poster.svg`
    ap_sp.innerHTML = arr.name
    actor_promo_name.innerHTML = arr.name
    actor_promo_name_arig.innerHTML = arr.also_known_as[0]


}




const best_movies_films = document.querySelector(`.best_movies_films`);
const best_movies_film_page = document.querySelector(`.best_movies_film_page`);

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
    .then((res) => {
        // console.log(res.cast);
        popular_cinima(res.cast, best_movies_films, best_movies_film_page)
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
        rel_grid(res.profiles, actor_img_grid)
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
            console.log(res[data_atr]);
        }
        biography.innerHTML = res.biography

    })
