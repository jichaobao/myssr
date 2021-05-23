import {createApp} from "./main.js";

//下面的函数核心目的有两个
//摘取每个当前路由index/test 传递给vue-router，vue-router找到components
//components获取异步数据，组装成一个页面
//把后台请求的数据交给context.state
export default context =>{
        return new Promise((resovle,reject)=>{
                const {app,router,store} = createApp();
                //context可以把后台真实的路由传递过来 a/b 需要把vue-router的mode="history"
                //router是前端路由，context.url是后台给你的环境
                router.push(context.url)
                router.onReady(()=>{
                        const matchComponents = router.getMatchedComponents()
                        Promise.all(matchComponents.map((Component)=>{
                                if(Component.asyncData){
                                        return Component.asyncData({store})
                                }
                        }))
                        .then(()=>{
                                context.state=store.state
                                resovle(app)
                        }).catch(reject)
                },reject)
        })
}