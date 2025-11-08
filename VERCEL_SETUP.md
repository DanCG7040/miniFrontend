# Configuración para Vercel

## Problema conocido
Angular 11 tiene problemas de compatibilidad con Node.js 22, pero Vercel requiere Node.js 22.

## Solución implementada
- Node.js 22.x en `package.json` (requerido por Vercel)
- Flag `--openssl-legacy-provider` para compatibilidad con OpenSSL 3
- `--legacy-peer-deps` para resolver conflictos de dependencias

## Si el despliegue falla

### Opción 1: Verificar configuración en Vercel Dashboard
1. Ve a tu proyecto en Vercel
2. Settings → General
3. Node.js Version → Asegúrate que esté en "22.x" o "Auto"
4. Environment Variables → Verifica que no haya variables que sobrescriban NODE_OPTIONS

### Opción 2: Forzar Node.js 18 (si Vercel lo permite)
Si tienes acceso a configurar manualmente la versión:
1. Settings → General → Node.js Version → 18.x
2. Esto requerirá que cambies `package.json` engines a "18.x"

### Opción 3: Alternativa de despliegue
Considera usar Netlify o GitHub Pages que pueden tener mejor soporte para versiones antiguas de Node.js.

## Archivos de configuración
- `package.json`: Node.js 22.x, script build:vercel
- `vercel.json`: Configuración de build y despliegue
- `.npmrc`: legacy-peer-deps=true
- `.nvmrc`: Versión de Node.js

