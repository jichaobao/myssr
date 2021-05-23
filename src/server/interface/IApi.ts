import {IData,Ilist} from "./IData";
export interface IApi{
        getInfo() : Promise<IData>;
        getList(): Promise<Ilist>
}