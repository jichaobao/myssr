<template>
        <div>
                <div v-for="topic in topics" :key="topic.id">
                        <p>{{topic.title}}</p>
                </div>
        </div>
</template>
<script>
import {mapGetters} from "vuex"
//后台渲染只有mounted和beforeMounted会被执行
const fetchInitialData = ({store}) => {
        return store.dispatch("getTopics");
}
export default {
        asyncData:fetchInitialData, //留个标记  异步请求，给entry-server  告知ssr先去占位
        name:"Topic",
        computed:{
                ...mapGetters({
                        topics:"getTopics"
                })
        },
        mounted() {
                fetchInitialData({store:this.$store})
        },
}
</script>