/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

// Возьмите свой код из предыдущей практики
document.addEventListener("DOMContentLoaded", () => {
	// Массив фильмов
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};
	// Элементы со страницы
	const adRemov = document.querySelectorAll(".promo__adv img"),
		poster = document.querySelector(".promo__bg"),
		genre = poster.querySelector(".promo__genre"),
		movieList = document.querySelector(".promo__interactive-list"),
		addForm = document.querySelector("form.add"),
		addInput = addForm.querySelector(".adding__input"),
		checkbox = addForm.querySelector('[type="checkbox"]');

	// Удаление рекламы
	const deleteAdv = () => {
		adRemov.forEach((item) => {
			item.remove();
		});
	};
	// Замена слов и картинки
	const makeChanges = () => {
		poster.style.backgroundImage = "url('img/bg.jpg')";
		genre.textContent = "драма";
	};
	// Сортировка массива
	const sortArr = (arr) => {
		arr.sort();
	};
	// Событие добовления фильма на страницу
	addForm.addEventListener("submit", (event) => {
		event.preventDefault();
		let newFilm = addInput.value;
		const favorite = checkbox.checked;
		if (newFilm.length > 21) {
			console.log(newFilm.length);
			// newFilm.slice(0, 5);
			movieDB.movies.push(`${newFilm.slice(0, 21)}...`);
		} else {
			movieDB.movies.push(newFilm);
		}
		if (favorite) {
			console.log("Добавляем любимый фильм");
		}
		sortArr(movieDB.movies);
		createMovieList(movieDB.movies, movieList);
		addForm.reset();
	});
	// Создание добавленного элемента на страницу
	function createMovieList(films, parent) {
		parent.innerHTML = "";
		sortArr(films);
		films.forEach((film, i) => {
			parent.innerHTML += `
			<li class="promo__interactive-item">${i + 1}) ${film}
			<div class="delete"></div>
			</li>
			`;
		});
		const deleteFilm = document.querySelectorAll(".delete").forEach((btn, i) => {
			btn.addEventListener("click", () => {
				btn.parentElement.remove();
				movieDB.movies.splice(i, 1);
				createMovieList(films, parent);
			});
		});
	}

	// Удаление рекламы
	deleteAdv();
	// Замена картинки и слова
	makeChanges();
	// Сортировка массива

	// Создание элемента на странице
	createMovieList(movieDB.movies, movieList);
});
