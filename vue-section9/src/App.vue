<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <button @click="selected = 'appQuote'">Quote</button>
                <button @click="selected = 'appAuthor'">Author</button>
                <button @click="selected = 'appNew'">New</button>
                <hr/>
                <p>{{ selected }}</p>
                <keep-alive>
                    <component :is="selected">
                        <p>default content</p>
                    </component>
                </keep-alive>
                <!--
                <app-quote>
                    <h2 slot="title" v-html="quoteTitle"></h2>
                    <p>This is the slot content</p>
                </app-quote>
                -->
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <br/>
                <button class="btn btn-primary" @click="selectedColor = 'appBlue'">Load Blue Template</button>
                <button class="btn btn-success" @click="selectedColor = 'appGreen'">Load Green Template</button>
                <button class="btn btn-danger" @click="selectedColor = 'appRed'">Load Red Template</button>
                <hr/>
                <component :is="selectedColor">
                    <p>Color content</p>
                </component>
            </div>
        </div>

    </div>
</template>

<script>
    import Quote from './components/Quote.vue';
    import Author from './components/Author.vue';
    import New from './components/New.vue';

    import Blue from './components/Blue.vue';
    import Green from './components/Green.vue';
    import Red from './components/Red.vue';

    export default {
        data: function() {
            return {
                quoteTitle: 'Quote Title',
                selected: 'appQuote',
                selectedColor: 'appBlue'
            }
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New,
            appBlue: Blue,
            appGreen: Green,
            appRed: Red            
        }
    }
</script>

<style>
</style>
