<template>
    <aside class="sidebar sidebar--single-product">
        <div class="sidebar-card card-pricing">
            <div class="price border-none">
                <h1>
                    <span>{{lesson.value | moeda}}</span>
                </h1>
            </div>

            <template v-if="!lesson['lessonBuyed'].length">
                <button-buy-lesson
                    class="btn btn-primary w-100 btn-sm"
                    :slug="lesson.slug"
                >Comprar aula</button-buy-lesson>
            </template>
            <template v-else>
                <button class="btn btn-success btn-sm w-100">Aula já adquirida</button>
            </template>
            <button class="btn btn-warning w-100 btn-sm mt-1" @click="$emit('show-sidebar', false)">
                <i class="fas fa-angle-double-left"></i> Somente o Vídeo
            </button>
        </div>
        <!-- ends: .sidebar--card -->
        <div class="sidebar-card card--product-infos">
            <div class="card-title">
                <h4>Mais informações da aula</h4>
            </div>
            <ul class="infos">
                <li>
                    <p class="data-label">Criada</p>
                    <p class="info text-right">{{lesson.createdAt | date}}</p>
                </li>
                <li>
                    <p class="data-label">Atualizada</p>
                    <p class="info text-right">{{lesson.updatedAt | date}}</p>
                </li>
                <li>
                    <p class="data-label">Categoria</p>
                    <p class="info text-right">
                        <a
                            :href="`/category/${lesson.category['slug']}`"
                            style="text-decoration:underline"
                        >{{ lesson.category['name'] }}</a>
                    </p>
                </li>
                <li>
                    <p class="data-label">Tempo de Aula</p>
                    <p class="info text-right">{{ lesson['duration'] }}</p>
                </li>
                <li v-if="lesson['lessonBuyed'].length && lesson['github']">
                    <p class="data-label">Repositório</p>
                    <p class="info text-right">
                        <a
                            :href="`${lesson['github']['link']}`"
                            target="__blank"
                            style="text-decoration:underline"
                        >Ir para reporitório</a>
                    </p>
                </li>
            </ul>
        </div>

        <!-- <div class="sidebar-card social-share-card">
            <p>Social Share:</p>
            <ul class="list-unstyled">
                <li>
                    <a href>
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href>
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href>
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href>
                        <i class="fa fa-pinterest"></i>
                    </a>
                </li>
            </ul>
        </div>-->
    </aside>
</template>

<script>
import ButtonBuyLesson from './ButtonBuyLesson.vue';

export default {
    props: ['lesson', 'is_authenticated'],
    components: {
        'button-buy-lesson': ButtonBuyLesson,
    },
};
</script>
