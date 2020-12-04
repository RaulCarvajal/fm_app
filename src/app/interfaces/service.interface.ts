export interface servicios {
    '_id' : String,
    'type' : String,
    'desc' : String,
    'date' : String,
    'start' : String,
    'finish' : String,
    'hours' : number
    'status' : number,
    'client' : String,
    'tecnico' : String,
    'emg' : String,
    'observ' : obs,
    'signature' : String,
    'score' : number,
    'requested_by' : String,
    'autorized_by' : String,
    'service_details' : service_details,
    'agreement' : String,
    'payment' : payment,
    'conceptos' : conceptos [],
    'enlaces' : string,
    'imgs' : string []
}

interface obs { 
    'trabajo_realizado' : String,
    'comentarios' : String,
    'recomendaciones' : String
}
interface service_details {
    'tipo_sensor' : String,
    'tipo_controlador' : String,
    'programa' : String
}
interface payment { 
    'divisa' : string,
    'total' : number,
}
interface conceptos {
    'codigo' : string,
    'descripcion' : string,
    'horas' : number,
    'precio' : number,
    'subtotal' : number
}