<template>
  <div>
    <div class="text-center">
      <template v-if="user_data.avatar !== '' && user_data.avatar !== null">
        <img :src="user_data.avatar" ref="avatar" width="300" height="250"/>
      </template>
      <template v-else>
        <img src="/uploads/avatar_resized/default.png" ref="avatar" width="300" height="250"/>
      </template>

      <form action enctype="multipart/form-data" @submit.prevent="changeAvatar" class="mt-3">
        <input type="file" ref="file_avatar"/>
        <button type="submit" class="btn btn-success w-100 mt-2">Alterar</button>
      </form>
    </div>
    <div v-if="message" v-html="message"></div>
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
            this.message = `<div class="alert alert-danger mb-2 mt-2 text-center w-100" role="alert">Escolha uma foto</div>`;
            setTimeout(() => {
              this.message = null;
            }, 3000);
            return false;
          }

          if (!this.acceptedExtensions.includes(file.type)) {
            this.message = `<div class="alert alert-danger mb-2 mt-2 text-center w-100" role="alert">Extensão não aceita</div>`;
            setTimeout(() => {
              this.message = null;
            }, 3000);
            return false;
          }

          if (this.acceptedSize > file.size) {
            this.message = `<div class="alert alert-danger mb-2 mt-2 text-center w-100" role="alert">Tamanho não aceito</div>`;
            setTimeout(() => {
              this.message = null;
            }, 3000);
            return false;
          }

          const formData = new FormData();
          formData.append('file', file);

          const response = await http.post(
            '/profile/avatar',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
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
