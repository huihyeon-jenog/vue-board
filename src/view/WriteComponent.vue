<template>
    <div
        class="flex flex-col m-auto mt-10 border-2 border-indigo-400 text-center w-1/4"
    >
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Vue Project
        </h2>
        <p class="my-3">글 작성</p>
        <form @submit.prevent="write" class="text-left w-3/4 mx-auto">
            <input
                class="border-2 border-gray-400 w-full h-8 pl-2"
                type="text"
                v-model="title"
                placeholder="title"
            /><br />
            <textarea
                class="border-2 border-gray-400 my-2 w-full h-44 pl-2"
                placeholder="content"
                v-model="content"
            ></textarea>
            <br />
            <button
                class="bg-indigo-400 w-full py-2 font-bold text-white hover:bg-indigo-900 my-5"
                type="submit"
            >
                작성
            </button>
        </form>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { db } from "../api/firebaseConfig";

export default {
    name: "",
    data() {
        return {
            title: "",
            content: "",
            author: this.$store.state.user,
        };
    },
    methods: {
        write() {
            db.collection("write-list")
                .add({
                    title: this.title,
                    content: this.content,
                    author: this.author,
                    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                })
                .then(() => {
                    alert("글이 작성 되었습니다.");
                    this.$router.push({ path: "/" });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        },
    },
};
</script>

<style scoped></style>
