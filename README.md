# Test La Rueda - Sistema de Gestión de Contactos

Aplicación web desarrollada en Angular 11 para la gestión de contactos, desarrollada como prueba técnica para La Rueda S.A.S.

## Características

-  Autenticación de usuarios con JWT
-  Listado de contactos con paginación
-  Búsqueda de contactos
-  Creación individual de contactos
-  Carga masiva de contactos mediante JSON
-  Interfaz moderna y responsive
-  Protección de rutas con guards

## Tecnologías 

- Angular 11.1.1
- TypeScript 4.1.2
- RxJS 6.6.0
- SCSS para estilos
- Angular Router para navegación
- Angular Forms 
- HTTP Interceptors para manejo de headers

 Requisitos 

- Node.js 16
- Angular CLI 11.1.2

## Instalación

1. Clonar el repositorio:

git clone <url-del-repositorio>



2. Instalar las dependencias:

npm install --legacy-peer-deps


Se usa `--legacy-peer-deps` debido a conflictos de dependencias entre jasmine-core y karma-jasmine-html-reporter en Angular 11.

Configuración

Las credenciales y la URL de la API están configuradas en los archivos de entorno:

- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.prod.ts` (producción)

### Credenciales de Prueba

- **Email:** cand_0015@larueda.com
- **Password:** Password123
- **Candidate Code:** CAND_0015

### API Base

- **URL:** https://api.larueda.com.co/api/testingreso



Para ejecutar la aplicación en modo desarrollo:


npm start


La aplicación estará disponible en `http://localhost:4200`





## Uso

### Login

1. Accede a la aplicación en `http://localhost:4200`
2. Serás redirigido automáticamente a la página de login
3. Ingresa las credenciales:
   - Email: `cand_0015@larueda.com`
   - Password: `Password123`
4. Haz clic en "Login"

### Listado de Contactos

- Visualiza todos los contactos en una tabla
- Usa la barra de búsqueda para filtrar por nombre, celular o placa
- Navega entre páginas usando los controles de paginación
- Accede a las opciones de crear contacto o carga masiva desde los botones superiores

### Crear Contacto Individual

1. Haz clic en el botón "Crear Contacto"
2. Completa el formulario:
   - **Nombre** (requerido, mínimo 2 caracteres)
   - **Celular** (requerido, 10 dígitos)
   - **Placa** (opcional)
3. Haz clic en "Guardar"
4. Serás redirigido al listado de contactos

### Carga Masiva

1. Haz clic en el botón "Carga Masiva"
2. Ingresa un JSON con el siguiente formato:
```json
{
  "rows": [
    {
      "nombre": "Ana Ruiz",
      "celular": "3002223344",
      "placa": "XYZ987"
    },
    {
      "nombre": "Luis Torres",
      "celular": "3005556677"
    }
  ]
}
```
3. Haz clic en "Cargar Contactos"
4. Los contactos se crearán y serás redirigido al listado

## API Endpoints

### Autenticación

- **POST** `/auth/login` - Iniciar sesión
  - Body: `{ "email": "string", "password": "string" }`
  - Headers: `X-CANDIDATE-ID: CAND_0015`, `Content-Type: application/json`
  - Response: `{ "token": "string", "user": { "email": "string", "candidate_code": "string" } }`

### Contactos

- **GET** `/contacts` - Listar contactos
  - Query params: `q` (búsqueda), `page`, `per_page`
  - Headers: `Authorization: Bearer <token>`, `X-CANDIDATE-ID: CAND_0015`

- **POST** `/contacts` - Crear contacto individual
  - Body: `{ "nombre": "string", "celular": "string", "placa": "string" }`
  - Headers: `Authorization: Bearer <token>`, `X-CANDIDATE-ID: CAND_0015`, `Content-Type: application/json`

- **POST** `/contacts/bulk` - Carga masiva
  - Body: `{ "rows": [{ "nombre": "string", "celular": "string", "placa": "string" }] }`
  - Headers: `Authorization: Bearer <token>`, `X-CANDIDATE-ID: CAND_0015`, `Content-Type: application/json`

