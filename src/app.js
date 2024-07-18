const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const PUERTO = 8080;

// Require de otros archivos y middleware
require("./database.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const mockingProductsRoute = require("./routes/mockingProductsRoute.js");
const manejadorError = require("./middleware/error.js");
const SocketManager = require("./sockets/socketmanager.js");
const authMiddleware = require("./middleware/authmiddleware.js");

const app = express();

// Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());

// Inicializa Passport
initializePassport();
app.use(passport.initialize());

// Logger de Winston
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ],
    format: format.combine(
        format.timestamp(),
        format.json()
    )
});

// Middleware para agregar el logger a req
app.use((req, res, next) => {
    req.logger = logger;
    next();
});

// Middleware de autenticación
app.use(authMiddleware);

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);
app.use("/mockingproducts", mockingProductsRoute);
app.use(manejadorError);

// Inicialización del servidor HTTP y WebSockets
const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
    logger.info(`Servidor escuchando en el puerto ${PUERTO}`);
});

new SocketManager(httpServer);
