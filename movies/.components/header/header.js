let header = document.querySelector(`.header`)


let logo_box = document.createElement(`div`)
let menu_box = document.createElement(`div`)
let user_box = document.createElement(`div`)


let logo_box_imgb = document.createElement(`div`)
let logo_box_img = document.createElement(`img`)
let logo_box_a = document.createElement(`div`)
let logo_vk = document.createElement(`a`)
let logo_inst = document.createElement(`a`)
let logo_fb = document.createElement(`a`)
let logo_tw = document.createElement(`a`)

let menu_box_poster = document.createElement(`a`)
let menu_box_media = document.createElement(`a`)
let menu_box_films = document.createElement(`a`)
let menu_box_actors = document.createElement(`a`)
let menu_box_news = document.createElement(`a`)
let menu_box_compilations = document.createElement(`a`)
let menu_box_categories = document.createElement(`a`)

let user_box_search = document.createElement(`button`)
let user_box_sign = document.createElement(`button`)
let user_box_search_img = document.createElement(`img`)


logo_box.classList.add(`logo_box`)
menu_box.classList.add(`menu_box`)
user_box.classList.add(`user_box`)
user_box_search.classList.add(`user_box_search`)
user_box_sign.classList.add(`user_box_sign`)

menu_box_poster.innerHTML = `Афиша`
menu_box_media.innerHTML = `Медиа`
menu_box_films.innerHTML = `Фильмы`
menu_box_actors.innerHTML = `Актёры`
menu_box_news.innerHTML = `Новости`
menu_box_compilations.innerHTML = `Подборки`
menu_box_categories.innerHTML = `Категории`
user_box_sign.innerHTML = `Войти`

logo_box_img.src = `/public/cinema_logo.svg`
user_box_search_img.src = `/public/search.svg`

user_box_search.append(user_box_search_img)
header.append(logo_box, menu_box, user_box)
logo_box_imgb.append(logo_box_img)
logo_box.append(logo_box_imgb)
menu_box.append(menu_box_poster, menu_box_media, menu_box_films, menu_box_actors, menu_box_news, menu_box_compilations, menu_box_categories)
user_box.append(user_box_search, user_box_sign)


