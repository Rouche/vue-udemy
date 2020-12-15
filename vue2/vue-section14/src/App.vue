<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Animations</h1>
                <hr/>
                <select name="" id="" v-model="alertAnim" class="form-control">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                </select>
                <br/><br/>
                <button @click="show = !show" class="btn btn-primary">Show alert</button>
                <br/><br/>
                <!-- transition bound! -->
                <transition :name="alertAnim">
                    <div v-show="show" class="alert alert-info">This is info</div>
                </transition>
                <!-- type dictates the length -->
                <transition name="slide" type="animation">
                    <div v-if="show" class="alert alert-info">This is info</div>
                </transition>

                <transition 
                    enter-active-class="animated bounce" 
                    leave-active-class="animated shake">
                    <div v-if="show" class="alert alert-info">This is info</div>
                </transition>

                <transition :name="alertAnim" :mode="'out-in'">
                    <div v-if="show" class="alert alert-info" key="info">This is info</div>
                    <div v-else class="alert alert-warning" key="warning">This is warning</div>
                </transition>
                <hr/>
                <button @click="load = !load" class="btn btn-primary">Load / Remove element</button>
                <br/><br/>
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @enter-cancelledc="enterCancelled"

                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    @leave-cancelledc="leaveCancelled"
                    :css="false"> <!-- IMportant for full javascript, skip css detection -->
                    <div v-if="load" style="width: 300px; height: 100px; background-color: green;"></div>
                </transition>
                <hr/>
                <button class="btn btn-primary" @click="selectedComponent = selectedComponent == 'app-success-alert' ? 'app-danger-alert' : 'app-success-alert'">Toggle Alert!</button>
                <br/><br/>
                <transition name="fade" mode="out-in">
                    <component :is="selectedComponent"></component>
                </transition>
                <hr/>
                <button class="btn btn-primary" @click="addItem">Add item</button>
                <ul>
                    <transition-group name="slide">
                        <li class="list-group-item" :key="number" v-for="(number, $index) in numbers" @click="removeItem($index)" style="display: flex; justify-content: space-between;">
                            <span>{{ number }}</span> <button class="btn btn-primary">Delete</button>
                        </li>
                    </transition-group>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import SuccessAlert from './components/SuccessAlert.vue'
    import DangerAlert from './components/DangerAlert.vue'

    export default {        
        data() {
            return {
                show: false,
                load: true,
                alertAnim: 'fade',
                elementWidth: 100,
                selectedComponent: 'app-success-alert',
                currentNumber: 6,
                numbers: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            addItem() {
                let pos = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(pos, 0, this.currentNumber++);
            },
            removeItem($index) {
                this.numbers.splice($index, 1);
            },
            beforeEnter($el) {
                console.log('before enter');
                this.elementWidth = 100;
                $el.style.width = this.elementWidth + 'px';
            },
            enter($el, done) {
                console.log('enter');
                let round = 1;
                const interval = setInterval( () => {
                    $el.style.width = (this.elementWidth + round * 10) + 'px';
                    ++round;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);
            },
            afterEnter($el) {
                console.log('after enter');
            },
            enterCancelled($el) {
                console.log('enter cancelled');
            },

            beforeLeave($el) {
                console.log('before leave');
                this.elementWidth = 300;
                $el.style.width = this.elementWidth + 'px';
            },
            leave($el, done) {
                console.log('leave');
                let round = 1;
                const interval = setInterval( () => {
                    $el.style.width = (this.elementWidth - round * 10) + 'px';
                    ++round;
                    if (round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20);                
            },
            afterLeave($el) {
                console.log('after leave');
            },
            leaveCancelled($el) {
                console.log('leave cancelled');
            }
        },
        components: {
            appDangerAlert: DangerAlert,
            appSuccessAlert: SuccessAlert
        }
    }
</script>

<style>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave {
        /* opacity: 1; */
    }

    .fade-leave-active {
        opacity: 0;
        transition: opacity 1s;
    }

    .slide-enter {
        opacity: 0;        
        /* transform: translateY(20px); */
    }
    .slide-enter-active {
        transition: opacity .5s;
        animation: slide-in 1s ease-out forwards;
    }
    .slide-leave {
        
    }
    .slide-leave-active {
        opacity: 0;
        transition: opacity 1s;
        animation: slide-out 1s ease-out forwards;
        position: absolute;
    }
    .slide-move {
        transition: transform 1s;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(20px);
        }
    }
</style>
