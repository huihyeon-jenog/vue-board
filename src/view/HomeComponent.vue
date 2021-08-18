<template>
    <div class="w-2/3 mx-auto relative">
        <div class=" float-right mt-4">
            <input
                type="text"
                class="border border-black pl-2"
                v-model="search"
                placeholder="title search..."
            />
            <p class="text-right mt-2">
                <input type="checkbox" id="checked" v-model="checked" />
                <label for="checked" class="cursor-pointer">작성글 보기</label>
            </p>
        </div>
        <div class="relative top-5 w-full flex flex-wrap">
            <div
                v-for="write in filterList"
                :key="write.id"
                @click="detailPost(write.id)"
                class="relative border h-40 w-1/2 px-2 pt-1 cursor-pointer hover:bg-gray-100"
            >
                <h2 class="text-lg font-bold relative">
                    {{ write.title }}
                    <span class="text-xs right-0 absolute"
                        >{{ write.date }}
                    </span>
                </h2>

                <p class="text-sm font-medium mt-2">{{ write.content }}</p>
                <span class="text-sm text-gray-500 absolute bottom-1">{{
                    write.author
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../api/firebaseConfig";

export default {
    data() {
        return {
            writeListData: [],
            search: "",
            checked: false,
        };
    },
    computed: {
        isLogined() {
            return this.$store.state.isLogined;
        },
        filterList() {
            return this.writeListData.filter((post) => {
                if (this.checked) {
                    if (post.author === this.$store.state.user) {
                        return post.title
                            .toLowerCase()
                            .includes(this.search.toLowerCase());
                    }
                } else {
                    return post.title
                        .toLowerCase()
                        .includes(this.search.toLowerCase());
                }
            });
        },
    },
    created() {
        this.getPostList();
    },
    methods: {
        detailPost(id) {
            this.$router.push({ path: "/detail", query: { postId: id } });
        },
        getPostList() {
            db.collection("write-list")
                .orderBy("date", "desc")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots

                        this.writeListData.push({
                            id: doc.id,
                            author: doc.data().author,
                            title: doc.data().title,
                            content:
                                doc.data().content.length > 100
                                    ? `${doc.data().content.slice(0, 100)} ... `
                                    : doc.data().content,
                            date: doc.data().date,
                        });
                    });
                });
        },
    },
};
</script>

<style scoped></style>
