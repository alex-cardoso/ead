<template>
    <div>
        <div class="content-wrapper">
            <div class="row content-search">
                <div class="col-md-12">
                    <!-- end .hero__btn-area-->
                    <div class="search-area">
                        <div class="row">
                            <div class="col-md-10 offset-md-1">
                                <div class="search_box">
                                    <div class="clearfix" v-if="searching">
                                        <b-spinner class="float-left mb-2"></b-spinner>
                                    </div>

                                    <form action="#" @submit.prevent="() => {return false}">
                                        <input
                                            type="text"
                                            class="text_field"
                                            placeholder="Search your products..."
                                            v-model="searched"
                                            @keyup="search"
                                            @keydown="active_searching"
                                            @mouseleave="mouse_leave_input"
                                            @mouseover="mouse_over_input"
                                        />
                                    </form>
                                </div>

                                <!-- end .search_box -->

                                <ul
                                    class="autocomplete-results"
                                    v-show="show_autocomplete"
                                    @mouseleave="mouse_leave_input"
                                    @mouseover="mouse_over_input"
                                    :class="{'no_results':!items.length || items.length <= 5}"
                                >
                                    <template v-if="!items.length">
                                        <li style="font-size:16px;font-style:italic;">
                                            Nenhum resultado encontrado para sua busca por
                                            <em>{{searched}}</em>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <span style="font-size:16px;font-style:italic;">
                                            Encontramos ({{ items.length }}) aulas em sua busca por
                                            <em>{{ searched }}</em>
                                        </span>
                                        <li
                                            class="autocomplete-result"
                                            v-for="item in items"
                                            :key="item.id"
                                        >
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
                    </div>
                </div>
            </div>
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
            timer_mouve_leave: null,
            timer_mouse_over: null,
            searching: false,
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
                    this.searching = false;
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
                this.searching = false;
            } catch (error) {
                this.searching = false;
                console.log(error);
            }
        }, 1200),

        active_searching: _.debounce(async function() {
            this.searching = true;
        }, 200),

        mouse_leave_input() {
            clearTimeout(this.timer_mouse_over);
            this.timer_mouve_leave = setTimeout(() => {
                this.show_autocomplete = false;
            }, 250);
        },

        mouse_over_input() {
            clearTimeout(this.timer_mouve_leave);
            this.timer_mouse_over = setTimeout(() => {
                this.show_autocomplete = this.searched.length ? true : false;
            }, 250);
        },
    },
};
</script>

<style scoped>
.search_box .text_field {
    width: 100% !important;
}

.autocomplete-results {
    position: absolute;
    padding: 10px;
    width: 100%;
    margin-top: -26px;
    border: 1px solid #eeeeee;
    overflow: auto;
    height: 350px;
    z-index: 9999;
    background-color: #fff;
}

.no_results {
    height: auto;
}

.autocomplete-result {
    list-style: none;
    font-size: 15px;
    text-align: left;
    padding: 10px;
    cursor: pointer;
    border: solid 1px #efefef;
}

.autocomplete-result:hover {
    background-color: #efefef;
    color: white;
}
</style>
