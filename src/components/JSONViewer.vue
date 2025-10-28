<template>
    <div>
        <h2>JSON Viewer</h2>
        <h2>{{ jsonData }}</h2>
        <Tree :value="jsonData" />
    </div>
</template>

<script>
import Tree from 'primevue/tree';

export default {
    name: 'JSONViewer',
    components: {
        Tree
    },
    props: {
        jsonData: {
            type: Array,
            required: true
        }
    }
}



</script>

<style scoped>
pre {
    background: #f5f5f5;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
}
</style>