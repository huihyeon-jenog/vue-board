<template>
    <div class="relative top-5 w-2/3 mx-auto">
        <div class="w-full flex">
            <div class="w-3/4">
                <h2 class="text-3xl font-bold">
                    {{ postDetail.title }}
                </h2>
                <p class="my-3 text-sm text-indigo-800 font-bold  relative">
                    {{ postDetail.author }}
                    <span
                        class="text-xs right-0 bottom-0 absolute text-gray-500"
                        >{{ postDetail.date }}</span
                    >
                </p>

                <div
                    class="border-t-2 border-b-2 border-indigo-100 h-auto relative min-h-3/4"
                >
                    <p class="my-5" style="white-space: pre-line">
                        {{ postDetail.content }}
                    </p>
                    <div
                        v-if="postDetail.author === user"
                        class="text-right my-3"
                    >
                        <button
                            @click="updatePost(postId)"
                            class="py-2 px-4 rounded-lg shadow-md text-white bg-green-400 text-sm hover:bg-green-600 mr-3"
                        >
                            수정
                        </button>
                        <button
                            @click="deletePost(postId)"
                            class="py-2 px-4 rounded-lg shadow-md text-white bg-red-600 text-sm hover:bg-red-900"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
            <side-component />
        </div>
        <comment-component class="mt-3" />
    </div>
</template>
<script>
import { db } from "../api/firebaseConfig";
import SideComponent from "../component/SideComponent.vue";
import CommentComponent from "../component/CommentComponent.vue";

export default {
    components: { SideComponent, CommentComponent },
    data() {
        return {
            user: this.$store.state.user,
            postId: "",
            postDetail: {},
            writeListData: [],
        };
    },
    watch: {
        $route() {
            this.postId = this.$route.query.postId;
            this.getPostDetail(this.postId);
        },
    },
    created() {
        this.postId = this.$route.query.postId;
        this.getPostDetail(this.postId);
    },

    methods: {
        getPostDetail(id) {
            var docRef = db.collection("write-list").doc(id);

            docRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        this.postDetail = doc.data();
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        },

        updatePost(id) {
            this.$router.push({ path: "/update", query: { postId: id } });
        },

        deletePost(id) {
            db.collection("write-list")
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    alert("게시물이 삭제 되었습니다.");
                    this.$router.push({ path: "/" });
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
    },
};
</script>
