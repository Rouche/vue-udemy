<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me! {{ userAge }}</p>
        <button @click="editAge()">Edit age</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        data: function() {
            return {
            }
        },
        props: {
            'user-age': {
                type: Number
            }
        },
        methods: {
            editAge() {
                this.userAge = 40;
                eventBus.changeAge(this.userAge);
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
