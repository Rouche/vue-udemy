<template>
    <div>
        <h1>Filters & Mixins</h1>
        <input v-model="filterText"/>
        <ul>
            <li v-for="fruit in filteredFruits">{{ fruit }}</li>
        </ul>                
    </div>
</template>

<script>

    import { fruitsMixin } from '../mixins/fruits'

    export default {
        mixins: [fruitsMixin]
    }
</script>

<style lang="">
</style>