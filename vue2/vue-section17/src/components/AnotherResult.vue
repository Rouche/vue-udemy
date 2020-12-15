<template>
    <div>
        <div>
            <p><strong>Namespace custom</strong></p>
            <p>Counter is: {{ counter }}</p>
            <p>Number of clicks: {{ clicks }}</p>
            <p>{{ ourOwn }}</p>
        </div>
        <div>
            <p><strong>Namespaced true</strong></p>
            <p>Counter is: {{ counter2 }}</p>
            <p>Number of clicks: {{ clicks2 }}</p>
            <p>{{ ourOwn }}</p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import * as types from '../store/types';

    export default {
        computed: {
            ...mapGetters({ //Spread ES6 : Pull out all properties of target object (mapGetters) and make them part of the object where ... is used (computed).
                counter: types.DOUBLE_COUNTER, 
                clicks: types.CLICK_COUNTER
            }),
            ...mapGetters('counter2', {
                counter2: 'doubleCounter', 
                clicks2: 'clickCounter'
            }),
            ourOwn() {
                return 'my House!'
            }
        }
    }
</script>