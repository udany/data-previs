<template>
    <div id="app">
        <div class="dots">
            <racer-dot v-for="r in racers" :key="r.GetUId()" :color="getColor(r)" :racer="r" :secondsElapsed="secondsElapsed"></racer-dot>
        </div>

        <div class="score-board">
            <racer-score v-for="r in racers" :key="r.GetUId()" :color="getColor(r)" :racer="r" :secondsElapsed="secondsElapsed"></racer-score>
        </div>
    </div>
</template>

<script>
    import RacerDot from './components/RacerDot.vue'
    import RacerScore from './components/RacerScore.vue'
    import {Color} from "./js/entities/Color";
    import {Racer} from "./js/entities/Racer";

    let colors = [
        new Color([0, 0, 255, 1]),
        new Color([0, 255, 180, 1]),
        new Color([0, 255, 0, 1]),
        new Color([180, 255, 0, 1]),
        new Color([255, 0, 180, 1]),
        new Color([255, 0, 0, 1]),
    ];

    let racers = [
        new Racer({name: "Test1", year: 1998, countryCode: "USA", time: 9.2}),
        new Racer({name: "Test2", year: 2012, countryCode: "USA", time: 10.2}),
        new Racer({name: "Test3", year: 2014, countryCode: "USA", time: 12.2}),
        new Racer({name: "Test1", year: 1998, countryCode: "USA", time: 9.2}),
        new Racer({name: "Test2", year: 2012, countryCode: "USA", time: 10.2}),
        new Racer({name: "Test3", year: 2014, countryCode: "USA", time: 12.2}),
        new Racer({name: "Test1", year: 1998, countryCode: "USA", time: 9.2}),
        new Racer({name: "Test2", year: 2012, countryCode: "USA", time: 10.2}),
        new Racer({name: "Test3", year: 2014, countryCode: "USA", time: 12.2}),
    ];

    export default {
        name: 'app',
        components: {
            RacerScore,
            RacerDot
        },

        data: () => ({
            racers: racers,
            secondsElapsed: 0,
            interval: null
        }),

        methods: {
            getColor(racer) {
                let idx = this.racers.indexOf(racer);
                let percent = idx / (this.racers.length-1);

                return Color.gradient(colors, percent);
            },

            stepAnimation(by) {
                this.secondsElapsed += by
            },

            start() {
                this.interval = setInterval(() => {
                    this.intervalFn();
                }, 100);
            },
            stop() {
                clearInterval(this.interval);
            },

            intervalFn() {
                this.stepAnimation(.1);

                if (this.secondsElapsed >= this.maxTime) {
                    this.stop();
                }
            }
        },

        computed: {
            maxTime() {
                return Math.max(...this.racers.map(x => x.time));
            },

        },

        mounted() {
            this.start();
        }
    }
</script>

<style>
    #app {
        font-family: Roboto, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;

        margin-top: 2em;
    }

    #app .dots {
        position: absolute;
        left: 0;
        right: 0;
    }

    #app .score-board {
        position: absolute;
        left: 0;
        right: 0;
    }
</style>
