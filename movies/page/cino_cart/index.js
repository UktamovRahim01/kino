// // import { getData } from "/modules/http";

// import axios from "axios";

// export const BASE_URL = `https://api.themoviedb.org/3`

// export const getData = async (path) => {
//   try {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//       }
//     };
    
//     const res = await axios.get(BASE_URL + path, options)
    
//     return res
//   } catch (e) {
//     throw new Error('Something went wrong ' + e.message)
//   }
// }

// const page_title = document.querySelector("#page-title")
// const API_KEY = 'f1d5beaab7f191450fc1bdd4b37d1f96';

// getData(`/movie/${movieId}?api_key=${API_KEY}&language=ru-RU`)
//   .then(res => {
    //     let item = res.data
    //     console.log(item);
    //     // page_title.textContent = item.title
    //   })
    
    
    
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const movieId = url.searchParams.get("id");
    const bg_poster = document.querySelector('.bg_poster');


fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
        },
    }
    )
    .then((res) => res.json())
    .then((res) => { console.log(res)
        bg_poster.style.backgroundImage = res.backdrop_path ? `url(https://image.tmdb.org/t/p/original${res.backdrop_path})` : `url(/public/defoult-bg.png)`
})