import { Model } from 'pinia-orm'
import Expedient from '../../expedient/models/Expedient'

export default class Usuari extends Model {
  static entity = 'usuaris'

  static fields() {
    return {
      id: this.attr(null),
      nom: this.attr('Nom no disponible'),
      username: this.attr('Username no disponible'),
      data_naixement: this.attr('Data de Naixement no disponible'),
      expedients: this.hasMany(Expedient, 'usuari_id'),
    }
  }
}
