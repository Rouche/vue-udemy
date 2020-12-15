<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Directives</h1>
                <p v-text="'Some text'"></p>
                <p v-html="'<strong>My text strong</strong>'"></p>
            </div>
            <hr/>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Custom Directives</h1>
                <p v-rt-highlight:background.delayed="'brown'">Color this</p>
                <p v-rt-local-highlight:background.delayed.blink="{ mainColor: 'red', altColor: 'blue', delay: 500}">Color this</p>
            </div>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button v-rt-on:click="clicked" class="btn btn-primary">Click</button>
            </div>
            <div style="width: 100px; height: 100px; background-color: grey;"
                v-rt-on:mouseenter="evMouseEnter" v-rt-on:mouseleave="evMouseLeave" >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                divColor: ''                
            }
        },
        directives: {
            rtLocalHighlight: {
                bind(el, binding, vnode) {
                    var delay = 0;
                    if(binding.modifiers.delayed) {
                        delay = 2000;
                    }

                    if(binding.modifiers.blink) {
                        let mainColor = binding.value.mainColor;
                        let altColor = binding.value.altColor;
                        let currentColor = mainColor;
                        setInterval( () => {
                            currentColor = currentColor == mainColor ? altColor : mainColor;
                            if(binding.arg == 'background') {
                                el.style.backgroundColor = currentColor;
                            } else {
                                el.style.color = currentColor;
                            }
                        }, binding.value.delay);
                    } else {
                        setTimeout( () => {
                            if(binding.arg == 'background') {
                                el.style.backgroundColor = binding.value;
                            } else {
                                el.style.color = binding.value;
                            }
                        }, delay);
                    }
                }
            },
            rtOn: {
                bind(el, binding, vnode) {
                    let type = binding.arg;
                    let callback = binding.value;
                    el.addEventListener( type, callback );
                }
            }
        },
        methods: {
            clicked() {
                alert('Yo');
            },
            evMouseEnter($ev) {
                this.divColor = $ev.target.style.backgroundColor;
                $ev.target.style.backgroundColor = 'cyan';
            },
            evMouseLeave($ev) {
                $ev.target.style.backgroundColor = this.divColor;
            }
        }
    }
</script>

<style>

</style>
