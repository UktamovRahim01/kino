const iframe = document.querySelector("iframe")
const trailer_title = document.querySelector(".new-trailers__content .info__title")
const currentYear = new Date().getFullYear();
const trailers_list = document.querySelector('.content__wrapper');
const in_cinema = document.querySelector('.in-cinema__content');

export function relod_treyler(arr, plase) {


    arr.forEach(el => {
        fetch(
            `https://api.themoviedb.org/3//movie/${el.id}/videos`,
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
                },
            }
            )
            .then((res) => res.json())
            .then((res) => {
                document.querySelectorAll(".banner-bg").forEach(el => el.classList.remove("active"))
                let trailer = res.results
                let first_trailer = true
                if (trailer.length !== 0) {
                    const div = document.createElement('div');
                    const thumbnailElement = document.createElement('div');
                    const thumbnailImage = document.createElement('img');
                    const titleElement = document.createElement('span');
                    const banner_bg = document.createElement("div")
                    const polygon = document.createElement("img")

                    div.classList.add('wrapper__item')
                    thumbnailElement.classList.add('item-thumbnail')
                    titleElement.classList.add('item-title')
                    banner_bg.classList.add("banner-bg")
                    polygon.classList.add("polygon")

                    polygon.src = "/public/polygon.svg"
                    thumbnailImage.src = el.poster_path ? `https://image.tmdb.org/t/p/original${el.backdrop_path}` : `/public/default-poster.jpg`
                    titleElement.textContent = el.title

                    if (first_trailer) {
                        first_trailer = false
                        iframe.src = `https://www.youtube.com/embed/${trailer[0].key}`
                        banner_bg.classList.add('active')
                        trailer_title.textContent = el.title
                    }
                    div.onclick = () => {
                        document.querySelectorAll(".banner-bg").forEach(el => el.classList.remove("active"))
                        banner_bg.classList.add('active')
                        iframe.src = `https://www.youtube.com/embed/${trailer[0].key}`
                        trailer_title.textContent = el.title
                    }

                    div.append(thumbnailElement, titleElement, banner_bg);
                    thumbnailElement.append(thumbnailImage, banner_bg, polygon);

                    trailers_list.append(div);
                }

            })



    });



}