"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const serverStart = () => {
    console.log("starting server");
    app_1.default.listen(3000, () => {
        console.log("server start in port 3000");
    });
};
serverStart();
