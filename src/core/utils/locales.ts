export function printLocaleString(item, locale, sufix = ''): string {
  if (item) {
    if (locale == 'ca') {
      return item['nom' + sufix]
    } else {
      return item['nomES' + sufix]
    }
  } else return ''
}

export function printLocaleComposedString(
  item,
  locale: string,
  caField,
  esField
): string {
  if (item) {
    if (locale == 'ca') {
      return item[caField]
    } else {
      return item[esField]
    }
  } else return ''
}

export const calendariEs = {
  choose: 'Tria',
  firstDayOfWeek: 1,
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  today: 'Hoy',
  clear: 'Borrar',
  weekHeader: 'Sm',
}

export const calendariCa = {
  firstDayOfWeek: 1,
  dayNames: [
    'Diumenge',
    'Dilluns',
    'Dimarts',
    'Dimecres',
    'Dijous',
    'Divendres',
    'Dissabte',
  ],
  dayNamesShort: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
  dayNamesMin: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  monthNames: [
    'Gener',
    'Febrer',
    'Març',
    'Abril',
    'Maig',
    'Juny',
    'Juliol',
    'Agost',
    'Setembre',
    'Octubre',
    'Novembre',
    'Decembre',
  ],
  monthNamesShort: [
    'Gen',
    'Feb',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Oct',
    'Nov',
    'Dec',
  ],
  today: 'Avui',
  clear: 'Borrar',
  weekHeader: 'Sm',
  aria: {
    navigation: 'Navigation',
  },

  startsWith: 'Comença per',
  contains: 'Conté',
  notContains: 'No conté',
  endsWith: 'Acaba per',
  equals: 'Igual',
  notEquals: 'No igual',
  noFilter: 'Sense filtre',
  lt: 'Menor que',
  lte: 'Menor que o igual a',
  gt: 'Major que',
  gte: 'Major que o igual a',
  dateIs: 'La data és',
  dateIsNot: 'La data no és',
  dateBefore: 'La data és anterior',
  dateAfter: 'La data és després',
  apply: 'Aplicar',
  matchAll: 'Match All',
  matchAny: 'Match Any',
  addRule: 'Afegir regla',
  removeRule: 'Eliminar regla',
  accept: 'Sí',
  reject: 'No',
  choose: 'Choose',
  upload: 'Pujar',
  cancel: 'Cancelar',
  dateFormat: 'dd/mm/yy',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  passwordPrompt: 'Introdueix una contrasenya',
  emptyFilterMessage: "No s'han trobat resultats",
  emptyMessage: 'No hi ha opcions disponibles',
}
