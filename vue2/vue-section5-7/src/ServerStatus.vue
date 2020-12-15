<template>
    <div class="my-div">Status: {{ status }}<button @click="changeStatus()">Change</button>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                status: 'Normal'
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Crit'
            }
        }
    }
</script>

<style scoped>
    .my-div {
        background-color: grey;
    }
</style>