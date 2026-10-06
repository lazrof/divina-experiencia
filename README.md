# Divino a la Carta - Sitio Web Estático

Sitio web oficial de **Divino a la Carta** (Experiencias Gastronómicas Inmersivas y Chef a Domicilio para Eventos), reconstruido en **HTML5, CSS3 y JavaScript moderno** puro, sin frameworks pesados ni dependencias de empaquetado. 

Listo para desplegar en **Cloudflare Pages**, **Netlify**, **Vercel** o **GitHub Pages**.

---

## 📁 Estructura del Proyecto

```text
divino-a-la-carta/
├── index.html            # Código HTML principal estructurado y semántico
├── css/
│   └── styles.css        # Estilos, paleta cromática de lujo y diseño responsivo
├── js/
│   └── main.js           # Lógica interactiva, WhatsApp, Toast y animaciones
├── assets/
│   └── images/           # Imágenes y fotografías en alta resolución
│       ├── hero-chef.jpg
│       ├── asado-experience.jpg
│       ├── asian-experience.jpg
│       └── latinamerica-experience.jpg
├── favicon.ico           # Ícono del sitio
├── _headers              # Cabeceras de caché y seguridad para Cloudflare / Netlify
├── netlify.toml          # Configuración para despliegue directo en Netlify
└── README.md             # Esta documentación
```

---

## ⚙️ Cómo Cambiar tu Número de WhatsApp

Abre el archivo [`js/main.js`](file:///Users/nunzioruffo/AI-projects/divino-a-la-carta/js/main.js) y en las primeras líneas encontrarás:

```javascript
const CONFIG = {
  // Número de WhatsApp (código de país + número, SIN espacios, guiones ni símbolo '+')
  whatsappPhone: '584120000000', // <-- REEMPLAZA ESTE PLACEHOLDER CON TU NÚMERO REAL
  ...
};
```

**Ejemplos de formatos:**
- Venezuela: `'584121234567'`
- México: `'5215512345678'`
- España: `'34612345678'`
- Colombia: `'573001234567'`
- Estados Unidos: `'12125550199'`

El formulario recopilará automáticamente:
1. Nombre
2. Email
3. Teléfono
4. Tipo de Evento
5. Fecha aproximada
6. Detalles y preferencias

Mostrará el mensaje emergente de éxito (*"¡Solicitud Enviada!"*) y abrirá WhatsApp con el mensaje estructurado y listo para enviar.

---

## 🎨 Cómo Modificar Textos o Colores

- **Colores y Tipografía**: Se encuentran al inicio de [`css/styles.css`](file:///Users/nunzioruffo/AI-projects/divino-a-la-carta/css/styles.css) en `:root`:
  - `--color-burgundy`: Color vino/borgoña distintivo.
  - `--color-gold`: Color dorado para detalles y botones.
  - `--color-charcoal`: Carbón oscuro elegante de contraste.
  - `--color-cream`: Fondo crema suave.
- **Textos y Contenidos**: Puedes editarlos directamente en [`index.html`](file:///Users/nunzioruffo/AI-projects/divino-a-la-carta/index.html). Cada sección está etiquetada claramente con comentarios HTML.

---

## 🚀 Cómo Subir a Hosting Gratuito

### Opción A: Cloudflare Pages (Recomendada)
1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Selecciona **Create application** > pestaña **Pages** > **Upload assets**.
3. Nombra tu proyecto (ej: `divino-a-la-carta`).
4. Arrastra toda la carpeta del proyecto y haz clic en **Deploy site**.
5. ¡Listo! Tendrás tu sitio con HTTPS y CDN ultrarrápido en segundos.

### Opción B: Netlify
1. Entra a [Netlify Drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa del proyecto.
3. En menos de un minuto tu sitio estará online.
