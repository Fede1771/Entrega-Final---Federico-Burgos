const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js');
const userController = new UserController();

// Rutas
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/profile', (req, res) => userController.profile(req, res));
router.post('/logout', (req, res) => userController.logout(req, res));
router.get('/admin', (req, res) => userController.admin(req, res));
router.post('/request-password-reset', (req, res) => userController.requestPasswordReset(req, res));
router.post('/reset-password', (req, res) => userController.resetPassword(req, res));
router.post('/cambiar-rol/:uid', (req, res) => userController.cambiarRolPremium(req, res));
router.get('/all-users', (req, res) => userController.getAllUsers(req, res));
router.delete('/delete-inactive-users', (req, res) => userController.deleteInactiveUsers(req, res));

module.exports = router;
