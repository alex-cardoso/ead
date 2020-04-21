<template>
    <div></div>
</template>

<script>
import _ from 'lodash';

export default {
    mounted() {
        this.scrolled();
    },

    methods: {
        scrolled() {
            let documentHeight;
            let scrollHeight;
            window.onscroll = _.debounce(async () => {
                documentHeight = document.body.offsetHeight;
                scrollHeight = window.innerHeight + window.scrollY;

                scrollHeight >= documentHeight
                    ? this.$emit('inBottom', true)
                    : this.$emit('inBottom', false);
            }, 700);
        },
    },
};
</script>