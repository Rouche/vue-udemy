<template>
    <div>
        <app-server-status v-for="(server, $i) in 5" key="$i"></app-server-status>
    </div>
</template>

<script>
    import ServerStatus from './ServerStatus.vue';

    export default {
        components: {
            'app-server-status': ServerStatus
        }
    }
</script>

<style>
</style>