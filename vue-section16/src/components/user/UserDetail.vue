<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded ID: {{ this.$route.params.id }}</p>
        <router-link tag="button" 
            :to="link" 
            class="btn btn-primary">Edit User</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: { 
                    name: 'userEdit', 
                    params: { 
                        id: this.$route.params.id 
                    }, 
                    query: { 
                        locale: 'en', 
                        q: 100 
                    },
                    hash: '#data'
                }
            }
        },
        beforeRouteEnter: (to, from, next) => {
            //This is not yet created!
            console.log('Compondnet route');

            if(true) {
                next();
            } else {
                next(false);
            }

            //This allow to acces model but it then have been created.
            /*
            next( model => {
                model.link;
            });
            */
        }
    }
</script>

<style lang="">
</style>