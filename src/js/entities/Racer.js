import Entity from './../base/Entity';

/**
 * @name Racer
 * @property {string} name
 * @property {Number} year
 * @property {string} country
 * @property {string} countryCode
 * @property {string} gender
 * @property {Number} time
 */
export class Racer extends Entity {
}

Racer.Register();
Racer.Attributes = [
    new Entity.Attributes.String('name'),
    new Entity.Attributes.Integer('year'),
    new Entity.Attributes.String('country'),
    new Entity.Attributes.String('countryCode'),
    new Entity.Attributes.String('gender'),
    new Entity.Attributes.Float('time'),
];

export default Racer;