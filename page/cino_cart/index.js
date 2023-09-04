import { popular_cinima } from "/.components/popular/index.js";
import { rel_grid } from "/.components/grid_box/index.js";
import { format, parseISO } from 'date-fns';

let AUTH_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0`
const API_KEY = import.meta.env.VITE_API_KEY_2

import { ru } from 'date-fns/locale';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const getData = async (path) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${AUTH_KEY}`
            }
        };

        const res = await axios.get(`ttps://api.themoviedb.org/3` + path, options)

        return res
    } catch (e) {
        // throw new Error('Something went wrong ' + e.message)
    }
}

let haed = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
}


// import { popular_cinima } from "../../.components/popular";

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const movieId = url.searchParams.get("id");
const bg_poster = document.querySelector('.bg_poster');
const kino_promo_poster_img = document.querySelector(`.kino_promo_poster_img`)
const kino_promo_way = document.querySelector(`.kino_promo_way span`)
const kino_promo_name = document.querySelector(`.kino_promo_name`)
const kino_promo_name_arig = document.querySelector(`.kino_promo_name_arig`)
const kino_promo_description = document.querySelector(`.kino_promo_description`)
const description = document.querySelector(`.kino_promo_chart_box p`)
const reyting_box_span = document.querySelector(`.reyting_box span`)
const ctx = document.getElementById("myChart").getContext("2d");
const infor_box = document.querySelector(`.infor_box ul`)
const swiper_container = document.querySelector(".popular-movies .swiper")
const swiper_wrapper = document.querySelector(".popular-movies .swiper-wrapper")

fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ru-RU`,
    haed
)
    .then((res) => res.json())
    .then((res) => {
        reloud_mov(res)
        cini_infor(res, infor_box)
    })



let chart_color = {
    10: `#28FF04`,
    9: `#34EA16`,
    8: `#4BCB36`,
    7: `#78CB36`,
    6: `#89CB36`,
    5: `#CB6C36`,
    4: `#CB3F36`,
    3: `#DA3434`,
    2: `#F13030`,
    1: `#F00`,
    0: `rega(0,0,0,0)`,
}
function reloud_mov(arr) {
    console.log(arr);
    let vote_average = Math.round(arr.vote_average * 100) / 100
    let vote_average_color = chart_color[Math.round(arr.vote_average)]

    bg_poster.style.backgroundImage = arr.backdrop_path ? `url(https://image.tmdb.org/t/p/original${arr.backdrop_path})` : `url(/defoult-bg.png)`
    kino_promo_poster_img.src = arr.poster_path ? `https://image.tmdb.org/t/p/original${arr.poster_path}` : `/free_poster.svg`
    kino_promo_way.innerHTML = arr.title
    kino_promo_name.innerHTML = arr.title
    kino_promo_name_arig.innerHTML = arr.original_title
    kino_promo_description.innerHTML = arr.overview
    description.innerHTML = `Kinoarea <br> ${vote_average}`
    reyting_box_span.innerHTML = arr.vote_count

    let myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            // labels: ["Red", "Blue"],
            datasets: [{
                data: [vote_average, 10 - vote_average], // Проценты для каждой категории
                backgroundColor: [vote_average_color, "rgba(0, 0, 0, 0)"], // Цвета для каждой категории
                borderWidth: 0

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 60,
            title: {
                display: true,
                text: "Circular Chart Example"
            }
        }
    });




    // const infor_box = document.querySelector(".infor_box");

    // for (let key in arr) {
    //     let value = arr[key];

    //     if (typeof value === "string" || typeof value === "number") {
    //         let gridItem = document.createElement("p");
    //         gridItem.classList.add("grid-item");
    //         gridItem.textContent = key + ":";

    //         let gridValue = document.createElement("a");
    //         gridValue.classList.add("grid-value");
    //         gridValue.textContent = value;

    //         // let text = gridItem + ` : ` + gridValue
    //         infor_box.append(gridItem, gridValue)   

    //     }
    // }


}

function cini_infor(item, place) {
    delete item.original_title
    delete item.title
    delete item.tagline
    delete item.popularity
    delete item.id
    delete item.imdb_id
    delete item.overview
    delete item.backdrop_path
    delete item.poster_path
    delete item.video
    for (const key in item) {
        const element = item[key];

        const li = document.createElement("li")
        const span = document.createElement("span")
        const value = document.createElement('span')
        li.classList.add("list__item")
        span.innerHTML = key.split("_",).join(" ") + ":"
        li.append(span, value)


        if (Array.isArray(element)) {
            const data = element
                .filter(item => item.name !== "")
                .map(el => el.name)
                .join(', ');
            value.innerHTML = data
            value.title = data
            place.append(li)
        } else if (typeof element == "string" && element) {
            if (element.slice(0, 5) == "https") {
                value.innerHTML = `<a target="_blank" href="${element}">${element}</a>`
                value.title = element
            } else if (key === "release_date") {
                const releaseDate = parseISO(item.release_date);
                const formattedDate = format(releaseDate, 'd MMMM yyyy');
                value.innerHTML = formattedDate
            } else {
                value.innerHTML = element
            }
            place.append(li)
        } else if (typeof element === 'number') {
            if (key === "budget" || key === "revenue") {
                value.innerHTML = element.toLocaleString() + " $"
            } else {
                value.innerHTML = element.toLocaleString()
            }
            place.append(li)
        } else if (typeof element === 'boolean') {
            if (element) {
                value.innerHTML = "Да"
            } else {
                value.innerHTML = "Нет"
            }
            place.append(li)
        }
    }
}


fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=credits`,
    haed
)
    .then((res) => res.json())
    .then((res) => res.credits.cast)
    .then((res) => {
        reloud_act(res)
    })

let movies_actor = document.querySelector(`.movies_actor`)
function reloud_act(arr) {
    for (let i = 0; i < 10; i++) {
        let film_name = arr[i].character
        fetch(
            `https://api.themoviedb.org/3/person/${arr[i].id}`,
            haed
        )
            .then((res) => res.json())
            .then((res) => {



                let actor_box = document.createElement(`div`)
                let actor_box_img = document.createElement(`img`)
                let actor_box_name = document.createElement(`div`)
                let actor_box_name_ru = document.createElement(`span`)
                let actor_box_name_en = document.createElement(`span`)
                let actor_box_name_fl = document.createElement(`span`)

                actor_box.classList.add(`actor_box`)
                actor_box_img.classList.add(`actor_box_img`)
                actor_box_name.classList.add(`actor_box_name`)
                actor_box_name_ru.classList.add(`actor_box_name_ru`)
                actor_box_name_en.classList.add(`actor_box_name_en`)
                actor_box_name_fl.classList.add(`actor_box_name_fl`)

                actor_box_img.src = res.profile_path ? `https://image.tmdb.org/t/p/original${res.profile_path}` : `/free_poster.svg`

                actor_box_name_ru.innerHTML = res.also_known_as[0]
                actor_box_name_en.innerHTML = arr[i].name
                actor_box_name_fl.innerHTML = film_name


                movies_actor.append(actor_box)
                actor_box.append(actor_box_img, actor_box_name)
                actor_box_name.append(actor_box_name_ru, actor_box_name_en, actor_box_name_fl)

                actor_box.style.cursor = `pointer`
                actor_box.onclick = () => {
                    window.open("/page/actor_cart/?id=" + arr[i].id, '_blank')

                }
            })
    }
}


let movies_posters = document.querySelector(`.movies_posters`)
let movies_posters_name = document.querySelector(`.movies_posters_name`)


fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&append_to_response=images`,
    haed
)
    .then((res) => res.json())
    // .then((res) => {movies_posters_name.innerHTML = res.original_title})
    // .then((res) => res.images.posters)
    .then((res) => {
        reloud_posters(res)
    })

function reloud_posters(arr) {
    movies_posters_name.innerHTML = arr.original_title

    for (let i = 0; i < 4; i++) {
        let item = arr.images.posters[i].file_path
        let movies_poster = document.createElement(`div`)
        let movies_poster_img = document.createElement(`img`)

        movies_poster.classList.add(`movies_poster`)
        movies_poster_img.classList.add(`movies_poster_img`)

        movies_poster_img.src = `https://image.tmdb.org/t/p/original${item}`

        movies_poster.append(movies_poster_img)
        movies_posters.append(movies_poster)
    }
}

// **************************************

fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ru-RU`,
    haed
)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        popular_cinima(res.results, swiper_wrapper)
        new Swiper(swiper_container, {
            modules: [Navigation, Pagination],
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
            direction: 'horizontal',
            grabCursor: true,
            touchRatio: 1,
            navigation: {
                nextEl: ".popular-movies .swiper-button-next",
                prevEl: ".popular-movies .swiper-button-prev",
            },
            pagination: {
                el: ".popular-movies .swiper-pagination",
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

    })


// const sicvel_film = document.querySelector(`.sicvel_film`);
// const sicvel_film_page = document.querySelector(`.sicvel_film_page`);

// fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/similar?`,
//     {
//         headers: {
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//         },
//     }
// )
//     .then((res) => res.json())
//     .then((res) => {
//         // console.log(res.results);
//         popular_cinima(res.results, sicvel_film)
//     })

// *************************************************


const film_img_grid = document.querySelector(`.film_img_grid`);

fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images`,
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?`,
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then((res) => {
        console.log(res.backdrops);
        rel_grid(res.backdrops, film_img_grid, 5)
    })






// ***************
let favorites = document.querySelector(`.favorites`)
let img = favorites.querySelector(`img`)

favorite(movieId, favorites)

rel_like(img)
function rel_like(img) {
    let favorites = localStorage.getItem('favoriteMoves');

    if (!favorites) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }

    let index = favorites.includes(movieId);

    if (index) {
        img.src = `/heart2.svg`
    } else {
        img.src = `/heart1.svg`
    }


}


function favorite(movieId, btn) {
    btn.onclick = () => {

        let favorites = localStorage.getItem('favoriteMoves');

        if (!favorites) {
            favorites = [];
        } else {
            favorites = JSON.parse(favorites);
        }

        let index = favorites.indexOf(movieId);

        if (index === -1) {
            favorites.push(movieId);
            console.log(`delite`);
        } else {
            favorites.splice(index, 1);
            console.log(`add`);
        }

        localStorage.setItem('favoriteMoves', JSON.stringify(favorites));
        rel_like(img)

    }
}



