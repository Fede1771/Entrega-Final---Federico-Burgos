const winston = require("winston");

//Personalizamos nuestros niveles: 

const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colores: {
        fatal: "red",
        error: "yellow",
        warning: "blue",
        info: "green",
        http: "magenta",
        debug: "white"
    }
}

//Creamos un nuevo Logger pero ahora configurando los niveles y los colores a nuestro gusto. 
const logger = winston.createLogger({

    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({
            level: "http",
            format: winston.format.combine( 
                winston.format.colorize({colors: niveles.colores}),
                winston.format.simple()
            )
        }),

        //Agregamos un nuevo transporte: 
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning", 
            format: winston.format.simple()
        })
    ]

})


//Creamos nuestro propio middleware donde vamos a usar este logger: 

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}

module.exports = addLogger;