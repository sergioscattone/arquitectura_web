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

## Get
* user
* points
* challenges
* responses

## Post
* user
* login
* challenge
* responses
* selection

## Put
* response

## Patch
* challenge
* response
* user

## Delete
* user
* challenge
* response