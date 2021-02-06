// Selectors and Variables
const auth = '563492ad6f917000010000010de73b521ec148999c6ebedee73d65c7';
const gallery = document.querySelector('.gallery');
// Event Listeners

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
        <a href="${photo.src.original} download> Download </a>"
        </div>
        <img src="${photo.src.large}">
        `;
		gallery.appendChild(galleryImg);
	});
}

async function curatedPhotos() {
	const data = await fetchApi('https://api.pexels.com/v1/curated?&page=1');
	generatePhotos(data);
}

curatedPhotos();
