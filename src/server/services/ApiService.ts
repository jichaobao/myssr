import { IApi } from "@interfaces/IApi";
import { IData,Ilist } from "@interfaces/IData";

class ApiService implements IApi {
        getInfo() {
                return new Promise<IData>((resolve, reject) => {
                        resolve({
                                item: "后台数据",
                                result: [1, "next"]
                        });
                });
        }
        getList() {
                return new Promise<Ilist>((resolve, reject) => {
                        resolve([{ id: 1, title: "koa" }, { id: 2, title: "es6" }])
                });
        }
}

export default ApiService;