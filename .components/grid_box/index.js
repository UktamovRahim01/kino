export function rel_grid(arr, plase, n) {

    for (let i = 0; i < 6; i++) {


        let img_gr_box = document.createElement(`div`)
        let img_gr_img = document.createElement(`img`)

        img_gr_box.classList.add(`img_gr_box`)
        if (i === 0 || i === n) {
            img_gr_box.classList.add(`large`)
        }
        // console.log(arr[i].file_path);
        img_gr_img.src = arr[i] ? `https://image.tmdb.org/t/p/original${arr[i].file_path}` : `/public/free_poster.svg`
        img_gr_box.append(img_gr_img)
        plase.append(img_gr_box)
    }


}