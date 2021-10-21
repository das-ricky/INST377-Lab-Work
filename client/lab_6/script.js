/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const places = [];
fetch(endpoint).then((blob) => blob.json()).then((data) => places.push(...data))
function findMatches(word, places) {
  return places.filter((place) => {
    const regex = new RegExp(word, 'gi');
    return place.name.match(regex) || place.category.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, places);
  const html = matchArray.map((place) => {
    return `
      <li style="margin-bottom:20px;">
        <span class="name">${place.name}</span>
        <br>
        <span class="category">${place.category}</span>
        <br>
        <span class="address" style="font-style:italic">${place.address_line_1}</span>
        <br>
        <span class="city" style="font-style:italic">${place.city}</span>
        <br>
        <span class="zip" style="font-style:italic;">${place.zip}</span>
      </li>
    `;
  }).join('');
  document.querySelector('.suggestions').innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
