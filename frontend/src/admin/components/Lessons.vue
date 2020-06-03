<template>
    <div>
        <div class="dashboard_contents section--padding">
            <div class="container">
                <div style="background-color:#efefef;" class="p-3 d-flex">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Buscar..."
                        v-model="lesson_to_search"
                    />
                    <button class="btn btn-primary btn-sm ml-1" @click="search_lesson()">Buscar</button>
                </div>

                <div
                    style="background-color:#efefef;"
                    class="d-flex align-items-center p-3"
                    v-if="!create"
                >
                    <a
                        href="#"
                        @click.prevent="show_form"
                        class="btn btn-primary btn-sm"
                        style="text-decoration:underline;"
                    >Nova</a>
                    <p class="ml-3">
                        Para cadastrar uma nova lesson, clique no botão ao lado, e ao finalizar o cadastro atualize a
                        página para a lesson ser mostrada na listagem.
                    </p>
                </div>

                <div v-else>
                    <div style="background-color:#efefef;padding:10px;" class="mt-3">
                        <form @submit.prevent="create_lesson">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    v-model="lesson_create['title']"
                                    class="text_field"
                                    placeholder="Title..."
                                />
                            </div>
                            <div class="form-group">
                                <label for="slug">Slug</label>
                                <input
                                    id="slug"
                                    type="text"
                                    class="text_field"
                                    v-model="lesson_create['slug']"
                                    placeholder="Slug..."
                                />
                            </div>
                            <div class="form-group">
                                <label for="embed">Embed</label>
                                <input
                                    id="embed"
                                    type="text"
                                    class="text_field"
                                    v-model="lesson_create['embed']"
                                    placeholder="Embed..."
                                />
                            </div>

                            <div class="form-group">
                                <label for="time">Time</label>
                                <the-mask
                                    :mask="'##:##:##'"
                                    placeholder="Timer..."
                                    v-model="lesson_create['duration']"
                                />
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <money-mask v-bind="money" v-model="lesson_create['value']"></money-mask>
                            </div>
                            <div class="form-group">
                                <label for="slug">category</label>
                                <select class="mt-1" @change="select_category">
                                    <option value disabled selected>Escolha uma categoria</option>
                                    <option
                                        v-for="category in categories_data"
                                        :key="category.id"
                                        :value="category['id']"
                                    >{{ category['name'] }}</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    class="form-control"
                                    placeholder="Description..."
                                    v-model="lesson_create['description']"
                                ></textarea>
                            </div>
                            <button class="btn btn-success btn-sm">Cadastrar</button>
                            <button class="btn btn-danger btn-sm" @click="create = false">Fechar</button>
                        </form>
                    </div>
                </div>

                <template v-if="message">
                    <div v-html="message"></div>
                </template>

                <div class="product_archive">
                    <div class="title_area">
                        <div class="row">
                            <div class="col-md-3 col-sm-6">
                                <h5>Lesson</h5>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <h5 class="text-ledt">Time</h5>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <h5>Category</h5>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <h5></h5>
                            </div>
                        </div>
                    </div>
                    <!-- ends: .title_area -->
                    <div class="row">
                        <div
                            class="single_product clearfix col-md-12"
                            v-for="(lesson, index) in lessons_data['rows']"
                            :key="lesson.id"
                        >
                            <div class="row">
                                <div class="col-md-3 col-sm-12">
                                    <div class="product__description">
                                        <div class="short_desc">
                                            <template v-if="edit.includes(lesson['id'])">
                                                <div
                                                    v-if="message_update_line"
                                                    v-html="message_update_line"
                                                ></div>
                                                <div class="d-flex flex-column">
                                                    <input type="text" v-model="lesson['title']" />
                                                    <input
                                                        type="text"
                                                        v-model="lesson['slug']"
                                                        class="mt-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        v-model="lesson['duration']"
                                                        class="mt-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        v-model="lesson['embed']"
                                                        class="mt-1"
                                                    />
                                                    <input
                                                        type="text"
                                                        v-model="lesson['value']"
                                                        class="mt-1"
                                                    />
                                                    <select class="mt-1" @change="select_category">
                                                        <option
                                                            v-for="category in categories_data"
                                                            :key="category.id"
                                                            :value="category['id']"
                                                            :selected="category['id'] === lesson['category']['id']"
                                                        >{{ category['name'] }}</option>
                                                    </select>
                                                    <textarea
                                                        cols="30"
                                                        rows="10"
                                                        class="form-control mt-1"
                                                        placeholder="Description..."
                                                        v-model="lesson['description']"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    class="btn btn-success btn-sm mt-2"
                                                    @click="update_lesson(lesson)"
                                                >Salvar</button>
                                                <button
                                                    class="btn btn-danger btn-sm mt-2"
                                                    @click="edit = []"
                                                >Cancelar</button>
                                            </template>
                                            <template v-else>
                                                <h5 style="text-decoration:underline">
                                                    <a :href="`/admin/lesson/${lesson['slug']}`">
                                                        {{
                                                        lesson['title']
                                                        }}
                                                    </a>
                                                </h5>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3 col-sm-6">
                                    <div class="product__price_download">
                                        <div class="item_price v_middle">{{ lesson['duration'] }}</div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6">
                                    <div
                                        class="item_action v_middle"
                                        style="text-decoration:underline"
                                    >
                                        <a :href="`/category/${lesson['category']['name']}`">
                                            {{
                                            lesson['category']['name']
                                            }}
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-3 col-sm-6">
                                    <div class="product__price_download">
                                        <div class="item_price v_middle">
                                            <button
                                                class="btn btn-warning btn-sm"
                                                @click="edit_lesson(lesson['id'])"
                                            >Editar</button>
                                        </div>
                                        <div class="item_action v_middle">
                                            <button
                                                class="btn btn-danger btn-sm"
                                                @click="delete_lesson(lesson['id'], index)"
                                            >Deletar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <template v-if="lessons_data['count'] > lessons_data['per_page']">
                                <pagination
                                    :count="lessons_data['count']"
                                    :pages="lessons_data['pages']"
                                    :per_page="lessons_data['per_page']"
                                    @change_page="lessons"
                                    class="mt-5"
                                ></pagination>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '../../helpers/Pagination';
import http from '../../http';
import { TheMask } from 'vue-the-mask';
import money from '../../main/mixins/money';

export default {
    data() {
        return {
            lessons_data: [],
            edit: [],
            lesson_create: {},
            create: false,
            message: null,
            message_update_line: null,
            categories_data: [],
            category_selected: [],
            lesson_to_search: '',
        };
    },

    mixins: [money],

    components: {
        pagination: Pagination,
        TheMask,
    },

    mounted() {
        this.lessons();
        this.categories();
    },

    methods: {
        async lessons(page) {
            try {
                const response = await http.get('/lessons', {
                    params: {
                        page,
                    },
                });

                this.lessons_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        show_form() {
            this.create = !this.create;
        },

        async categories() {
            try {
                const response = await http.get('/categories/data/no/pagination');

                this.categories_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        edit_lesson(lesson) {
            this.category_selected = [];
            if (this.edit.includes(lesson)) {
                this.edit = [];
                return false;
            }

            this.edit = [];
            this.edit.push(lesson);
        },

        select_category(event) {
            this.category_selected = [];
            this.category_selected.push(event.target.value);
        },

        async update_lesson(lesson) {
            try {
                lesson['categoryId'] = this.category_selected[0];
                const response = await http.put('/admin/lesson/update', {
                    lesson,
                });

                if (response.data.includes(1)) {
                    this.message_update_line = `<div class="alert alert-success" role="alert">Atualizado</div>`;
                    setTimeout(() => {
                        this.message_update_line = null;
                        this.edit = [];
                    }, 3000);
                    return false;
                }

                this.message_update_line = `<div class="alert alert-danger" role="alert">Erro</div>`;
                setTimeout(() => {
                    this.message_update_line = null;
                }, 3000);
            } catch (error) {
                this.message_update_line = `<div class="alert alert-danger" role="alert">Erro</div>`;
                setTimeout(() => {
                    this.message_update_line = null;
                }, 3000);
            }
        },

        async delete_lesson(lesson, index) {
            try {
                const response = await http.delete('/admin/lesson', {
                    params: {
                        id: lesson,
                    },
                });

                if (response.data === 1) {
                    this.edit.push(lesson);
                    this.message_update_line = `<div class="alert alert-success" role="alert">Deletado</div>`;
                    setTimeout(() => {
                        this.message_update_line = null;
                        this.lessons_data['rows'].splice(index, 1);
                        this.edit = [];
                    }, 3000);
                    return false;
                }

                this.message_update_line = `<div class="alert alert-danger" role="alert">Ocorreu um erro</div>`;
                setTimeout(() => {
                    this.message_update_line = null;
                }, 3000);
            } catch (error) {
                this.message_update_line = `<div class="alert alert-danger" role="alert">Ocorreu um erro</div>`;
                setTimeout(() => {
                    this.message_update_line = null;
                }, 3000);
            }
        },

        async create_lesson() {
            try {
                this.lesson_create['categoryId'] = this.category_selected[0];

                if (Object.keys(this.lesson_create).length < 7) {
                    this.message = `<div class="alert alert-danger" role="alert">Todos campos devem ser preenchidos</div>`;
                    setTimeout(function() {
                        this.message = null;
                    }, 3000);
                    return false;
                }

                const response = await http.post('/admin/lesson', {
                    lesson: this.lesson_create,
                });

                if (response.data['id'] !== undefined) {
                    this.message = `<div class="alert alert-success" role="alert">Aula cadastrada.</div>`;
                } else {
                    this.message = `<div class="alert alert-danger" role="alert">Ocorreu um erro</div>`;
                }
                setTimeout(function() {
                    this.message = null;
                    this.create = false;
                }, 3000);
            } catch (error) {
                this.message = `<div class="alert alert-danger" role="alert">Ocorreu um erro</div>`;
                setTimeout(function() {
                    this.message = null;
                }, 3000);
            }
        },

        async search_lesson() {
            try {
                const response = await http.get('/admin/lessons/search', {
                    params: {
                        searched: this.lesson_to_search,
                    },
                });

                this.lessons_data = response.data;

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
