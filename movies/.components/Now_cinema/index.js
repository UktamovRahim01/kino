import Swiper from 'swiper';
import 'swiper/css';


let now_cinima_length = 8
export function now_cinima(arr, plase) {
    plase.innerHTML = ``
    let btn = document.querySelector(`.now_kino_btn`)
    plase.parentElement.querySelector(`button`).remove()
    let bg_poster = document.querySelector(`.bg_poster`)
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

    let par_plase = plase.parentElement
    let now_kino_btn = document.createElement(`button`)
    if (now_cinima_length === 8) {
        now_kino_btn.innerHTML = `Все новинки`
    }
    else {
        now_kino_btn.innerHTML = `Скрыть`
    }
    now_kino_btn.classList.add(`now_kino_btn`)
    par_plase.append(now_kino_btn)
    now_kino_btn.onclick = () => {
        if (now_cinima_length === 8) {
            now_cinima_length = arr.length
            now_cinima(arr, plase)
        }
        else {
            now_cinima_length = 8
            now_cinima(arr, plase)
        }
    }
}

// *********************************************************

// export function grabScroll(container) {
//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     container.addEventListener('mousedown', (e) => {
//         isDown = true;
//         startX = e.pageX - container.offsetLeft;
//         scrollLeft = container.scrollLeft;
//     });
//     container.addEventListener('mouseleave', () => {
//         isDown = false;
//         container.classList.remove('active');
//     });
//     container.addEventListener('mouseup', () => {
//         isDown = false;
//         container.classList.remove('active');
//     });
//     container.addEventListener('mousemove', (e) => {
//         if (!isDown) return;
//         container.classList.add('active');
//         e.preventDefault();
//         const x = e.pageX - container.offsetLeft;
//         const walk = (x - startX) * 2;
//         container.scrollLeft = scrollLeft - walk;
//     });
// }



// *************************************


// export function treyler_vid(vid, iframe) {
//     // console.log(arr[1].id);



//     fetch(
//         `https://api.themoviedb.org/3/movie/${vid}/videos`,
//         {
//             headers: {
//                 Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//             },
//         }
//     )
//         .then((res) => res.json())
//         .then((res) => res.results)
//         .then((res) => {
//             let random = Math.round(Math.random() * res.length)
//             // console.log(random);
//             let iframe = document.querySelector(`iframe`)
//             iframe.src = `https://www.youtube.com/embed/${res[random].key}`

//         })

// }
// // ************


// export function treyler_vides(vid, iframe) {
//     const data = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"];

//     const swiperWrapper = document.getElementById("swiperWrapper");
//     const prevButton = document.getElementById("prevButton");
//     const nextButton = document.getElementById("nextButton");

//     let currentIndex = 0;

//     function updateSwiper() {
//       swiperWrapper.innerHTML = "";

//       for (let i = currentIndex; i < currentIndex + 4 && i < data.length; i++) {
//         const item = document.createElement("div");
//         item.classList.add("swiper-item");
//         item.textContent = data[i];
//         swiperWrapper.appendChild(item);
//       }
//     }

//     prevButton.addEventListener("click", () => {
//       if (currentIndex > 0) {
//         currentIndex--;
//         updateSwiper();
//       }
//     });

//     nextButton.addEventListener("click", () => {
//       if (currentIndex + 4 < data.length) {
//         currentIndex++;
//         updateSwiper();
//       }
//     });

//     updateSwiper();


// }



