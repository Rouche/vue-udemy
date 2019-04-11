<template>
    <div>
        <div><h3>The New</h3></div>
        <button @click="counter++">Increase!</button>
        <p>{{ counter }}</p>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                counter: 0
            }
        },
        destroyed: function() {
            console.log('Destroyed');
        },
        deactivated: function() {
            console.log('Deactivated');
        },
        activated: function() {
            console.log('Activated');
        }
    }
</script>

<style>
</style>