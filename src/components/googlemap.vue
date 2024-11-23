<script setup>
import { onMounted  , watchEffect , ref ,defineProps} from 'vue';
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
const props = defineProps({
  lat: Number,
  lng: Number
})

let map;
let userGeoMarker ;
const coords = ref({
  latitude: Number.POSITIVE_INFINITY,
  longitude: Number.POSITIVE_INFINITY
});
const userMarker = ref({
  latitude: props.lat,
  longitude: props.lng
});
onMounted(() => {
    map = leaflet.map("map").setView([userMarker.value.latitude, userMarker.value.longitude], 13);
    
    leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map);
    const customIcon = leaflet.icon({
        iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [35, 36], 

      });

    leaflet
      .marker([props.lat, props.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`Saved Marker at (<strong>${props.lat.toFixed(2)},${props.lng.toFixed(2)}</strong>)`);

});


watchEffect(() => {
  if (coords.value.latitude !== Number.POSITIVE_INFINITY && coords.value.longitude !== Number.POSITIVE_INFINITY) {
    userMarker.value.latitude = coords.value.latitude;
    userMarker.value.longitude = coords.value.longitude;

    if (userGeoMarker) {
      map.removeLayer(userGeoMarker);
    }
    const customIcon = leaflet.icon({
        iconUrl: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [35, 36], 
      });

    userGeoMarker = leaflet.marker([userMarker.value.latitude, userMarker.value.longitude],{ icon: customIcon }).addTo(map).bindPopup("User Marker");

    map.setView([userMarker.value.latitude, userMarker.value.longitude], 13);

    const el = userGeoMarker.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }
  }
});
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
width: 100%;
height: 600px;
}
@media (max-width: 1024px) {
#map {
    width: 100%;
    height: 400px;
}
}
.leaflet-control-attribution {
display: none !important;
}
</style>
