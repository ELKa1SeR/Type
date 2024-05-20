//Ejercicios avanzados Typecript

// 1
export function hello(): string {
  return 'Hello, World!'
}

//----------------------------------------------------------------------------------------
//2 quiero que me de todos los colores y ttambien el que qno está definido
export const colorCode = (color: string): number | undefined => {
  switch (color) {
    case 'black':
      return 0;
    case 'brown':
      return 1;
    case 'red':
      return 2;
    case 'orange':
      return 3;
    case 'yellow':
      return 4;
    case 'green':
      return 5;
    case 'blue':
      return 6;
    case 'violet':
      return 7;
    case 'grey':
      return 8;
    case 'white':
      return 9;
    default:
      return undefined; // Si el color no está en la lista
  }
}

export const COLORS: string[] = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

//-----------------------------------------------------------------------------------------------
//3
export function twoFer(name:string= "you"): string {
  // ^                 ^   ^ this is called a return type; it's the type of the
  // ^                 ^     value that is returned from this function
  // ^                 ^
  // ^                 parameters go here
  // ^
  // allows the tests to import this function and call it
  // <-- Your code goes here. You may remove all the commentary in this file.
  return `One for ${name}, one for me.`;
}

//-----------------------------------------------------------------------------------------------
//4
export function decodedValue(bands: string[]): number {
    const colorMap: { [key: string]: number } = {
        "black": 0,
        "brown": 1,
        "red": 2,
        "orange": 3,
        "yellow": 4,
        "green": 5,
        "blue": 6,
        "violet": 7,
        "grey": 8,
        "white": 9
    };

    let result = "";

    for (let color of bands) {
        if (color in colorMap) {
            result += colorMap[color];
        }
    }

    return parseInt(result.slice(0, 2));
}

// Ejemplo de uso:
console.log(decodedValue(['brown', 'black'])); // Debe devolver 10

//---------------------------------------------------------------------------------------------------------------------------
//5
/**
 * Calcula el valor de una resistencia en función de los colores de sus bandas.
 * @param colors Un arreglo de tres colores (por ejemplo, ['rojo', 'negro', 'rojo']).
 * @returns El valor de la resistencia con la unidad correspondiente (ohmios, kiloohmios, megaohmios, gigaohmios).
 */
function decodedResistorValue(colors: string[]): string {
    const colorValues: Record<string, number> = {
        'black': 0,
        'brown': 1,
        'red': 2,
        'orange': 3,
        'yellow': 4,
        'green': 5,
        'blue': 6,
        'violet': 7,
        'grey': 8,
        'white': 9
    };

    // Calculate the value of the resistor
    let value = (colorValues[colors[0]] * 10 + colorValues[colors[1]]) * 10 ** colorValues[colors[2]];

    // Convert to kiloohms if necessary
    let unitIndex = 0;
    while (value >= 1000) {
        value /= 1000;
        unitIndex++;
    }

    const units = ['ohms', 'kiloohms', 'megaohms', 'gigaohms'];
    return `${value} ${units[unitIndex]}`;
}

// Examples
console.log(decodedResistorValue(['orange', 'orange', 'black']));  // '33 ohms'
console.log(decodedResistorValue(['blue', 'grey', 'brown']));  // '680 ohms'
console.log(decodedResistorValue(['red', 'black', 'red']));  // '2 kiloohms'
// ... other test cases ...

export { decodedResistorValue };

//------------------------------------------------------------------------------------------------
//6
//https://youtu.be/Fj5m16is5hI

export function isLeap(year:number):boolean {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

//--------------------------------------------------------------------------------------------------------------------------------
//7
/* implementa una función toRna que reciba una cadena de ADN y devuelva su cadena complementaria de ARN.
 Si la cadena de ADN contiene caracteres inválidos, la función debe lanzar un error.

Requisitos:

La función debe ser capaz de transcribir nucleótidos individuales.
La función debe manejar cadenas de ADN de longitud arbitraria.
La función debe lanzar un error si la cadena de ADN contiene caracteres que no sean A, C, G, o T. */

export function toRna(dna: string): string {
  // Diccionario de complementos
  const complements: { [key: string]: string } = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  };

  // Convertir la secuencia de ADN a ARN
  let rna = '';
  for (let nucleotide of dna) {
    if (complements[nucleotide]) {
      rna += complements[nucleotide];
    } else {
      throw new Error('Invalid input DNA.');
    }
  }

  return rna;
}

//----------------------------------------------------------------------------------------------------------------------------------
//8
/*Consideraciones:
La función debe lanzar un error si el nombre del planeta no es válido o si los tipos de los parámetros no son correctos.
Usa 31,557,600 segundos para representar un año terrestre.
Requisitos:
Verificación de Tipos: La función debe validar que el nombre del planeta es una cadena de texto (string) y que la edad en segundos es un número (number). En caso de tipos incorrectos, debe lanzar un error.
Planeta Válido: La función debe validar que el nombre del planeta es uno de los siguientes: 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'. En caso de nombre inválido, debe lanzar un error.
Cálculo de Edad: La edad en el planeta especificado debe ser calculada con precisión y redondeada a dos decimales. */

export function age(planet: unknown, seconds: unknown): unknown {
  if (typeof planet !== 'string' || typeof seconds !== 'number') {
    throw new Error('Invalid input types');
  }
  const period = orbitalPeriods[planet.toLowerCase()];

  if (!period) {
    throw new Error('Invalid planet name');
  }

  const ageInEarthYears = seconds / SECONDS_IN_EARTH_YEAR;
  const ageOnPlanet = ageInEarthYears / period;

  return parseFloat(ageOnPlanet.toFixed(2));
}

const SECONDS_IN_EARTH_YEAR = 31557600;

const orbitalPeriods: { [key: string]: number } = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

//---------------------------------------------------------------------------------------------------------------------------------------
//9
/*Para un juego de Dungeons & Dragons, cada jugador comienza generando un personaje con el que puede jugar. Este personaje tiene, entre otras cosas, seis habilidades: fuerza, destreza, constitución, inteligencia, sabiduría y carisma. Estas seis habilidades tienen puntuaciones que se determinan al azar. Haces esto lanzando cuatro dados de 6 caras y registrando la suma de los tres dados más altos. Haces esto seis veces, una vez para cada habilidad.

Los puntos de golpe iniciales de tu personaje son 10 + el modificador de constitución de tu personaje. Encuentras el modificador de constitución de tu personaje restando 10 de la constitución de tu personaje, dividiendo por 2 y redondeando hacia abajo.

Escribe un generador de personajes aleatorio que siga las reglas anteriores.

Por ejemplo, los seis lanzamientos de cuatro dados pueden verse así:

5, 3, 1, 6: Descartas el 1 y sumas 5 + 3 + 6 = 14, que asignas a la fuerza.
3, 2, 5, 3: Descartas el 2 y sumas 3 + 5 + 3 = 11, que asignas a la destreza.
1, 1, 1, 1: Descartas el 1 y sumas 1 + 1 + 1 = 3, que asignas a la constitución.
2, 1, 6, 6: Descartas el 1 y sumas 2 + 6 + 6 = 14, que asignas a la inteligencia.
3, 5, 3, 4: Descartas el 3 y sumas 5 + 3 + 4 = 12, que asignas a la sabiduría.
6, 6, 6, 6: Descartas el 6 y sumas 6 + 6 + 6 = 18, que asignas al carisma.
Debido a que la constitución es 3, el modificador de constitución es -4 y los puntos de golpe son 6. */


export class DnDCharacter {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitpoints: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    const rolls: number[] = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    rolls.sort((a, b) => a - b);
    // Discard the smallest roll
    rolls.shift();
    // Sum the remaining three rolls
    return rolls.reduce((sum, roll) => sum + roll, 0);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}


//----------------------------------------------------------------------------------------
//10
/*Instrucciones
Escribe una función que devuelva los puntos obtenidos en un solo lanzamiento de un juego de Dardos.

Los Dardos es un juego donde los jugadores lanzan dardos a un objetivo.

En nuestra instancia particular del juego, el objetivo recompensa 4 cantidades diferentes de puntos, dependiendo de dónde aterriza el dardo:

Si el dardo cae fuera del objetivo, el jugador no gana puntos (0 puntos).
Si el dardo cae en el círculo exterior del objetivo, el jugador gana 1 punto.
Si el dardo cae en el círculo del medio del objetivo, el jugador gana 5 puntos.
Si el dardo cae en el círculo interior del objetivo, el jugador gana 10 puntos.
El círculo exterior tiene un radio de 10 unidades (esto es equivalente al radio total para todo el objetivo), el círculo medio un radio de 5 unidades,
 y el círculo interior un radio de 1 unidad. Por supuesto, todos están centrados en el mismo punto, es decir, los círculos son concéntricos definidos por las coordenadas (0, 0).

Escribe una función que, dada un punto en el objetivo (definido por sus coordenadas cartesianas x e y, donde x e y son reales), 
devuelva la cantidad correcta de puntos obtenidos por un dardo que cae en ese punto. */


export function score(x: number, y: number): number {
  const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2);

  if (distanceFromCenter <= 1) {
    return 10;
  } else if (distanceFromCenter <= 5) {
    return 5;
  } else if (distanceFromCenter <= 10) {
    return 1;
  } else {
    return 0;
  }
}

//-------------------------------------------------------------------------------
//12
/* Introducción
Bob es un adolescente indiferente . Le gusta pensar que es genial. Y definitivamente no se entusiasma con las cosas. Eso no estaría bien.

Cuando la gente habla con él, sus respuestas son bastante limitadas.

Instrucciones
Tu tarea es determinar qué responderá Bob a alguien cuando le diga algo o le haga una pregunta.

Bob solo responde una de cinco cosas:

"Seguro." Esta es su respuesta si le haces una pregunta como "¿Cómo estás?" La convención utilizada para las preguntas es que terminan con un signo de interrogación.
"¡Vaya, relájate!" Esta es su respuesta si LE GRITAS. La convención utilizada para gritar es TODAS LAS LETRAS MAYÚSCULAS.
"¡Cálmate, sé lo que estoy haciendo!" Esto es lo que dice si le gritas una pregunta.
"¡Bien ser de esa manera!" Así responde al silencio. La convención utilizada para el silencio es nada o varias combinaciones de espacios en blanco.
"Lo que sea." Esto es lo que responde a cualquier otra cosa.*/

export function hey(message: string): string {
  // Verificamos si el mensaje es vacío o contiene solo espacios en blanco
  if (!message.trim()) {
    return 'Fine. Be that way!';
  }

  // Verificamos si el mensaje es una pregunta
  if (message.trim().endsWith('?')) {
    // Si el mensaje contiene al menos una letra y está en mayúsculas, es una pregunta gritada
    if (message.match(/[a-zA-Z]/) && message === message.toUpperCase()) {
      return "Calm down, I know what I'm doing!";
    }
    // Si es una pregunta y no está gritada, respondemos 'Sure.'
    return 'Sure.';
  }

  // Verificamos si el mensaje contiene al menos una letra y está en mayúsculas, es un grito
  if (message.match(/[a-zA-Z]/) && message === message.toUpperCase()) {
    return 'Whoa, chill out!';
  }

  // Si no es una pregunta y no está gritando, respondemos 'Whatever.'
  return 'Whatever.';
}

/*------------------------------------------------------------------------------------------------------
13
Dado un conjunto de caracteres que representa una matriz de números, devuelve las filas y columnas de esa matriz.

Entonces, si tienes una cadena con saltos de línea incorporados como:

9 8 7
5 3 2
6 6 7
lo que representa esta matriz:

1  2  3
|---------
1 | 9 8 7
2 | 5 3 2
3 | 6 6 7
tu código debería ser capaz de generar:

Una lista de las filas, leyendo cada fila de izquierda a derecha mientras te mueves de arriba hacia abajo a través de las filas,
Una lista de las columnas, leyendo cada columna de arriba hacia abajo mientras te mueves de izquierda a derecha.
Las filas para nuestra matriz de ejemplo serían:

9, 8, 7
5, 3, 2
6, 6, 7
Y sus columnas serían:

9, 5, 6
8, 3, 6
7, 2, 7

*/

export class Matrix {
  private readonly matrix: number[][];

  constructor(matrixString: string) {
    this.matrix = matrixString.split('\n').map(row => row.split(' ').map(Number));
  }

  get rows(): number[][] {
    return this.matrix;
  }

  get columns(): number[][] {
    const transposedMatrix: number[][] = [];
    for (let col = 0; col < this.matrix[0].length; col++) {
      transposedMatrix[col] = [];
      for (let row = 0; row < this.matrix.length; row++) {
        transposedMatrix[col][row] = this.matrix[row][col];
      }
    }
    return transposedMatrix;
  }
}

/*-------------------------------------------------------------------------------------
14
Gestionar la configuración de la fábrica de robots.
Cuando un robot sale de la línea de producción de la fábrica, no tiene nombre.
La primera vez que enciendes un robot, se genera un nombre aleatorio en el formato de dos letras mayúsculas seguidas de tres dígitos, como RX837 o BC811.
De vez en cuando, necesitamos restablecer un robot a su configuración de fábrica, lo que significa que su nombre se borra. La próxima vez que lo solicites,
 ese robot responderá con un nuevo nombre aleatorio.
Los nombres deben ser aleatorios: no deben seguir una secuencia predecible. El uso de nombres aleatorios conlleva un riesgo de colisiones. 
Tu solución debe garantizar que cada robot existente tenga un nombre único.
*/


export class Robot {
  private static usedNames: Set<string> = new Set<string>();
  private _name: string = '';

  constructor() {
    this.resetName();
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    let newName = this.generateUniqueName();
    while (Robot.usedNames.has(newName)) {
      newName = this.generateUniqueName();
    }
    this._name = newName;
    Robot.usedNames.add(newName);
  }

  public static releaseNames(): void {
    Robot.usedNames.clear();
  }

  private generateUniqueName(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let name = '';
    for (let i = 0; i < 2; i++) {
      name += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      name += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return name;
  }
}

/*---------------------------------------------------------------------------------------------
15
Dado los nombres de los estudiantes junto con el grado en el que están, crea una lista para la escuela.

Al final, deberías ser capaz de:
Agregar el nombre de un estudiante a la lista para un grado
"Agrega a Jim al grado 2."
"Entendido."
Obtener una lista de todos los estudiantes inscritos en un grado
"¿Qué estudiantes están en el grado 2?"
"Solo tenemos a Jim por ahora."
Obtener una lista ordenada de todos los estudiantes en todos los grados. Los grados deben ordenarse como 1, 2, 3, etc., y los estudiantes dentro de un grado deben ordenarse alfabéticamente por nombre.
"¿Quiénes están inscritos en la escuela en este momento?"
"Déjame pensar. Tenemos a Anna, Barb y Charlie en el grado 1, Alex, Peter y Zoe en el grado 2 y Jim en el grado 5. Así que la respuesta es: Anna, Barb, Charlie, Alex, Peter, Zoe y Jim."
Ten en cuenta que todos nuestros estudiantes solo tienen un nombre (es un pueblo pequeño, ¿qué esperas?) y cada estudiante no puede ser agregado más de una vez a un grado o la lista. 
De hecho, cuando una prueba intenta agregar el mismo estudiante más de una vez, tu implementación debería indicar que esto es incorrecto.

 */

    export class GradeSchool {
      private _roster: Record<number, string[]> = {};
    
      roster(): Record<number, string[]> {
        return JSON.parse(JSON.stringify(this._roster)); // Copia profunda para evitar modificaciones fuera del módulo
      }
    
      add(name: string, grade: number): void {
        // Verificar si el estudiante ya está registrado en otro grado
        for (const key in this._roster) {
          if (this._roster[key].includes(name)) {
            // Eliminar al estudiante del grado anterior
            this._roster[key] = this._roster[key].filter(student => student !== name);
          }
        }
    
        // Agregar al estudiante al grado correspondiente
        if (!this._roster[grade]) {
          this._roster[grade] = [];
        }
        if (!this._roster[grade].includes(name)) {
          this._roster[grade].push(name);
          this._roster[grade].sort(); // Ordenar los nombres de los estudiantes alfabéticamente
        }
      }
    
      grade(grade: number): string[] {
        return this._roster[grade] ? [...this._roster[grade]] : [];
      }
    }
/*
16
Implementa un reloj que maneje horas sin fechas.
Deberías poder sumar y restar minutos a él.
Dos relojes que representen la misma hora deberían ser iguales entre sí.
*/

export class Clock {
  private hours: number;
  private minutes: number;

  constructor(hour: number, minute: number = 0) {
    this.hours = hour;
    this.minutes = minute;
    this.normalizeTime();
  }

  toString(): string {
    return `${this.format(this.hours)}:${this.format(this.minutes)}`;
  }

  private format(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  plus(minutesToAdd: number): Clock {
    this.minutes += minutesToAdd;
    this.normalizeTime();
    return this;
  }

  minus(minutesToSubtract: number): Clock {
    this.minutes -= minutesToSubtract;
    this.normalizeTime();
    return this;
  }

  equals(otherClock: Clock): boolean {
    return this.hours === otherClock.hours && this.minutes === otherClock.minutes;
  }

  private normalizeTime(): void {
    const totalMinutes = this.hours * 60 + this.minutes;
    const normalizedMinutes = (totalMinutes % 1440 + 1440) % 1440; // Para manejar minutos negativos y horas mayores a 24
    this.hours = Math.floor(normalizedMinutes / 60);
    this.minutes = normalizedMinutes % 60;
  }
}
/*
--------------------------------------------------------------------------------------------
17
Introducción
Estás comenzando un club de codificación secreto con algunos amigos y amigos de amigos. Como no todos se conocen, tú y 
tus amigos han decidido crear un saludo secreto que puedan usar para reconocer que alguien es miembro. No quieres que cualquiera que no esté en el conocimiento pueda descifrar el código.
Has diseñado el código de modo que una persona diga un número entre 1 y 31, y la otra persona lo convierta en una serie de acciones.

Instrucciones
Tu tarea es convertir un número entre 1 y 31 en una secuencia de acciones en el saludo secreto.

La secuencia de acciones se elige al mirar los cinco dígitos más a la derecha del número una vez que se ha convertido a binario. Comienza en el dígito más a la derecha y muévete hacia la izquierda.

Las acciones para cada posición numérica son:

00001 = guiñar un ojo
00010 = parpadear dos veces
00100 = cerrar los ojos
01000 = saltar
10000 = Invertir el orden de las operaciones en el saludo secreto.
Vamos a usar el número 9 como ejemplo:

9 en binario es 1001.
El dígito que está más a la derecha es 1, así que la primera acción es guiñar un ojo.
Yendo hacia la izquierda, el siguiente dígito es 0, así que no hay parpadeo doble.
Yendo hacia la izquierda otra vez, el siguiente dígito es 0, así que mantienes los ojos abiertos.
Yendo hacia la izquierda otra vez, el siguiente dígito es 1, así que saltas.
Ese fue el último dígito, así que el código final es:

guiñar un ojo, saltar
Dado el número 26, que es 11010 en binario, obtenemos las siguientes acciones:

parpadear dos veces
saltar
invertir acciones
El saludo secreto para 26 es, por lo tanto:

saltar, parpadear dos veces
*/

export function commands(number: number): string[] {
  const actions: string[] = [];

  if (number & 1) actions.push('wink');
  if (number & 2) actions.push('double blink');
  if (number & 4) actions.push('close your eyes');
  if (number & 8) actions.push('jump');

  if (number & 16) {
      actions.reverse();
  }

  return actions;
}

/*
18

Introducción

Has encontrado un grupo de matemáticos que también son cantautores. Han escrito una canción para cada uno de sus números favoritos y, como te puedes imaginar, 
tienen muchos números favoritos (como 0, 73 o 6174).
Tienes curiosidad por escuchar la canción de tu número favorito, pero con tantas canciones para revisar, encontrar la correcta podría llevar un tiempo. Afortunadamente, 
han organizado sus canciones en una lista de reproducción ordenada por el título, que es simplemente el número sobre el que trata la canción.
Te das cuenta de que puedes usar un algoritmo de búsqueda binaria para encontrar rápidamente una canción dado su título.

Instrucciones

Tu tarea es implementar un algoritmo de búsqueda binaria.
Un algoritmo de búsqueda binaria encuentra un elemento en una lista dividiéndola repetidamente a la mitad, manteniendo solo la mitad que contiene el elemento que estamos buscando.
Nos permite reducir rápidamente las posibles ubicaciones de nuestro elemento hasta encontrarlo, o hasta que hayamos eliminado todas las posibles ubicaciones.

Precaución
La búsqueda binaria solo funciona cuando una lista ha sido ordenada.

El algoritmo se ve así:
Encuentra el elemento medio de una lista ordenada y compáralo con el elemento que estamos buscando.
Si el elemento medio es nuestro elemento, ¡entonces hemos terminado!
Si el elemento medio es mayor que nuestro elemento, podemos eliminar ese elemento y todos los elementos posteriores.
Si el elemento medio es menor que nuestro elemento, podemos eliminar ese elemento y todos los elementos anteriores.
Si todos los elementos de la lista han sido eliminados, entonces el elemento no está en la lista.
De lo contrario, repite el proceso en la parte de la lista que no ha sido eliminada.
Aquí hay un ejemplo:
Supongamos que estamos buscando el número 23 en la siguiente lista ordenada: [4, 8, 12, 16, 23, 28, 32].

Comenzamos comparando 23 con el elemento medio, 16.
Como 23 es mayor que 16, podemos eliminar la mitad izquierda de la lista, dejándonos con [23, 28, 32].
Luego comparamos 23 con el nuevo elemento medio, 28.
Como 23 es menor que 28, podemos eliminar la mitad derecha de la lista: [23].
Hemos encontrado nuestro elemento.
*/
export function find(haystack: number[], needle: number): number | never {
  let left = 0;
  let right = haystack.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const middleValue = haystack[middle];

    if (middleValue === needle) {
      return middle;
    } else if (middleValue < needle) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  throw new Error('Value not in array');
}

/*19
ntroducción
Estás trabajando en un proyecto para desarrollar un sistema de programación de trenes para una red ferroviaria muy concurrida.
Te han pedido que desarrolles un prototipo para las rutas de tren en el sistema de programación. Cada ruta consiste en una secuencia de estaciones de tren en las que un tren determinado se detiene.

Instrucciones
Tu equipo ha decidido utilizar una lista doblemente enlazada para representar cada ruta de tren en el horario. Cada estación a lo largo de la ruta del tren será representada por un nodo en la lista enlazada.
No necesitas preocuparte por los horarios de llegada y salida en las estaciones. Cada estación será representada simplemente por un número.
Las rutas pueden extenderse, agregando estaciones al principio o al final de una ruta. También pueden acortarse eliminando estaciones del principio o del final de una ruta.
A veces, una estación se cierra, y en ese caso, la estación debe ser eliminada de la ruta, incluso si no está al principio o al final de la ruta.
El tamaño de una ruta se mide no por cuán lejos viaja el tren, sino por cuántas estaciones se detiene.

Nota
La lista enlazada es una estructura de datos fundamental en ciencias de la computación, a menudo utilizada en la implementación de otras estructuras de datos. 
Como su nombre sugiere, es una lista de nodos que están enlazados entre sí. Es una lista de "nodos", donde cada nodo se enlaza con su vecino o vecinos. En una lista simplemente enlazada, cada nodo se enlaza solo con el nodo que le sigue. En una lista doblemente enlazada, cada nodo se enlaza tanto con el nodo que lo precede como con el nodo que lo sigue.
Si deseas profundizar en las listas enlazadas, consulta este artículo que lo explica utilizando dibujos agradables.
 */
    
class Node<T> {
  public value: T;
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length: number = 0;

  public push(element: T): void {
    const newNode = new Node(element);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  public pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return value;
  }

  public shift(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  public unshift(element: T): void {
    const newNode = new Node(element);
    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  public delete(element: T): void {
    let current = this.head;
    while (current) {
      if (current.value === element) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  public count(): number {
    return this.length;
  }
}

/*
20
Instrucciones
Un número racional se define como el cociente de dos números enteros a y b, llamados numerador y denominador, respectivamente, donde b ≠ 0.

Nota
Tenga en cuenta que matemáticamente, el denominador no puede ser cero. Sin embargo, en muchas implementaciones de números racionales, se permite que el denominador sea cero con un comportamiento similar al infinito positivo o negativo en números de punto flotante. En esos casos, el denominador y el numerador generalmente no pueden ser ambos cero a la vez.

El valor absoluto |r| del número racional r = a/b es igual a |a|/|b|.

La suma de dos números racionales r₁ = a₁/b₁ y r₂ = a₂/b₂ es r₁ + r₂ = a₁/b₁ + a₂/b₂ = (a₁ * b₂ + a₂ * b₁) / (b₁ * b₂).

La diferencia de dos números racionales r₁ = a₁/b₁ y r₂ = a₂/b₂ es r₁ - r₂ = a₁/b₁ - a₂/b₂ = (a₁ * b₂ - a₂ * b₁) / (b₁ * b₂).

El producto (multiplicación) de dos números racionales r₁ = a₁/b₁ y r₂ = a₂/b₂ es r₁ * r₂ = (a₁ * a₂) / (b₁ * b₂).

Dividir un número racional r₁ = a₁/b₁ por otro r₂ = a₂/b₂ es r₁ / r₂ = (a₁ * b₂) / (a₂ * b₁) si a₂ no es cero.

La exponenciación de un número racional r = a/b a una potencia entera no negativa n es r^n = (a^n)/(b^n).

La exponenciación de un número racional r = a/b a una potencia entera negativa n es r^n = (b^m)/(a^m), donde m = |n|.

La exponenciación de un número racional r = a/b a un número real (de punto flotante) x es el cociente (a^x)/(b^x), que es un número real.

La exponenciación de un número real x a un número racional r = a/b es x^(a/b) = raíz(x^a, b), donde raíz(p, q) es la raíz q-ésima de p.

Implementa las siguientes operaciones:
Adición, sustracción, multiplicación y división de dos números racionales.
Valor absoluto, exponenciación de un número racional dado a una potencia entera, exponenciación de un número racional dado a una potencia real (de punto flotante), exponenciación de un número real a un número racional.
Tu implementación de números racionales siempre debe reducirse a términos más bajos.
Por ejemplo, 4/4 debe reducirse a 1/1, 30/60 debe reducirse a 1/2, 12/8 debe reducirse a 3/2, etc. Para reducir un número racional r = a/b, divide a y b por el máximo común divisor (mcd) de a y b. Así que, por ejemplo, mcd(12, 8) = 4, por lo que r = 12/8 se puede reducir a (12/4)/(8/4) = 3/2. La forma reducida de un número racional debe estar en "forma estándar" (el denominador siempre debe ser un número entero positivo). Si está presente un denominador con un número entero negativo, multiplica tanto el numerador como el denominador por -1 para asegurar que se alcanza la forma estándar. Por ejemplo, 3/-4 debe reducirse a -3/4.

Asume que el lenguaje de programación que estás utilizando no tiene una implementación de números racionales.
 */

export class Rational {
  numerator: number;
  denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    const sign = numerator * denominator < 0 ? -1 : 1;
    const gcdVal = this.gcd(Math.abs(numerator), Math.abs(denominator));
    this.numerator = sign * Math.abs(numerator) / gcdVal;
    this.denominator = Math.abs(denominator) / gcdVal;
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  private lcm(a: number, b: number): number {
    return Math.abs(a * b) / this.gcd(a, b);
  }

  private reduce(): Rational {
    const gcdVal = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
    return new Rational(this.numerator / gcdVal, this.denominator / gcdVal);
  }

  add(other: Rational): Rational {
    const lcmVal = this.lcm(this.denominator, other.denominator);
    const num = this.numerator * (lcmVal / this.denominator) + other.numerator * (lcmVal / other.denominator);
    return new Rational(num, lcmVal).reduce();
  }

  sub(other: Rational): Rational {
    return this.add(new Rational(-other.numerator, other.denominator));
  }

  mul(other: Rational): Rational {
    const num = this.numerator * other.numerator;
    const den = this.denominator * other.denominator;
    return new Rational(num, den).reduce();
  }

  div(other: Rational): Rational {
    if (other.numerator === 0) {
      throw new Error("Cannot divide by zero");
    }
    return this.mul(new Rational(other.denominator, other.numerator));
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(exp: number): Rational {
    if (exp === 0) {
      return new Rational(1, 1);
    } else if (exp > 0) {
      return new Rational(Math.pow(this.numerator, exp), Math.pow(this.denominator, exp)).reduce();
    } else {
      return new Rational(Math.pow(this.denominator, Math.abs(exp)), Math.pow(this.numerator, Math.abs(exp))).reduce();
    }
  }

  expreal(base: number): number {
    return Math.pow(base, this.numerator / this.denominator);
  }
}

/* 
21
Instrucciones
Crea una implementación del cifrado de Atbash, un sistema de encriptación antiguo creado en el Medio Oriente.

El cifrado de Atbash es un cifrado de sustitución simple que se basa en transponer todas las letras del alfabeto de manera que el alfabeto resultante esté al revés. La primera letra se reemplaza con la última letra, la segunda con la segunda desde el final, y así sucesivamente.

Un cifrado de Atbash para el alfabeto latino sería el siguiente:

Original: abcdefghijklmnopqrstuvwxyz
Cifrado: zyxwvutsrqponmlkjihgfedcba
Es un cifrado muy débil porque solo tiene una clave posible y es un cifrado de sustitución monoalfabético simple. Sin embargo, esto puede no haber sido un problema en la época del cifrado.

El texto cifrado se escribe en grupos de longitud fija, siendo la longitud de grupo tradicional de 5 letras, dejando los números sin cambios, y la puntuación se excluye. Esto se hace para hacer más difícil adivinar cosas basadas en los límites de las palabras. Todo el texto se codificará en letras minúsculas.
*/

const PLAINALPHABET = "abcdefghijklmnopqrstuvwxyz";
const CIPHERALPHABET = "zyxwvutsrqponmlkjihgfedcba";
export function encode(plainText: string): string {
    let encodedText = "";
    let i = 0;
    for (let j = 0; j < plainText.length; j++) {
        const char = plainText[j].toLowerCase();
        // Solo cifrar letras del alfabeto
        if(/[a-z]/.test(char)) {
            const index = PLAINALPHABET.indexOf(char);
            encodedText += CIPHERALPHABET[index];
            i++; 
            // Conservar numeros
        } else if (/[0-9]/.test(char)) {
            encodedText += char;
            i++;
        }
        // Agregar espacio cada 5 caracteres
        if (i === 5 && j !== plainText.length -1){
            encodedText += " ";
            i = 0;
        } 
    }
    return encodedText;
}
export function decode(cipherText: string): string {
    let decodedText = "";
    for (let i = 0; i < cipherText.length; i++) {
        const char = cipherText[i].toLowerCase();
        if (/[a-z]/.test(char)) {
            const index = CIPHERALPHABET.indexOf(char);
            decodedText += PLAINALPHABET[index];
        } else if (/[0-9]/.test(char)) {
            decodedText += char;
        }
    }
    return decodedText;
}

/*
22
Instrucciones
Implementa un cifrado de desplazamiento simple como el César y un cifrado de sustitución más seguro.

Paso 1
"Si tenía algo confidencial que decir, lo escribía en cifra, es decir, cambiando el orden de las letras del alfabeto de tal manera que no se pudiera entender nada.
Si alguien quiere descifrarlos y entender su significado, debe sustituir la cuarta letra del alfabeto, es decir, D, por A, y así con las demás." —Suetonio, Vida de Julio César
Los cifrados son algoritmos muy directos que nos permiten hacer que el texto sea menos legible pero aún así permitir su fácil descifrado. Son vulnerables a muchas formas de criptoanálisis, 
pero César tuvo suerte de que sus enemigos no fueran criptoanalistas.
el Cifrado César se usaba para algunos mensajes de Julio César que se enviaban a campo traviesa. Ahora, César sabía que el cifrado no era muy bueno, pero tenía un aliado en ese aspecto: 
casi nadie sabía leer bien. Así que incluso estar un par de letras fuera de lugar era suficiente para que la gente no pudiera reconocer las pocas palabras que conocían.

Tu tarea es crear un cifrado de desplazamiento simple como el Cifrado César. Esta imagen es un gran ejemplo del Cifrado César:
Cifrado César
Por ejemplo:
Dar "iamapandabear" como entrada a la función encode devuelve el cifrado "ldpdsdqgdehdu". Suficientemente oscuro como para mantener nuestro mensaje secreto en tránsito.
Cuando "ldpdsdqgdehdu" se introduce en la función decode, devolvería el original "iamapandabear" permitiendo que tu amigo lea tu mensaje original.

Paso 2
Los cifrados de desplazamiento dejan de ser útiles rápidamente cuando el comandante oponente los descubre. Así que en su lugar, intentemos usar un cifrado de sustitución. 
Intenta modificar el código para permitirnos especificar una clave y usarla para la distancia de desplazamiento.
Aquí tienes un ejemplo:
Dada la clave "aaaaaaaaaaaaaaaaaa", codificar la cadena "iamapandabear" devolvería el original "iamapandabear".
Dada la clave "ddddddddddddddddd", codificar nuestra cadena "iamapandabear" devolvería el oscurecido "ldpdsdqgdehdu"
En el ejemplo anterior, hemos establecido a = 0 para el valor de la clave. Así que cuando se suma el texto plano a la clave, terminamos con el mismo mensaje saliendo. 
Así que "aaaa" no es una clave ideal. Pero si configuramos la clave en "dddd", obtendríamos lo mismo que el Cifrado César.

Paso 3
El eslabón más débil en cualquier cifrado es el ser humano. Hagamos tu cifrado de sustitución un poco más tolerante a errores proporcionando una fuente de 
aleatoriedad y asegurando que la clave contenga solo letras minúsculas.
Si alguien no presenta una clave en absoluto, genera una clave verdaderamente aleatoria de al menos 100 caracteres en minúsculas de longitud.

Extensiones
Los cifrados de desplazamiento funcionan al hacer que el texto sea ligeramente extraño, pero son vulnerables al análisis de frecuencia. Los cifrados de sustitución ayudan en eso, pero siguen siendo muy vulnerables cuando la clave es corta o si se preservan los espacios. Más adelante verás una solución a este problema en el ejercicio "crypto-square".
Si quieres avanzar más en este campo, las preguntas comienzan a ser sobre cómo podemos intercambiar claves de manera segura. Echa un vistazo a Diffie-Hellman en Wikipedia para una de las primeras implementaciones de este esquema.
 */

export class SimpleCipher {
  // Establecer el valor del código ASCII para 'a'
  private static readonly LOWER = 'a'.charCodeAt(0);
  // Definir la cantidad de letras en el alfabeto inglés
  private static readonly LETTERS = 26;

  // Constructor que acepta una clave opcional, si no se proporciona, genera una clave aleatoria
  constructor(public readonly key: string = SimpleCipher.randomKey()) {}

  // Método para codificar un texto plano
  encode(plain: string) {
    return this.transform(plain, (charCode, keyChar, i) =>
      // Calcular el nuevo código ASCII para el carácter codificado
      ((charCode + keyChar.charCodeAt(0) - 2 * SimpleCipher.LOWER) % SimpleCipher.LETTERS) + SimpleCipher.LOWER
    );
  }

  // Método para decodificar un texto codificado
  decode(code: string) {
    return this.transform(code, (charCode, keyChar, i) =>
      // Calcular el nuevo código ASCII para el carácter decodificado
      ((SimpleCipher.LETTERS + charCode - keyChar.charCodeAt(0)) % SimpleCipher.LETTERS) + SimpleCipher.LOWER
    );
  }

  // Método privado para generar una clave aleatoria
  private static randomKey(length = 100): string {
    return Array.from({ length }, () => String.fromCharCode(SimpleCipher.LOWER + Math.random() * SimpleCipher.LETTERS | 0)).join("");
  }

  // Método privado para aplicar transformación a cada carácter del texto
  private transform(text: string, transformFn: (charCode: number, keyChar: string, index: number) => number): string {
    return text.replace(/[a-z]/g, (char, i) =>
      // Sustituir cada carácter del texto por su equivalente transformado
      String.fromCharCode(transformFn(char.charCodeAt(0), this.key[i % this.key.length], i))
    );
  }
}

/*23

Crear una función llamada answer que acepte una cadena de pregunta y devuelva el resultado como un número entero. La función debe analizar y evaluar problemas matemáticos simples en forma de palabras, siguiendo las siguientes reglas:

Iteración 0: Los problemas sin operaciones simplemente se evalúan como el número dado.
Iteración 1: Suma dos números juntos.
Iteración 2: Realiza las operaciones de resta, multiplicación y división.
Iteración 3: Maneja un conjunto de operaciones, evaluando la expresión de izquierda a derecha.
Iteración 4: Rechaza preguntas que contengan operaciones no admitidas, preguntas no matemáticas o problemas verbales con sintaxis inválida.
La función answer debe lanzar errores si encuentra una operación desconocida o una sintaxis incorrecta en la pregunta proporcionada.

*/

export const answer = (question: string): number => {
  const validSyntax = /^What is((?:-|\d+|\s+|plus|minus|multiplied by|divided by)*)\?$/.exec(question);
  if (!validSyntax) {
    throw new Error("Unknown operation");
  }
  if (!/^ *-?\d+(?: +(?:plus|minus|multiplied by|divided by) +-?\d+)*$/.test(validSyntax[1])) {
    throw new Error("Syntax error");
  }
  const words = validSyntax[1].trim().replace(/ by/g, "").split(" ");
  let result = Number(words[0]);
  for (let i = 1; i < words.length; i += 2) {
    switch (words[i]) {
      case "plus": result += Number(words[i + 1]); break;
      case "minus": result -= Number(words[i + 1]); break;
      case "multiplied": result *= Number(words[i + 1]); break;
      case "divided": result /= Number(words[i + 1]); break;
    }
  }
  return result;
};

/*
24

Instrucciones
Implementa operaciones básicas de listas.

En los lenguajes funcionales, las operaciones de listas como length, map y reduce son muy comunes. Implementa una serie de operaciones básicas de listas, sin utilizar funciones existentes.

El número preciso y los nombres de las operaciones a implementar dependerán de cada track para evitar conflictos con los nombres existentes, pero las operaciones generales que implementarás incluyen:

-append (dadas dos listas, añade todos los elementos de la segunda lista al final de la primera lista);
-concatenate (dada una serie de listas, combina todos los elementos de todas las listas en una lista aplanada);
-filter (dado un predicado y una lista, devuelve la lista de todos los elementos para los cuales predicate(item) es verdadero);
-length (dada una lista, devuelve el número total de elementos que contiene);
-map (dada una función y una lista, devuelve la lista de los resultados de aplicar function(item) a todos los elementos);
-foldl (dada una función, una lista y un acumulador inicial, pliega (reduce) cada elemento en el acumulador desde la izquierda);
-foldr (dada una función, una lista y un acumulador inicial, pliega (reduce) cada elemento en el acumulador desde la derecha);
-reverse (dada una lista, devuelve una lista con todos los elementos originales, pero en orden inverso).

Nota: el orden en el que se pasan los argumentos a las funciones de plegado (foldl, foldr) es significativo.
Está permitido usar características básicas del lenguaje para construir y descomponer arrays mediante desestructuración y el literal de array [], 
pero no se deben usar funciones de Array.prototype.
Para poder probar tu solución, asegúrate de que forEach esté implementado.

const list = List.create(1, 2)
list.forEach((item) => console.log(item))
// =>
//    1
//    2

 */

export class List {
  private values: unknown[];

  private constructor(...values: unknown[]) {
    this.values = values;
  }

  public static create(...values: unknown[]): List {
    return new List(...values);
  }

  public forEach(callback: (value: unknown) => void): void {
    for (let i = 0; i < this.values.length; i++) {
      callback(this.values[i]);
    }
  }

  public append(list: List): List {
    const result = new List(...this.values);
    list.forEach(value => result.values.push(value));
    return result;
  }

  public concat(listOfLists: List): List {
    const result = new List(...this.values);
    listOfLists.forEach(list => {
      if (list instanceof List) {
        list.forEach(value => result.values.push(value));
      }
    });
    return result;
  }

  public filter<T>(predicate: (value: T) => boolean): List {
    const result = new List();
    this.forEach(value => {
      if (predicate(value as T)) {
        result.values.push(value);
      }
    });
    return result;
  }

  public length(): number {
    let count = 0;
    this.forEach(() => count++);
    return count;
  }

  public map<T>(fn: (value: T) => unknown): List {
    const result = new List();
    this.forEach(value => result.values.push(fn(value as T)));
    return result;
  }

  public foldl<T, U>(fn: (acc: U, value: T) => U, initial: U): U {
    let acc = initial;
    this.forEach(value => acc = fn(acc, value as T));
    return acc;
  }

  public foldr<T, U>(fn: (acc: U, value: T) => U, initial: U): U {
    let acc = initial;
    for (let i = this.values.length - 1; i >= 0; i--) {
      acc = fn(acc, this.values[i] as T);
    }
    return acc;
  }

  public reverse(): List {
    const result = new List();
    for (let i = this.values.length - 1; i >= 0; i--) {
      result.values.push(this.values[i]);
    }
    return result;
  }
}

/*
25
Introducción
Enseñas inglés como lengua extranjera a estudiantes de secundaria.

Has decidido basar todo tu plan de estudios en programas de televisión. Necesitas analizar qué palabras se usan y con qué frecuencia se repiten.

Esto te permitirá elegir los programas más sencillos para comenzar y aumentar gradualmente la dificultad con el tiempo.

Instrucciones
Tu tarea es contar cuántas veces aparece cada palabra en los subtítulos de un drama.

Los subtítulos de estos dramas utilizan solo caracteres ASCII.

Los personajes a menudo hablan en inglés coloquial, usando contracciones como they're o it's. Aunque estas contracciones provienen de dos palabras (por ejemplo, we are),
 la contracción (we're) se considera una sola palabra.

Las palabras pueden estar separadas por cualquier forma de puntuación (por ejemplo, ":", "!", o "?") o espacios en blanco (por ejemplo, "\t", "\n", o " "). 
La única puntuación que no separa palabras es el apóstrofo en las contracciones.

Los números se consideran palabras. Si los subtítulos dicen It costs 100 dollars., entonces 100 será una palabra propia.

Las palabras no distinguen entre mayúsculas y minúsculas. Por ejemplo, la palabra you aparece tres veces en la siguiente oración:

You come back, you hear me? DO YOU HEAR ME?

El orden de los conteos de palabras en los resultados no importa.

Aquí tienes un ejemplo que incorpora varios de los elementos discutidos anteriormente:

palabras simples
contracciones
números
palabras insensibles a mayúsculas y minúsculas
puntuación (incluidos los apóstrofos) para separar palabras
diferentes formas de espacios en blanco para separar palabras
"That's the password: 'PASSWORD 123'!", cried the Special Agent.\nSo I fled.

El mapeo para este subtítulo sería:

123: 1
agent: 1
cried: 1
fled: 1
i: 1
password: 2
so: 1
special: 1
that's: 1
the: 2
*/
export function count(text: string): Map<string, number> {
  // Convertir el texto a minúsculas para normalizar el caso
  const normalizedText = text.toLowerCase();

  // Usar una expresión regular para encontrar palabras y números, ignorando la puntuación
  const words = normalizedText.match(/\b[\w']+\b/g);

  // Crear un Map para almacenar el recuento de palabras
  const wordCounts = new Map<string, number>();

  if (words) {
    words.forEach((word: string) => {
      // Si la palabra ya está en el Map, incrementar su recuento
      if (wordCounts.has(word)) {
        wordCounts.set(word, wordCounts.get(word)! + 1); // Observa el "!" para asegurar que wordCounts.get(word) no sea indefinido
      } else {
        // De lo contrario, establecer su recuento en 1
        wordCounts.set(word, 1);
      }
    });
  }

  return wordCounts;
}

/*
26
Instrucciones

Encuentra la diferencia entre el cuadrado de la suma y la suma de los cuadrados de los primeros N números naturales.

El cuadrado de la suma de los diez primeros números naturales es (1 + 2 +... + 10)² = 55² = 3025.

La suma de los cuadrados de los diez primeros números naturales es 1² + 2² +... + 10² = 385.
Por tanto, la diferencia entre el cuadrado de la suma de los primeros diez números naturales y la suma de los cuadrados de los primeros diez números naturales es 3025 - 385 = 2640.

No se espera que usted mismo descubra una solución eficaz a este problema desde los primeros principios; Se permite, e incluso se fomenta, la investigación. 
Encontrar el mejor algoritmo para el problema es una habilidad clave en ingeniería de software.
 */

export class Squares {
  private readonly _count: number; // Almacena el número proporcionado como límite

  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    let sum = 0;
    // Calcula la suma de los cuadrados de los números naturales hasta el límite
    for (let i = 1; i <= this._count; i++) {
      sum += i * i;
    }
    return sum;
  }

  get squareOfSum(): number {
    let sum = 0;
    // Calcula la suma de los números naturales hasta el límite y luego eleva al cuadrado el resultado
    for (let i = 1; i <= this._count; i++) {
      sum += i;
    }
    return sum * sum;
  }

  get difference(): number {
    // Calcula la diferencia entre el cuadrado de la suma y la suma de los cuadrados
    return this.squareOfSum - this.sumOfSquares;
  }
}

/* Introducción
27
La forma en que medimos el tiempo es un poco confusa. Tenemos 60 segundos en un minuto y 60 minutos en una hora. Esto proviene de la antigua Babilonia, donde utilizaban el 60 como base para su sistema numérico. Tenemos 24 horas al día, 7 días a la semana y ¿cuántos días tiene un mes? Bueno, para los días de un mes depende no sólo de qué mes es, sino también de qué tipo de calendario se utiliza en el país en el que vives.

¿Qué pasa si, en cambio, solo usamos segundos para expresar intervalos de tiempo? Luego podemos usar prefijos del sistema métrico para escribir una gran cantidad de segundos en cantidades más fácilmente comprensibles.

Una receta de comida podría explicar que hay que dejar que los brownies se cocinen en el horno durante dos kilosegundos (es decir, dos mil segundos).
Quizás usted y su familia viajarían a algún lugar exótico durante dos megasegundos (es decir, dos millones de segundos).
Y si usted y su cónyuge estuvieran casados ​​durante mil millones de segundos, celebrarían su aniversario de un gigasegundo.

Nota
Si alguna vez colonizamos Marte o algún otro planeta, medir el tiempo será aún más complicado. Si alguien dice "año", ¿se refiere a un año en la Tierra o a un año en Marte?
La idea de este ejercicio surgió de la novela de ciencia ficción "A Deepness in the Sky" del autor Vernor Vinge. En él el autor utiliza el sistema métrico como base para medir el tiempo.

Instrucciones
Su tarea es determinar la fecha y la hora un gigasegundo después de una fecha determinada.

Un gigasegundo son mil millones de segundos. Es un uno seguido de nueve ceros.

Si naciste el 24 de enero de 2015 a las 22:00 (10:00:00 p. m.) , entonces tendrías un gigasegundo de edad el 2 de octubre de 2046 a las 23:46:40 (11:46:40 p. m.) .*/

export class Gigasecond {
  private initialDate: Date;

  constructor(initialDate: Date) {
    this.initialDate = initialDate;
  }

  public date(): Date {
    const gigasecond = 1e9; // Un gigasegundo es 10^9 segundos
    const millisecondsInSecond = 1000;
    
    // Convertir la fecha inicial a milisegundos
    let initialTime = this.initialDate.getTime();
    
    // Sumar un gigasegundo en milisegundos
    let gigasecondLater = initialTime + gigasecond * millisecondsInSecond;
    
    // Crear una nueva fecha con el tiempo un gigasegundo después
    return new Date(gigasecondLater);
  }
}

/* 
28
Instrucciones
Determina si un triángulo es equilátero, isósceles o escaleno.

Un triángulo equilátero tiene los tres lados de la misma longitud.

Un triángulo isósceles tiene al menos dos lados de la misma longitud. (A veces se especifica que tiene exactamente dos lados de la misma longitud, 
  pero para los fines de este ejercicio diremos al menos dos).

Un triángulo escaleno tiene todos sus lados de diferentes longitudes.

Nota
Para que una figura sea un triángulo, todos los lados deben tener una longitud > 0, y la suma de las longitudes de dos lados cualesquiera debe ser mayor o igual a la longitud del tercer lado.

En ecuaciones:

Sean a, b, y clados del triángulo. Entonces las tres expresiones siguientes deben ser verdaderas:

a + b ≥ c
b + c ≥ a
a + c ≥ b */

// Clase Triangle para determinar el tipo de triángulo basado en sus lados
export class Triangle {
  readonly isEquilateral: boolean; // ¿Es equilátero?
  readonly isIsosceles: boolean; // ¿Es isósceles?
  readonly isScalene: boolean; // ¿Es escaleno?

  constructor(...sides: number[]) {
      // Ordenar los lados de menor a mayor
      const [a, b, c] = sides.sort();

      // Verificar si los lados forman un triángulo válido
      const isValid = a + b > c;

      // Obtener el número de lados únicos
      const uniqueSides = new Set(sides).size;

      // Determinar el tipo de triángulo
      this.isEquilateral = isValid && uniqueSides === 1; // Equilátero si los tres lados son iguales
      this.isIsosceles = isValid && uniqueSides <= 2; // Isósceles si al menos dos lados son iguales
      this.isScalene = isValid && uniqueSides === 3; // Escaleno si todos los lados son diferentes
  }
}

/*
29
Introducción
Invertir cadenas (leerlas de derecha a izquierda, en lugar de de izquierda a derecha) es una tarea sorprendentemente común en programación.

Por ejemplo, en bioinformática, invertir la secuencia de cadenas de ADN o ARN suele ser importante para diversos análisis, como encontrar cadenas complementarias o identificar secuencias palindrómicas que tienen importancia biológica.

Instrucciones
Tu tarea es invertir una cadena determinada.

Algunos ejemplos:

Conviértete "stressed"en "desserts".
Conviértete "strops"en "sports".
Conviértete "racecar"en "racecar".
 */

// Función para revertir una cadena
export function reverse(str: string): string {
  const result = str.split('').reverse().join(''); // Dividir la cadena en caracteres, revertir el orden y unirlos de nuevo
  return result; // Devolver la cadena revertida
}

console.log(reverse("stressed")); // Prueba de la función con la cadena "stressed"
console.log(reverse("strops")); // Prueba de la función con la cadena "strops"
console.log(reverse("racecar")); // Prueba de la función con la cadena "racecar"

/*
30
Instrucciones
La Conjetura de Collatz o problema 3x+1 se puede resumir de la siguiente manera:

Tome cualquier número entero positivo n. Si n es par, divide n entre 2 para obtener n / 2. Si n es impar, multiplica n por 3 y suma 1 para obtener 3n + 1. Repite el proceso indefinidamente. La conjetura afirma que no importa con qué número comiences, eventualmente siempre llegarás a 1.

Dado un número n, devuelve el número de pasos necesarios para llegar a 1.

Ejemplos
Comenzando con n = 12, los pasos serían los siguientes:

12
6
3
10
5
dieciséis
8
4
2
1
Resultando en 9 pasos. Entonces, para la entrada n = 12, el valor de retorno sería 9.
 */
export function steps(count: number): number {
  // Verificar si el número es negativo o no entero
  if (!Number.isInteger(count) || count <= 0) {
      throw new Error("Only positive integers are allowed");
  }

  let stepsCount = 0; // Inicializar el contador de pasos

  // Aplicar la conjetura de Collatz hasta que el número llegue a 1
  while (count !== 1) {
      if (count % 2 === 0) { // Si el número es par
          count /= 2; // Dividir por 2
      } else { // Si el número es impar
          count = count * 3 + 1; // Multiplicar por 3 y sumar 1
      }
      stepsCount++; // Incrementar el contador de pasos en cada iteración
  }

  return stepsCount; // Devolver el número de pasos realizados
}

/* Introducción
31
Trabajas para una empresa que crea un juego multijugador en línea llamado Lexiconia.

Para jugar, cada jugador recibe 13 letras, que debe reorganizar para crear palabras. Diferentes letras tienen diferentes valores en puntos, ya que es más fácil crear palabras con algunas letras que con otras.

El juego se lanzó originalmente en inglés, pero es muy popular y ahora la compañía quiere expandirse también a otros idiomas.

Los diferentes idiomas deben admitir diferentes valores de puntos para las letras. Los valores de puntos están determinados por la frecuencia con la que se utilizan las letras, en comparación con otras letras en ese idioma.

Por ejemplo, la letra 'C' es bastante común en inglés y sólo vale 3 puntos. Pero en noruego es una letra muy rara y vale 10 puntos.

Para que sea más fácil agregar nuevos idiomas, tu equipo necesita cambiar la forma en que se almacenan las letras y sus valores de puntos en el juego.

Instrucciones
Tu tarea es cambiar el formato de datos de las letras y sus valores de puntos en el juego.

Actualmente, las letras se almacenan en grupos según su puntuación, en un mapeo de uno a muchos.

1 punto: "A", "E", "I", "O", "U", "L", "N", "R", "S", "T",
2 puntos: "D", "G",
3 puntos: "B", "C", "M", "P",
4 puntos: "F", "H", "V", "W", "Y",
5 puntos: "K",
8 puntos: "J", "X",
10 puntos: "Q", "Z",
Esto debe cambiarse para almacenar cada letra individual con su puntuación en un mapeo uno a uno.

"a" vale 1 punto.
"b" vale 3 puntos.
"c" vale 3 puntos.
"d" vale 2 puntos.
etc.
Como parte de este cambio, el equipo también decidió cambiar las letras para que estén en minúsculas en lugar de mayúsculas.

Nota
Si desea ver cómo se estructuraban previamente los datos y cómo deben cambiar, eche un vistazo a los ejemplos del conjunto de pruebas.*/

export function transform(oldValues: { [key: string]: string[] }): { [key: string]: number } {
  const newValues: { [key: string]: number } = {}; // Objeto para almacenar los nuevos valores

  // Iterar sobre las claves del objeto de valores antiguos
  for (const points in oldValues) {
      const numericValue = Number.parseInt(points); // Convertir la clave a número una vez

      // Iterar sobre los elementos de la matriz asociada a cada clave
      for (const value of oldValues[points]) {
          // Convertir a minúsculas y asignar el valor numérico a cada elemento
          newValues[value.toLowerCase()] = numericValue;
      }
  }

  return newValues; // Devolver el objeto con los nuevos valores
}


/* 
32
Instrucciones
Traducir secuencias de ARN en proteínas.

El ARN se puede dividir en tres secuencias de nucleótidos llamadas codones y luego traducirse a un polipéptido así:

ARN: "AUGUUUUCU"=> se traduce en

Codones: "AUG", "UUU", "UCU" => que se convierten en un polipéptido con la siguiente secuencia =>

Proteína:"Methionine", "Phenylalanine", "Serine"

Existen 64 codones que a su vez corresponden a 20 aminoácidos; sin embargo, todas las secuencias de codones y los aminoácidos resultantes no son importantes en este ejercicio. Si funciona para un codón, el programa debería funcionar para todos ellos. Sin embargo, siéntase libre de ampliar la lista en el conjunto de pruebas para incluirlos a todos.

También hay tres codones de terminación (también conocidos como codones de 'PARADA'); si alguno de estos codones se encuentra (por el ribosoma), toda la traducción termina y la proteína finaliza.

Todos los codones posteriores se ignoran, así:

ARN: "AUGUUUUCUUAAAUG"=>

Codones: "AUG", "UUU", "UCU", "UAA", "AUG"=>

Proteína:"Methionine", "Phenylalanine", "Serine"

Tenga en cuenta que el codón de parada "UAA"termina la traducción y la metionina final no se traduce a la secuencia de la proteína.

A continuación se muestran los codones y los aminoácidos resultantes necesarios para el ejercicio.

codón	Proteína
AGO	metionina
UUU, UUC	fenilalanina
UUA, UUG	leucina
UCU, UCC, UCA, UCG	serina
UAU, UAC	tirosina
UGU, UGC	cisteína
UGG	triptófano
UAA, UAG, UGA	DETENER
*/

// Función para traducir una secuencia de ARN en una lista de proteínas
export function translate(rna: string): string[] {
  // Mapa que asigna cada codón ARN a su proteína correspondiente
  const map: { [codon: string]: string } = {
      AUG: 'Methionine',
      UUU: 'Phenylalanine',
      UUC: 'Phenylalanine',
      UUA: 'Leucine',
      UUG: 'Leucine',
      UCU: 'Serine',
      UCC: 'Serine',
      UCA: 'Serine',
      UCG: 'Serine',
      UAU: 'Tyrosine',
      UAC: 'Tyrosine',
      UGU: 'Cysteine',
      UGC: 'Cysteine',
      UGG: 'Tryptophan',
      UAA: 'STOP',
      UAG: 'STOP',
      UGA: 'STOP'
  };

  const proteins: string[] = []; // Array para almacenar las proteínas traducidas

  // Iterar sobre la secuencia de ARN en pasos de 3 caracteres (codones)
  for (let i = 0; i < rna.length; i += 3) {
      const codon = rna.slice(i, i + 3); // Obtener el codón actual
      const protein = map[codon]; // Obtener la proteína correspondiente al codón

      if (!protein) {
          throw new Error('Invalid codon'); // Lanzar un error si el codón es inválido
      }

      if (protein === 'STOP') {
          break; // Salir del bucle si se encuentra un codón de parada
      }

      proteins.push(protein); // Agregar la proteína al array de proteínas traducidas
  }

  return proteins; // Devolver el array de proteínas traducidas
}

/*
33
Introducción
Raindrops es una versión un poco más compleja del desafío FizzBuzz, una pregunta de entrevista clásica.

Instrucciones
Tu tarea es convertir un número en sus correspondientes sonidos de gotas de lluvia.

Si un número dado:

es divisible por 3, agregue "Pling" al resultado.
es divisible por 5, agregue "Plang" al resultado.
es divisible por 7, añade "Plong" al resultado.
no es divisible por 3, 5 o 7, el resultado debe ser el número como una cadena.

Ejemplos
28 es divisible por 7, pero no por 3 ni por 5, por lo que el resultado sería "Plong".
30 es divisible por 3 y 5, pero no por 7, por lo que el resultado sería "PlingPlang".
34 no es divisible por 3, 5 o 7, por lo que el resultado sería "34".
*/

export function convert(number: number): string {
  let result = '';

  // Construir la cadena resultante según las reglas
  if (number % 3 === 0) result += 'Pling';
  if (number % 5 === 0) result += 'Plang';
  if (number % 7 === 0) result += 'Plong';

  // Devolver la cadena resultante o el número como cadena si no hay coincidencias
  return result || number.toString();
}

// Pruebas de la función con diferentes números
console.log(convert(28)); // Se espera "Plong"
console.log(convert(30)); // Se espera "PlingPlang"
console.log(convert(34)); // Se espera "34"

/* 
34
Instrucciones
Calcule la distancia de Hamming entre dos cadenas de ADN.

Su cuerpo está formado por células que contienen ADN. Esas células se desgastan periódicamente y necesitan ser reemplazadas, lo que logran dividiéndose en células hijas. De hecho, ¡el cuerpo humano promedio experimenta alrededor de 10 mil billones de divisiones celulares en su vida!

Cuando las células se dividen, su ADN también se replica. A veces, durante este proceso, se producen errores y piezas individuales de ADN se codifican con información incorrecta. Si comparamos dos cadenas de ADN y contamos las diferencias entre ellas podemos ver cuántos errores se produjeron. Esto se conoce como la "Distancia de Hamming".

Leemos el ADN usando las letras C, A, G y T. Dos cadenas podrían verse así:

GAGCCTACTAACGGGAT
CATCGTAATGACGGCCT
^ ^ ^  ^ ^    ^^
Tienen 7 diferencias y por tanto la Distancia de Hamming es 7.

La distancia de Hamming es útil para muchas cosas en la ciencia, no solo en biología, por lo que es una buena frase con la que estar familiarizado :)

Notas de implementación
La distancia de Hamming solo se define para secuencias de igual longitud, por lo que intentar calcularla entre secuencias de diferentes longitudes no debería funcionar.

 */

export function compute(left: string, right: string): number {
  // Verificar que las cadenas tengan la misma longitud
  if (left.length !== right.length) {
      throw new Error('DNA strands must be of equal length.');
  }

  // Calcular la distancia de Hamming sumando las diferencias entre las cadenas
  return Array.from(left).reduce((distance, char, index) => 
      distance + (char !== right[index] ? 1 : 0), 0);
}

/*
35
Instrucciones
Cada uno de nosotros hereda de nuestros padres biológicos un conjunto de instrucciones químicas conocidas como ADN que influyen en la forma en que se construyen nuestros cuerpos. ¡Toda la vida conocida depende del ADN!

Nota: No es necesario que sepas nada sobre nucleótidos o ADN para completar este ejercicio.

El ADN es una larga cadena de otras sustancias químicas y las más importantes son los cuatro nucleótidos, adenina, citosina, guanina y timina. ¡Una sola cadena de ADN puede contener miles de millones de estos cuatro nucleótidos y el orden en que ocurren es importante! Al orden de estos nucleótidos en un fragmento de ADN lo llamamos "secuencia de ADN".

Representamos una secuencia de ADN como una colección ordenada de estos cuatro nucleótidos y una forma común de hacerlo es con una cadena de caracteres como "ATTACG" para una secuencia de ADN de 6 nucleótidos. 'A' para adenina, 'C' para citosina, 'G' para guanina y 'T' para timina.

Dada una cadena que representa una secuencia de ADN, cuente cuántos de cada nucleótido están presentes. Si la cadena contiene caracteres que no son A, C, G o T, entonces no es válida y debería indicar un error.

Por ejemplo:

"GATTACA" -> 'A': 3, 'C': 1, 'G': 1, 'T': 2
"INVALID" -> error
*/

export function nucleotideCounts(sequence: string): Record<string, number> {
  const counts: Record<string, number> = { A: 0, C: 0, G: 0, T: 0 };

  for (const nucleotide of sequence) {
      if (!(nucleotide in counts)) {
          throw new Error('Invalid nucleotide in strand');
      }
      counts[nucleotide]++;
  }

  return counts;
}

/*
36
Introducción
Scrabble es un juego de palabras en el que los jugadores colocan fichas de letras en un tablero para formar palabras. Cada letra tiene un valor. La puntuación de una palabra es la suma de los valores de sus letras.

Instrucciones
Tu tarea es calcular la puntuación de Scrabble de una palabra sumando los valores de sus letras.

Las cartas se valoran de la siguiente manera:

Carta	Valor
A, E, I, O, U, L, N, R, S, T	1
re, g	2
B, C, M, P	3
F, H, V, W, Y	4
k	5
J, X	8
Q, Z	10
Por ejemplo, la palabra "repollo" vale 14 puntos:

3 puntos para C
1 punto para A
3 puntos para B
3 puntos para B
1 punto para A
2 puntos por G
1 punto para E
*/

// Función para calcular el puntaje de una palabra en el juego Scrabble
export function calculateScrabbleScore(word: string): number {
  // Verificar si el argumento no es una cadena
  if (typeof word !== 'string') {
      return 0; // Devolver 0 si el argumento no es una cadena
  }

  // Objeto que asigna valores a cada letra del alfabeto en Scrabble
  const letterValues: Record<string, number> = {
      a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, r: 1, s: 1, t: 1,
      d: 2, g: 2,
      b: 3, c: 3, m: 3, p: 3,
      f: 4, h: 4, v: 4, w: 4, y: 4,
      k: 5,
      j: 8, x: 8,
      q: 10, z: 10
  };

  // Convertir la palabra a minúsculas, iterar sobre cada letra y acumular el puntaje
  return Array.from(word.toLowerCase()).reduce((acc, letter) => 
      // Sumar el valor de la letra al acumulador, o 0 si la letra no está en el objeto
      acc + (letterValues[letter] || 0), 0);
}

/*
37
Instrucciones
Dada la puntuación de alergia de una persona, determine si es alérgica o no a un artículo determinado y su lista completa de alergias.

Una prueba de alergia produce una puntuación numérica única que contiene la información sobre todas las alergias que tiene la persona (para las que se le hizo la prueba).

La lista de artículos (y su valor) que se probaron son:

huevos (1)
maní (2)
mariscos (4)
fresas (8)
tomates (16)
chocolatinas (32)
polen (64)
gatos (128)
Entonces, si Tom es alérgico al maní y al chocolate, obtiene una puntuación de 34.

Ahora, dada sólo esa puntuación de 34, su programa debería poder decir:

Si Tom es alérgico a alguno de los alérgenos enumerados anteriormente.
Todos los alérgenos a los que Tom es alérgico.
Nota: una puntuación determinada puede incluir alérgenos que no figuran en la lista anterior (es decir, alérgenos con una puntuación de 256, 512, 1024, etc.). Su programa debe ignorar esos componentes de la partitura. Por ejemplo, si la puntuación de alergia es 257, su programa solo debe informar la alergia a los huevos (1).


 */
export class Allergies {
  // Objeto que mapea cada alérgeno a su valor binario correspondiente
  private static readonly allergenValues: Record<string, number> = {
      'eggs': 1,
      'peanuts': 2,
      'shellfish': 4,
      'strawberries': 8,
      'tomatoes': 16,
      'chocolate': 32,
      'pollen': 64,
      'cats': 128
  };
  
  constructor(private allergyScore: number) {}

  // Método para obtener una lista de alérgenos activos
  public list(): string[] {
      return Object.keys(Allergies.allergenValues)
          .filter(allergen => this.allergicTo(allergen));
  }

  // Método para verificar si la persona es alérgica a un alérgeno específico
  public allergicTo(allergen: string): boolean {
      const value = Allergies.allergenValues[allergen];
      if (value === undefined) {
          throw new Error('allergen not found');
      }
      return (this.allergyScore & value) === value;
  }
}

/*
38 
Instrucciones
Determinar si un número es perfecto, abundante o deficiente según el esquema de clasificación de Nicómaco (60 - 120 d.C.) para números enteros positivos.

El matemático griego Nicómaco ideó un esquema de clasificación para números enteros positivos, identificando cada uno como perteneciente únicamente a las categorías de perfecto , abundante o deficiente en función de su suma alícuota . La suma alícuota se define como la suma de los factores de un número sin incluir el número en sí. Por ejemplo, la suma alícuota de 15es 1 + 3 + 5 = 9.

Perfecto
Un número es perfecto cuando es igual a su suma alícuota. Por ejemplo:

6 es un numero perfecto porque1 + 2 + 3 = 6
28 es un numero perfecto porque1 + 2 + 4 + 7 + 14 = 28
Abundante
Un número es abundante cuando es menor que su suma alícuota. Por ejemplo:

12 es un numero abundante porque1 + 2 + 3 + 4 + 6 = 16
24 es un numero abundante porque1 + 2 + 3 + 4 + 6 + 8 + 12 = 36
Deficiente
Un número es deficiente cuando es mayor que su suma alícuota. Por ejemplo:

8es un número deficiente porque1 + 2 + 4 = 7
Los números primos son deficientes
*/

export function classify(num: number): string {
  if (num <= 0) {
      throw new Error("Classification is only possible for natural numbers.");
  }

  // Obtener la suma de los divisores propios del número
  const aliquotSum = Array.from({ length: num - 1 }, (_, i) => i + 1)
      .filter(divisor => num % divisor === 0)
      .reduce((sum, divisor) => sum + divisor, 0);

  // Clasificar el número en función de su suma de divisores
  if (aliquotSum === num) return "perfect"; // El número es perfecto si la suma de sus divisores es igual a él mismo
  if (aliquotSum > num) return "abundant"; // El número es abundante si la suma de sus divisores es mayor que él mismo
  return "deficient"; // El número es deficiente si la suma de sus divisores es menor que él mismo
}

console.log(classify(12));//ejemplo

/*
39
Instrucciones
Un número complejo es un número en la forma a + b * idonde ay bson reales y isatisfacen i^2 = -1.

ase llama parte real y bse llama parte imaginaria de z. El conjugado del número a + b * ies el número a - b * i. El valor absoluto de un número complejo z = a + b * ies un número real |z| = sqrt(a^2 + b^2). El cuadrado del valor absoluto |z|^2es el resultado de la multiplicación de zpor su conjugado complejo.

La suma/diferencia de dos números complejos implica sumar/restar sus partes real e imaginaria por separado: (a + i * b) + (c + i * d) = (a + c) + (b + d) * i, (a + i * b) - (c + i * d) = (a - c) + (b - d) * i.

El resultado de la multiplicación es por definición (a + i * b) * (c + i * d) = (a * c - b * d) + (b * c + a * d) * i.

El recíproco de un número complejo distinto de cero es 1 / (a + i * b) = a/(a^2 + b^2) - b/(a^2 + b^2) * i.

Al dividir un número complejo a + i * bpor otro c + i * dse obtiene: (a + i * b) / (c + i * d) = (a * c + b * d)/(c^2 + d^2) + (b * c - a * d)/(c^2 + d^2) * i.

Elevar e a un exponente complejo se puede expresar como e^(a + i * b) = e^a * e^(i * b), cuyo último término viene dado por la fórmula de Euler e^(i * b) = cos(b) + i * sin(b).

Implementar las siguientes operaciones:

suma, resta, multiplicación y división de dos números complejos,
conjugado, valor absoluto, exponente de un número complejo dado.
Suponga que el lenguaje de programación que está utilizando no tiene una implementación de números complejos.
*/

export class ComplexNumber {
  private readonly a: number; // Parte real del número complejo
  private readonly b: number; // Parte imaginaria del número complejo

  constructor(a: number, b: number) {
      this.a = a;
      this.b = b;
  }

  // Obtiene la parte real del número complejo
  public get real(): number {
      return this.a;
  }

  // Obtiene la parte imaginaria del número complejo
  public get imag(): number {
      return this.b;
  }

  // Suma dos números complejos
  public add(other: ComplexNumber): ComplexNumber {
      return new ComplexNumber(this.a + other.a, this.b + other.b);
  }

  // Resta dos números complejos
  public sub(other: ComplexNumber): ComplexNumber {
      return new ComplexNumber(this.a - other.a, this.b - other.b);
  }

  // Multiplica dos números complejos
  public mul(other: ComplexNumber): ComplexNumber {
      const realPart = this.a * other.real - this.b * other.imag;
      const imaginaryPart = this.a * other.imag + this.b * other.real;
      return new ComplexNumber(realPart, imaginaryPart);
  }

  // Divide dos números complejos
  public div(other: ComplexNumber): ComplexNumber {
      const denominator = other.real * other.real + other.imag * other.imag;
      const realPart = (this.a * other.real + this.b * other.imag) / denominator;
      const imaginaryPart = (this.b * other.real - this.a * other.imag) / denominator;
      return new ComplexNumber(realPart, imaginaryPart);
  }

  // Obtiene el valor absoluto del número complejo
  public get abs(): number {
      return Math.sqrt(this.real ** 2 + this.imag ** 2)
  }

  // Obtiene el conjugado del número complejo
  public get conj(): ComplexNumber {
      return new ComplexNumber(this.real, this.imag ? this.imag * (-1) : 0)
  }

  // Obtiene el exponencial del número complejo
  public get exp(): ComplexNumber {
      const realPart = Math.exp(this.a) * Math.cos(this.b);
      const imaginaryPart = Math.exp(this.a) * Math.sin(this.b);
      return new ComplexNumber(realPart, imaginaryPart);
  }
}

/* 
40
Instrucciones
Dado un número, determine si es válido o no según la fórmula de Luhn.

El algoritmo de Luhn es una fórmula de suma de verificación simple que se utiliza para validar una variedad de números de identificación, como números de tarjetas de crédito y números de seguro social canadiense.

La tarea consiste en comprobar si una cadena determinada es válida.

Validar un número
Las cadenas de longitud 1 o menos no son válidas. Se permiten espacios en la entrada, pero deben eliminarse antes de verificar. Todos los demás caracteres que no sean dígitos no están permitidos.

Ejemplo 1: número de tarjeta de crédito válido
4539 3195 0343 6467
El primer paso del algoritmo de Luhn es duplicar cada segundo dígito, empezando por la derecha. estaremos duplicando

4_3_ 3_9_ 0_4_ 6_6_
Si duplicar el número da como resultado un número mayor que 9, resta 9 del producto. Los resultados de nuestra duplicación:

8569 6195 0383 3437
Luego suma todos los dígitos:

8+5+6+9+6+1+9+5+0+3+8+3+3+4+3+7 = 80
Si la suma es divisible por 10, entonces el número es válido. ¡Este número es válido!

Ejemplo 2: número de tarjeta de crédito no válido
8273 1232 7352 0569
Duplicar los segundos dígitos, comenzando por la derecha.

7253 2262 5312 0539
Sumar los dígitos

7+2+5+3+2+2+6+2+5+3+1+2+0+5+3+9 = 57
57 no es divisible por 10, por lo que este número no es válido.
*/

//https://www.youtube.com/watch?v=BId0VVDo7jA&t=7s
// Expresión regular para validar si la cadena contiene solo números
const justNumbersRegex = /^\d+$/;

// Función para verificar si una cadena de dígitos es válida según el algoritmo de Luhn
export function valid(digitString: string): boolean {
  // Eliminar espacios en blanco de la cadena de dígitos
  const preProcess = digitString.replace(/\s/g, "");
  
  // Verificar si la cadena preprocesada contiene solo números y tiene al menos dos caracteres
  if (justNumbersRegex.test(preProcess) === false || preProcess.length < 2) {
    return false;
  }

  // Calcular la suma de verificación según el algoritmo de Luhn
  const summation: number = Array.from(preProcess)
    .map(character => Number(character)) // Convertir cada carácter en un número
    .reverse() // Invertir el orden de los dígitos
    .map((item, index) => (index % 2) ? backwardOddIndexCase(item) : item) // Aplicar regla especial para índices impares en sentido inverso
    .reduce((sum, current) => sum + current, 0); // Sumar todos los dígitos

  // Verificar si la suma de verificación es divisible por 10
  return (summation % 10) === 0;
}

// Función para aplicar la regla especial para índices impares en sentido inverso
function backwardOddIndexCase(digit: number): number {
  let returnValue = digit + digit;
  // Ajustar el valor si excede 9
  if (returnValue > 9) {
    returnValue = returnValue - 9;
  }
  return returnValue;
}

/*
41
Instrucciones
Calcula el número de granos de trigo en un tablero de ajedrez sabiendo que el número en cada cuadrado se duplica.

Había una vez un sirviente sabio que salvó la vida de un príncipe. El rey prometió pagar todo lo que el sirviente pudiera imaginar. Sabiendo que al rey le encantaba el ajedrez, el sirviente le dijo que le gustaría tener granos de trigo. Un grano en el primer cuadrado de un tablero de ajedrez, y el número de granos se duplica en cada cuadrado sucesivo.

Hay 64 cuadrados en un tablero de ajedrez (donde el cuadrado 1 tiene un grano, el cuadrado 2 tiene dos granos, y así sucesivamente).

Escribe código que muestre:

cuántos granos había en un cuadrado dado, y
el número total de granos en el tablero de ajedrez

 */

// Función para calcular la cantidad de granos en un cuadrado específico del tablero de ajedrez
export const square = (squareNumber: number): bigint => {
  // Verificar si el número de cuadrado está dentro del rango válido
  if (squareNumber < 1 || squareNumber > 64) {
      throw new Error('square must be between 1 and 64');
  }
  // Calcular la cantidad de granos en el cuadrado utilizando BigInt para evitar desbordamientos
  return BigInt(2) ** BigInt(squareNumber - 1);
};

// Función para calcular el total de granos en todo el tablero de ajedrez
export const total = (): bigint => {
  // Utilizar la fórmula de la suma de una serie geométrica para calcular el total de granos
  return (BigInt(2) ** BigInt(64)) - BigInt(1);
};

/*
42
Instrucciones
Un triplete pitagórico es un conjunto de tres números naturales, {a, b, c}, para los cuales,

a² + b² = c²
y tal que,

a < b < c
Por ejemplo,

3² + 4² = 5².
Dado un número entero de entrada N, encuentre todos los tripletes pitagóricos para los cuales a + b + c = N.

Por ejemplo, con N = 1000, hay exactamente un triplete pitagórico para el cual a + b + c = 1000: {200, 375, 425}.
 */

// Definición de la interfaz para las opciones de búsqueda de tripletes
type Options = {
  minFactor?: number; // El factor mínimo para los tripletes
  maxFactor?: number; // El factor máximo para los tripletes
  sum: number; // La suma requerida de los tripletes
}

// Clase Triplet para representar un conjunto de tres números
class Triplet {
  constructor(public a: number, public b: number, public c: number) { }

  // Método para convertir el triplete en un array
  toArray(): [number, number, number] {
      return [this.a, this.b, this.c];
  }
}

// Función para encontrar todos los tripletes pitagóricos que suman un valor dado
export function triplets({minFactor, maxFactor, sum}: Options): Triplet[] {
  const triplets: Triplet[] = [];
  // Establecer valores predeterminados si no se proporcionan
  minFactor = minFactor || 1;
  maxFactor = maxFactor || sum - 1;

  // Bucle para generar todos los posibles tripletes
  for (let a = minFactor; a < maxFactor; a++) {
      for (let b = a; b < maxFactor; b++) {
          const c = sum - a - b;
          // Verificar si c es un factor válido y si el triplete es pitagórico
          if (c < b || c < a || c > maxFactor) continue;
          if (a * a + b * b !== c * c) continue;

          // Agregar el triplete a la lista
          triplets.push(new Triplet(a, b, c));
      }
  }

  return triplets;
}

/*
43
Introducción
Trabajas para una empresa que crea un juego de supervivencia de fantasía en línea.

Cuando un jugador termina un nivel, recibe puntos de energía. La cantidad de energía otorgada depende de los objetos mágicos que encontró el jugador mientras exploraba ese nivel.

Instrucciones
Tu tarea es escribir el código que calcula los puntos de energía que se otorgan a los jugadores cuando completan un nivel.

Los puntos otorgados dependen de dos cosas:

El nivel (un número) que el jugador completó.
El valor base de cada objeto mágico recolectado por el jugador durante ese nivel.
Los puntos de energía se otorgan según las siguientes reglas:

Para cada objeto mágico, toma el valor base y encuentra todos los múltiplos de ese valor que sean menores que el número de nivel.
Combina los conjuntos de números.
Elimine cualquier duplicado.
Calcula la suma de todos los números que quedan.
Veamos un ejemplo:

El jugador completó el nivel 20 y encontró dos objetos mágicos con valores base de 3 y 5.

Para calcular los puntos de energía obtenidos por el jugador, necesitamos encontrar todos los múltiplos únicos de estos valores base que sean inferiores al nivel 20.

Múltiplos de 3 menores que 20:{3, 6, 9, 12, 15, 18}
Múltiplos de 5 menores que 20:{5, 10, 15}
Combine los conjuntos y elimine duplicados:{3, 5, 6, 9, 10, 12, 15, 18}
Suma los múltiplos únicos:3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 = 78
Por lo tanto, el jugador gana 78 puntos de energía por completar el nivel 20 y encontrar los dos objetos mágicos con valores base de 3 y 5.

 */
export function sum(magicObjects: number[], level: number): number {
  // Crea un array de números del 0 al nivel dado
  // y luego filtra aquellos niveles en los que algún objeto mágico afecta al nivel actual
  // Finalmente, suma esos niveles para obtener la suma total de puntos de energía.
  return Array.from({ length: level }, (_, i) => i)
      .filter((i) => magicObjects.some((el) => i % el === 0))
      .reduce((sum, current) => sum + current, 0);
}

 /*
 44
 Instrucciones
Convierte una frase a su acrónimo.

¡A los técnicos les encanta su TLA (acrónimos de tres letras)!

Ayude a generar algo de jerga escribiendo un programa que convierta un nombre largo como Portable Network Graphics en su acrónimo (PNG).

La puntuación se maneja de la siguiente manera: los guiones son separadores de palabras (como los espacios en blanco); todos los demás signos de puntuación se pueden eliminar de la entrada.

Por ejemplo:

Aporte	Producción
Lo antes posible	lo antes posible
Pantalla de cristal líquido	LCD
Gracias George ¡Es viernes!	TGIF */

export function parse(phrase: string): string {
  // expresión regular para encontrar todas las palabras en la frase
  const words = phrase.match(/[A-Z]+[a-z]*|[a-z]+/g);
  
  // Si no se encuentran palabras, devuelve una cadena vacía
  if (!words) {
      return '';
  }
  
  // método map para obtener la letra inicial de cada palabra y luego las une en un solo acrónimo
  const acronym = words.map((word) => word.charAt(0).toUpperCase()).join('');
  
  return acronym; // Devuelve el acrónimo generado
}

/*
45
Instrucciones
Un anagrama es una reordenación de letras para formar una nueva palabra: por ejemplo "owns"es un anagrama de "snow". Una palabra no es su propio anagrama: por ejemplo, "stop"no es un anagrama de "stop".

Dada una palabra objetivo y un conjunto de palabras candidatas, este ejercicio solicita el conjunto de anagramas: el subconjunto de los candidatos que son anagramas del objetivo.

El objetivo y los candidatos son palabras de uno o más caracteres alfabéticos ASCII ( A- Zy a- z). Los caracteres en minúsculas y mayúsculas son equivalentes: por ejemplo, "PoTS"es un anagrama de "sTOp", pero StoPno es un anagrama de sTOp. El conjunto de anagramas es el subconjunto del conjunto candidato que son anagramas del objetivo (en cualquier orden). Las palabras del conjunto de anagramas deben tener las mismas mayúsculas y minúsculas que las del conjunto candidato.

Dado el objetivo "stone"y los candidatos "stone", "tones", "banana", "tons", "notes", "Seton"el conjunto de anagramas es "tones", "notes", "Seton".
*/
export class Anagram {
  private target: string;

  constructor(target: string){
      // Convertir la palabra a minúsculas
      this.target = target.toLowerCase();
  }

  public matches(...potentials: string[]): string[] {
      return potentials.filter(candidate => this.isAnagram(candidate.toLowerCase()));
  }

  public isAnagram(candidate: string): boolean {
      // Verificar si la palabra candidata es diferente de la palabra objetivo
      if(candidate !== this.target && candidate.length === this.target.length) {
          // Ordenar los caracteres de ambas palabras y comparar si son iguales
          const sortedTarget = this.target.split('').sort().join('');
          const sortedCandidate = candidate.split('').sort().join('');
          return sortedTarget === sortedCandidate;
      }

      return false;
  }
}








