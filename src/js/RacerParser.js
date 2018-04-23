import Racer from "./entities/Racer";

export class RacerParser {
    static async load() {
        await this.fetch();

        return this.lines.map(line => new Racer({
            name: line[7],
            year: line[0],
            country: line[1],
            countryCode: line[2],
            gender: line[5],
            time: parseFloat(line[6])
        }))
    }

    static async fetch() {
        let r = await fetch('data.tsv');
        r = await r.text();

        this.lines = r.split("\n").map(x => x.split("\t"));
        this.lines.splice(0,1);
    }
}

export default RacerParser;