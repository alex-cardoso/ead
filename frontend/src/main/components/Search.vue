<template>
    <div>
        <div class="autocomplete">
            <input
                type="text"
                class="form-control mb-3"
                placeholder="O que deseja buscar??..."
                v-model="searched"
                @keyup="search"
                @mouseleave="mouse_leave_input"
                @mouseover="mouse_over_input"
            />
            <ul
                class="autocomplete-results"
                v-show="show_autocomplete"
                @mouseleave="show_autocomplete = false"
                @mouseover="mouse_over_input"
                :class="{'no_results':!items.length || items.length <= 5}"
            >
                <template v-if="!items.length">
                    <li>
                        Nenhum resultado encontrado para sua busca por
                        <em>{{searched}}</em>
                    </li>
                </template>
                <template v-else>
                    Encontramos ({{ items.length }}) aulas em sua busca por
                    <em>{{ searched }}</em>
                    <li class="autocomplete-result" v-for="item in items" :key="item.id">
                        <a :href="`/lesson/${item.slug}`">
                            {{ item.title }} - postado: {{ new Date(item.createdAt) | date }}
                            <br />
                            {{ truncate(item.description, 50) }}
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import http from '../../http';
import truncate from 'truncate';

export default {
    data() {
        return {
            items: [],
            show_autocomplete: false,
            searched: '',
            truncate,
            timer_mouve_over: null,
        };
    },

    mounted() {
        document.addEventListener('touchstart', () => {
            this.show_autocomplete = false;
        });
        document.addEventListener('touchmove', () => {
            this.show_autocomplete = false;
        });
        document.addEventListener('click', () => {
            this.show_autocomplete = false;
        });
        document.addEventListener('touchend', () => {
            this.show_autocomplete = false;
        });

        this.searched = sessionStorage.getItem('searched')
            ? JSON.parse(sessionStorage.getItem('searched'))
            : [];

        this.items = sessionStorage.getItem('lessons_search')
            ? JSON.parse(sessionStorage.getItem('lessons_search'))
            : [];
    },

    methods: {
        search: _.debounce(async function() {
            try {
                this.items = [];
                sessionStorage.removeItem('lessons_search');
                sessionStorage.removeItem('searched');

                if (!this.searched.length) {
                    this.show_autocomplete = false;
                    return false;
                }

                const response = await http.get('/lessons/search', {
                    params: {
                        search: this.searched,
                    },
                });

                if (response.data[0] !== undefined) {
                    this.items = response.data;
                    sessionStorage.setItem(
                        'lessons_search',
                        JSON.stringify(response.data)
                    );
                    sessionStorage.setItem(
                        'searched',
                        JSON.stringify(this.searched)
                    );
                }

                this.show_autocomplete = true;
            } catch (error) {
                console.log(error);
            }
        }, 1200),

        mouse_leave_input() {
            this.timer_mouve_over = setTimeout(() => {
                this.show_autocomplete = false;
            }, 100);
        },

        mouse_over_input() {
            clearTimeout(this.timer_mouve_over);
            this.searched.length ? (this.show_autocomplete = true) : false;
        },
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
    overflow: auto;
    height: 400px;
    background-color: #fff;
}

.no_results {
    height: auto;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
    background-color: azure;
    border: solid 1px #efefef;
}

.autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
}
</style>
