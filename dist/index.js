"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./database/connection");
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.POST || 8091;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//rotas basicas
app.get('/', (request, response) => {
    response.send('Server UP');
});
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Server Running in port ${PORT}`);
});
