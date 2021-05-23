import Koa from "koa";
import staticKoa from "koa-static";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
const {join} = require("path");
import { addAliases } from "module-alias";
addAliases({
        '@root': __dirname,
        '@interfaces': __dirname + "/interface"
});

const app = new Koa();

//创建一个容器，负责装载所有的服务
const container = createContainer();
container.loadModules([`${__dirname}/services/*.js`], {
        formatName: "camelCase",
        resolverOptions: {
                lifetime: Lifetime.SCOPED//每次访问都是new一遍
        }
})
app.use(scopePerRequest(container));
app.use(loadControllers(`${__dirname}/routers/*.js`));
app.use(staticKoa(join(__dirname,"/assets")));
app.listen(3001, () => {
        console.log("ioc项目启动了");
});