"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/login", (req, res) => {
    const { body } = req;
    console.log("the body data is got here", req.body);
    res.status(200).json({ message: "sucessfully logined" });
});
exports.default = app;
