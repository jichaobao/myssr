import { GET, route } from "awilix-koa";
import { Context } from "@interfaces/IKoa";
import { createBundleRenderer } from 'vue-server-renderer';
const fs = require("fs");
const path = require("path");
const LRU = require('lru-cache');
const resolve = (dir: string): string => {
        return path.resolve(__dirname, "../", dir);
}
@route("/")
@route("/topics")
@route("/about")
@route("/test")
class IndexController {
        metaDiction: { [path: string]: { title: string; meta: string; }; };
        constructor() {
                this.metaDiction = {
                        "/": {
                                title: "ssr首页",
                                meta: "<meta name='keywords' content='ssr'>"
                        }
                }
        }
        createRender(serverbundle: string | object, template: string, clientManifest: object) {
                return createBundleRenderer(serverbundle, {
                        cache: new LRU({
                                max: 10000
                        }),
                        runInNewContext: false,
                        template,
                        clientManifest
                });
        }

        @GET()
        async getIndex(ctx:Context, next:()=>Promise<unknown>) {
                const clientManifest = require(resolve("assets/vue-ssr-client-manifest.json"));
                const serverbundle = require(resolve("assets/vue-ssr-server-bundle.json"));
                const template = fs.readFileSync(resolve("assets/index.html"), 'utf-8');
                const context = { url: ctx.url };
                // const $ = cheerio.load(template);
                // $.title(this.metaDiction[context.url].title);
                const ssrrender = this.createRender(serverbundle, template, clientManifest);

                function createSSRStream() {
                        return new Promise<void>((resolve, reject) => {
                                if (!ssrrender) {
                                        ctx.body = "等待编译，请过户刷新页面";
                                        resolve();
                                }

                                const ssrStream = ssrrender.renderToStream(context);
                                ctx.status = 200;
                                ctx.type = 'html';
                                ssrStream.on("err", err => {
                                        console.log("ssr错误", err)
                                        reject(err)
                                }).pipe(ctx.res);
                        })
                }
                await createSSRStream();
        }
}

export default IndexController;