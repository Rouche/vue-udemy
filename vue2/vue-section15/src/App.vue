<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name"/>
                </div>
                <div class="form-group">
                    <label>Mail</label>
                    <input type="text" class="form-control" v-model="user.email"/>
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <input type="text" class="form-control" v-model="node"/>
                <br/><br/>
                <button class="btn btn-primary" @click="fetchData">Get data</button>
                <ul>
                    <li class="list-group-item" v-for="(u, $key, $i) in users" style="display: flex; justify-content: space-between;">
                        <span>{{ u.name }} - {{ u.email }}</span><button class="btn btn-primary" @click="deleteUser($key)">Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: ''
                },
                users: {},
                resource: {},
                node: 'data'
            };
        },
        methods: {
            submit() {
/*                this.$http.post('data.json', this.user).then( (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }); */          
                //this.resource.save({}, this.user);
                this.resource.saveAlt( {node: this.node}, this.user);
            },
            fetchData() {
/*                this.$http.get('data.json').then( ($response) => {
                    return $response.json();
                }).then( (data) => {
                    this.users = [];
                    Object.keys(data).forEach( (key) => {
                        this.users.push(data[key]);
                    });
                }, (error) => {
                    console.log(error);
                });*/
                this.resource.getData( {node: this.node}, ).then( ($response) => {
                    return $response.json();
                }).then( (data) => {
                    this.users = data;
                }, (error) => {
                    console.log(error);
                });
            },
            deleteUser($key) {
                console.log($key);
                this.resource.deleteData({node: this.node, key: $key}).then( (response) => {
                    Vue.delete(this.users, $key);
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            }
        },
        created() {
            const customAction = {
                saveAlt: {
                    method: 'POST'
                    //url: 'alternative.json'
                },
                getData: {
                    method: 'GET'
                },
                deleteData: {
                    method: 'DELETE',
                    url: '{node}/{key}.json'
                }
            }
            this.resource = this.$resource('{node}.json', {}, customAction);           
        }
    }
</script>

<style>
</style>
