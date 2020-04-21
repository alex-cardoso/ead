<template>
    <div>
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{title}}</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <slot name="content"></slot>
            </section>
            <footer class="modal-card-foot d-flex justify-content-end">
                <button class="btn btn-outline-danger btn-sm mr-1" @click="$emit('close')">Fechar</button>
                <slot name="buttons"></slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
};
</script>