Desarrollar un nuevo proyecto de react native que realice los siguiente:

Crear una aplicación que permita realizar la búsqueda de 1 pokemon utilizando la siguiente API:

https://pokeapi.co/

Se utilizara el siguiente código para pedir un número o nombre del pokemon:

const value = prompt('Escribe el id o nombre del pokemon');

Tomar en cuenta lo siguiente:

* El código debe mostrar un texto que diga "Cargando...".
* Hacer una petición a la api que funcione con el id o con el nombre.
* Imprimir la siguiente información:

Nombre del pokemon (5pts),
Tipo(s) que tiene separados por coma (Fire, Water, etc...) (5pts),

Descripción (En español) (5pts).

--------------------------------------- (10 pts)
Tipos a los que NO le hace daño,
Tipos a los que hace la mitad de daño,
Tipos a los que les hace el doble de daño,
Tipos a los que recibe el doble de daño,
----------------------------------------

Posibles movimientos (Ataques) ordenados alfabéticamente (Flamethrower, Ice Beam, etc...). (5pts)

Cadena evolutiva (Si aplica) con lo siguiente (5pts):

Nombre de cada pokemon con sus tipos y mostrarlo en orden del mas pequeño al mas grande.
Ejemplo: Charmander (Fire) -> Charmeleon (Fire) -> Charizard (Fire, Flying).

Total por el desarrollo del proyecto: 35 pts.
Preguntas relativas al proyecto terminado: 15pts.

Total: 50 pts.

REGLAS IMPORTANTES:

* Utilizar los conceptos vistos en clase (const, funciones de arreglos, desestructuración, template strings, etc).
* El código debe estar estruturado con importaciones (minimo 2 archivos que exporten datos para importar en el componente).
* Toda variable utilizada para imprimir los resultados debe ser desestructurada.
* Todo tipo de dato debe estar definido por medio de interfaces (Typescript).
* Subir un archivo .txt con el enlace al repositorio de github. Todo el equipo debe trabajar y todos deben tener al menos un commit en el proyecto.
* Al entregar, el equipo debe mostrar el funcionamiento del proyecto.
* Se realizarán preguntas asociadas al proyecto realizado a todos los integrantes para asignar los 15 puntos restantes asociados al conocimiento.

// Ejemplos de peticiones a la API.
https://pokeapi.co/api/v2/pokemon-species/aegislash
https://pokeapi.co/api/v2/pokemon/charizard