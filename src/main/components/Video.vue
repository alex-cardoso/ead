<template>
    <div>
        <div>
            <iframe
                width="100%"
                height="450"
                :src="`http://www.youtube.com/embed/${embed}`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<script>
import http from '../../http';

export default {
    props: ['embed'],
};
</script>
