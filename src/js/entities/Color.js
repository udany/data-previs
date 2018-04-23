import Entity from '../base/Entity';

/**
 * @name Color
 * @property {Number} r
 * @property {Number} g
 * @property {Number} b
 * @property {Number} a
 */
class Color extends Entity {
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    Serialize() {
        return [this.r, this.g, this.b, this.a];
    }

    FillFromArray(a) {
        if (a.r) {
            super.FillFromArray(a);
        } else {
            this.r = a[0];
            this.g = a[1];
            this.b = a[2];
            this.a = a[3];
        }
    }

    /**
     * Transitions between two colors
     * @param {Color} from
     * @param {Color} to
     * @param percent
     * @returns {Color}
     */
    static transition(from, to, percent) {
        // Calculate the deltas for each component
        let dR = Math.round((to.r - from.r) * percent);
        let dG = Math.round((to.g - from.g) * percent);
        let dB = Math.round((to.b - from.b) * percent);
        let dA = Math.round((to.a - from.a) * percent);

        return new Color([
            from.r + dR,
            from.g + dG,
            from.b + dB,
            from.a + dA
        ]);
    }

    /**
     * Transitions between N colors
     * @param {Color[]} colors
     * @param {Number} percent
     * @returns {Color}
     */
    static gradient(colors, percent) {
        let sectionSize = 1.01 / (colors.length - 1);

        let currentSection = Math.floor(percent / sectionSize);
        let currentProgress = (percent % sectionSize) / sectionSize;

        return this.transition(colors[currentSection], colors[currentSection+1], currentProgress);
    }
}
Color.Register();
Color.Attributes = [
    new Entity.Attributes.Integer('r', false, 0),
    new Entity.Attributes.Integer('g', false, 0),
    new Entity.Attributes.Integer('b', false, 0),
    new Entity.Attributes.Float('a', false, 1)
];

export {Color};
export default Color;