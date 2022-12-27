import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar, Notify, Dialog } from "quasar";
import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
//import quasarUserOptions from "./quasar-user-options";

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog,
    },
    config: {
      notify: {
        /* look at QuasarConfOptions from the API card */
      },
    },
  })
  .use(router)
  .mount("#app");
