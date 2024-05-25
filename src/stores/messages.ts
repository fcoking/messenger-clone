import { type MESSAGE } from '@/libs/interfaces/message'
import { defineStore } from 'pinia'
import {
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  type DocumentData
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuthStore } from './auth'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as MESSAGE[]
  }),
  getters: {
    messagesReversed: (state) => {
      const stateCopy = [...state.messages]
      return stateCopy
    },
    messagesByDate: (state) => {
      const stateCopy = [...state.messages]
      return stateCopy.sort((messageA, messageB) => messageB.date - messageA.date)
    }
  },
  actions: {
    createMessage(messageBody: { text: string }) {
      const { user } = useAuthStore()

      if (!user.uid) {
        throw new Error('No se pudo escribir. Usuario no logeado ...')
      }

      const newMessage: MESSAGE = {
        author: {
          name: user.name
        },
        text: messageBody.text,
        date: Date.now()
      }

      if (user.photoUrl) {
        newMessage.author.picUrl = user.photoUrl
      }

      addDoc(collection(db, 'message'), newMessage).then(() => {
        this.getMessages()
      })

    },
    async getMessages() {
      const messagesSnapshot = await getDocs(collection(db, 'message'))

      this.setMessagesFromQuery(messagesSnapshot)
    },
    async subscribeToMessages() {
      const q = query(collection(db, 'message'))

      onSnapshot(q, (snapshot) => {
        this.setMessagesFromQuery(snapshot)
      })
    },
    setMessagesFromQuery(messagesSnapshot: QuerySnapshot<DocumentData, DocumentData>) {
      const messages: MESSAGE[] = []

      messagesSnapshot.docs.forEach((messageDoc) => {
        messages.push(messageDoc.data() as MESSAGE)
      })

      this.messages = messages
    }
  }
})
