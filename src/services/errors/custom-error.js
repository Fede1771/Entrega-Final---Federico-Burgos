//Creamos una clase para generar nuestros propios errores: 

class CustomError {
    static crearError({nombre = "Error", causa = "Desconocido", mensaje, codigo = 1}){
        const error = new Error(mensaje); 
        error.name = nombre;
        error.causa = causa;
        error.code = codigo;
        throw error; 
    }

}

module.exports = CustomError; 