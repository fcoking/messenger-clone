import { type USER } from '@/libs/interfaces/user'
import { defineStore } from 'pinia'
import {
  QuerySnapshot,
  collection,
  getDocs,
  type DocumentData
} from 'firebase/firestore'
import { db } from '@/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: [] as USER[]
  }),
  getters: {
    usersList: (state) => {
      const stateCopy = [...state.user]
      return stateCopy
    }
  },
  actions: {
    async getUsers() {
      const usersSnapshot = await getDocs(collection(db, 'user'))

      this.setUsersFromQuery(usersSnapshot)
    },
    setUsersFromQuery(usersSnapshot: QuerySnapshot<DocumentData, DocumentData>) {
      const users: USER[] = []

      usersSnapshot.docs.forEach((userDoc) => {
        users.push(userDoc.data() as USER)
      })

      this.user = users
    }
  }
})
