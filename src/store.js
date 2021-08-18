import Vuex from "vuex";
import Vue from "vue";
import persistedstate from "vuex-persistedstate";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: "",
        isLogined: false,
        commentCount: 0,
    },
    mutations: {
        user(state, data) {
            state.user = data;
        },
        isLogined(state, data) {
            state.isLogined = data;
        },
        count(state, data) {
            state.commentCount = data;
        },
    },
    plugins: [
        persistedstate({
            paths: ["user", "isLogined"],
        }),
    ],
});

export default store;
