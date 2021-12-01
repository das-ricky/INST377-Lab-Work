/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-var */
/* eslint-disable indent */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */

async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint)
    const places = await request.json()
    var map = L.map('map').setView([38.989, -76.937], 13);
    var markers = L.layerGroup().addTo(map);
    function findMatches(word, places) {
      return places.filter((place) => {
        const regex = new RegExp(word, 'gi');
        return place.name.match(regex) || place.category.match(regex)
      });
    }

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoicmlja3lkYXMiLCJhIjoiY2t3bjQwdHU3MGx2dzJvcHI0dWJlcXNxaSJ9.2HAQeRuH6cT5BTqPxQ_yEg'
    }).addTo(map);

    function compareZip(a, b) {
        if (Math.abs(a.zip - 20740) < Math.abs(b.zip - 20740)) return -1;
        if (Math.abs(a.zip - 20740) === Math.abs(b.zip - 20740)) return 0;
        if (Math.abs(a.zip - 20740) > Math.abs(b.zip - 20740)) return 1;
    }

    function displayMatches(event) {
      markers.clearLayers();
      const matchArray = findMatches(event.target.value, places);
      matchArray.sort(compareZip);
      matchArray.length = 5;
      const html = matchArray.map((place) => {
        L.marker([place.geocoded_column_1.coordinates[1], place.geocoded_column_1.coordinates[0]]).addTo(markers);
        return `
        <li class = "box" style="margin-bottom:10px">
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
      // eslint-disable-next-line no-use-before-define
      if (document.querySelector('.search').value.length === 0) { 
        document.querySelector('.suggestions').innerHTML = '';
        markers.clearLayers();
      }
    }
  
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
  
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
  }
  
  window.onload = windowActions;