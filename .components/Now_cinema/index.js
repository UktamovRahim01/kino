import Swiper from 'swiper';
import 'swiper/css';


let now_cinima_length = 8
export function now_cinima(arr, plase, now_kino_btn) {
    plase.innerHTML = ``
    // now_kino_btn.innerHTML = ``
    let bg_poster = document.querySelector(`.bg_poster`)
    let par_plase = plase.parentElement

    for (let i = 0; i < now_cinima_length; i++) {

        
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
        img_box.append(img, btn, info)
        info.append(info_name, info_ganr)
        img_box.onmousemove = () => ({


        })

        // const img_box = document.querySelector(".image-container");
        // const image = img_box.querySelector(".image");
        const hoverButton = img_box.querySelector(".hover-button");

        img_box.addEventListener("mouseenter", () => {
            btn.style.opacity = "1";
            img.style.filter = "brightness(0.5)"; // Затемнение изображения
            bg_poster.style.backgroundImage = arr[i].backdrop_path ? `url(https://image.tmdb.org/t/p/original${arr[i].backdrop_path})` : `url(/public/defoult-bg.png)`
        });

        img_box.addEventListener("mouseleave", () => {
            btn.style.opacity = "0";
            img.style.filter = "brightness(1)"; // Возврат нормальной яркости изображения
        });


        btn.onclick = () => {
            window.open("/page/cino_cart/?id=" + arr[i].id, '_blank')
        }


    }

    if (now_cinima_length === 8) {
        now_kino_btn.innerHTML = `Все новинки`
    }
    else {
        now_kino_btn.innerHTML = `Скрыть`
    }
    // par_plase.append(now_kino_btn)
    now_kino_btn.onclick = () => {
        if (now_cinima_length === 8) {
            now_cinima_length = arr.length
            now_cinima(arr, plase, now_kino_btn)
        }
        else {
            now_cinima_length = 8
            now_cinima(arr, plase, now_kino_btn)
        }
    }

}