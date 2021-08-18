<template>
    <div class="border ml-5 w-1/4" style="height: 400px">
        <h2 class="mt-3 ml-3 font-bold text-lg">최신글</h2>
        <ul
            v-for="write in writeListData"
            :key="write.id"
            class="list-disc ml-8"
        >
            <li
                @click="detailPost(write.id)"
                class="my-2 cursor-pointer hover:underline"
            >
                {{ write.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from "../api/firebaseConfig";

export default {
    data() {
        return {
            writeListData: [],
        };
    },
    created() {
        this.getWriteData();
    },
    methods: {
        getWriteData() {
            db.collection("write-list")
                .orderBy("date", "desc")
                .limit(10)
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
            this.$router.push({ path: "/detail", query: { postId: id } });
        },
    },
};
</script>
