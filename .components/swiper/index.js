import { getData, API_KEY } from "./http";

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper_container = document.querySelector(".swiper")
const swiper = document.querySelector(".swiper-wrapper")
const anticipated_swiper = document.querySelector(".anticipated-movies__content .swiper")
const anticipated_swiper_container = document.querySelector(".anticipated-movies__content .swiper-wrapper")
const popular_movies = document.querySelectorAll(".popular-movies .categories__list li")
const swiperFunctions = reloadSwiper();

function reloadSwiper() {
	let popular_movies_swipe = new Swiper(swiper_container, {
		modules: [Navigation, Pagination],
		slidesPerView: 4,
		slidesPerGroup: 4,
		spaceBetween: 20,
		grabCursor: true,

		touchRatio: 1,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
		breakpoints: {
			100: {
				spaceBetween: 5,
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			300: {
				spaceBetween: 10,
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			458: {
				slidesPerGroup: 2,
				slidesPerView: 2,
				spaceBetween: 15,
			},
			650: {
				slidesPerView: 3,
				slidesPerGroup: 3,
				spaceBetween: 15,
			},
			900: {
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 20,
			}
		},
	});

	function checkChanges(newTranslate) {
		popular_movies_swipe.setTranslate(newTranslate);
	}

	return {
		checkChanges: checkChanges,
		popular_movies_swipe: popular_movies_swipe
	};
}

getData(`/movie/upcoming?api_key=${API_KEY}&language=ru-RU`)
	.then(res => {
		reload(res.data.results, anticipated_swiper_container, true)

		new Swiper(anticipated_swiper, {
			modules: [Navigation, Pagination],
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 20,
			grabCursor: true,
			loop: true,

			navigation: {
				nextEl: ".anticipated-movies__content .swiper-button-next",
				prevEl: ".anticipated-movies__content .swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			breakpoints: {
				100: {
					spaceBetween: 5,
					slidesPerView: 1,
					slidesPerGroup: 1,
				},
				300: {
					spaceBetween: 10,
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
				450: {
					slidesPerGroup: 2,
					slidesPerView: 2,
					spaceBetween: 15,
				},
				800: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 15,
				},
				900: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 20,
				}
			},
		});
	})







popular_movies.forEach(el => {
	popular_movies[0].classList.add("active")
	getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU`)
		.then(res => {
			reload(res.data.results, swiper)
			reloadSwiper(swiper_container)
		})
	el.onclick = () => {
		swiperFunctions.checkChanges("10")
		let date = el.getAttribute("data-date")
		if (date === "all") {
			getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU`)
				.then(res => {
					reload(res.data.results, swiper)
					reloadSwiper(swiper_container)
					popular_movies.forEach(el => el.classList.remove("active"))
					el.classList.add("active")
				})
		} else {
			getData(`/movie/popular?api_key=${API_KEY}&language=ru-RU&primary_release_year=${date}&certification_country=US&certification.lte=PG-13`)
				.then(res => {
					popular_movies.forEach(el => el.classList.remove("active"))
					el.classList.add("active")
					reload(res.data.results, swiper)
					reloadSwiper(swiper_container)
				})
		}
	}
})













export function reload(arr, place, bool) {
	place.innerHTML = ""
	for (const item of arr) {
		const div = document.createElement("div")
		const banner = document.createElement("div")
		const banner_bg = document.createElement("div")
		const about = document.createElement("div")
		const about_text = document.createElement("span")
		const rating = document.createElement("div")
		const rating_text = document.createElement("span")
		const title = document.createElement("span")
		const subtitle = document.createElement("span")

		div.classList.add("swiper-slide", "content-item")
		banner.classList.add("item-banner", "active")
		banner_bg.classList.add("item-banner__bg", "active")
		rating.classList.add("item-rating")
		about.classList.add("item-about")
		title.classList.add("item-title")
		subtitle.classList.add("item-subtitle")

		about_text.textContent = "Карточка фильма"
		rating_text.textContent = (+item.vote_average).toFixed(2)
		banner.style.backgroundImage = item.poster_path ? `url(https://image.tmdb.org/t/p/original${item.poster_path})` : `url(/public/default-poster.svg)`
		title.textContent = item.title
		title.title = item.title


		if (bool) {
			const releaseDate = parseISO(item.release_date);
			const formattedDate = format(releaseDate, 'd MMMM yyyy', { locale: ru });

			subtitle.textContent = `${formattedDate} в России`
		} else {
			getData(`/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
				.then(res => {
					let genres = res.data.genres;
					let finded = []
					item.genre_ids.forEach(genre_id => {
						const genre = genres.find(genre => genre.id === genre_id);
						if (genre) {
							finded.push(genre.name)
						} else {
							console.log(`${genre_id} не найден.`);
						}
					})
					subtitle.innerHTML = finded.join(", ")
					subtitle.title = finded.join(", ")
				})
		}

		banner.onmouseenter = () => {
			bg_poster.style.opacity = "0"
			setTimeout(() => {
				bg_poster.style.backgroundImage = item.backdrop_path ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` : `url(/public/default-bg.png)`
				bg_poster.classList.add("change")
				bg_poster.style.opacity = ".7"
			}, 500);
		}
		banner.onmouseleave = () => {
			bg_poster.classList.remove("change")
			bg_poster.style.backgroundImage = `url(public/default-bg.png)`
		}

		about.onclick = () => {
			window.open("/pages/about-movie/?id=" + item.id, '_blank')
		}

		div.append(banner, title, subtitle)
		if (bool) {
			banner.append(banner_bg)
		} else {
			banner.append(rating, banner_bg)
		}
		banner_bg.append(about)
		about.append(about_text)
		rating.append(rating_text)

		place.append(div)
	}
}

