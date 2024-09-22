import { Model } from 'pinia-orm'
import { DateCast } from 'pinia-orm/dist/casts'
import { Attr, Cast, Str } from 'pinia-orm/dist/decorators'

export enum Sexe {
  H = 'H',
  D = 'D',
}

export enum TipusDoi {
  nif = 'N',
  nie = 'E',
  passaport = 'P',
  // cif = 'C',
  // altres = 'X',
  // origen = 'O',
}

export class Persona extends Model {
  static entity = 'Persona'

  @Attr(null) declare id: number

  @Attr(TipusDoi.nif) declare tipus_doi: TipusDoi

  @Str('') declare doi: string

  @Str('') declare nom: string

  @Attr(Sexe.D) declare sexe: Sexe

  @Str('') declare llinatge1: string

  @Str('') declare llinatge2: string

  @Cast(() => DateCast)
  @Attr(null)
  declare data_naixement: Date

  @Str('') declare telefon: string

  @Str('') declare email: string

  @Str('') declare observacions: string

  static from(from?: Persona): Persona {
    const to = new Persona()

    if (from) {
      Object.assign(to, { ...from })
    }

    return to
  }

  static nomComplet(per?: Persona, nif = false): string {
    let nomComplet = ''
    if (per) {
      nomComplet = `${per.nom} ${per.llinatge1} ${per.llinatge2 || ''}`
      if (nif) {
        nomComplet = nomComplet + ` (${per.doi})`
      }
    }
    return nomComplet
  }
}
