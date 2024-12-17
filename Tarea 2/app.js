const express = require('express');
const app = express();
const PORT = process.env.PORT || 80

// Middleware para procesar JSON
app.use(express.json());

// --- Clases ---
class Autor {
    constructor(id, nombre, nacionalidad) {
        this.id = id;
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }
}

class Libro {
    constructor(id, titulo, autorId, anioPublicacion) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.anioPublicacion = anioPublicacion;
    }
}

class Biblioteca {
    constructor() {
        this.autores = [];
        this.libros = [];
    }

    agregarAutor(autor) {
        this.autores.push(autor);
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    obtenerLibrosPorAutor(autorId) {
        return this.libros.filter(libro => libro.autorId === autorId);
    }
}

// --- Instancia de la biblioteca ---
const biblioteca = new Biblioteca();
let autorIdCounter = 1;
let libroIdCounter = 1;

// --- Agregar autores clásicos y libros ---
const autoresYLibros = [
    { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana", libros: ["Cien años de soledad", "El otoño del patriarca", "El amor en los tiempos del cólera", "Crónica de una muerte anunciada", "Los funerales de la Mamá Grande"] },
    { nombre: "Miguel de Cervantes", nacionalidad: "Española", libros: ["Don Quijote de la Mancha", "La Galatea", "Rinconete y Cortadillo", "El coloquio de los perros", "Viaje del Parnaso"] },
    { nombre: "William Shakespeare", nacionalidad: "Inglesa", libros: ["Romeo y Julieta", "Hamlet", "Macbeth", "Otelo", "El sueño de una noche de verano"] },
    { nombre: "Fiódor Dostoyevski", nacionalidad: "Rusa", libros: ["Crimen y castigo", "El idiota", "Los hermanos Karamázov", "Demonios", "El jugador"] },
    { nombre: "Leo Tolstói", nacionalidad: "Rusa", libros: ["Guerra y paz", "Anna Karénina", "La muerte de Iván Ilich", "Resurrección", "Infancia"] },
    { nombre: "Homero", nacionalidad: "Griega", libros: ["La Ilíada", "La Odisea"] },
    { nombre: "Franz Kafka", nacionalidad: "Checa", libros: ["La metamorfosis", "El proceso", "El castillo", "Carta al padre", "La condena"] },
    { nombre: "Jane Austen", nacionalidad: "Inglesa", libros: ["Orgullo y prejuicio", "Emma", "Sentido y sensibilidad", "Mansfield Park", "Persuasión"] },
    { nombre: "Charles Dickens", nacionalidad: "Inglesa", libros: ["Oliver Twist", "David Copperfield", "Un cuento de Navidad", "Grandes esperanzas", "Historia de dos ciudades"] },
    { nombre: "Herman Melville", nacionalidad: "Estadounidense", libros: ["Moby Dick", "Bartleby, el escribiente", "Billy Budd", "Pierre", "Taipi"] },
    { nombre: "Jorge Luis Borges", nacionalidad: "Argentina", libros: ["Ficciones", "El Aleph", "Historia universal de la infamia", "Inquisiciones", "El libro de arena"] },
    { nombre: "Mark Twain", nacionalidad: "Estadounidense", libros: ["Las aventuras de Tom Sawyer", "Las aventuras de Huckleberry Finn", "Un yanqui en la corte del Rey Arturo", "El príncipe y el mendigo", "La célebre rana saltarina"] },
    { nombre: "Victor Hugo", nacionalidad: "Francesa", libros: ["Los miserables", "Nuestra Señora de París", "El hombre que ríe", "Noventa y tres", "Los trabajadores del mar"] },
    { nombre: "Dante Alighieri", nacionalidad: "Italiana", libros: ["La Divina Comedia", "Vita nuova", "Convivio"] },
    { nombre: "Edgar Allan Poe", nacionalidad: "Estadounidense", libros: ["El cuervo", "Los crímenes de la calle Morgue", "El gato negro", "El corazón delator", "La caída de la Casa Usher"] }
];

// Agregar datos a la biblioteca
autoresYLibros.forEach(autorData => {
    const autor = new Autor(autorIdCounter++, autorData.nombre, autorData.nacionalidad);
    biblioteca.agregarAutor(autor);
    autorData.libros.forEach(titulo => {
        biblioteca.agregarLibro(new Libro(libroIdCounter++, titulo, autor.id, 1800 + Math.floor(Math.random() * 200)));
    });
});

// --- Rutas ---
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a la Biblioteca</h1>
        <ul>
            <li><a href="/autores">Ver todos los autores</a></li>
            <li><a href="/libros">Ver todos los libros</a></li>
            <li><a href="/autores/json">Ver autores (JSON)</a></li>
            <li><a href="/libros/json">Ver libros (JSON)</a></li>
        </ul>
    `);
});

// --- Ruta: Lista de autores HTML ---
app.get('/autores', (req, res) => {
    let html = '<h1>Lista de Autores</h1><ul>';
    biblioteca.autores.forEach(autor => {
        html += `<li>${autor.nombre} - ${autor.nacionalidad}</li>`;
    });
    html += '</ul><a href="/">Volver al inicio</a>';
    res.send(html);
});

// --- Ruta: Lista de libros HTML ---
app.get('/libros', (req, res) => {
    let html = '<h1>Lista de Libros</h1><ul>';
    biblioteca.libros.forEach(libro => {
        const autor = biblioteca.autores.find(a => a.id === libro.autorId);
        html += `<li>${libro.titulo} - <strong>${autor.nombre}</strong> (${libro.anioPublicacion})</li>`;
    });
    html += '</ul><a href="/">Volver al inicio</a>';
    res.send(html);
});

// --- Ruta: Autores en formato JSON ---
app.get('/autores/json', (req, res) => {
    res.json(biblioteca.autores);
});

// --- Ruta: Libros en formato JSON ---
app.get('/libros/json', (req, res) => {
    res.json(biblioteca.libros);
});


// --- Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
