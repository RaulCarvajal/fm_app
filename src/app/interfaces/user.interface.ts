export interface User{
    "info" : Info,
    "permissions" : Permissions,
    "meta" : Meta,
    "active" :boolean,
    "_id" : string,
    "username" : string,
    "password" : string,
    "role" : number,
    "cliente" : String
}

export interface Info{
    "name" : string,
    "email" : string
}

export interface Permissions {
    "emg" : string,
    "tecnicos" : number,
    "clientes" : string
}

export interface Meta{
    "registred_by" : string,
    "registred_date" : string
}