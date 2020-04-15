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
            window.onscroll = _.debounce(async () => {
                let documentHeight;
                let scrollHeight;

                if (!this.inBottom) {
                    documentHeight = document.body.offsetHeight;
                    scrollHeight = window.innerHeight + window.scrollY;
                }

                scrollHeight >= documentHeight
                    ? this.$emit('inBottom', true)
                    : this.$emit('inBottom', false);
            }, 700);
        },
    },
};
</script>

<style lang="scss" scoped></style>
