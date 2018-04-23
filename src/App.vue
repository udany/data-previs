<template>
    <div id="app">
        <img src="./assets/logo.png">
        <racer-dot v-for="r in racers" :key="r" :color="getColor(r)"></racer-dot>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import RacerDot from './components/RacerDot.vue'
    import {Color} from "./js/entities/Color";

    let colors = [new Color([0, 0, 255, 1]), new Color([0, 255, 0, 1]), new Color([255, 0, 0, 1])];
    let racers = [0, 1, 2, 3, 4, 5, 6];

    export default {
        name: 'app',
        components: {
            HelloWorld,
            RacerDot
        },

        data: () => ({
            racers: racers
        }),

        methods: {
            getColor(racer) {
                let idx = this.racers.indexOf(racer);
                let percent = idx / (this.racers.length-1);

                let c = Color.gradient(colors, percent);

                return c;
            },
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
