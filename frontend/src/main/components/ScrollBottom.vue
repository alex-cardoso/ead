<template></template>

<script>
import _ from 'lodash';

export default {
    data() {
        return {
            forum_tab_active: false,
        };
    },

    mounted() {
        this.scrolled();

        EventBus.$on('forum_tab_active', status => {
            this.forum_tab_active = status;
        });
    },

    methods: {
        scrolled() {
            let documentHeight;
            let scrollHeight;

            window.onscroll = _.debounce(async () => {
                if (this.forum_tab_active) {
                    documentHeight = document.body.offsetHeight - 700;
                    scrollHeight = window.innerHeight + window.scrollY;

                    scrollHeight >= documentHeight
                        ? this.$emit('inBottom', true)
                        : this.$emit('inBottom', false);
                }
            }, 1000);
            // }
        },
    },
};
</script>