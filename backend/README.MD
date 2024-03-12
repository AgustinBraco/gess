![Badge en Desarollo](https://img.shields.io/badge/STATUS-DEVELOPING-yellow)

# BACKEND
[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,express,mongodb,redis,postman&perline=6)](https://skillicons.dev)
## API URL
https://backend-bzl2.onrender.com/
## API DOC
https://documenter.getpostman.com/view/24685479/2sA2r556FN
## DESCRIPCION GENERAL
El servidor es una aplicación monolítica desarrollada en Node.js utilizando TypeScript. Se basa en la arquitectura Modelo-Vista-Controlador (MVC) para organizar y gestionar la lógica de negocio, proporcionando una API REST para diversas operaciones y un WebSocket para funcionalidades de chat en tiempo real. Se integra con las bases de datos MongoDB y Redis para el almacenamiento de datos estructurados y en memoria, respectivamente.
### TECNOLOGIAS UTILIZADAS
- **Node.js**: Plataforma de tiempo de ejecución de JavaScript.
- **TypeScript**: Lenguaje de programación que añade tipado estático opcional a JavaScript.
- **Express.js**: Framework de aplicación web para Node.js utilizado para construir la API REST.
- **Socket.io**: Biblioteca para comunicación bidireccional en tiempo real a través de WebSocket.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar datos estructurados.
- **Redis**: Almacén de estructuras de datos en memoria utilizado para almacenamiento en caché y gestión de sesiones.
![Diagrama del servidor](/backend/public/backend.jpg "Diagrama del servidor")
### ARQUITECTURA
El servidor sigue el patrón de diseño Modelo-Vista-Controlador (MVC), que divide la aplicación en tres componentes principales:
- **Modelo (Model)**: Responsable de la gestión y manipulación de datos. Interactúa con las bases de datos MongoDB y Redis para el almacenamiento y recuperación de datos.
- **Vista (View)**: Presenta la interfaz de usuario y se encarga de renderizar los datos para su visualización. En el contexto de la API REST, la vista puede ser representada por los datos devueltos en formato JSON.
- **Controlador (Controller)**: Actúa como intermediario entre el modelo y la vista. Gestiona las solicitudes entrantes, procesa la lógica de negocio correspondiente y coordina la interacción entre el modelo y la vista. También maneja la comunicación a través del WebSocket para el chat en tiempo real.
### ENDPOINTS API REST
#### USERS
- **POST /api/v1/user/register ->** Registro de usuario, recibe un body donde se deben suministrar los siguientes datos: **username: string; password: string**; name: string; **email: string; phone: string; role: string (GESTOR, USUARIO o ADMIN)**; avatar: string. Los que estan en **negrita** son requeridos. La contrasena debe tener al menos 8 digitos, mayusculas, minusculas y numeros. Luego de realizado el registro, el sisteme enviara un email al correo registrado para dar de alta al usuario.
- **POST /api/v1/user/login ->** Login de usuario, recibe un body {username, password} y devuelve un token (que debera ser usado en las subsiguientes solicitudes).
#### CHATS
- **GET /api/v1/chat/getByParticipantId/:participant_id ->** Con el id del usuario se obtienen todos los chat del mismo en forma de array: [{id: ‘id del otro participante, username: ‘username del otro participante}, …, ...]. De esa forma en el frontend se puede tener una lista de todos los chats del usuario.
- **POST /api/v1/chat/open ->** En el body se envia “participants: [{id, username}, {id,  username}]” con los datos de los dos participantes del chat y devuelve el chat con los mensajes.
### WEBSOCKET
- Para ser autenticado el cliente debe emitir ‘authenticate’ e incluir el token obtenido al loguearse, podrá escuchar ‘authenticated’ para comprobar que ha sido autenticado.
- Para enviar un mensaje debera emitir ‘message’ con el texto del mensaje ‘msg’ y el id del destinatario ‘recipient_id’.
- Para recibir mensajes debera escuchar ‘message’ donde recibirá el texto del mensaje ‘msg’ y el id del usuario que lo envía ‘user_id’.