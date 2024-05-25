<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useUserStore } from './stores/users'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'

const { logout } = useAuthStore()
const { user, isauthenticated } = storeToRefs(useAuthStore())
const { usersList } = toRefs(useUserStore())

const items = [
  {
    title: 'Logout',
    icon: 'mdi-logout',
    clickEvent: logout
  }
]


</script>

<template>
  <v-layout>
    <header v-if="isauthenticated">
      <v-card class="d-flex px-2 py-4 h-100">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar class="cursor-pointer" v-bind="props">
              <v-img :src="user.photoUrl" />
            </v-avatar>
            <!-- <v-avatar v-for="(usersListFor, n) in usersList" :key="n">
              <v-img :src="usersListFor.photoUrl" />
            </v-avatar> -->
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :append-icon="item.icon"
              @click="item.clickEvent"
              :key="index"
              :value="item.title"
            >
              {{ item.title }}</v-list-item
            >
          </v-list>
        </v-menu>
      </v-card>
    </header>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
