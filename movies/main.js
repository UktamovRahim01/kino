// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))




const cont = document.querySelector(`.now_kino`);
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
    },
  }
)
  .then((res) => res.json())
  .then((res) => reloud(res.results))

function reloud(arr) {
  cont.innerHTML = ``

  for (const item of arr) {

    let img_box = document.createElement(`div`)
    let img = document.createElement(`img`)
    let btn = document.createElement(`butten`)

    img_box.classList.add(`img_box`)
    btn.classList.add(`btn_now_kino`)

    btn.innerHTML = "Подробнее"
    img.src = `https://image.tmdb.org/t/p/original` + item.poster_path

    cont.append(img_box)
    img_box.append(img)

    img_box.onmousemove = () => ({
    
       
    })

  }

  console.log(arr);
}

