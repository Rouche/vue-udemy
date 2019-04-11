<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <p>{{ text | rt-uppercase | rt-lowercase }}</p>
                <hr />
                <button @click="fruits.push('Zomg')" class="btn btn-primary">Add new fruit</button>
                <input v-model="filterText"/>
                <ul>
                    <li v-for="fruit in filteredFruits">{{ fruit }}</li>
                </ul>
                <hr>
                <app-list></app-list>
            </div>
        </div>        
    </div>    
</template>

<script>
    import List from './components/List.vue';
    import { fruitsMixin } from './mixins/fruits'

    export default {
        //Only merge mixins if possible. Will not override this component / vue
        mixins: [fruitsMixin],

        data() {
            return {
                text: 'Hello!!!',
            }
        },
        filters: {
            rtUppercase($value) {
                return $value.toUpperCase();
            }
        },
        components: {
            appList: List
        },
        created() {
            console.log('Vue created');
        }
    }
</script>

<style>

</style>
