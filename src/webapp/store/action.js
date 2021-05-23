 import request from "axios";
 request.defaults.baseURL="http://localhost:3001";
 export const getTopics = ({commit,state})=>{
        return request.get("api/list").then((response)=>{
                if(response.status ==200){
                        commit("TOPICSLIST",response.data.data)
                }
        })
 };
export const increment = ({commit})=>commit("INCREMENT");
export const decrement = ({commit})=>commit("DECREMENT");