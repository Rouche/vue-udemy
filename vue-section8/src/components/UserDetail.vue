<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User name: {{ myName }}</p>
        <p>User age: {{ userAge }}</p>
        <button @click="resetName()">Reset</button>
        <button @click="resetFn()">Reset 2</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: {
            'my-name': {
                type: String,
                required: true,
                default: 'none'
            },
            'reset-fn': {
                type: Function
            },
            'user-age': Number
        },
        methods: {
            resetName() {
                this.myName = 'Yo Reset'
                this.$emit('nameReset', this.myName);
            }
        },
        created() {
            eventBus.$on('ageReset', (data) => {
                this.userAge = data;
            });
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
