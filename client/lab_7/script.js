function toggleSpanVisibility(evt) {
  console.log('Click primary button', evt.target)
const button = evt.target;
const target = document.querySelector('#demo_box');
  console.log(target.classList);
  if (target.classList.value.includes('visible')) {
    console.log('found item');
    target.classList.remove('visible');
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
    target.classList.add('visible')
  }
}
async function fetchRequest(url) {
  try {
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (err) {
    console.error(err);
    return err;
  }
}

function filterFunction(event, data, list, mymap) {
    list.innerHTML = '';
    console.log(event.target.value);
      const filteredList = data.filter((item, index) => {
          const zipcode = event.target.value;
          return item.zip === zipcode;
      });
      console.table(filteredList);
      const limitedList = filteredList.slice(0, 5);
      limitedList.forEach((item, index) => {
          const point = item.geocoded_column_1;
          if (!point || !point.coordinates) { 
            console.log(item); 
            return; 
            }
          const latLong = point.coordinates;
          const marker = latLong.reverse();

          list.innerHTML +='<span class="resto-name">${item.name}</span><br>';
          console.log(marker);
          L.marker(marker).addTo(mymap);
      });
    
}
async function mainThread() {
  console.log('loaded main script');
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const inputBox = document.querySelector('#zipcode');
  const visibleListofFilteredItems = document.querySelector('.append-box');
  const ACCESSTOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';



  const mymap = L.map('mapid').setView([38.989, -76.93], 2);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTEOKEN})', {
      attribution: 'Map data &copy; <a href= https://www.openstreetmap.org/copyright>OpenStreetMap</a>  contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  }).addTo(mymap)

  const targetElement = document.querySelector('.click_demo');
  targetElement.addEventListener('click', (event) => toggleSpanVisibility(event));

  const data = await fetchRequest(url);
  console.log('external dataset', data);

  inputBox.addEventListener('input', (event) => {filterFunction(event, data, visibleListofFilteredItems, mymap); });
      

}



  
window.onload = mainThread;

