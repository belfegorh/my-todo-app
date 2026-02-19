

---

# My To-Do App - Ionic/Cordova & Firebase

Esta es una aplicación híbrida de gestión de tareas desarrollada como parte de una prueba técnica para el rol de **Desarrollador Frontend**. La aplicación permite la gestión de tareas, categorización y utiliza **Firebase Remote Config** para controlar características en tiempo real (*Feature Flags*).

## 🚀 Instalación y Configuración

### Requisitos previos

* **Node.js:** v22.22.0
* **Java JDK:** 17
* **Android SDK:** Build-tools v35.0.0
* **Gradle:** v8.13

### Pasos para ejecutar en local

1. **Clonar el repositorio:**
```bash
git clone https://github.com/belfegorh/my-todo-app
cd my-todo-app

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Ejecutar en el navegador:**
```bash
ionic serve

```



### Generación del APK (Android)

Para generar el paquete de instalación, asegúrese de tener el archivo `google-services.json` en la raíz y ejecute:

```bash
ng build
cordova build android --debug

```

---

## 🛠️ Entregables Técnicos (Respuestas a la evaluación)

### 1. Desafíos Principales

* **Configuración del Entorno Nativo:** El principal reto fue configurar el entorno de compilación de Android (SDK, Java y Gradle) de forma manual en un sistema Linux (Ubuntu 25) sin depender de Android Studio, asegurando la compatibilidad con las últimas exigencias de Google (Build-tools 35).
* **Sincronización de Remote Config:** Implementar la lógica de `fetchAndActivate` para que el *Feature Flag* se aplique correctamente en el ciclo de vida de la aplicación móvil, superando los retos de caché nativa del SDK de Firebase.

### 2. Técnicas de Optimización

* **Lazy Loading:** Se implementó una estrategia de carga diferida por módulos para reducir el tiempo de carga inicial y mejorar el *First Contentful Paint* (FCP).


### 3. Calidad y Mantenibilidad

* **Arquitectura de Servicios:** Se desacopló la lógica de negocio de los componentes. Existe un servicio dedicado para la persistencia local (Ionic Storage) y otro para la comunicación con Firebase.
* **Tipado Estricto:** Uso de interfaces TypeScript para definir los modelos de datos de tareas y categorías, reduciendo errores en tiempo de ejecución.
* **Configuración de Seguridad:** Se gestionaron las reglas de Firebase y el archivo `network_security_config.xml` para permitir tráfico seguro en Android.

---

## 🚩 Feature Flag (Remote Config)

La visibilidad del **Filtro de Categorías** es controlada por la variable `show_category_filter` en la consola de Firebase.

* **Valor actual:** `true` (por defecto).

> [!IMPORTANT]
> **Nota para el revisor:** Se configuró un `minimumFetchIntervalMillis: 10000` para facilitar la prueba. Si al instalar el APK el filtro no aparece de inmediato, asegúrese de tener conexión a internet y reinicie la aplicación para forzar la sincronización con la nube.

---

¿Te gustaría que añada una sección de **"Tecnologías Utilizadas"** con iconos o una tabla para que los reclutadores identifiquen el stack de un vistazo?