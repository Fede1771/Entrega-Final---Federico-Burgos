const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://federicoburgos98:CoderProyecto2024*@cluster0.npfabrc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Error"))
    