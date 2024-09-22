/**
 * Exemple d'objecte complet de URL's, és un objecte JSON, per tant, es pot accedir així:
 *
 * axios.get(urls.persones.get).
 *
 */

// export const urls = {
//   persones: {
//     list: '/persones',
//     view: '/persones/:idPersona',
//     update: '/persones/:idPersona'
//   },
//   estadesTemporals: {
//     list: '/estada-temporal',
//     view: `/estada-temporal/:idSolicitud`,
//   },
// }

/**
 * En cas d'haver de passar paràmetres, es fa ús de la funció "parseURLParams" de dins el fitxer "@/core/utils/imas.ts"
 * 
 * axios.get(
        parseURLParams(urls.persones.view, {
          idPersona: route.params.idPersona,
        })
 */

export const urls = {
  TAUX_TIPUS_DOC_APORTAT_GET: '/back/rgp/taulesAuxiliars/tipusDocumentAportat',
  TAUX_TIPUS_DOC_APORTAT_PUT:
    '/back/rgp/taulesAuxiliars/tipusDocumentAportat/:idTipusDocument',
}
