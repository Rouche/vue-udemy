<template>
    <div id="signup">
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <div class="input" :class="{invalid: $v.email.$error}">
                    <label for="email">Mail</label>
                    <input type="email" id="email" @blur="$v.email.$touch()" v-model="email">
                    <p class="invalid" v-if="!$v.email.email">Please write a valid email</p>
                    <p class="invalid" v-if="!$v.email.required">Email cannot be empty</p>
                </div>
                <div class="input" :class="{invalid: $v.age.$error}">
                    <label for="age">Your Age</label>
                    <input type="number" id="age" v-model.number="age" @blur="$v.age.$touch()">
                    <p class="invalid" v-if="!$v.age.minVal">You must be at least {{$v.age.$params.minVal.min}} years old</p>
                </div>
                <div class="input" :class="{invalid: $v.password.$error}">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" @blur="$v.password.$touch()">
                </div>
                <div class="input" :class="{invalid: $v.confirmPassword.$error}">
                    <label for="confirm-password">Confirm Password (with 'a' added at the end)</label>
                    <input type="password" id="confirm-password" v-model="confirmPassword" @blur="$v.confirmPassword.$touch()">
                    <div class="input">
                        <label for="country">Country</label>
                        <select id="country" v-model="country">
                            <option value="usa">USA</option>
                            <option value="india">India</option>
                            <option value="uk">UK</option>
                            <option value="germany">Germany</option>
                        </select>
                    </div>
                </div>
                <div class="hobbies">
                    <h3>Add some Hobbies</h3>
                    <button @click="onAddHobby" type="button">Add Hobby</button>
                    <div class="hobby-list">
                        <div class="input" :class="{invalid: $v.hobbyInputs.$each[index].$error}"
                            v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
                            <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                            <input type="text" :id="hobbyInput.id" v-model="hobbyInput.value"
                                @blur="$v.hobbyInputs.$each[index].value.$touch()">
                            <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                        </div>
                    </div>
                    <p class="invalid" v-if="!$v.hobbyInputs.minLen">You must have {{$v.hobbyInputs.$params.minLen.min}} inputs</p>
                    <p class="invalid" v-if="!$v.hobbyInputs.required">Please enter hobbies</p>
                </div>
                <div class="input inline" :class="{invalid: $v.terms.$invalid}">
                    <input type="checkbox" id="terms" v-model="terms" @change="$v.terms.$touch()">
                    <label for="terms">Accept Terms of Use</label>
                </div>
                <div class="submit">
                    <button type="submit" :disabled="$v.$invalid">Submit</button>
                </div>
            </form>
        </div>
        <div>{{ $v }}</div>
    </div>
</template>

<script>
    import { email, required, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators';
    import axios from 'axios';

    export default {
        data() {
            return {
                email: '',
                age: null,
                password: '',
                confirmPassword: '',
                country: 'usa',
                hobbyInputs: [],
                terms: false
            }
        },
        validations: {
            email: {
                email,
                required,
                unique: (val, parent) => {
                    if (val === '') return true;
                    if (!parent.$v.email.email) return true
                    /*
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(val !== 'rouche@gmail.com');
                        }, 1000);
                    });
                    */
                    return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"').then(
                        (res) => {
                            console.log(res);
                            return Object.keys(res.data).length === 0;
                        }
                    );
                }
            },
            age: {
                required,
                numeric,
                minVal: minValue(18)
            },
            password: {
                required,
                minLen: minLength(6)
            },
            confirmPassword: {
                // sameAs: sameAs('password')
                sameAs: sameAs((model) => {
                    return model.password + 'a'; //Makes no sense but it shows.
                })
            },
            terms: {
                required: requiredUnless(model => {
                    return model.country === 'germany';
                })
            },
            hobbyInputs: {
                minLen: minLength(2),
                required,
                $each: {
                    value: {
                        required,
                        minLen: minLength(5)
                    }
                }
            }
        },
        methods: {
            onAddHobby() {
                const newHobby = {
                    id: Math.random() * Math.random() * 1000,
                    value: ''
                };
                this.hobbyInputs.push(newHobby)
            },
            onDeleteHobby(id) {
                this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
            },
            onSubmit() {
                const formData = {
                    email: this.email,
                    age: this.age,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    country: this.country,
                    hobbies: this.hobbyInputs.map(hobby => hobby.value),
                    terms: this.terms
                };
                console.log(formData);
                this.$store.dispatch('signup', formData);
            }
        }
    }
</script>

<style scoped>
    .signup-form {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #eee;
        padding: 20px;
        box-shadow: 0 2px 3px #ccc;
    }

    .input {
        margin: 10px auto;
    }

    .input label {
        display: block;
        color: #4e4e4e;
        margin-bottom: 6px;
    }

    .input.inline label {
        display: inline;
    }

    .input input {
        font: inherit;
        width: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .input.inline input {
        width: auto;
    }

    .input input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }

    .input select {
        border: 1px solid #ccc;
        font: inherit;
    }

    .hobbies button {
        border: 1px solid #521751;
        background: #521751;
        color: white;
        padding: 6px;
        font: inherit;
        cursor: pointer;
    }

    .hobbies button:hover,
    .hobbies button:active {
        background-color: #8d4288;
    }

    .hobbies input {
        width: 90%;
    }

    .submit button {
        border: 1px solid #521751;
        color: #521751;
        padding: 10px 20px;
        font: inherit;
        cursor: pointer;
    }

    .submit button:hover,
    .submit button:active {
        background-color: #521751;
        color: white;
    }

    .submit button[disabled],
    .submit button[disabled]:hover,
    .submit button[disabled]:active {
        border: 1px solid #ccc;
        background-color: transparent;
        color: #ccc;
        cursor: not-allowed;
    }

    .input.invalid label {
        color: red;
    }

    p.invalid {
        color: red;
    }

    .input.invalid input {
        border: 1px solid red;
        background-color: #ffc9aa;
    }
</style>