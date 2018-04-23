<template>
    <div class="racer-dot" :class="{hidden}">
        <div class="racer-label">{{racer.year}}</div>
        <div class="trail" :style="{height: trailHeight}"></div>
        <div class="dot" :style="{background: color, transform}"></div>
    </div>
</template>

<script>
    import {Color} from "../js/entities/Color";
    import {Racer} from "../js/entities/Racer";

    export default {
        name: 'RacerDot',
        props: {
            hidden: Boolean,
            color: [Color, String],
            racer: Racer,
            secondsElapsed: [Number],
            totalDistance: {
                default: 820
            }
        },

        computed: {
            distance() {
                return Math.min((this.secondsElapsed / this.racer.time), 1) * this.totalDistance;
            },
            transform() {
                return `translateY(${this.distance}px)`;
            },
            trailHeight() {
                return `${this.distance + 8}px`;
            }
        }
    }
</script>

<style scoped>
    .racer-dot {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
        text-align: center;

        opacity: 1;

        position: relative;

        transition: all .8s;
    }

    .racer-dot.hidden {
        opacity: 0;
    }

    .racer-dot .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        border: 3px solid rgba(5, 15, 54, 0.2);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

        display: inline-block;

        transition: all .1s linear;

        transform: translateY(0px);
    }
    .racer-dot.hidden .dot {
        transform: translateY(-10px) !important;
    }

    .racer-dot .trail {
        width: 10px;
        height: 0px;
        position: absolute;
        background: linear-gradient(to bottom, #f2f2f2 0%, #7d7d7d 100%);

        opacity: .5;

        left: 5px;
        transition: all .1s linear;
    }

    .racer-dot .racer-label {
        cursor: default;

        transform: translate(5px, -8px) rotate(-35deg);

        font-size: .9em;
        font-weight: bold;
        opacity: .2;

        transition: all .5s;
    }
    .racer-dot.hidden .racer-label {
        transform: translate(5px, -8px) rotate(-55deg);
    }

    .racer-dot:hover .racer-label {
        opacity: .8;
    }
</style>
