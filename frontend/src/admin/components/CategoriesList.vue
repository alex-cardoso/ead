<template>
    <div>
        <div class="dashboard_contents section--padding">
            <div class="container">
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
                    <p
                        class="ml-3"
                    >Para cadastrar uma nova categoria, clique no botão ao lado, e ao finalizar o cadastro atualize a
                        página para
                        a categoria ser mostrada na listagem.</p>
                </div>

                <template v-if="message">
                    <div v-html="message"></div>
                </template>

                <template v-if="create">
                    <div style="background-color:#efefef;padding:10px;" class="mt-3">
                        <form @submit.prevent="create_category">
                            <div class="form-group">
                                <label for="user_name">Nome</label>
                                <input
                                    id="user_name"
                                    type="text"
                                    class="text_field"
                                    v-model="new_category['name']"
                                    placeholder="Nome..."
                                />
                            </div>
                            <div class="form-group">
                                <label for="pass">Slug</label>
                                <input
                                    id="pass"
                                    type="text"
                                    class="text_field"
                                    v-model="new_category['slug']"
                                    placeholder="Slug..."
                                />
                            </div>
                            <button class="btn btn-success btn-sm">Cadastrar</button>
                            <button class="btn btn-danger btn-sm" @click="create = false">Fechar</button>
                        </form>
                    </div>
                </template>

                <hr/>
                <div class="product_archive">
                    <div class="title_area">
                        <div class="row">
                            <div class="col-md-5 col-sm-6">
                                <h5>Category</h5>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <h5 class="add_info">Lessons</h5>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <h5></h5>
                            </div>
                            <div class="col-md-2 col-sm-6">
                                <h5></h5>
                            </div>
                        </div>
                    </div>
                    <!-- ends: .title_area -->
                    <div class="row">
                        <div
                            class="single_product clearfix col-md-12"
                            v-for="(category, index) in categories_data['rows']"
                            :key="category.id"
                        >
                            <div class="row">
                                <div class="col-lg-5 col-sm-12">
                                    <div class="product__description">
                                        <div class="short_desc">
                                            <template v-if="edit.includes(category['id'])">
                                                <div v-if="message_update_line" v-html="message_update_line"></div>
                                                <div class="d-flex justify-content-between">

                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        v-model="category['name']"
                                                    />
                                                    <input
                                                        type="text"
                                                        class="form-control ml-1"
                                                        v-model="category['slug']"
                                                    />
                                                </div>
                                                <button class="btn btn-success btn-sm mt-2"
                                                        @click="update_category(category)">Salvar
                                                </button>
                                                <button
                                                    class="btn btn-danger btn-sm mt-2"
                                                    @click="edit = []"
                                                >Cancelar
                                                </button>
                                            </template>
                                            <template v-else>
                                                <h5 style="text-decoration:underline">
                                                    <a
                                                        :href="`/admin/category/${category['slug']}`"
                                                    >{{category['name']}}</a>
                                                </h5>
                                                <span>Clique para ver as aulas da categoria</span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6">
                                    <div
                                        class="product__additional_info"
                                    >{{category['lessons'].length}}
                                    </div>
                                </div>

                                <div class="col-lg-4 col-sm-6">
                                    <div class="product__price_download">
                                        <div class="item_price v_middle">
                                            <button
                                                class="btn btn-warning btn-sm"
                                                @click="edit_category(category['id'])"
                                            >Editar
                                            </button>
                                        </div>
                                        <div class="item_action v_middle">
                                            <button
                                                class="btn btn-danger btn-sm"
                                                @click="delete_category(category['id'],index)"
                                            >Deletar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <template v-if="categories_data['count'] > categories_data['per_page']">
                                <pagination
                                    :count="categories_data['count']"
                                    :pages="categories_data['pages']"
                                    :per_page="categories_data['per_page']"
                                    @change_page="categories"
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

    export default {
        data() {
            return {
                categories_data: [],
                edit: [],
                create: false,
                new_category: {
                    name: '',
                    slug: '',
                },
                message: null,
                message_update_line: null,
            };
        },

        components: {
            pagination: Pagination,
        },

        mounted() {
            this.categories();
        },

        methods: {
            async categories(page) {
                try {
                    const response = await http.get('/categories/data', {
                        params: {
                            page,
                        },
                    });
                    this.categories_data = response.data;
                } catch (error) {
                    console.log(error);
                }
            },

            edit_category(category) {
                this.edit = [];

                this.edit.push(category);
            },

            show_form() {
                this.create = !this.create;
            },

            async delete_category(category, index) {
                try {
                    const response = await http.delete('/admin/category/destroy', {
                        params: {
                            id: category,
                        },
                    });

                    if (response.data === 1) {
                        this.message = `<div class="alert alert-success w-100" role="alert">Deletado com sucesso.</div>`;
                        this.categories_data['rows'].splice(index, 1);
                    } else {
                        this.message = `<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao deletar, tente novamente.</div>`;
                    }

                    setTimeout(() => {
                        this.message = null;
                    }, 3000);
                } catch (error) {
                    console.log(error);
                }
            },

            async create_category() {
                try {
                    if (this.new_category['name'] === '' || this.new_category['slug'] === '') {
                        this.message = `<div class="alert alert-danger w-100" role="alert">Digite todos os campos corretamente.</div>`;

                        setTimeout(() => {
                            this.create = false;
                            this.message = null;
                            this.new_category = {};
                        }, 3000);

                        return false;
                    }

                    const response = await http.post('/admin/category/store', {
                        category: this.new_category,
                    });

                    this.message = (response.data['id'] !== undefined) ?
                        `<div class="alert alert-success w-100" role="alert">Cadastrado com sucesso.</div>` :
                        `<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao cadastrar, tente novamente.</div>`;

                    setTimeout(() => {
                        this.create = false;
                        this.message = null;
                        this.new_category = {};
                    }, 3000);

                } catch (error) {
                    this.message = `<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao cadastrar, tente novamente.</div>`;
                    setTimeout(() => {
                        this.message = null;
                    }, 3000);
                }
            },

            async update_category(category) {
                try {
                    const response = await http.put('/admin/category/update', {
                        id: category['id'],
                        name: category['name'],
                        slug: category['slug'],
                    });

                    this.message_update_line = (response.data.includes(1)) ?
                        this.message_update_line = `<div class="alert alert-success w-100" role="alert">Atualizado com sucesso</div>`:
                        this.message_update_line = `<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao atualizar, tente novamente</div>`;

                    setTimeout(() => {
                        this.message_update_line = null;
                        this.edit = [];
                    }, 3000);

                } catch (error) {
                    this.message_update_line = `<div class="alert alert-danger w-100" role="alert">Ocorreu um erro ao atualizar, tente novamente</div>`;
                    setTimeout(() => {
                        this.message_update_line = null;
                    }, 3000);
                }
            },

        },
    };
</script>
