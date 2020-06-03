<template>
    <div>
        <div class="dashboard_contents section--padding">
            <div class="container">
                <div style="background-color:#efefef;" class="p-3 d-flex">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Buscar..."
                        v-model="user_to_search"
                    />
                    <button class="btn btn-primary btn-sm ml-1" @click="search_user()">Buscar</button>
                </div>

                <template v-if="message">
                    <div v-html="message"></div>
                </template>

                <div class="product_archive">
                    <div class="title_area">
                        <div class="row">
                            <div class="col-md-5 col-sm-6">
                                <h5>Name</h5>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <h5 class="add_info">Lessons Buyed</h5>
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
                            v-for="(user, index) in users_data['rows']"
                            :key="user.id"
                        >
                            <div class="row">
                                <div class="col-lg-5 col-sm-12">
                                    <div class="product__description">
                                        <div class="short_desc">
                                            <template v-if="edit.includes(user['id'])">
                                                <div
                                                    v-if="message_update_line"
                                                    v-html="message_update_line"
                                                ></div>
                                                <div class="d-flex justify-content-between">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        v-model="user['name']"
                                                    />
                                                    <input
                                                        type="text"
                                                        class="form-control ml-1"
                                                        v-model="user['last_name']"
                                                    />
                                                </div>
                                                <button
                                                    class="btn btn-success btn-sm mt-2"
                                                    @click="update_user(user)"
                                                >Salvar</button>
                                                <button
                                                    class="btn btn-danger btn-sm mt-2"
                                                    @click="edit = []"
                                                >Cancelar</button>
                                            </template>
                                            <template v-else>
                                                <h5
                                                    style="text-decoration:underline"
                                                >{{ user.name }} {{ user.last_name }}</h5>
                                                <span>{{ user['email'] }}</span>
                                                <br />
                                                <span>Clique para ver as aulas da categoria</span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6">
                                    <div class="product__additional_info">{{user['buyed'].length}}</div>
                                </div>

                                <div class="col-lg-4 col-sm-6">
                                    <div class="product__price_download">
                                        <div class="item_action v_middle">
                                            <button
                                                class="btn btn-danger btn-sm"
                                                @click="delete_user(user['id'],index)"
                                            >Deletar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <template v-if="users_data['count'] > users_data['per_page']">
                                <pagination
                                    :count="users_data['count']"
                                    :pages="users_data['pages']"
                                    :per_page="users_data['per_page']"
                                    @change_page="is_search ? search_user : users"
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
import http from '../../http';
export default {
    data() {
        return {
            message: null,
            users_data: [],
            user_to_search: '',
            is_search: false,
            edit: [],
        };
    },

    mounted() {
        this.users();
    },

    methods: {
        async users(page = 1) {
            try {
                this.is_search = false;
                const response = await http.get('/admin/users/data', {
                    params: {
                        page,
                    },
                });

                this.users_data = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async search_user(page = 1) {
            try {
                this.is_search = true;
                const response = await http.get('/admin/users/search', {
                    params: {
                        searched: this.user_to_search,
                        page,
                    },
                });

                this.users_data = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
