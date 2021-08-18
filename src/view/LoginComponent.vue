<template>
    <section
        class="flex flex-col m-auto mt-10 border-2 border-indigo-400 text-center w-1/4"
    >
        <div>
            <h2 class="mt-6  text-3xl font-extrabold text-gray-900">
                Vue Project
            </h2>
            <p class="my-3">로그인</p>
            <form class="text-left w-3/4 mx-auto">
                <input
                    class="border-2 border-gray-400 w-full h-8 pl-2"
                    type="email"
                    placeholder="email"
                    v-model="email"
                /><br />
                <input
                    class="border-2 border-gray-400 my-2 w-full h-8 pl-2"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                /><br />
                <div class="text-center my-5">
                    <button
                        class="bg-indigo-400 w-full py-2 font-bold text-white hover:bg-indigo-900"
                        type="button"
                        @click="login"
                    >
                        Login
                    </button>
                    <button
                        class="bg-indigo-50 w-full py-2 font-bold my-2 hover:bg-indigo-900"
                        type="button"
                        @click="googlelogin"
                    >
                        Googel Login
                    </button>
                </div>
                <p class="text-xs text-gray-500 text-center my-3">
                    만약 계정이 없다면,
                    <router-link
                        to="/signUp"
                        class="text-blue-500 font-bold text-sm hover:underline"
                        >회원가입</router-link
                    >을 먼저 진행해 주세요!
                </p>
            </form>
        </div>
    </section>
</template>

<script>
import firebase from "../api/firebaseConfig";

export default {
    name: "",
    data() {
        return {
            email: "",
            password: "",
            user: "",
        };
    },
    methods: {
        login() {
            if (!this.email) {
                alert("이메일을 입력해주세요");
            } else if (!this.password) {
                alert("비밀번호를 입력해주세요");
            } else {
                firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(() => {
                        return firebase
                            .auth()
                            .signInWithEmailAndPassword(
                                this.email,
                                this.password
                            )
                            .then(() => {
                                this.$store.commit("isLogined", true);
                                this.$store.commit("user", this.email);
                                this.$router.push("/");
                            })
                            .catch((err) => alert("에러: " + err));
                    })

                    .catch((err) => alert("에러: " + err));
            }
        },

        googlelogin() {
            firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(() => {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    return firebase
                        .auth()
                        .signInWithPopup(provider)
                        .then((res) => {
                            this.$store.commit("isLogined", true);
                            this.$store.commit("user", res.user.email);
                            this.$router.push("/");
                        })
                        .catch((err) => alert("에러 : " + err));
                })
                .catch((err) => alert("에러 : " + err));
        },
    },
};
</script>

<style scoped></style>
