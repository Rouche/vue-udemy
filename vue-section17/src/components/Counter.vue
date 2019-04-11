<template>
    <div>
        <div>
            <button class="btn btn-primary" @click="increment(100)">Increment</button>
            <button class="btn btn-primary" @click="decrement">Decrement</button>
            <button class="btn btn-primary" @click="asyncIncrement({by: 50, time: 1000})">Async</button>        
        </div>
        <div>
            <button class="btn btn-primary" @click="increment2(100000)">Increment</button>
            <button class="btn btn-primary" @click="decrement2">Decrement</button>
            <button class="btn btn-primary" @click="asyncIncrement2({by: 50, time: 1000})">Async</button>        
        </div>
    </div>
</template>

<script>
    //import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        methods: {
            //...mapMutations([ 'increment', 'decrement' ])
            ...mapActions([ 'increment', 'decrement', 'asyncIncrement' ]),
            //...mapActions('counter2', [ 'increment', 'decrement', 'asyncIncrement' ]), //Va embarquer par dessus le 1er map.
            ...mapActions('counter2', { increment2: 'increment', decrement2: 'decrement', asyncIncrement2: 'asyncIncrement' })
            //increment(by) {
            //    this.$store.dispatch('increment', by)
            //}
        }
    }
</script>