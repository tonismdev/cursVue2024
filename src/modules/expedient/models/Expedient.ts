import { Model } from 'pinia-orm'
import Usuari from '../../usuari/models/Usuari'

export default class Expedient extends Model {
  static entity = 'expedients'

  static fields() {
    return {
      id: this.attr(null),
      num: this.attr(0),
      data: this.attr(''),
      obert: this.attr(true),
      usuari_id: this.attr(null),
      usuari: this.belongsTo(Usuari, 'usuari_id'),
    }
  }
}
