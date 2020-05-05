<template>
    <div>
        <template v-if="user_data.avatar !== ''">
            <img :src="user_data.avatar" ref="avatar" class="w-100" />
        </template>
        <template v-else>Você ainda não escolheu uma foto</template>
        <hr />
        <form action enctype="multipart/form-data" @submit.prevent="changeAvatar">
            <input type="file" ref="file_avatar" />
            <button type="sybmit" class="btn btn-outline-success w-100 mt-2">Alterar</button>
        </form>
        <div v-if="message" v-html="message" class="mt-4 text-center w-100"></div>
    </div>
</template>

<script>
import http from '../../http';
export default {
    props: ['user'],

    data() {
        return {
            acceptedExtensions: ['image/jpeg', 'image/jpg', 'image/png'],
            acceptedSize: 1000, //KB
            user_data: this.user,
            message: null,
        };
    },

    methods: {
        async changeAvatar() {
            try {
                const file = this.$refs.file_avatar.files[0];

                if (file === undefined) {
                    this.message = `<span class="alert alert-danger mb-2 text-center w-100">Escolha uma foto</span>`;
                    return false;
                }

                if (!this.acceptedExtensions.includes(file.type)) {
                    this.message = `<span class="alert alert-danger mb-2 text-center w-100">Extensão não aceita</span>`;
                    return false;
                }

                if (this.acceptedSize < file.size) {
                    this.message = `<span class="alert alert-danger mb-2 text-center w-100">Tamanho não aceito</span>`;
                    return false;
                }

                const formData = new FormData();
                formData.append('file', file);

                let config = {
                    header: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                const response = await http.post(
                    '/profile/avatar',
                    formData,
                    config
                );

                if (
                    response.data['msg'] !== undefined &&
                    response.data['msg'] === 'uploaded'
                ) {
                    this.user_data.avatar =
                        '/uploads/avatar_resized/' + response.data['avatar'];
                }

                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
