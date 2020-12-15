<template>
    <div class="container">
        <router-view name="header-top"></router-view>
        <div class="row">
            <div class="col-xs-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        //appHeader: Header replaced by reouter-view with name Header
        created() {
            this.$store.dispatch('initStocks');
        }
    }

</script>

<style>
    body {
        padding: 30px;
    }
</style>
