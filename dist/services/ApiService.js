"use strict";
exports.__esModule = true;
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.prototype.getInfo = function () {
        return new Promise(function (resolve, reject) {
            resolve({
                item: "后台数据",
                result: [1, "next"]
            });
        });
    };
    ApiService.prototype.getList = function () {
        return new Promise(function (resolve, reject) {
            resolve([{ id: 1, title: "koa" }, { id: 2, title: "es6" }]);
        });
    };
    return ApiService;
}());
exports["default"] = ApiService;
