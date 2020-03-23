<template>
  <div>
    <form @submit.prevent="login">
      <div class="row justify-content-md-center mt-3">
        <div class="col">
          <label for>Email</label>
          <input
            type="text"
            v-model="email"
            name="email"
            class="form-control"
          />
        </div>
        <div class="col">
          <label for>Senha</label>
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
          />
        </div>
      </div>
      <div class="row justify-content-end mr-auto">
        <button type="submit" class="btn btn-outline-success mt-1">
          Logar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import http from "../../http";

export default {
  data() {
    return {
      email: "Stone34@gmail.com",
      password: "123"
    };
  },
  methods: {
    async login() {
      try {
        const response = await http.post("/login", {
          username: this.email,
          password: this.password
        });

        if (response.data === "logged") {
          window.location.href = "/";
          return false;
        }
      } catch (error) {
        console.log(error);
        if (error.response.data === "Unauthorized") {
        }
      }
    }
  }
};
</script>
