# Development

## Repositorio

### 1. Clonar el repositorio:

### 2. Instalar las dependencias de la app:

```
npm install
```

## Pasos para levantar la app en desarrollo

### 3. Levantar la base de datos:

#### 3.1 Iniciar Docker y verificar que esté corriendo

#### 3.2 Archivo .env:

- Renombrar el archivo **".env.template"** como **".env"**
- Reemplazar las variables de entorno

#### 3.3 Ejecutar el comando para crear el contenedor

```
docker compose up -d
```

### 4. Ejecutar los Prisma Commands:

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

### 5. Inicializar la BD con data de ejemplo:

```
npm run seed
```

### 6. Debes limpiar el LocalStorage del navegador.

### 7. Iniciar la aplicación:

```
npm run dev
```

### 8. Ingresa a la app [http://localhost:3000/](http://localhost:3000/):
