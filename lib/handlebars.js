/* HELPERS */ 

const {format} = require("timeago.js")


// OBJETO USADO POR NUESTRAS VISTAS DE HBS
const helpers = {}

// DENTRO DE ESTE OBJETO CREAMOS EL MÉTODO PARA FORMATEAR LA FECHA
helpers.timeago = (timestamp) => {
    return format(timestamp)
}


module.exports = helpers;