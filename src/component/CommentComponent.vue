<template>
    <div>
        <h3>댓글 {{ commentDataList.length }}</h3>
        <form @submit.prevent="commentWrite()">
            <input
                type="text"
                class="border h-16 w-2/3 my-3"
                v-model="comment"
            />
            <button
                class="bg-blue-500 rounded-md px-2 hover:bg-blue-900 border py-5 text-white px-5"
                type="submit"
            >
                등록
            </button>
        </form>
        <div v-for="item in commentDataList" :key="item.id">
            <div
                class="relative border-t h-auto w-3/4"
                :class="[item.author === user ? 'bg-gray-50 ' : '']"
            >
                <span class="text-sm text-indigo-700 font-semibold py-3 pl-2">{{
                    item.author
                }}</span>
                <p class="pl-3 mt-2">
                    <template v-if="updateId === item.id">
                        <input
                            type="text"
                            v-model="modifyComment"
                            class="border border-blue-500"
                        />
                        <div
                            class="absolute right-0 top-0 text-sm text-white mt-2 mr-2"
                        >
                            <button
                                @click="updateComment(item.id)"
                                class="bg-green-500 rounded-md px-2 hover:bg-green-900"
                            >
                                수정
                            </button>
                            <button
                                @click="updateId = ''"
                                class="bg-red-500 rounded-md px-2 hover:bg-red-900"
                            >
                                취소
                            </button>
                        </div>
                    </template>
                    <template v-else>
                        <span>{{ item.comment }}</span>
                        <div
                            class="absolute right-0 top-0 text-sm text-white mt-2 mr-2"
                            v-if="item.author === user"
                        >
                            <button
                                @click="updateComment(item.id)"
                                class="bg-green-500 rounded-md px-2 hover:bg-green-900"
                            >
                                수정
                            </button>
                            <button
                                @click="deleteComment(item.id)"
                                class="bg-red-500 rounded-md px-2 hover:bg-red-900"
                            >
                                삭제
                            </button>
                        </div>
                    </template>
                </p>
                <p class="pl-3 py-3 text-xs mt-3">{{ item.date }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from "../api/firebaseConfig";
import dayjs from "dayjs";

export default {
    data() {
        return {
            comment: "",
            modifyComment: "",
            user: this.$store.state.user,
            postId: this.$route.query.postId,
            updateId: "",
            commentDataList: "",
        };
    },
    watch: {
        $route() {
            this.postId = this.$route.query.postId;
            this.getCommentDataList();
        },
    },
    created() {
        this.getCommentDataList();
    },
    methods: {
        commentWrite() {
            if (this.user === "") {
                alert("로그인을 하셔야 댓글을 작성할 수 있습니다.");
                this.comment = "";
            } else {
                db.collection("comment-list")
                    .add({
                        comment: this.comment,
                        author: this.user,
                        postId: this.postId,
                        date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    })
                    .then(() => {
                        alert("댓글을 성공적으로 등록하셨습니다.");
                        this.comment = "";
                        this.getCommentDataList();
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
        },
        getCommentDataList() {
            this.commentDataList = [];
            db.collection("comment-list")
                .orderBy("date")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        if (doc.data().postId === this.postId) {
                            this.commentDataList.push({
                                id: doc.id,
                                author: doc.data().author,
                                comment: doc.data().comment,
                                date: doc.data().date,
                            });
                        }
                    });
                });
        },
        updateComment(id) {
            if (!this.updateId) {
                this.commentDataList.filter((item) => {
                    if (item.id === id) {
                        return (this.modifyComment = item.comment);
                    }
                });
                this.updateId = id;
            } else {
                db.collection("comment-list")
                    .doc(id)
                    .update({
                        comment: this.modifyComment,
                    })
                    .then(() => {
                        alert("게시물이 수정되었습니다.");
                        this.updateId = "";
                        this.getCommentDataList();
                    })
                    .catch((err) => console.log(err));
            }
        },

        deleteComment(id) {
            db.collection("comment-list")
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    alert("댓글 삭제 되었습니다.");
                    this.getCommentDataList();
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
    },
};
</script>
