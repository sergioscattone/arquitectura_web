# Arquitectura web
Arquitectura Web UP 2019

## Grupo 01 - Integrantes
* Sergio Scattone


# Hipótesis de trabajo
Se realizará una API web que permita gestionar operaciones CRUD sobre una lógica de negocio de un sofware de educación.

Estos lo elementos de negocio:
### User: usuario de la API.
### Points: Puntos ganados por el usuario contestando los challanges.
### Challenge: Desafio de pregunta con distintas opciones para responder (responses).
### Response: Respuestas posibles que puede elegir el usuario y en caso de acertar ganar puntos.


# Tecnología utilizada
Para el backend se utilizará nodejs.

Para la presistencia de datos se utilizará mongodb. 


# Exposición de servicios
La autenticación de usuario se realizará con OAuth 2.0. Bearer tokens.
Cada solicitud a la API va a requerir enviar el token en el header.

Para cada caso en que el usuario no tenga permisos de efectuar la acción se devolverá el siguiente error:

ERROR - HTTP CODE 403:
{
    'error': 'Your user has not permission to perform this action'
}

## Get
### users
Devuelve la información de los usuarios.
{
    [{
        'id':       1,
        'name':     'Sergio',
        'lastname': 'Scattone',
        'points':   1534,
        'ranking':  2,
    },
    {
        'id':       2,
        'name':     'Sabrina',
        'lastname': 'Basteiro',
        'points':   2685,
        'ranking':  1,
    }]
}

### user/user_id
Devuelve la información usuario.
{
    'id':       1,
    'name':     'Sergio',
    'lastname': 'Scattone',
    'points':   1534,
    'ranking':  17,
}

### points/user_id
Devuelve los puntos del usuario.
{
    'points': 1896
}

### challenges
Devuelve los challenges disponibles para escojer uno.
{
    [{
        'id':        1,
        'name':      'basic math',
        'challenge': 'The area of a circle is given by',
        'points':    150
    },
    {
        'id': 2,
        'name':      'advanced literature knowledge',
        'challenge': 'Which author wrote Dracula' 
        'points':     600
    }]
}

### challenge/challenge_id
Devuelve un challenge.
{
    'id':        2,
    'name':      'advanced literature knowledge',
    'challenge': 'Which author wrote Dracula' 
    'points':     600
}

### responses/challenge_id
Devuelve las posibles respuestas (responses) para escojer una y ganar puntos en caso de acertar.
{
    [{
        'id':          1,
        'description': 'side x side'
    },
    {
        'id':          2,
        'description': 'radio x radio x PI'
    },
    {
        'id': 3,
        'description': 'PI x PI X radio'
    }]
}


## Post
### user
Carga de usuarios.

#### Request 
{
    'name':     'Sergio',
    'lastname': 'Scattone',
    'username': 'sergioscattone',
    'password': 'password',
    'role':     'normal'
}

#### Response
{
    'user_id': 1
}

### login
Inicio de sesión de un usuario.

#### Request
{
    'username': 'sergioscattone',
    'password': 'password',
}

#### Response
{
    'token': 'some_token'
}

### challenge
Carga de un desafío.

#### Request
{
    'name':      'advanced literature knowledge',
    'challenge': 'Which author wrote Dracula' 
    'points':     600
}

#### Response
{
    'challenge_id': 1
}

### responses
Carga de las opciones para los desafíos y cual es la opción correcta.

#### Request
{
    [{
        'description': 'side x side',
        'correct':     false
    },
    {
        'description': 'radio x radio x PI',
        'correct':     true
    },
    {
        'description': 'PI x PI X radio',
        'correct':     false
    }]
}

#### Response
{
    'responses_ids': [1, 2, 3]
}

### selection
Selección de la opción correcta del desafío.

#### Request
{
    'challange_id': 1,
    'response_id':  2
}

#### Response
{
    'correct': true
}


## Put
### response
Agrega una opción a un desafío.

#### Request
{
    'challange_id': 1,
    'response': {
        'description': 'PI x radio / 2',
        'correct':     false
    }
}

#### Response
{
    'response_id': 4
}

## Patch
### challenge
Modificación de un desafío.

#### Request
{
    'challange_id': 2,
    'name':      'regular literature knowledge',
    'challenge': 'Which author wrote Harry Potter' 
    'points':     350
}

#### Response
{
    'challenge_id': 2
}

### response
Modificación de una opción en un desafío.

#### Request
{
    'challange_id': 1,
    'response': {
        'id':          4 
        'description': 'PI x radio / 4',
        'correct':     false
    }
}

#### Response
{
    'challange_id': 1,
    'response_id': 4
}

### user
Modificación de un usuario.

#### Request
{
    'user_id':  1,
    'name':     'Rafael',
    'lastname': 'Scattone',
    'username': 'rafaelcattone',
    'password': 'password2',
    'role':     'normal'
}

#### Response
{
    'user_id': 1
}

## Delete
### user
Elimina un usuario.

#### Request
{
    'user_id':  1,
}

#### Response
{
    'user_id': 1
}

### challenge
Elimina un desafío.

#### Request
{
    'challenge_id':  1,
}

#### Response
{
    'challenge_id': 1
}

### response
Elimina una opción de un desafió.

#### Request
{
    'response_id':  1,
}

#### Response
{
    'response_id': 1
}