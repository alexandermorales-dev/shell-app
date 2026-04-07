# Shell App - Portal de Aplicaciones

Una aplicación contenedora que integra múltiples aplicaciones modulares existentes en una interfaz unificada.

## Descripción

Este proyecto es una aplicación shell que sirve como portal centralizado para conectar y gestionar diferentes aplicaciones modulares. Actualmente integra dos aplicaciones principales:

- **Negocios** - Sistema de gestión empresarial
- **Capacitación** - Plataforma de formación y aprendizaje

La arquitectura está diseñada para permitir la incorporación futura de nuevas aplicaciones de manera sencilla y escalable.

## Características

- **Arquitectura Modular**: Sistema basado en iframes que permite integrar aplicaciones independientes
- **Autenticación Centralizada**: Gestión unificada de usuarios mediante Supabase
- **Navegación Integrada**: Menú principal y breadcrumbs para navegar entre aplicaciones
- **Diseño Responsivo**: Interfaz adaptable para escritorio y dispositivos móviles
- **Seguridad**: Tokens de autenticación pasados de forma segura a las aplicaciones hijas

## Arquitectura Técnica

- **Framework**: Next.js 16 con App Router
- **Autenticación**: Supabase con SSR y server actions
- **Estilos**: Tailwind CSS con componentes shadcn/ui
- **Estado**: Server-first con client components mínimos
- **Integración**: Iframes con paso de tokens por hash URL

## Estado Actual

### Funcionalidades Implementadas
- [x] Portal principal con lanzador de aplicaciones
- [x] Integración de aplicación Negocios
- [x] Integración de aplicación Capacitación
- [x] Autenticación y gestión de sesiones
- [x] Navegación y breadcrumbs
- [x] Diseño responsive

### Mejoras Planificadas
- [ ] Sistema de permisos por aplicación
- [ ] Configuración dinámica de aplicaciones
- [ ] Monitoreo y logging centralizado
- [ ] Temas personalizables
- [ ] Sistema de notificaciones
- [ ] API Gateway para comunicación entre aplicaciones

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/alexandermorales-dev/shell-app.git
cd shell-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

4. Configurar las siguientes variables en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_supabase_key
NEXT_PUBLIC_NEGOCIOS_URL=https://url-app-negocios.com
NEXT_PUBLIC_CAPACITACION_URL=https://url-app-capacitacion.com
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Configuración de Aplicaciones

Las aplicaciones se configuran en `config/apps.ts`. Para añadir una nueva aplicación:

```typescript
{
  id: "nueva-app",
  name: "Nueva Aplicación",
  basePath: "/nueva-app",
  upstreamUrl: "https://url-nueva-app.com",
  icon: IconComponent,
  description: "Descripción de la aplicación"
}
```

## Requisitos de Integración

Para que una aplicación se integre correctamente en el portal:

1. **Permitir Iframes**: La aplicación debe permitir ser embebida en iframes
   - Remover `X-Frame-Options: deny`
   - Configurar `Content-Security-Policy: frame-ancestors` apropiadamente

2. **Manejar Tokens de Auth**: La aplicación debe procesar los tokens pasados por URL hash:
   ```javascript
   const hash = window.location.hash.substring(1);
   const params = new URLSearchParams(hash);
   const accessToken = params.get('access_token');
   const refreshToken = params.get('refresh_token');
   ```

## Desarrollo

### Estructura del Proyecto
```
app/
  (shell)/           # Layout principal del portal
    negocios/        # Página de aplicación Negocios
    capacitacion/    # Página de aplicación Capacitación
    dashboard/       # Portal principal
    layout.tsx       # Layout con autenticación
components/
  shell/             # Componentes del portal
    Navbar.tsx
    Sidebar.tsx
    AppFrame.tsx
    etc.
actions/            # Server actions
  auth.ts           # Acciones de autenticación
  apps.ts           # Acciones de aplicaciones
config/
  apps.ts           # Configuración de aplicaciones
```

### Tecnologías Clave
- **Server Actions**: Para operaciones seguras en el servidor
- **Arrow Functions**: Consistencia en el estilo de componentes
- **Component Composition**: Componentes pequeños y reutilizables
- **TypeScript**: Tipado estricto para mejor desarrollo

## Contribución

Este proyecto está en desarrollo activo. Las mejoras planeadas incluyen:

1. **Sistema de Permisos**: Control granular de acceso por aplicación
2. **Configuración Dinámica**: Panel administrativo para gestionar aplicaciones
3. **Monitoreo**: Sistema centralizado de logs y métricas
4. **Comunicación**: API Gateway para integración entre aplicaciones
5. **Experiencia de Usuario**: Temas, notificaciones y personalización

## Licencia

MIT License - ver archivo LICENSE para detalles

---

**Nota**: Este es un proyecto en evolución. La arquitectura actual es un punto de partida que se irá mejorando basándose en los requisitos y el feedback de los usuarios.
