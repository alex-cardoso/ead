<template>
    <div id="sidebar">
        <h2>Lessons: {{ category['name'] }}</h2>
        <ul id="sidebar_list_lessons_category">
            <li
                v-for="lesson in lessons['rows']"
                :key="lesson.id"
                :class="{'playing': lesson.id === lesson_id}"
            >
                <a :href="`/lesson/${lesson.slug}`">{{ lesson.title }} - {{ lesson.duration }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '../../http';
export default {
    props: ['category', 'lesson_id'],
    data() {
        return {
            lessons: [],
        };
    },

    mounted() {
        this.lessons_category();
    },

    methods: {
        async lessons_category() {
            try {
                const response = await http.get('/lessons/category', {
                    params: {
                        category: this.category['id'],
                    },
                });

                this.lessons = response.data;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
ul#sidebar_list_lessons_category .playing {
    background-color: aquamarine;
}

#sidebar {
    height: 100%;
    position: relative;
    overflow-y: scroll;
}

ul#sidebar_list_lessons_category {
    list-style: none;
    padding: 0;
}

ul#sidebar_list_lessons_category li {
    background-color: beige;
    padding: 2px;
    margin-bottom: 5px;
}

ul#sidebar_list_lessons_category li:hover {
    background-color: #efefef;
    cursor: pointer;
}
</style>
