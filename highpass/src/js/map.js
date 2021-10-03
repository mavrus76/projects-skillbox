// MAP
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76953456898229,37.63998549999998],
    zoom: 16,
  });

  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [55.76953456898229,37.63998549999998],
    },
  });

  var myPlacemark = new ymaps.Placemark(
    [55.76953456898229,37.63998549999998],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "../img/location.svg",
      iconImageSize: [12, 12],
      iconImageOffset: [0, 0],
    }
  );
  myMap.geoObjects.add(myPlacemark);

  // myMap.geoObjects.add(myGeoObject);
  myMap.geoObjects.add(myPlacemark);

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove("searchControl"); // удаляем поиск
  myMap.controls.remove("trafficControl"); // удаляем контроль трафика
  myMap.controls.remove("typeSelector"); // удаляем тип
  myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove("rulerControl"); // удаляем контрол правил
}
