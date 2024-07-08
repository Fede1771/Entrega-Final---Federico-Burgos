const ProductRepository = require("../repositories/product.repository.js");
const UserRepository = require("../repositories/user.repository.js"); // Asegúrate de tener un repositorio de usuarios
const EmailManager = require("../config/nodemailer.config");

const productRepository = new ProductRepository();
const userRepository = new UserRepository(); // Asegúrate de tener un repositorio de usuarios
const emailManager = new EmailManager();

class ProductController {
    async addProduct(req, res) {
        const nuevoProducto = req.body;
        try {
            const resultado = await productRepository.agregarProducto(nuevoProducto);
            res.json(resultado);
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;

            const productos = await productRepository.obtenerProductos(limit, page, sort, query);
            res.json(productos);
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async getProductById(req, res) {
        const id = req.params.pid;
        try {
            const buscado = await productRepository.obtenerProductoPorId(id);
            if (!buscado) {
                return res.json({ error: "Producto no encontrado" });
            }
            res.json(buscado);
        } catch (error) {
            res.status(500).send("Error");
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const productoActualizado = req.body;

            const resultado = await productRepository.actualizarProducto(id, productoActualizado);
            res.json(resultado);
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            const product = await productRepository.obtenerProductoPorId(id);

            if (!product) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }

            let respuesta = await productRepository.eliminarProducto(id);

            const user = await userRepository.obtenerUsuarioPorId(product.userId); // Obtén la información del usuario

            if (user && user.role === "premium") {
                await emailManager.enviarCorreoEliminacionProducto(user.email, user.first_name, product.name);
            }

            res.json(respuesta);
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }
}

module.exports = ProductController;
