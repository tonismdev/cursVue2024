export const dtoToTreeCast = (json: any[]) => {
  json.forEach((element) => {
    element.key = element.id
    element.label = element.merit.nom
    element.labelES = element.merit.nomES
  })

  return json
}

export const dtoToTreeCastArbreSolicitud = (json: any[]) => {
  json.forEach((element) => {
    element.key = element.id
    element.label = element.nomMerit
    element.labelES = element.nomMeritES
  })

  return json
}
