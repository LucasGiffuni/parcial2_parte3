

# RECURSO PERSONA #
default route:

/persona


## endpoints personas ##

### /ingresarPersona ###
/ingresarPersona (POST)
body:
{
    nombres: [
        string,string
    ],
    apellidos:[
string,string
    ],
    email: string,
    telefono: string,
    idEmpresa: number,
    notasAdicionales: string
}

#### Posibles Responses ####
{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": {
        "idPersona": 4,
        "nombres": [
            "pablo"
        ],
        "apellidos": [
            "pablo"
        ],
        "email": "pablo@gmail.com",
        "telefono": 99434534245,
        "idEmpresa": 1
    }
}

{
    "Result": {
        "statuscode": "404",
        "statustext": "Los datos no pueden venir vacios"
    },
    "data": {
        "idPersona": 4,
        "nombres": [
            "pablo"
        ],
        "apellidos": [
            "pablo"
        ],
        "email": "pablo@gmail.com",
        "telefono": 99434534245,
        "idEmpresa": null
    }
}

### /eliminarPersona ###

/eliminarPersona/idPersona (POST)
input: param idPersona

#### posibles Repsonses ####

response:
{
    "Result": {
        "statuscode": "200",
        "statustext": "Person deleted correctly"
    },
    "data": ""
}

{
    "Result": {
        "statuscode": "404",
        "statustext": "Person not found"
    },
    "data": ""
}

### /buscarPersona ###

/buscarPersona (GET)
body:
{
    nombre: string,
    apellido: string
}

#### posibles responses ####



### /listarPersonas ###

/listarPersonas (GET)
response{
    result:
    {
        statusCode: string,
        statusText: string
    },
    personas[]  
}
#### posibles responses ####
{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": [
        {
            "idPersona": 0,
            "nombres": [
                "juan",
                "carlos"
            ],
            "apellidos": [
                "cruz",
                "cruz"
            ],
            "email": "nose@gmail.com",
            "telefono": 9999999,
            "idEmpresa": 0
        },
        {
            "idPersona": 1,
            "nombres": [
                "pepe"
            ],
            "apellidos": [
                "sanchez"
            ],
            "email": "aa@gmail.com",
            "telefono": 12432314,
            "idEmpresa": 0
        },
        {
            "idPersona": 2,
            "nombres": [
                "matias"
            ],
            "apellidos": [
                "perez"
            ],
            "email": "bb@gmail.com",
            "telefono": 646463456,
            "idEmpresa": 1
        }
    ]
}

### /detallePersona ###

/detallePersona/idPersona (GET)
input param idPersona

response:{
      result:
    {
        statusCode: string,
        statusText: string
    },
    persona 
}

#### posibles responses ####
{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": [
        {
            "idPersona": 2,
            "nombres": [
                "matias"
            ],
            "apellidos": [
                "perez"
            ],
            "email": "bb@gmail.com",
            "telefono": 646463456,
            "idEmpresa": 1
        }
    ]
}

# RECURSO EMPRESA #


ruta base empresa:
/empresa


## endpoints personas ##


### /ingresarEmpresa ###

/ingresarEmpresa
body:
{
    nombre: string,
    email: string,
    website: string,
    notes: string
}
#### posibles responses ####

{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": {
        "idEmpresa": 2,
        "nombre": "pepe",
        "website": "nmose.com"
    }
}

### /eliminarEmpresa ###

/eliminarEmpresa/idEmpresa
input param idEmpresa

response:
{
     result:
    {
        statusCode: string,
        statusText: string
    }
}

#### posibles responses ####
{
    "Result": {
        "statuscode": "200",
        "statustext": "Person deleted correctly"
    },
    "data": ""
}

{
    "Result": {
        "statuscode": "404",
        "statustext": "Empresa tiene personas asociadas, no se puede borrar"
    },
    "data": ""
}

### /listarEmpresas ###

/listarEmpresas
response{
    result:
    {
        statusCode: string,
        statusText: string
    },
    empresas[]  
}
#### posibles responses ####

{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": [
        {
            "idEmpresa": 0,
            "nombre": "empresa 1",
            "website": "www.com",
            "notasAdicionales": "nose"
        },
        {
            "idEmpresa": 1,
            "nombre": "empresa 2",
            "website": "www.uy",
            "notasAdicionales": "si se"
        }
    ]
}

### /detalleEmpresa ###

/detalleEmpresa/idEmpresa
input param idEmpresa

response:{
      result:
    {
        statusCode: string,
        statusText: string
    },
    empresas 
}

#### posibles responses ####
{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": [
        {
            "idEmpresa": 1,
            "nombre": "empresa 1",
            "website": "www.com",
            "notasAdicionales": "nose"
        }
    ]
}

## JWT Autenticacion ##

/user route

### /login ###
/login
body:
{
    "username": "lucas",
    "password": "pass"
}

### Posibles Responses ###
response:
{
    "Result": {
        "statuscode": "200",
        "statustext": "OK"
    },
    "data": {
        "username": "lucas",
        "password": "pass",
        "id": 0,
        "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg0MjU3NzYsImV4cCI6MTY4ODQyNzc3Niwic3ViIjoiMCJ9.YTK6NR4R2MRwdCFm6uRuu54a3Vx0D79ovCbZy0GmTeV7a2AaUXRq5ownr1TK4WWOto8l-d0xvekhUM0yzDwo5tZb-gdE_jscBa-GLvPJUd8xFYR8Jj6hVXmpyxzucjH2Os1mtW669d7C9ll_odnIWYSV_CywfLtz1qadUBQKgqV80NNYS2K2C3jRDgNb2R179Mfumat6zyT47PmlVxUTnByXTOASHMnU6V-LA9uKG6klEB8QEjcUXMKjB4w0Ig5dahBOL_xDtAgXoiLS-EGuFI4c4E5GdZpD2IS57YVQg2F3xd4_5u80w3BogI_JxxICXTPGmS402joM_t-BW7FAK0UDSYXPkwcORHO9AwcWPTQFRJidd2WCCG2JwXJ4LM6TpWraHiJ2h2Qy5HM2Ov6JVBBlSoItGLU3BVq9sYzAA9gjJFEUKPDIcUnu1ENN1LOOmgO1EpDaTbkZ4KQYgAW8x6_tuo5xTqTt3eEuX-6XOMtzoiWihR3yRWfxkLdWFW9L0vAh2UZ6TQeIoDmOyL8cAJ9Wh4qTE3P_tyM8_zkKb4eiKL_O50hP_pVFoxdLdSTFT4xKQPj8f5LSs-waGMaIbvC6rUDVPym7whPYgimeq87Vob6OKNtysJMf8EF4JfD0gV0rAkXCyrPtwocicxNNv2VJKQP-cfPAVJCOEYBGmiw"
    }
}

response:
{
    "Result": {
        "statuscode": "404",
        "statustext": "User Not Found"
    },
    "data": {
        "username": "lucas",
        "password": "2"
    }
}



EJECUTRAR CON NPM RUN DEV