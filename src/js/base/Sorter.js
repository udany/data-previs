import {Emitter} from "./General";

class Sorter extends Emitter {
    constructor(compareFn, direction = 0, priority = 0) {
        super();

        this.compareFn = compareFn;
        this.direction = direction;
        this.priority = priority;
    }

    compare(a, b) {
        return this.direction ? this.direction * this.compareFn(a, b) : 0;
    }

    cycle(sorters) {
        let priority = 0;

        if (sorters) {
            priority = Sorter.maxPriority(sorters) + 1;
        }

        if (this.direction === 0) {
            this.direction = 1;
            this.priority = priority;
        } else if (this.direction === 1) {
            this.direction = -1;
        } else {
            this.direction = 0;
            this.priority = 0;
        }
    }

    /**
     * Sorts an array
     * @param {Array} data
     * @param {Sorter[]} sorters
     */
    static sort(data, sorters) {
        if (!(sorters instanceof Array)) sorters = Object.values(sorters);

        sorters = sorters.filter(x => x.direction).sort((a, b) => a.priority - b.priority);

        return ([]).concat(data).sort(function (a, b) {
            for (let sorter of sorters) {
                let r = sorter.compare(a, b);
                if (r !== 0) {
                    return r;
                }
            }
            return 0;
        });
    }

    static maxPriority(sorters) {
        if (!(sorters instanceof Array)) sorters = Object.values(sorters);

        return sorters.reduce((accumulator, s) => Math.max(accumulator || s.priority, s.priority), 0);
    }

    static fromAttribute(attribute, direction = 0, priority = 0) {
        if (!attribute) throw "Can't create a mofo sorter from an attribute without the attribute";

        return new Sorter((a, b) => attribute.compare(a, b), direction, priority);
    }
}

export default Sorter;