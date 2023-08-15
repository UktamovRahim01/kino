export function now_cinima(arr, plase) {
    plase.innerHTML = ``

    for (let i = 0; i < 8; i++) {


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
                    info_ganr_tx =  info_ganr_tx + genres[0].name + `, `
                }
                info_ganr.innerHTML = info_ganr_tx.slice(0, -2)
            })

        plase.append(img_box)
        img_box.append(img, info)
        info.append(info_name, info_ganr)
        img_box.onmousemove = () => ({


        })

    }

}



export function grabScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        container.classList.add('active');
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}