<template>
    <div class="test-page">
        <Jokes />
    </div>
</template>

<script>
import Jokes from '../components/Jokes.vue';


export default {
    name: 'TestPage',
    components: {
        Jokes
    }
}
</script>

<style scoped>
.test-page {
    padding: 2rem;
    text-align: center;
}
</style>