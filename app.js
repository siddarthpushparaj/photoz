// Selectors and Variables
const auth = '563492ad6f917000010000010de73b521ec148999c6ebedee73d65c7';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const moreBtn = document.querySelector('.more');
let searchValue;
let pageCount = 1;
let currentSearch;
let fetchLink;

// Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
	e.preventDefault();
	currentSearch = searchValue;
	searchPhotos(searchValue);
});
moreBtn.addEventListener('click', loadMore);

// Functions
async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth,
		},
	});
	return await dataFetch.json();
}

function generatePhotos(data) {
	data.photos.forEach((photo) => {
		const galleryImg = document.createElement('div');
		galleryImg.classList.add('gallery-img');
		galleryImg.innerHTML = `
        <div class="photo-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}" download target="_blank"> Download </a>
        </div>
        <img src="${photo.src.large}">
        `;
		gallery.appendChild(galleryImg);
	});
}

async function curatedPhotos() {
	fetchLink = 'https://api.pexels.com/v1/curated?&page=1';
	const data = await fetchApi(fetchLink);
	generatePhotos(data);
}

async function searchPhotos(search) {
	clear();
	fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&page=1`;
	const data = await fetchApi(fetchLink);
	generatePhotos(data);
}

function updateInput(e) {
	searchValue = e.target.value;
}

function clear() {
	gallery.innerHTML = '';
	searchInput.value = '';
}

async function loadMore() {
	pageCount++;
	if (currentSearch) {
		fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&page=${pageCount}`;
	} else {
		fetchLink = `https://api.pexels.com/v1/curated?&page=${pageCount}`;
	}

	const data = await fetchApi(fetchLink);
	generatePhotos(data);
}

curatedPhotos();
