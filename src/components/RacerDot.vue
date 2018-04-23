<template>
    <div class="racer-dot" :style="{background: color}">

    </div>
</template>

<script>
    import {Color} from "../js/entities/Color";

    export default {
        name: 'RacerDot',
        props: {
            color: [Color, String]
        }
    }
</script>

<style scoped>
    .racer-dot {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-right: 10px;
    }
</style>
