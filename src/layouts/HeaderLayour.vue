<template>
    <header
        class="relative h-16 border-b-2 border-indigo-100 md:space-x-10 w-screen"
    >
        <nav class="container-lg mx-auto w-2/3 relative top-2">
            <ul class="flex flex-row w-full items-center justify-between">
                <li class="text-4xl font-extrabold ">
                    <router-link to="/">Vue-Project</router-link>
                </li>
                <li class="font-bold text-indigo-900 text-2xl">
                    <router-link to="/">HOME</router-link>
                </li>
                <li v-if="isLogined">
                    <span class="text-lg font-medium text-gray-500 mr-3">{{
                        user
                    }}</span>
                    <router-link to="/write">
                        <button
                            class="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500 text-sm hover:bg-blue-600 box-border"
                        >
                            글쓰기
                        </button>
                    </router-link>
                    <button
                        @click="logout"
                        class="py-2 px-3 rounded-lg shadow-md text-white bg-gray-500 text-sm hover:bg-gray-900"
                    >
                        로그아웃
                    </button>
                </li>
                <li v-else>
                    <div>
                        <router-link
                            to="/login"
                            class="whitespace-nowrap text-lg font-medium text-gray-500 hover:text-gray-900 mr-3"
                        >
                            Sign in
                        </router-link>
                        <router-link
                            to="/signUp"
                            class="whitespace-nowrap inline-flex items-center justify-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >Sign up</router-link
                        >
                    </div>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import firebase from "../api/firebaseConfig";

export default {
    created() {
        if (
            !sessionStorage.getItem(
                "firebase:authUser:AIzaSyAvhq7JoXbidVmW3RMrDtvlhc2iiyj4Tf4:[DEFAULT]"
            )
        ) {
            this.$store.commit("user", "");
            this.$store.commit("isLogined", false);
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        isLogined() {
            return this.$store.state.isLogined;
        },
    },
    methods: {
        logout() {
            firebase.auth().signOut();
            this.$store.commit("user", "");
            this.$store.commit("isLogined", false);
            this.$router.push({ path: "/" });
        },
    },
};
</script>
