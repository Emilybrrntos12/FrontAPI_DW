This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Modificaciones
"page.tsx" este se encarga de mostar la información sobre el tipo de cambio en la web.

## Agreaciones
Se agrego una carpeta "lib" con la clase "api.ts" la cual funciona para la Recuperación de Datos, cambia los datos de la API (que son en formato JSON) y los pasa a XML (entendible para el usuario), hay manejo de erroress y formatea los datos.

"types.ts" se agrego este archivo con el proposito de ser una interfaz de establecer los datos estructurados que van a representar la información relacionada con un registro de tipo de cambio.

## Configurar Backend

Se tuvo que agregar una configuración al backend especialmente al "SOAPConfig", la cual es 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}

Esto srive para que el front pueda consumir la API del Backend, para que el Backend de permiso.

## Instalar Librerias
Se tuvieron que instalar 2 librerias para Transformar la respuesta XML en JSON en el backend o en el frontend
la cuales son 
    npm install xml2js
    npm install --save-dev @types/xml2js






