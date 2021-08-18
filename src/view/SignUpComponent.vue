<template>
    <section
        class="flex flex-col m-auto mt-10 border-2 border-indigo-400 text-center w-1/4"
    >
        <h2 class="mt-6  text-3xl font-extrabold text-gray-900">
            Vue Project
        </h2>
        <p class="my-3">회원가입</p>
        <form @submit.prevent="onSubmit" class="text-left w-3/4 mx-auto">
            <input
                type="email"
                placeholder="email"
                v-model="email"
                class="border-2 border-gray-400 w-full h-8 pl-2"
            /><br />
            <input
                class="border-2 border-gray-400 my-2 w-full h-8 pl-2"
                type="password"
                placeholder="Password"
                v-model="password"
            /><br />
            <div class="text-center my-5">
                <button
                    type="submit"
                    class="bg-indigo-400 w-full py-2 font-bold text-white my-2 hover:bg-indigo-900"
                >
                    가입하기
                </button>
                <p class="text-xs text-gray-500 text-center my-3">
                    <router-link
                        to="/login"
                        class="text-blue-500 font-bold text-sm hover:underline"
                        >로그인</router-link
                    >
                </p>
            </div>
        </form>
    </section>
</template>

<script>
import firebase from "../api/firebaseConfig";

import "firebase/auth";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        onSubmit() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((res) => {
                    alert("회원가입이 완료되었습니다");
                    this.$router.push("/login");
                })
                .catch((err) => alert("에러 : " + err));
        },
    },
};
</script>
