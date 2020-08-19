export interface Contrato{
    "_id" : String,
    "client" : string,
    "clientName" : string,
    "period" : period,
    "description" : string,
    "emgs" : string[],
    "emgsNames" : string[],
    "name" : string,
    "status" : boolean,
    "monto" : number,
    "monto_actual" : number,
    "divisa" : number,
    "conceptos" : concepto[]
}

interface period { 
    "start" : string,
    "end" : string,
    "single" : boolean
}

interface concepto {
    "_id" : string,
    "codigo" : string,
    "descripcion" : string,
    "precio" : number
}