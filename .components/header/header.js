searchReload()
let header = document.querySelector(`.header`)

reloadHeader(header)

function reloadHeader(place) {
    let headerLeft = document.createElement("div");
    let headerLeftLogo = document.createElement("div");
    let logoLink = document.createElement("a");
    let logoImg = document.createElement("img");
    let headerLeftSocial = document.createElement("div");
    let socialList = document.createElement("ul");


    headerLeft.className = "header__left";
    headerLeftLogo.className = "header__left-logo";
    headerLeftSocial.className = "header__left-social";

    logoLink.href = "/";

    logoImg.src = "/public/logo.svg";
    logoImg.alt = "Kinoarea-logo";

    logoLink.appendChild(logoImg);
    headerLeftLogo.appendChild(logoLink);



    let socialIcons = [
        "/public/vk-logo.svg",
        "/public/instagram-logo.svg",
        "/public/facebook.svg",
        "/public/twitter.svg"
    ];

    for (let iconSrc of socialIcons) {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        let iconImg = document.createElement("img");

        link.href = "#";
        iconImg.src = iconSrc;
        iconImg.alt = "social-icon";

        link.appendChild(iconImg);
        listItem.appendChild(link);
        socialList.appendChild(listItem);
    }

    headerLeftSocial.appendChild(socialList);
    headerLeft.appendChild(headerLeftLogo);
    headerLeft.appendChild(headerLeftSocial);
    place.appendChild(headerLeft);


    let headerCenter = document.createElement("div");
    let navigation = document.createElement("nav");
    let navigationList = document.createElement("ul");
    let navigationItems = [
        "Афиша",
        "Медиа",
        "Фильмы",
        "Актёры",
        "Новости",
        "Подборки",
        "Категории"
    ];

    headerCenter.className = "header__center";
    navigation.className = "header__center-navigation";
    navigationList.className = "navigation__list";

    for (let itemText of navigationItems) {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        link.href = "#";
        link.textContent = itemText;
        listItem.append(link);
        navigationList.append(listItem);
    }

    navigation.append(navigationList);
    headerCenter.append(navigation);
    place.append(headerCenter);

    let link_arr = navigationList.children
    let movies_data = JSON.parse(localStorage.getItem("favoriteMoves")) || null
    let actors_data = JSON.parse(localStorage.getItem("favoriteActors")) || null

    link_arr[2].onclick = () => {
        if (movies_data && movies_data[0]) {
        window.open("/page/cino_cart/?id=" + movies_data[0], '_blank')
    }
    }


    link_arr[3].onclick = () => {
        if (actors_data && actors_data[0]) {
        window.open("/page/cino_cart/?id=" + actors_data[0], '_blank')
    }
    }

    const divLoged = document.createElement('div');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    const detailsWrapper = document.createElement('div');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const divUserFoto = document.createElement('div');
    const img = document.createElement('img');

    divUserFoto.onclick = () => {
        location.assign(`/page/profile/`)
    }
    span1.onclick = () => {
        location.assign(`/page/profile/`)
    }

    span2.onclick = () => {
        localStorage.removeItem("user_auth")
        location.reload()
    }


    summary.textContent = 'Amir';
    summary.id = 'user-name';
    divLoged.classList.add('loged');
    detailsWrapper.classList.add('details-wrapper');
    divUserFoto.classList.add('user-foto');
    span1.textContent = 'Кабинет';
    span2.textContent = 'Выйти';

    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAAD///+1tbXy8vKNjY1ubm5MTEyampppaWnx8fH4+Pjb29v19fUlJSVSUlLi4uK9vb3Kysqtra1+fn6ioqJ4eHjp6enDw8MyMjLQ0NBZWVk/Pz8WFhZHR0fU1NRzc3M6OjoLCwucnJxhYWGHh4ceHh4jIyMZGRkrKyuQiNwPAAAC+ElEQVR4nO3a6XqqMBCAYYOoIIiIuNZau9r7v8IjSz0oi4AkwPN872/NzMgkhMhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTOe9sJyDYetxt/tpUdQJMcoJDjf3zKjjH8lR0hz1bf2ZrsCzgYzF3pITKt3KEwvxQE2omZgih3Pr25EGLhqIjliYWKMAnjiSUC/reScLoQeyWBIlt9EVYn5ktFEQ0hTEWhBueVa0bliY2S9gy8BM2iJJLhrePqxNQ/KwkZml4CnqRHcXxLXClrz1AQeCg3xOWOJxI2andPWhBT4s1wtnTtZHlT/yAvWJZVGFaXNLqhrcUNte0Z2EaBZaxq++TEa6U9Q/FP/NPwsC+3E6+d9gxpcfQmx/xZbqap8sR81WSM0vZ/P29jI47uJ1577RmyG61w78+zqmupPUPeNYmnh3qdHDOra609Q6f/aTz19Dv7ypp4Efe1qWzrSCzmRt0xDm+amVedsD+aTLc6I5GLV2uE6Ak2j9Vie0aSi55d+dvj3IkXt+eLhJSrGd0k9Fblq5cn2NyJF5pOunD2ettgpZ+AD8HRUTGr0s8ljXOXVqnTUqNw4sXt2erqmbC5z+zR44WT3kin2RMlyZeSzq4guayNdIaOtGdkmZHgLnN5OC83dsaH0zqweiZlXxPvdPupn7fsjXTasEPtGcnLdO3qxut2e3IM3duVu3YX1qjtelL2j7Mur2PtGZk0Vl732jOSulfU1MH2jD2+cZfRyfaMlV5D8nW1PWPFG+cSutuesSfr0zrcnrFnrqHZ7faM5Z88PHLsenvGip/P8yl4ZaIhfp3yTFn/38hQY9d2rH0e145HJxH3tFPbGVelVymvV+15VX417Vt7/hmXbc/erJ4pWecY99a9bM+rh1Nxo/I9KSlWReVZKt4XlO43b2tz1NW8T6eAs0jPPa0nO8+y3lfaPH4eNi1Xl/4qclsO3wrfowMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB66B90Khxsnli+aAAAAABJRU5ErkJggg==';
    img.alt = 'user-foto';


    details.append(summary, detailsWrapper);
    detailsWrapper.append(span1, span2);
    divUserFoto.append(img);
    divLoged.append(details, divUserFoto);


    let headerRight = document.createElement("div");
    let searchButton = document.createElement("button");
    let searchIcon = document.createElement("img");
    let loginButton = document.createElement("button");
    let confirmButton = document.createElement("button");
    let loginSpan = document.createElement("span");

    headerRight.className = "header__right";
    searchButton.className = "header__right-search button";
    loginButton.className = "header__right-login button";
    confirmButton.className = "header__right-confirm button";
    loginSpan.textContent = "Войти";
    confirmButton.textContent = "Подтвердить";
    searchIcon.src = "/public/search.svg";
    searchIcon.alt = "search";


    searchButton.append(searchIcon);
    headerRight.append(searchButton);
    loginButton.append(loginSpan);
    headerRight.append(loginButton, confirmButton, divLoged);

    place.append(headerRight);
}


let search_bg = document.querySelector(".search-bg")
let close_search = document.querySelector(".close-search")
let modal = document.querySelector(`.search`)
let user_box_search = document.querySelector(`.header__right-search`)
let loged = document.querySelector(".loged")

console.log(modal);

user_box_search.onclick = () => {
    modal.style.display = "block"
    search_bg.style.display = "block"
    document.body.style.overflowY = "hidden"
}

function closeSearch(btn) {
    btn.onclick = () => {
        search_wrapper.innerHTML = ""
        document.body.style.overflowY = "auto"
        modal.style.display = "none"
        search_bg.style.display = "none"
    }
}

search_bg.onclick = () => {
    console.log("Asf");
}
closeSearch(search_bg)
closeSearch(close_search)

// ************************************************************************************************************************


function searchReload() {
    let searchBg = document.createElement('div');
    let search = document.createElement("div")
    let search_wrapper = document.createElement("div")
    let searchContainer = document.createElement('div');
    let logoImage = document.createElement('img');
    let searchForm = document.createElement('form');
    let searchInput = document.createElement('input');

    searchBg.classList.add('search-bg');
    search.classList.add("search")
    search_wrapper.classList.add("search-wrapper")
    searchContainer.classList.add('search-container');
    searchForm.classList.add('form');


    logoImage.src = '/logo.svg';
    logoImage.alt = 'Kinoarea';
    searchForm.name = 'search';
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск...';



    let searchButton = document.createElement('button');
    searchButton.id = 'search-button';
    searchButton.type = 'submit';

    let searchIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let searchPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    searchIconSVG.classList.add('svg-icon', 'search-icon');
    searchIconSVG.setAttribute('aria-labelledby', 'title desc');
    searchIconSVG.setAttribute('role', 'img');
    searchIconSVG.setAttribute('viewBox', '0 0 19.9 19.7');
    searchPath.setAttribute('fill', 'none');
    searchPath.setAttribute('stroke', '#000');
    pathElement.setAttribute('stroke-linecap', 'square');
    pathElement.setAttribute('d', 'M18.5 18.3l-5.4-5.4');
    circleElement.setAttribute('cx', '8');
    circleElement.setAttribute('cy', '8');
    circleElement.setAttribute('r', '7');

    searchPath.append(pathElement, circleElement);
    searchIconSVG.append(searchPath);
    searchButton.append(searchIconSVG);

    let closeButton = document.createElement('button');
    closeButton.className = 'close-search';
    closeButton.type = 'reset';

    let closeIcon = document.createElement("img");
    closeIcon.src = "/public/close.svg"

    closeButton.append(closeIcon);
    searchButton.append(searchIconSVG);
    searchForm.append(searchInput, searchButton, closeButton);
    searchContainer.append(logoImage, searchForm, search_wrapper)

    search.append(searchContainer)

    document.body.append(searchBg, search);
}


// ******************************************
let search_wrapper = document.querySelector(".search-wrapper")

let forma = document.forms.search
let search_input = forma.querySelector("input")

forma.onsubmit = (e) => {
    console.log(search_wrapper);
    e.preventDefault()

    //     if (search_input !== '') {
    //         getData(`/search/multi?query=${search_input.value}&include_adult=false&language=ru-RU&page=1`)
    //             .then(res => {
    //                 let results = res.data.results

    //                 reloadSearchComponents(results, search_wrapper)

    //                 e.target.reset()
    //             })
    //     }


    if (search_input.value !== '') {
        fetch(
            `https://api.themoviedb.org/3/search/multi?query=${search_input.value}&include_adult=false&language=ru-RU&page=1')`,
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
                },
            }
        )
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                let results = res.results

                reloadSearchComponents(results, search_wrapper)

                e.target.reset()
            })
    }

}

function reloadSearchComponents(arr, place) {
    place.innerHTML = ""
    for (const item of arr) {
        const div = document.createElement("div")
        const img_box = document.createElement("div")
        const img = document.createElement("img")
        const title_box = document.createElement("div")
        const all_genres = document.createElement("span")
        const title = document.createElement("h3")
        const orig_title = document.createElement("h4")
        const rating = document.createElement("span")

        div.classList.add("wrapper-item")
        img_box.classList.add("img-box")
        rating.classList.add("rating")
        all_genres.classList.add("genres")

        //   getData(/genre/movie/list?api_key=${API_KEY}&language=ru-RU)
        //     .then(res => {
        //       let genres = res.data.genres;
        //       let finded = []
        //       if (item.genre_ids) {
        //         item.genre_ids.forEach(genre_id => {
        //           const genre = genres.find(genre => genre.id === genre_id);
        //           if (genre) {
        //             finded.push(genre.name)
        //           }
        //         })
        //         all_genres.innerHTML = finded.join(", ")
        //         all_genres.title = finded.join(", ")
        //       }
        //     })

        title.innerHTML = item.name ? item.name : item.title
        orig_title.innerHTML = item.original_name ? item.original_name : item.original_title
        rating.innerHTML = item.vote_average ? (+item.vote_average).toFixed(2) : (+item.popularity).toFixed(2)
        img.src = item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : `/public/free_poster.svg`

        div.onclick = () => {
            window.open("/pages/about-movie/?id=" + item.id, '_blank')
        }

        div.append(img_box, title_box, rating)
        img_box.append(img)
        title_box.append(title, orig_title, all_genres)

        place.append(div)
    }
}














//   ***************************************************

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGNlNWQ1ZWFiYjllMTJlZWQ2NWVjNDFmYzk5YjMzNiIsInN1YiI6IjY0ZGE0MGJlZDEwMGI2MDBhZGEyODRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnzpD5IofvGBvsUcw084Jpw_W5WhXXGHvdAqukAAJF0"
const login_btn = document.querySelector(".header__right-login")
const confirm_btn = document.querySelector(".header__right-confirm")
const user_foto = document.querySelector(".user-foto img")
const user_name = document.querySelector("#user-name")
let reqToken

login_btn.onclick = () => {
    fetch('https://api.themoviedb.org/4/auth/request_token', {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                reqToken = res.request_token
                window.open(`https://www.themoviedb.org/auth/access?request_token=${res.request_token}`)
                login_btn.style.display = "none"
                confirm_btn.style.display = "block"
            }

        })
}

confirm_btn.onclick = () => {
    fetch(`https://api.themoviedb.org/4/auth/access_token`, {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            request_token: reqToken
        }),
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('user_auth', JSON.stringify(res))
                location.reload()
            }
            else {
                alert("Не удалось авторизоваться")
                login_btn.style.display = "block"
                confirm_btn.style.display = "none"
            }
        })
}

let user_auth = JSON.parse(localStorage.getItem('user_auth')) || null

if (user_auth) {
    fetch(`https://api.themoviedb.org/3/account/${user_auth?.account_id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            localStorage.setItem('user_data', JSON.stringify(res))
            login_btn.style.display = "none"
            loged.style.display = "flex"
            user_foto.src = `https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}`
            user_name.innerHTML = res.username
        })
}