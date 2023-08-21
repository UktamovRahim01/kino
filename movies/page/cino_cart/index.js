// import { popular_cinima } from "../../.components/popular/index.js";

// import {popular_cinima} from "/.components/popular/index.js/";



let haed = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
}

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

fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ru-RU`,
    haed
)
    .then((res) => res.json())
    .then((res) => reloud_mov(res))



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
    let vote_average = Math.round(arr.vote_average * 100) / 100
    let vote_average_color = chart_color[Math.round(arr.vote_average)]

    bg_poster.style.backgroundImage = arr.backdrop_path ? `url(https://image.tmdb.org/t/p/original${arr.backdrop_path})` : `url(/public/defoult-bg.png)`
    kino_promo_poster_img.src = arr.poster_path ? `https://image.tmdb.org/t/p/original${arr.poster_path}` : `/public/free_poster.svg`
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

                actor_box_img.src = `https://image.tmdb.org/t/p/original${res.profile_path}`

                actor_box_name_ru.innerHTML = res.also_known_as[0]
                actor_box_name_en.innerHTML = arr[i].name
                actor_box_name_fl.innerHTML = film_name


                movies_actor.append(actor_box)
                actor_box.append(actor_box_img, actor_box_name)
                actor_box_name.append(actor_box_name_ru, actor_box_name_en, actor_box_name_fl)
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

const sicvel_film = document.querySelector(`.sicvel_film`);
const sicvel_film_page = document.querySelector(`.sicvel_film_page`);

fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?`,
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
)
    .then((res) => res.json())
    .then((res) => {
        // console.log(res.results);
        popular_cinima(res.results, sicvel_film, sicvel_film_page)
    })



    function popular_cinima(arr, plase, btn_box) {
        plase.innerHTML = ``
        let btn_Arr = btn_box.querySelectorAll(`button`)
        let col_vo = +btn_box.querySelector(`.page_num`).innerHTML
        btn_box.querySelector(`.page_sum`).innerHTML = Math.round(arr.length / 4)
        let pg_num = +btn_box.querySelector(`.page_sum`).innerHTML
    
    
        for (let i = (col_vo - 1) * 4; i < col_vo * 4; i++) {
    
    
            let img_box = document.createElement(`div`)
            let img = document.createElement(`img`)
            let btn = document.createElement(`butten`)
            let info = document.createElement(`div`)
            let info_name = document.createElement(`p`)
            let info_ganr = document.createElement(`p`)
    
            img_box.classList.add(`img_box`)
            btn.classList.add(`btn_now_kino`)
    
            btn.innerHTML = "Подробнее"
            img.src = `https://image.tmdb.org/t/p/original` + arr[i].poster_path
    
    
            info.classList.add(`info_img_box`)
            info_name.classList.add(`nc_name`)
            info_ganr.classList.add(`nc_ganr`)
    
            info_name.innerHTML = arr[i].title
    
            fetch(
                "https://api.themoviedb.org/3/genre/movie/list?language=en",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
                    },
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    let info_ganr_tx = ``
                    for (const el of arr[i].genre_ids) {
                        const genres = res.genres.filter(obj => obj.id === el);
                        info_ganr_tx = info_ganr_tx + genres[0].name + `, `
                    }
                    info_ganr.innerHTML = info_ganr_tx.slice(0, -2)
                })
    
            plase.append(img_box)
            img_box.append(img, info)
            info.append(info_name, info_ganr)
            img_box.onmousemove = () => ({
    
    
            })
    
        }
    
    
        btn_Arr[0].onclick = () => {
            if (col_vo > 1) {
                btn_box.querySelector(`.page_num`).innerHTML = col_vo - 1
    
                popular_cinima(arr, plase, btn_box)
            }
        }
        btn_Arr[1].onclick = () => {
            if (col_vo < pg_num) {
                btn_box.querySelector(`.page_num`).innerHTML = col_vo + 1
    
                popular_cinima(arr, plase, btn_box)
            }
        }
    
    
    }