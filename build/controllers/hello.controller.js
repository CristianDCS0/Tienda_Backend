"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saludo = void 0;
const saludo = (_req, res) => {
    res.json({ 'mensaje': "Mas pruebas", 'fecha': new Date() });
};
exports.saludo = saludo;
