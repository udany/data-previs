<template>
    <div id="app">
        <div class="dots">
            <racer-dot v-for="r in racers" :key="r.GetUId()"
                       :hidden="!dotsVisible"
                       :color="getColor(r)"
                       :racer="r"
                       :secondsElapsed="secondsElapsed"></racer-dot>
        </div>

        <div class="score-board">
            <transition-group name="score" tag="div">
                <racer-score v-for="r in scores" :key="r.GetUId()" :color="getColor(r)" :racer="r" :secondsElapsed="secondsElapsed"></racer-score>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import RacerDot from './components/RacerDot.vue'
    import RacerScore from './components/RacerScore.vue'
    import {Color} from "./js/entities/Color";
    import {Racer} from "./js/entities/Racer";
    import {RacerParser} from "./js/RacerParser";

    let colors = [
        new Color([0, 0, 255, 1]),
        new Color([0, 255, 180, 1]),
        new Color([0, 255, 0, 1]),
        new Color([180, 255, 0, 1]),
        new Color([255, 0, 180, 1]),
        new Color([255, 0, 0, 1]),
    ];

    export default {
        name: 'app',
        components: {
            RacerScore,
            RacerDot
        },

        data: () => ({
            racerPool: [],
            scores: [],
            secondsElapsed: 0,
            interval: null,
            dotsVisible: false,
            gender: "M"
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
                this.scores = [];

                this.secondsElapsed = 0;

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
                    this.addScores();
                }
            },

            addScores(after, stagger = 50) {
                for(let racer of this.racers) {
                    let idx = this.racers.indexOf(racer);

                    setTimeout(() => {
                        this.scores.push(racer);
                    }, idx * stagger)
                }

                setTimeout(() => {
                    if (after) after();
                }, (this.racers.length+1) * stagger)
            },

            kickstart() {
                setTimeout(() => {
                    this.dotsVisible = true;

                    setTimeout(() => {
                        this.start();
                    }, 1000)
                }, 50);
            }
        },

        computed: {
            maxTime() {
                return Math.max(...this.racers.map(x => x.time));
            },

            racers() {
                return this.racerPool.filter(x => x.gender === this.gender);
            }
        },

        async mounted() {
            this.racerPool = await RacerParser.load();

            this.kickstart();
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
        top: 55px;
    }

    .score-enter-active, .score-leave-active {
        transition: all 1s;
    }
    .score-enter, .score-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
