<template>
    <div id="sidebar">
        <h2>Lessons: {{ category['name'] }}</h2>
        <ul id="sidebar_list_lessons_category">
            <li
                v-for="lesson in lessons"
                :key="lesson.id"
                :class="{
                    playing: lesson.id === lesson_id,
                    buyed: lesson['lessonBuyed'].length,
                }"
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

                console.log(response.data);

                this.lessons = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
