export const fruitsMixin = {
        data() {
            return {
                fruits: ['a', 'b', 'c'],
                filterText: ''
            }
        },
        computed: {
            filteredFruits() {
                return this.fruits.filter( (fruit) => {
                    if(!this.filterText) {
                        return true;
                    }
                    return fruit.indexOf(this.filterText) > -1;
                })
            }
        },
        created() {
            console.log('Mixin created');
        }
}