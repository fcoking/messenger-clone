import { auth, db } from '@/firebase'
import type { USER } from '@/libs/interfaces/user'
import router from '@/router'
import { GoogleAuthProvider, signInWithPopup, type User as googleUser } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      photoUrl: '',
      email: '',
      name: '',
      uid: null
    } as USER
  }),
  getters: {
    isauthenticated: (state) => {
      return state.user?.uid !== null
    }
  },
  actions: {
    async logout() {
      await auth.signOut()
      router.push({
        name: 'login'
      })

      this.clearUser()
    },
    async login() {
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {

          const googleUser = result.user

          this.setUserFromGoogleAuth(googleUser)
        })
        .catch((error) => {
          console.log(error)

          this.clearUser()
        })
    },
    async subscribeToAuth() {
      auth.onAuthStateChanged(async (googleUser) => {
        if (googleUser) {
          await this.registerUser(googleUser)

          router.push({
            name: 'chat'
          })
        } else {
          router.push({
            name: 'login'
          })
        }
      })
    },
    async registerUser(googleUser: googleUser) {
      const user: USER = {
        uid: googleUser.uid,
        photoUrl: googleUser.photoURL || '',
        email: googleUser.email || '',
        name: googleUser.displayName || ''
      }

      const docRef = doc(db, `user/${user.uid}`)
      try {
        await setDoc(docRef, user)
        this.setUserFromGoogleAuth(googleUser)
      } catch (e) {
        console.log(e)
        this.clearUser()
      }
    },
    clearUser() {
      this.user = {
        uid: null,
        photoUrl: '',
        email: '',
        name: ''
      }
    },
    setUserFromGoogleAuth(googleUser: googleUser) {
      this.user = {
        uid: googleUser.uid,
        photoUrl: googleUser.photoURL || '',
        email: googleUser.email || '',
        name: googleUser.displayName || ''
      }
    }
  }
})
