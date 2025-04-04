<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from '@/store/store';
import { mkadPoints } from '@/utils/const/mkadCoordinates';

const store = useStore();

const createMKADArea = (myMap) => {
  const myPolygon = new window.ymaps.Polygon([mkadPoints]);
  myMap.geoObjects.add(myPolygon);
  return myPolygon;
};

const getDistance = (distance) => Math.round(distance) / 1000;

const defineInfoText = (text) => {
  store.defineInfoText(text);
};

onMounted(() => {
  window.ymaps.ready(() => {
    const createPlacemark = (coords) => new window.ymaps.Placemark(coords);
    let myPlacemark;

    const myMap = new window.ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 9,
    }, { searchControlProvider: 'yandex#search' });

    const myPolygon = createMKADArea(myMap);
    let myRoute = null;
    let line = null;

    myMap.events.add('click', async (e) => {
      if (store.isLoading) return;

      if (myRoute) {
        myMap.geoObjects.remove(myRoute);
      }

      const coords = e.get('coords');
      const savedCoords = JSON.parse(localStorage.getItem('saved coords')) || [];
      savedCoords.push(coords);
      localStorage.setItem('saved coords', JSON.stringify(savedCoords));

      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      } else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
      }

      const closePoint = myPolygon.geometry.getClosest(coords);
      if (line) {
        myMap.geoObjects.remove(line);
      }

      line = new window.ymaps.Polyline([coords, closePoint.position], {}, {
        strokeWidth: 4,
        strokeStyle: '1 5',
      });
      myMap.geoObjects.add(line);

      store.isLoading = true;
      let locationDetails = await new Promise((resolve) => {
        window.ymaps.route([coords, closePoint.position], { routingMode: 'auto' })
          .then((route) => {
            myRoute = route;
            myMap.geoObjects.add(myRoute);
            myMap.geoObjects.remove(myPlacemark);
            resolve(`Расстояние по дороге: ${getDistance(myRoute.getLength())} км. Расстояние по небу: ${getDistance(closePoint.distance)} км.`);
            store.isLoading = false;
          });
      });

      locationDetails += await new Promise((resolve) => {
        window.ymaps.geocode(coords)
          .then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const answerOne = firstGeoObject.getAddressLine();
            resolve(`Адрес метки: ${answerOne}`);
          });
      });

      defineInfoText(locationDetails);
    });
  });
});
</script>

<style>
#map {
  height: 100vh;
}
</style>
