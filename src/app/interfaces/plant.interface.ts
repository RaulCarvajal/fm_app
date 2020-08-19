export interface Plant{
    "_id" : string,
    "name" : string,
    "code" :  string,
    "client" : string,
    "boss" : Boss,
    "lines" : Lines[],
    "active" : boolean,
    "meta" : Meta
}

export interface Boss{
    "name" : string,
    "email" : string,
    "phone" : string
}

export interface Lines {
    "_id" : string,
    "name" : string,
    "shortname" : string,
    "desc" : string
}

export interface Meta{
    "registred_by" : string,
    "registred_date" : string
}