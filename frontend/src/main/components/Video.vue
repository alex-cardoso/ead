<template>
    <div>
        <div>
            <iframe
                width="100%"
                height="450"
                :src="`http://www.youtube.com/embed/${lesson.embed}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>

            <div
                class="d-flex justify-content-between"
                v-if="lessons_after_and_before !== undefined"
            >
                <a
                    :href="
                        `/lesson/${lessons_after_and_before['before']['slug']}`
                    "
                    v-if="lessons_after_and_before['before'] !== null"
                    class="btn btn-primary btn-sm"
                >
                    <i class="fas fa-arrow-circle-left"></i> Anterior
                </a>

                <span v-else></span>

                <template v-if="message_favorited">
                    <button class="btn btn-warning">
                        <i class="far fa-heart"></i>
                        Você precisa estar logado
                    </button>
                </template>
                <template v-else>
                    <template v-if="is_authenticated">
                        <template v-if="favorited !== undefined && favorited.length">
                            <button
                                class="btn btn-danger btn-sm"
                                @click="remove_favorited(favorited[0]['id'])"
                            >
                                <i class="far fa-heart"></i>
                                Remover dos favoritos
                            </button>
                        </template>
                        <template v-else>
                            <button class="btn btn-danger btn-sm" @click="add_favorited">
                                <i class="far fa-heart"></i>
                                Colocar como favorito
                            </button>
                        </template>
                    </template>
                </template>

                <a
                    :href="
                        `/lesson/${lessons_after_and_before['after']['slug']}`
                    "
                    v-if="lessons_after_and_before['after'] !== null"
                    class="btn btn-primary btn-sm"
                >
                    Próxima
                    <i class="fas fa-arrow-circle-right"></i>
                </a>

                <span v-else></span>
            </div>
        </div>
        <div class="item-preview--excerpt">
            <div class="item-preview--activity">
                <div class="activity-single w-50">
                    <p>
                        <span class="icon-basket"></span> Quantos compraram
                    </p>
                    <p>{{ lesson['lessonBuyedFromUsers'].length }}</p>
                </div>
                <div class="activity-single w-50">
                    <p>
                        <span class="icon-heart"></span> Favoritado
                    </p>
                    <p>{{ favorites.length }}</p>
                </div>
            </div>
        </div>
        <div class="item-info">
            <div class="item-navigation">
                <ul class="nav nav-tabs" role="tablist">
                    <li>
                        <a
                            href="#product-details"
                            class="active"
                            id="tab1"
                            aria-controls="product-details"
                            role="tab"
                            data-toggle="tab"
                            aria-selected="true"
                        >
                            <span class="icon icon-docs"></span> Detalhes da aula
                        </a>
                    </li>
                    <li>
                        <a
                            href="#product-comment"
                            id="tab2"
                            aria-controls="product-comment"
                            role="tab"
                            data-toggle="tab"
                        >
                            <span class="icon icon-bubbles"></span> Comments
                        </a>
                    </li>
                </ul>
            </div>
            <!-- ends: .item-navigation -->
            <div class="tab-content">
                <div
                    class="fade show tab-pane product-tab active"
                    id="product-details"
                    role="tabpanel"
                    aria-labelledby="tab1"
                >
                    <div class="tab-content-wrapper">
                        <h3>Detalhes da aula</h3>
                        <p class="p-bottom-30" v-html="lesson['description']"></p>
                    </div>
                </div>
                <!-- ends: .tab-content -->
                <div
                    class="fade tab-pane product-tab"
                    id="product-comment"
                    role="tabpanel"
                    aria-labelledby="tab2"
                >
                    <div class="thread">
                        <ul class="media-list thread-list">
                            <li class="single-thread">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m1.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div>
                                            <div class="media-heading">
                                                <a href="author.html">
                                                    <h4>Themexylum</h4>
                                                </a>
                                                <span>9 Hours Ago</span>
                                            </div>
                                            <a href="#" class="reply-link">Reply</a>
                                        </div>
                                        <p>
                                            Nunc placerat mi id nisi interdum mollis. Praesent pharetra, justo ut
                                            sceleris que the mattis, leo quam aliquet congue placerat mi id nisi
                                            interdum mollis.
                                        </p>
                                    </div>
                                </div>
                                <!-- ends: .media -->
                                <!-- nested comment markup / replies -->
                                <ul class="children">
                                    <li class="single-thread depth-2">
                                        <div class="media">
                                            <div class="media-left">
                                                <a href="#">
                                                    <img
                                                        class="media-object"
                                                        src="/img/m2.png"
                                                        alt="Commentator Avatar"
                                                    />
                                                </a>
                                            </div>
                                            <div class="media-body">
                                                <div class="media-heading">
                                                    <h4>AazzTech</h4>
                                                    <span>6 Hours Ago</span>
                                                </div>
                                                <span class="comment-tag author">Author</span>
                                                <p>
                                                    Nunc placerat mi id nisi interdum mollis. Praesent pharetra,
                                                    justo ut sceleris que the mattis, leo quam aliquet congue
                                                    placerat mi id nisi interdum mollis.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="single-thread depth-2">
                                        <div class="media">
                                            <div class="media-left">
                                                <a href="#">
                                                    <img
                                                        class="media-object"
                                                        src="/img/m1.png"
                                                        alt="Commentator Avatar"
                                                    />
                                                </a>
                                            </div>
                                            <div class="media-body">
                                                <div class="media-heading">
                                                    <h4>Themexylum</h4>
                                                    <span>9 Hours Ago</span>
                                                </div>
                                                <p>
                                                    Nunc placerat mi id nisi interdum mollis. Praesent pharetra,
                                                    justo ut sceleris que the mattis, leo quam aliquet congue
                                                    placerat mi id nisi interdum mollis.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <!-- ends: .children -->
                                <!-- comment reply -->
                                <div class="media depth-2 reply-comment">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m2.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <form action="#" class="comment-reply-form">
                                            <textarea
                                                class="bla"
                                                name="reply-comment"
                                                placeholder="Write your comment..."
                                            ></textarea>
                                            <button class="btn btn--md btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>
                                <!-- comment reply -->
                            </li>
                            <!-- ends: .single-thread-->
                            <li class="single-thread">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m2.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div>
                                            <div class="media-heading">
                                                <a href="author.html">
                                                    <h4>EchoTheme</h4>
                                                </a>
                                                <span>9 Hours Ago</span>
                                            </div>
                                            <a href="#" class="reply-link">Reply</a>
                                        </div>
                                        <p>
                                            Nunc placerat mi id nisi interdum mollis. Praesent pharetra, justo ut
                                            sceleris que the mattis, leo quam aliquet congue placerat mi id nisi
                                            interdum mollis.
                                        </p>
                                    </div>
                                </div>
                                <!-- ends: .media -->
                                <!-- nested comment markup / replies -->
                                <!-- comment reply -->
                                <div class="media depth-2 reply-comment">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m2.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <form action="#" class="comment-reply-form">
                                            <textarea
                                                class="bla"
                                                name="reply-comment"
                                                placeholder="Write your comment..."
                                            ></textarea>
                                            <button class="btn btn--md btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>
                                <!-- comment reply -->
                            </li>
                            <!-- ends: .single-thread-->
                            <li class="single-thread">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m3.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div>
                                            <div class="media-heading">
                                                <a href="author.html">
                                                    <h4>SnazzyTheme</h4>
                                                </a>
                                                <span>9 Hours Ago</span>
                                            </div>
                                            <a href="#" class="reply-link">Reply</a>
                                        </div>
                                        <p>
                                            Nunc placerat mi id nisi interdum mollis. Praesent pharetra, justo ut
                                            sceleris que the mattis, leo quam aliquet congue placerat mi id nisi
                                            interdum mollis.
                                        </p>
                                    </div>
                                </div>
                                <!-- ends: .media -->
                                <!-- nested comment markup / replies -->
                                <!-- comment reply -->
                                <div class="media depth-2 reply-comment">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m2.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <form action="#" class="comment-reply-form">
                                            <textarea
                                                class="bla"
                                                name="reply-comment"
                                                placeholder="Write your comment..."
                                            ></textarea>
                                            <button class="btn btn--md btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>
                                <!-- comment reply -->
                            </li>
                            <!-- ends: .single-thread-->
                            <li class="single-thread">
                                <div class="media">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m4.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div>
                                            <div class="media-heading">
                                                <a href="author.html">
                                                    <h4>ThemeValley</h4>
                                                </a>
                                                <span>9 Hours Ago</span>
                                            </div>
                                            <a href="#" class="reply-link">Reply</a>
                                        </div>
                                        <p>
                                            Nunc placerat mi id nisi interdum mollis. Praesent pharetra, justo ut
                                            sceleris que the mattis, leo quam aliquet congue placerat mi id nisi
                                            interdum mollis.
                                        </p>
                                    </div>
                                </div>
                                <!-- ends: .media -->
                                <!-- nested comment markup / replies -->
                                <!-- comment reply -->
                                <div class="media depth-2 reply-comment">
                                    <div class="media-left">
                                        <a href="#">
                                            <img
                                                class="media-object"
                                                src="/img/m2.png"
                                                alt="Commentator Avatar"
                                            />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <form action="#" class="comment-reply-form">
                                            <textarea
                                                class="bla"
                                                name="reply-comment"
                                                placeholder="Write your comment..."
                                            ></textarea>
                                            <button class="btn btn--md btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>
                                <!-- comment reply -->
                            </li>
                            <!-- ends: .single-thread-->
                        </ul>
                        <!-- ends: .media-list -->
                        <!-- Start Pagination -->
                        <nav class="pagination-default">
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                            <i class="fa fa-long-arrow-left"></i>
                                        </span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item disabled">
                                    <a class="page-link" href="#">...</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">10</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">
                                            <i class="fa fa-long-arrow-right"></i>
                                        </span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <!-- Ends: .pagination-default -->
                        <div class="comment-form-area">
                            <h4>Leave a comment</h4>
                            <div class="media comment-form">
                                <div class="media-left">
                                    <a href="#">
                                        <img
                                            class="media-object"
                                            src="/img/m7.png"
                                            alt="Commentator Avatar"
                                        />
                                    </a>
                                </div>
                                <div class="media-body">
                                    <form action="#" class="comment-reply-form">
                                        <textarea
                                            name="reply-comment"
                                            placeholder="Write your comment..."
                                        ></textarea>
                                        <button class="btn btn--sm btn-primary">Post Comment</button>
                                    </form>
                                </div>
                            </div>
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
    props: ['lesson', 'is_authenticated'],

    data() {
        return {
            lessons: [],
            favorites: [],
            lesson_before: null,
            lesson_after: null,
            user: null,
            message_favorited: false,
        };
    },

    mounted() {
        this.lessons_category();
        this.get_favorites();
    },

    computed: {
        lessons_after_and_before() {
            if (this.lessons !== undefined) {
                const index = this.lessons.findIndex(lesson => {
                    return this.lesson_id === lesson.id;
                });

                this.lesson_before = index > 0 ? this.lessons[index - 1] : null;
                this.lesson_after =
                    index < this.lessons.length - 1
                        ? this.lessons[index + 1]
                        : null;

                return {
                    before: this.lesson_before,
                    after: this.lesson_after,
                };
            }
        },

        favorited() {
            let favorited = false;
            if (this.favorites.length) {
                favorited = this.favorites.filter(
                    favorite => favorite.userId === this.user.id
                );
            }

            return favorited;
        },
    },

    methods: {
        async lessons_category() {
            try {
                const response = await http.get('/lessons/category', {
                    params: {
                        category: this.lesson['category']['id'],
                    },
                });
                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },

        async get_favorites() {
            try {
                const response = await http.get('/favorites/lesson', {
                    params: {
                        lessonId: this.lesson['id'],
                    },
                });

                this.favorites = response.data['favorites'];
                this.user = response.data['user'];
            } catch (error) {
                console.log(error);
            }
        },

        async add_favorited() {
            try {
                const response = await http.post('/favorites', {
                    lessonId: this.lesson['id'],
                });

                if (response.data[0] !== undefined) {
                    this.favorites.push({ ...response.data[0] });
                }
            } catch (error) {
                if (
                    error.response !== undefined &&
                    error.response.data === 'not_logged_in'
                ) {
                    this.message_favorited = true;
                }

                setTimeout(() => {
                    this.message_favorited = false;
                }, 3000);
                console.log(error);
            }
        },

        async remove_favorited(id) {
            const response = await http.delete('/favorites', {
                params: {
                    id,
                },
            });

            if (response.data === 1) {
                this.favorites.find((favorite, index) => {
                    if (favorite.userId === this.user['id']) {
                        this.favorites.splice(index, 1);
                    }
                });
            }
        },
    },
};
</script>
