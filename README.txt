App "Mi emprendimiento"

Lenguajes ocupados:
    Esta aplicación fue creada con NodeJS y ExpressJS.
    Para su renderización se ocupo Handlebars.
    Para Front se ocupo Bootstrap y CSS3 y HTML5
    Las consultas a base de datos fueron realizadas con PostgreSQL.

Descripción de funcionamiento:
    Para esta aplicación se debe crear la base de datos y tablas que se entregan en archivo scripts.sql.
    Por el momento la aplicación solo funciona con acceso de los mismos emprendedores registrados,
    queda aún por disponibilizar a todo publico la aplicación.

En funcionamiento:
    Registro, login, home, actualización de datos, agregar productos por usuario(tienda), cerrar sesión,
    Acceso a todas las tiendas registradas (solo "tienda" puede visualizar por el momento),
    Acceso a los productos (se debe corregir muestra de productos para cada tienda)

Sin implementar:
    Funciones de busqueda.
    Función de codigo promocional.
    Función de elegir producto y descuento por codigo promocional.

Creación de BD y tablas:
    Las consultas a la BD se encuentra en archivo consults.js de la carpeta "db"

Acceso:
Tienda 1 =
    email: achavez@gmail.com
    password = 123456

Tienda 2 =
    email: pgonzalez@gmail.com
    password = 123456


Codigos promocionales (Sin implementar):

XXYYZZ11
AABBCC22
DDEEFF33
GGHHII44
JJKKLL55

Funciona en puerto local: http://localhost:3000/
Iniciar package.json con comando "npm i"