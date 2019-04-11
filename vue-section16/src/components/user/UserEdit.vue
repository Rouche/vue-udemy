<template>
    <div>
        <h3>Edit the User</h3>
        <p>Locale: {{ $route.query.locale }}</p>
        <p>Number: {{ $route.query.q }}</p>
        <hr/>
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>        
        Confirmed : {{ confirmed }}
        <div style="height: 700px"></div>
        <p id="data">Some data</p>
    </div>
</template>

<script>
    export default {
        data() { //Shortcut see next method
            return {
                confirmed: false
            }
        },
        beforeRouteLeave: function(to, from, next) {
            if (this.confirmed) {
                next();
            } else {

                if (confirm('Sure?')) {
                    next();
                } else {
                    next(false);
                }
            }
        }
    }
</script>

<style lang="">
</style>