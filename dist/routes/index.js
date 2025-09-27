"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Define tus rutas aquí
router.get('/', (req, res) => {
    res.json({ message: 'Eco-backend API funcionando' });
});
// Ruta para obtener usuarios desde la base de datos
router.get('/users', userController_1.getUsers);
exports.default = router;
