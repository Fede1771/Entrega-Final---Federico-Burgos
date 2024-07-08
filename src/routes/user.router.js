const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");
const UserRepository = require("../repositories/user.repository.js");
const upload = require("../middleware/multer.js");

const userController = new UserController();
const userRepository = new UserRepository();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin.bind(userController));
router.post("/requestPasswordReset", userController.requestPasswordReset.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));
router.put("/premium/:uid", userController.cambiarRolPremium.bind(userController));
router.put("/modify-role/:uid", userController.modifyUserRole.bind(userController));

// Ruta para subir documentos usando Multer
router.post("/:uid/documents", upload.fields([{ name: "document" }, { name: "products" }, { name: "profile" }]), async (req, res) => {
    const { uid } = req.params;
    const uploadedDocuments = req.files;

    try {
        const user = await userRepository.findById(uid);

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        if (uploadedDocuments) {
            if (uploadedDocuments.document) {
                user.documents = user.documents.concat(uploadedDocuments.document.map(doc => ({
                    name: doc.originalname,
                    reference: doc.path
                })));
            }

            if (uploadedDocuments.products) {
                user.documents = user.documents.concat(uploadedDocuments.products.map(doc => ({
                    name: doc.originalname,
                    reference: doc.path
                })));
            }

            if (uploadedDocuments.profile) {
                user.documents = user.documents.concat(uploadedDocuments.profile.map(doc => ({
                    name: doc.originalname,
                    reference: doc.path
                })));
            }
        }

        await user.save();

        res.status(200).send("Documentos cargados exitosamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

// Rutas para modificar el rol y eliminar usuario
router.put("/modify-role/:uid", userController.modifyUserRole.bind(userController));
router.delete("/delete-user/:uid", userController.deleteUser.bind(userController));

// Rutas para obtener todos los usuarios e eliminar usuarios inactivos
router.get("/", userController.getAllUsers.bind(userController));
router.delete("/delete-inactive-users", userController.deleteInactiveUsers.bind(userController));

module.exports = router;
