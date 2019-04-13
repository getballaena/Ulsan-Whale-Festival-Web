const colors = [
  '#5256FF',
  '#4A78E8',
  '#5EB6FF',
  '#4ACBE8',
  '#52FFF1',
  '#94E0FF',
  '#87B2E8',
  '#94FFE5',
  '#87E4E8',
  '#A1E3FF',
  '#87B1E8'
];

const request = (url) => new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (this.status.toString()[0] === '2') resolve(this.responseText);
    else reject(this.status);
  });
  xhr.open('GET', url);
  xhr.send();
});

const getJson = (url) => request(url).then(JSON.parse);

getJson('http://whale.istruly.sexy:1234/team').then(result => {
  const list = document.querySelector('.team-list > ul');
  
  Object.keys(result).forEach((e, i) => {
    const team = document.createElement('li');
    const circle = document.createElement('span');
    const name = document.createElement('span');
    
    circle.classList = 'circle';
    circle.style.color = colors[i];
    circle.innerText = '●';
    name.innerText = e;
    
    team.appendChild(circle);
    team.appendChild(name);
    list.appendChild(team);
  });
});

getJson('http://whale.istruly.sexy:1234/map/web')
  .then(({ map: status }) => {
    const markers = Object.entries(status).map(e => ({
      position: new daum.maps.LatLng(e[1].latitude, e[1].longitude),
      text: e[1].teamName || '빈 곳',
    }));

    const map = new daum.maps.StaticMap(document.getElementById('map'), {
      center: new daum.maps.LatLng(35.505700, 129.382000),
      level: 2,
      draggable: false,
      marker: markers,
    });
  });