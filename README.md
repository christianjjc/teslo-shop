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

#### 3.3 ejecutar el comando para crear el contenedor

```
docker compose up -d
```

### 4. Iniciar la aplicación:

```
npm run dev
```

### 5. Ejecutar los Prisma Commands:

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

### 6.1 Si cambias algo en el Schema postgres (desde el la bd misma y no aquí)... haz un:

```
npx prisma db pull
```

### 7. Apuntar al EndPoint para [llenar BD con data de ejemplo](http://localhost:3000/api/seed):

```
http://localhost:3000/api/seed
```

### 8. Ingresa a la app [http://localhost:3000/dashboard](http://localhost:3000/dashboard):

```
http://localhost:3000/dashboard
```

### 9. Usuario por defecto:

- **user:** test@emailtest.com
- **password:** 123456
