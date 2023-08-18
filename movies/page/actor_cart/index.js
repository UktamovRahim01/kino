let img_big_box = document.querySelector(`.img_big_box`)
let person_id = 64
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const movieId = url.searchParams.get("id");
const bg_poster = document.querySelector('.bg_poster');
// fetch(
//     `https://api.themoviedb.org/3/person/${person_id}/images`,
//     // "https://api.themoviedb.org/3/person/{person_id}/images",
//     {
//       headers: {
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((res) => {console.log(res);})






console.log(movieId);
// fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
//     {
//         headers: {
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
//         },
//     }
//     )
//     .then((res) => res.json())
//     .then((res) => { console.log(res)
//         bg_poster.style.backgroundImage = res.backdrop_path ? `url(https://image.tmdb.org/t/p/original${res.backdrop_path})` : `url(/public/defoult-bg.png)`
// })