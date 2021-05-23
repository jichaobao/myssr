const path = require("path");
const rootPath = path.join(__dirname,"..");
const vueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = {
        entry: [rootPath + "/src/webapp/entry-server.js"],
        target:"node",
        output:{
                "libraryTarget":"commonjs2"//commonjs只有exports，不包括module.export
        },
        plugins: [
               new vueSSRServerPlugin()
        ]
}