import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { Quasar, SessionStorage, Notify } from 'quasar'

// import '@quasar/extras/material-icons/material-icons.css'
// import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
// app.use(Quasar, {
//     plugins: {
//         SessionStorage,x
//         Notify
//     },
// })

app.mount('#app')
