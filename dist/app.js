"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var koa_1 = __importDefault(require("koa"));
var koa_static_1 = __importDefault(require("koa-static"));
var awilix_1 = require("awilix");
var awilix_koa_1 = require("awilix-koa");
var join = require("path").join;
var module_alias_1 = require("module-alias");
module_alias_1.addAliases({
    '@root': __dirname,
    '@interfaces': __dirname + "/interface"
});
var app = new koa_1["default"]();
//创建一个容器，负责装载所有的服务
var container = awilix_1.createContainer();
container.loadModules([__dirname + "/services/*.js"], {
    formatName: "camelCase",
    resolverOptions: {
        lifetime: awilix_1.Lifetime.SCOPED //每次访问都是new一遍
    }
});
app.use(awilix_koa_1.scopePerRequest(container));
app.use(awilix_koa_1.loadControllers(__dirname + "/routers/*.js"));
app.use(koa_static_1["default"](join(__dirname, "/assets")));
app.listen(3001, function () {
    console.log("ioc项目启动了");
});
