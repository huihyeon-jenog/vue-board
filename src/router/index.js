import Vue from "vue";
import Router from "vue-router";

import Login from "./../view/LoginComponent";
import Home from "./../view/HomeComponent";
import SingUp from "./../view/SignUpComponent";
import Write from "./../view/WriteComponent";
import Detail from "./../view/DetailComponent";
import Update from "./../view/UpdateComponent";
import store from "../store";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
    if (store.state.user) {
        return next();
    }
    next("/login");
};

export default new Router({
    mode: "history", // #기호 삭제
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/signUp",
            name: "SignUp",
            component: SingUp,
        },
        {
            path: "/write",
            name: "Write",
            component: Write,
            beforeEnter: requireAuth(),
        },
        {
            path: "/detail",
            name: "Detail",
            component: Detail,
        },
        {
            path: "/update",
            name: "Update",
            component: Update,
            beforeEnter: requireAuth(),
        },
    ],
});
