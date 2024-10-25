import { Model } from 'pinia-orm'

export default class Rocket extends Model {
  static entity = 'rockets'

  // Definició de les propietats del model
  static fields() {
    return {
      id: this.string(null),
      name: this.string(''),
      description: this.string(''),
      country: this.string(''),
      company: this.string(''),
      active: this.boolean(false),
      cost_per_launch: this.number(0),
    }
  }
}
