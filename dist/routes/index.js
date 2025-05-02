"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const routes = (0, express_1.Router)();
routes.post("/api/products", product_controller_1.default.create);
routes.get("/api/products", (req, res) => { product_controller_1.default.findAll(req, res); });
routes.get("/api/products/:id", product_controller_1.default.findOne);
routes.put("/api/products/:id", (req, res) => { product_controller_1.default.update(req, res); });
routes.delete("/api/products/:id", product_controller_1.default.delete);
routes.get(/.*/, (_, response) => {
    response.status(404).send({
        error: "Not Found",
    });
});
exports.default = routes;
