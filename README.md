# NBA Teams API

API REST con operaciones CRUD completas para gestión de equipos de la NBA, con frontend integrado y entorno containerizado.

## Dominio

El recurso principal es `teams` (equipos de NBA) con los siguientes campos:

| Campo API | Nombre        | Tipo    | Descripción                  |
|-----------|---------------|---------|------------------------------|
| id        | id            | integer | Primary key, autoincrement   |
| campo1    | name          | string  | Nombre del equipo            |
| campo2    | city          | string  | Ciudad                       |
| campo3    | conference    | string  | Conferencia (East / West)    |
| campo4    | championships | integer | Títulos ganados              |
| campo5    | win_rate      | float   | Porcentaje de victorias      |
| campo6    | is_champion   | boolean | ¿Ha sido campeón alguna vez? |

## Stack

- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **Frontend:** HTML + Tailwind CSS + Nginx
- **Containerización:** Docker + Docker Compose

## Requisitos

- Docker Desktop instalado y corriendo

## Levantar el sistema
```bash
docker-compose up --build
```

Esto levanta tres servicios:
- **app** en `http://localhost:8080`
- **db** PostgreSQL en el puerto 5432 (interno)
- **frontend** en `http://localhost:8088`

## Uso

Abre `http://localhost:8088` en el navegador para acceder al frontend.

## Endpoints

Base URL: `http://localhost:8080`

| Método | Ruta          | Descripción              | Código éxito |
|--------|---------------|--------------------------|--------------|
| GET    | /teams        | Listar todos los equipos | 200          |
| GET    | /teams/:id    | Obtener un equipo        | 200          |
| POST   | /teams        | Crear un equipo          | 201          |
| PUT    | /teams/:id    | Actualizar un equipo     | 200          |
| DELETE | /teams/:id    | Eliminar un equipo       | 204          |

## Ejemplo de request
```json
POST /teams
Content-Type: application/json

{
  "campo1": "Celtics",
  "campo2": "Boston",
  "campo3": "Este",
  "campo4": 18,
  "campo5": 0.56,
  "campo6": true
}
```

## Ejemplo de response
```json
{
  "id": 1,
  "campo1": "Celtics",
  "campo2": "Boston",
  "campo3": "Este",
  "campo4": 18,
  "campo5": 0.56,
  "campo6": true
}
```

## Validaciones

Todos los campos son requeridos. Los tipos se validan estrictamente:
- `campo1`, `campo2`, `campo3` deben ser strings
- `campo4` debe ser entero
- `campo5` debe ser decimal
- `campo6` debe ser booleano

Si algún campo falla la validación se retorna `422 Unprocessable Entity`.

## Nivel entregado

**Nivel 2 — Mid** + bonus de integración full stack + bonus de personalización del frontend.