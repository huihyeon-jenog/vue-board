<template>
    <div class="container-100 h-screen">
        <header-layour />
        <router-view />
    </div>
</template>

<script>
import HeaderLayour from "./layouts/HeaderLayour.vue";
import router from "./router/index";

export default {
    components: { HeaderLayour },
    router,
};
</script>
