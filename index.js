//importo express
const express = require( 'express' );

//instancio express
const app = express();

//defino puerto a utilizar por el servidor
const PORT = 3000;
//1. levanto el servidor en el puerto 3000
app.listen(PORT,() => {
    console.log('El Servidor está iniciado en el puerto '+PORT);
});

//2. Establezo la carpeta "assets" como pública
app.use(express.static("assets")); 

//3a. Creo el arreglo de usuarios
const usuarios = [
     "Juan",
     "Jocelyn", 
     "Astrid",
     "Maria",
     "Ignacia",
     "Javier",
     "Brian",
    ]; 

// 3b. Creo la ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req,res) => {
    res.json({usuarios});
    });


//4. Creo middleware  para validar si existe el usuario
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    usuarios.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg");
    });

//4b. creo la ruta para la validación correcta del middleware
app.get("/abracadabra/juego/:usuario", (req, res) => {
        res.sendFile( __dirname +"/index.html");
        });

// 5. Creo la ruta para el juego y valido los numeros de los sombreros con un
// numero generado aleatoriamente entre el 1 y el 4

// 5.a Genero un número aleatorio entre el 1 y 4 
const numeroAleatorio = Math.floor(Math.random() *4)+1;
    
//5.b Ruta para verificar si el parámetro coincide con el número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    // Obtengo el parámetro 'n' a verificar
    const parametroN = Number(req.params.n);
    
    //5.c Verifico si el parámetro 'n' coincide con el número aleatorio
    if (parametroN === numeroAleatorio) {
        res.redirect('/conejito.jpg');
    } else {
       res.redirect('/voldemort.jpg');
        
    }
});
  

//6. Crea la ruta generica y devueve un mensaje que no existe la pagina, con estilos de texto color 
//azul, centrado y tipo de fuente Arial
app.get("*", (req, res) => {
    res.send(`
        <style>
            h1 {
                color: blue;
                font-family: Arial, sans-serif;
                text-align: Center;
            }
        </style>
        <h1>Esta página no existe...</h1>
    `);
});