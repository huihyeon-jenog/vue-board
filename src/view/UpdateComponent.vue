<template>
    <div class="flex w-2/3 mx-auto relative top-5">
        <div class="w-2/3">
            <input
                type="text"
                v-model="postDetail.title"
                class="border h-12 w-full"
            />
            <p class="my-3 text-sm text-indigo-800 font-bold">
                {{ postDetail.author }}
            </p>

            <div class="border-t-2 border-b-2 border-indigo-100">
                <textarea
                    v-model="postDetail.content"
                    class="border w-full h-48 my-5"
                ></textarea>
                <div
                    v-if="postDetail.author === user"
                    class="flex justify-end py-3"
                >
                    <button
                        @click="updatePost(postId)"
                        class="py-2 px-4 rounded-lg shadow-md text-white bg-green-400 text-sm hover:bg-green-600 mr-3"
                    >
                        수정
                    </button>
                    <button
                        @click="cancelUpdate(postId)"
                        class="py-2 px-4 rounded-lg shadow-md text-white bg-red-600 text-sm hover:bg-red-900"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
        <side-component />
    </div>
</template>
<script>
import { db } from "../api/firebaseConfig";
import SideComponent from "../component/SideComponent.vue";

export default {
    name: "",
    components: { SideComponent },
    data() {
        return {
            user: this.$store.state.user,
            postId: this.$route.query.postId,
            postDetail: {},
            writeListData: [],
        };
    },
    setup() {},
    created() {
        this.postId = this.$route.query.postId;
        this.getPostDetail(this.postId);
        this.getWriteData();
    },
    mounted() {},
    unmounted() {},
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

        getWriteData() {
            db.collection("write-list")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        this.writeListData.push({
                            id: doc.id,
                            title: doc.data().title,
                        });
                    });
                });
        },

        detailPost(id) {
            this.postId = id;
            this.getPostDetail(this.postId);
        },

        updatePost(id) {
            db.collection("write-list")
                .doc(id)
                .update({
                    author: this.postDetail.author,
                    title: this.postDetail.title,
                    content: this.postDetail.content,
                    date: this.postDetail.date,
                })
                .then(() => {
                    console.log("수정완료");
                    alert("게시물이 수정되었습니다.");
                    this.$router.push({
                        path: "/detail",
                        query: { postId: id },
                    });
                })
                .catch((err) => console.log(err));
        },
        cancelUpdate(id) {
            this.$router.push({ path: "/detail", query: { postId: id } });
        },
    },
};
</script>
