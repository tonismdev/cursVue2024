import { Model } from 'pinia-orm'

export default class TipusDocumentAportatModel extends Model {
  static entity = 'a_tipusDocumentAportat'

  static fields() {
    return {
      id: this.uid(),
      codi: this.attr(null),
      baixa: this.attr(null),
      nom: this.attr(null),
      nomES: this.attr(null),
      ordre: this.attr(null),
      permetConsultaPlataformaInteroperabilitat: this.attr(null),
      us: this.attr(null),
    }
  }
  declare id: number
  declare codi: string
  declare baixa: boolean
  declare nom: string
  declare nomES: string
  declare ordre: number
  declare permetConsultaPlataformaInteroperabilitat: boolean
  declare us: string
}
