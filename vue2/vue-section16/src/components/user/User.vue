<template>
    <div>
        <h1>The User Page</h1>
        <hr/>
        <!--<p>Loaded id: {{ id }}</p>-->
        <button @click="navigateHome" class="btn btn-primary">Home</button>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        /* Part 233
        data() {
            return {
                id: this.$route.params.id
            }
        },
        watch: {
            '$route'(to, from) {
                this.id = to.params.id;
            }
        },
        */
        methods: {
            navigateHome() {
                this.$router.push({ name: 'home'});
            }
        }
    }
</script>

<style lang="">
</style>