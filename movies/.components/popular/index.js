export function popular_cinima(arr, plase, btn_box) {
    plase.innerHTML = ``
    let btn_Arr =btn_box.querySelectorAll(`button`)
    let col_vo = +btn_box.querySelector(`.page_num`).innerHTML
    btn_box.querySelector(`.page_sum`).innerHTML = arr.length/4
    let pg_num = +btn_box.querySelector(`.page_sum`).innerHTML
    

    for (let i = (col_vo-1)*4; i < col_vo*4; i++) {


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


    btn_Arr[0].onclick = () => {
        if (col_vo>1) {
            btn_box.querySelector(`.page_num`).innerHTML = col_vo - 1

            popular_cinima(arr, plase, btn_box)
        }
    }
    btn_Arr[1].onclick = () => {
        if (col_vo<pg_num) {
            btn_box.querySelector(`.page_num`).innerHTML = col_vo + 1

            popular_cinima(arr, plase, btn_box)
        }
    }


}








export function popular_actor(arr, plase, btn_box) {
    console.log(arr);
    plase.innerHTML = ``
   
    for (let i = 0; i < 3; i++) {


        let img_box = document.createElement(`div`)
        let img = document.createElement(`img`)
        let info = document.createElement(`div`)
        let info_num = document.createElement(`p`)
        let info_name = document.createElement(`p`)
        let info_ganr = document.createElement(`p`)

        img_box.classList.add(`img_box`)

       
        img.src = `https://image.tmdb.org/t/p/original` + arr[i].profile_path


        info.classList.add(`info_img_box`)
        info_name.classList.add(`nc_name`)
        info_num.classList.add(`nx_num`)

        info_num.innerHTML = i+1 + `-е место`
        info_name.innerHTML = arr[i].name

        

        plase.append(img_box)
        img_box.append(img, info)
        info.append(info_num, info_name)
        img_box.onmousemove = () => ({


        })



    }


    // btn_Arr[0].onclick = () => {
    //     if (col_vo>1) {
    //         btn_box.querySelector(`.page_num`).innerHTML = col_vo - 1

    //         popular_cinima(arr, plase, btn_box)
    //     }
    // }
    // btn_Arr[1].onclick = () => {
    //     if (col_vo<pg_num) {
    //         btn_box.querySelector(`.page_num`).innerHTML = col_vo + 1

    //         popular_cinima(arr, plase, btn_box)
    //     }
    // }


}
