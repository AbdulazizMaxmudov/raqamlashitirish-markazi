<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Foydalanuvchi malumotlari</h1>
      <div v-if="user" class="border p-4 rounded shadow-md">
        <p><strong>Ismi:</strong> {{ user.name }}</p>
        <p><strong>Emaili:</strong> {{ user.email }}</p>
        <p><strong>Telefon raqami:</strong> {{ user.phone }}</p>
        <p><strong>Veb-sayt:</strong> <a :href="'http://' + user.website" target="_blank">{{ user.website }}</a></p>
        <p><strong>Kompaniya:</strong> {{ user.company.name }}</p>
  
        <div v-if="user.address.geo" class="mt-4">
          <h2 class="font-semibold">Foydalanuvchi manzili</h2>
          <Googlemap :lng="Math.abs(user.address.geo.lng)" :lat="Math.abs(user.address.geo.lat)" >
          </Googlemap>
        </div>
      </div>
      <button @click="goBack" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Orqaga</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Googlemap from '@/components/googlemap.vue';

  export default {
    components : {Googlemap},
    name: 'UserDetails',
    setup() {
      const user = ref(null);
      const route = useRoute();
  
      const fetchUser = async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${route.params.id}`
        );
        user.value = await response.json();
      };
  
      const goBack = () => {
        window.history.back();
      };
  
      onMounted(fetchUser);
  
      return { user, goBack };
    },
  };
  </script>
  