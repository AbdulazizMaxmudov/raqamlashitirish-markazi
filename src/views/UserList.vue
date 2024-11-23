<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Foydalanuvchilar jadvali</h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Ismini kiriting"
        class="border p-2 mb-4 w-full"
      />
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">№</th>
            <th class="border p-2">Ismi</th>
            <th class="border p-2">Emaili</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-100 cursor-pointer"
            @click="goToDetails(user.id)"
          >
            <td class="border p-2">{{ user.id }}</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
  

      <div class="mt-4 flex justify-between">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Orqaga
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Keyingi
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'UserList',
    setup() {
      const users = ref([]);
      const searchQuery = ref('');
      const currentPage = ref(1);
      const usersPerPage = 10;
  
      const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users.value = await response.json();
      };
  
      const filteredUsers = computed(() =>
        users.value.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      );
  
      const paginatedUsers = computed(() => {
        const start = (currentPage.value - 1) * usersPerPage;
        const end = start + usersPerPage;
        return filteredUsers.value.slice(start, end);
      });
  
      const totalPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage));
  
      const goToDetails = (id) => {
        window.location.href = `/user/${id}`;
      };
  
      onMounted(fetchUsers);
  
      return {
        users,
        searchQuery,
        filteredUsers,
        paginatedUsers,
        totalPages,
        currentPage,
        goToDetails,
      };
    },
  };
  </script>
  