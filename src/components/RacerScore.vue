<template>
    <div class="score-item">
        <span class="year" :style="{background: color}">{{racer.year}}</span>
        <span class="name">{{racer.name}}</span>
        <span class="flag"> AB </span>
        <span class="country">{{racer.countryCode}}</span>
        <span class="time">{{racer.time.trimPrecision(2).pad(0, 2, ',')}}s</span>
    </div>
</template>

<script>
    import {Color} from "../js/entities/Color";
    import {Racer} from "../js/entities/Racer";

    export default {
        name: 'RacerScore',
        props: {
            color: [Color, String],
            racer: Racer
        },
    }
</script>

<style scoped>
    .score-item {
        display: block;
        width: 500px;
        margin: .2em auto;
    }

    .score-item .year,
    .score-item .name,
    .score-item .flag,
    .score-item .country,
    .score-item .time {
        padding: .2em .4em .2em .6em;
        display: inline-block;
        text-align: left;
        background: rgba(255, 255, 255, 0.8);
    }

    .score-item .year {
        text-align: center;

        background: black;
        color: white;
        font-weight: bold;

        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;

        width: 10%;
    }

    .score-item .name {
        width: 40%;
    }

    .score-item .flag {
        width: 5%;
        text-align: center;
    }

    .score-item .country {
        width: 10%;
    }

    .score-item .time {
        padding-right: .6em;

        width: 10%;
        text-align: right;

        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>
