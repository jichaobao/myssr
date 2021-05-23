启动项目：
npm install
npm run start:dev

组件说明：
about：异步加载的组件
test: 异步加载js中的数据
新闻列表：需要请求后台api的数据

vue ssr 好处
1.取消了两套模板的机制
2.移动端兼容性很好，能纯粹的页面，能ssr

由于没有动态更新，所有的生命周期钩子函数中，
只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。
这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。

此外还需要注意的是，你应该避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，
例如在其中使用 setInterval 设置 timer。在纯客户端 (client-side only) 的代码中，我们可以设置一个 timer，
然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，
所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 beforeMount 或 mounted 生命周期中。


nust 直接可以使用