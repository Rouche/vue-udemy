<template>
    <div class="container">
        <app-header :maxQuotes="maxQuotes" :quoteCount="quotes.length"></app-header>
        <app-new-quote @quoteAdded="newQuote"></app-new-quote>
        <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
        <div class="row ">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Click a Quote to delete it...</div>
            </div>
        </div>
    </div>
</template>

<script>
    /*
    * Application from EDEMY section 10
    */
    import Header from './components/Header.vue';
    import QuoteGrid from './components/QuoteGrid.vue';
    import NewQuote from './components/NewQuote.vue';

    export default {
        data: function() {
            return {
                quotes: ['Temp Quote'],
                maxQuotes: 10
            }
        },
        components: {
            appQuoteGrid: QuoteGrid,
            appNewQuote: NewQuote,
            appHeader: Header
        },
        methods: {
            newQuote(quote) {
                if(this.quotes.length >= 10) {
                    alert('delete some first');
                    return;
                }
                if(quote) {
                    this.quotes.push(quote);
                }
            },
            deleteQuote($index) {
                this.quotes.splice($index, 1);
            }
        }
    }
</script>

<style>
</style>
