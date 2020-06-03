<template>
    <section class="single-product-desc">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12" :class="{'col-lg-12':!show_sidebar}">
                    <button
                        v-if="show_sidebar_from_sidebar"
                        class="btn btn-link btn-sm w-100"
                        id="btn-info-video"
                        @click="show_sidebar = true;show_sidebar_from_sidebar=false"
                    >
                        Informações do vídeo
                        <i class="fas fa-angle-double-right"></i>
                    </button>
                    <div class="item-preview">
                        <video-player-lesson
                            :lesson="lesson"
                            :is_authenticated="is_authenticated"
                            :show_sidebar_from_sidebar="show_sidebar_from_sidebar"
                        ></video-player-lesson>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12" v-if="show_sidebar">
                    <sidebar-lesson
                        :lesson="lesson"
                        :is_authenticated="is_authenticated"
                        @show-sidebar="hide_sidebar"
                    ></sidebar-lesson>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SidebarLesson from './SidebarLesson';
import Video from './Video';
import _ from 'lodash';
import { scroll } from '../../helpers';

export default {
    props: ['lesson', 'is_authenticated'],

    data() {
        return {
            show_sidebar: true,
            show_sidebar_from_sidebar: false,
        };
    },

    mounted() {
        window.addEventListener(
            'scroll',
            _.debounce(() => {
                if (!this.show_sidebar_from_sidebar) {
                    this.show_sidebar = scrollY >= 850 ? false : true;
                } else {
                    if (scrollY >= 850) {
                        this.show_sidebar_from_sidebar = false;
                    }
                }
            }, 200)
        );
    },

    components: {
        'sidebar-lesson': SidebarLesson,
        'video-player-lesson': Video,
    },

    methods: {
        hide_sidebar() {
            this.show_sidebar_from_sidebar = true;
            this.show_sidebar = false;
        },
    },
};
</script>

<style scoped>
#btn-info-video:hover {
    color: #8870f8;
    border: solid 1px #efefef;
}
</style>