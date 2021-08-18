import Vue from "vue";
import App from "./App";
import store from "./store";
import "./index.css";

new Vue({ render: (h) => h(App), store: store }).$mount("#root");
