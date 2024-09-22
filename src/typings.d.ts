export enum TipusDocAporatatPublicacioAutoriaEnum {
  AUTOR = 'Autor',
  COAUTOR = 'Coautor',
}

export interface DomiciliType {
  tipusDomiciliId: number | null
  domicili: string | null
  numDomicili: string | null
  pisDomicili: string | null
  escalaDomicili: string | null
  portaDomicili: string | null
  codiPostal: string | null
  poblacioDomiciliId: number | null
}

export interface DeclaracionsTiniType {
  id: number
  declarat: boolean
  detall: string
  nom: string
  nomES: string
}

export interface PaisType {
  codi: string
  id: number
  nom: string
  nomES: string
}

export interface tipusDocumentAportatType {
  baixa: boolean
  us: string
  id: number
  nom: string
  nomES: string
  permetServeisPrestats: boolean
  ordre: number
}

export interface parentFitxerType {
  indicacionsEnPoderEntitat: string
  consultarPinbal: boolean
}

export interface CursType {
  id: number | null
  data: string | null
  tipusCredit: string | null
  unitats: number | null
  organisme: string | null
  nom: string | null
  tipusCertificatId: number | null
}

export interface DocIdentificatiuType {
  dataCaducitat: string | null
  paisNacionalitatId: number | null
  tipusDocumentIdentificatiuId: number | null
  id: number | null
}

export interface ExpProfPrivadaType {
  id: number | null
  dataFi: string | null
  dataInici: string | null
  nomEmpresa: string | null
  nomLloc: string | null
  ordre: number | null
  percentatgeJornada: number | null
  tipusDocAportatId: number | null
  // arxiuId: number | null;
  // ArxiuDto arxiu;
}

export interface ExpProfPubFuncionariType {
  id: number | null
  dataFi: string | null
  dataInici: string | null
  especialitat: string | null
  grupId: number | null
  nomEmpresa: string | null
  nomLloc: string | null
  ordre: number | null
  escalaId: number | null
  percentatgeJornada: number | null
  complementDesti: number | null
  tipusAdministracioId: number | null
  tipusDocAportatId: number | null
  // arxiuId: number | null;
  // ArxiuDto arxiu;
}

export interface ExpProfPubLaboralType {
  id: number | null
  dataFi: string | null
  dataInici: string | null
  categoriaProfessional: string | null
  especialitat: string | null
  nomEmpresa: string | null
  nomLloc: string | null
  ordre: number | null
  nivellLaboral: string | null
  percentatgeJornada: number | null
  tipusAdministracioId: number | null
  tipusDocAportatId: number | null
  // arxiuId: number | null;
  // ArxiuDto arxiu;
}

export interface ComissioServeiType {
  id: number | null
  dataFi: string | null
  dataInici: string | null
  especialitat: string | null
  grupId: number | null
  tipusDocAportatId: number | null
}

export interface FormacioIdiomaType {
  id: number | null
  data: string | null
  idiomaId: number | null
  nivellId: number | null
}

export interface CarnetType {
  id: number | null
  dataCaducitat: string | null
  tipusCarnetId: number | null
}

export interface PermisConduirType {
  id: number | null
  dataCaducitat: string | null
  tipusPermisId: number | null
}

export interface ExercicisSuperatsType {
  id: number | null
  administracio: string | null
  dataConvocatoria: string | null
  tipusExerciciId: string | null
  especialitat: string | null
}

export interface PublicacioType {
  id: number | null
  data: string | null
  dipositLegal: string | null
  isbn: string | null
  issn: string | null
  tipusPublicacioId: number | null
  autoria: TipusDocAporatatPublicacioAutoriaEnum | null
  titol: string | null
}

export interface docAportatAltresType {
  id: number | null
  descAltres: string | null
}

export interface docAportatMemoriaJustificativaType {
  id: number | null
  titol: string | null
}

export interface docAportatGrauPersonalType {
  id: number | null
  grauConsolidat: number | null
}

export interface docAportatEstudisUniversitarisType {
  id: number | null
  data: string | null
  tipusCredit: string | null
  unitats: number | null
  organisme: string | null
  nom: string | null
}

export interface docAportatDocenciaType {
  id: number | null
  organisme: string | null
  assignatura: string | null
  tipusCredit: string | null
  unitats: number | null
  brancaId: number | null
}

export interface DocIdentificatiuType {
  data: string | null
  organisme: string | null
  nivellId: number | null
  id: number | null
  nom: string | null
  ordre: number | null
  arxiuId: number | null
  // ArxiuDto arxiu;
  tipusDocAportatId: number | null
}

export interface FitxerAdjuntType {
  id: number | null
  nomFitxer: string | null
  fitxer: string | null
}

export interface DadesLaboralsType {
  administracio: string | null
  adscripcioProvisional: boolean | null
  departament: string | null
  seccio: string | null
  llocOcupat: string | null
  situacioAdministrativa: string | null
  especialitat: string | null
  grup: string | null
  grau: string | null
  solicitudId: string | number | null
}
