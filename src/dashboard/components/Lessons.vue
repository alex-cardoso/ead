<template>
  <div id="lessons" v-if="loaded">
    <div id="header_lessons">
      <h2>Aulas ({{ lessons_data["count"] }})</h2>
      <button class="btn btn-danger btn-xs">Nova</button>
    </div>
    <hr />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Aula</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Duração</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="lessons_data['rows'].length <= 0">
          <td colspan="6">Nenhuma aula cadastrada</td>
        </tr>
        <tr v-for="(lesson, key) in lessons_data['rows']" :key="key">
          <td>{{ lesson.title }}</td>
          <td>{{ lesson.value | moeda }}</td>
          <td>Categoria</td>
          <td>{{ lesson.duration }}</td>
          <td>
            <button class="btn btn-info btn-sm">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger btn-sm">Excluir</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="6">
            <Pagination
              :count="lessons_data['count']"
              :pages="lessons_data['pages']"
              @change_page="lessons"
            ></Pagination>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import http from "../../http";
import Pagination from "../../helpers/Pagination";

export default {
  data() {
    return {
      lessons_data: [],
      loaded: false
    };
  },

  components: {
    Pagination
  },

  mounted() {
    this.lessons();
  },

  methods: {
    async lessons(page) {
      try {
        const response = await http.get("/dashboard/lessons/data", {
          params: {
            page
          }
        });
        this.lessons_data = response.data;
        this.loaded = true;
        console.log(response);
      } catch (error) {
        this.loaded = true;
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
#lessons {
  padding: 10px;
}

#header_lessons {
  display: flex;
  justify-content: space-between;
  align-items: cente;
}
</style>
