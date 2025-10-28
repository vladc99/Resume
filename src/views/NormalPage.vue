<template>
    <JSONViewer :jsonData="jsonData" />
</template>

<script>
import JSONViewer from '@/components/JSONViewer.vue';

export default {
    components: {
        JSONViewer
    },
    data() {
        return {
            jsonData:
                [
                    {
                        key: "0",
                        label: "name",
                        data: "John Doe"
                    },
                    {
                        key: "1",
                        label: "age",
                        data: 30
                    },
                    {
                        key: "2",
                        label: "address",
                        children: [
                            {
                                key: "2-0",
                                label: "street",
                                data: "123 Main St"
                            },
                            {
                                key: "2-1",
                                label: "city",
                                data: "Anytown"
                            }
                        ]
                    }
                ]

        }
    }
}
</script>

<style scoped>
.normal-page {
    padding: 2rem;
}
</style>