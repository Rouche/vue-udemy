<template>
    <div id="dashboard">
        <h1>That's the dashboard!</h1>
        <p>You should only get here if you're authenticated!</p>
        <p>Your email: {{ email }}</p>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        computed: {
            email() {
                if (this.$store.getters.user) {
                    return this.$store.getters.user.email;
                }
                return '';
            }
        },
        created() {
            this.$store.dispatch('fetchUser');
        }
    };
</script>

<style scoped>
    h1,
    p {
        text-align: center;
    }

    p {
        color: red;
    }
</style>
