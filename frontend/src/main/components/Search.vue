<template>
    <div>
        <div class="autocomplete">
            <input
                type="text"
                class="form-control mb-3"
                placeholder="O que deseja buscar??..."
                @keyup="search"
            />
            <ul class="autocomplete-results">
                <li
                    class="autocomplete-result"
                    v-for="item in items"
                    :key="item"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    data() {
        return {
            items: [
                'Apple',
                'Banana',
                'Orange',
                'Mango',
                'Pear',
                'Peach',
                'Grape',
                'Tangerine',
                'Pineapple',
            ],
        };
    },

    methods: {
        search: _.debounce(() => {
            console.log('search');
        }, 800),
    },
};
</script>

<style scoped>
.autocomplete {
    position: absolute;
    width: 100%;
}

.autocomplete-results {
    padding: 10px;
    margin-top: -12px;
    border: 1px solid #eeeeee;
    height: 150px;
    overflow: auto;
    background-color: #fff;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
}
</style>
