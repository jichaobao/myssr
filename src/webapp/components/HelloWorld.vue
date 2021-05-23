<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="increment">加1</button>
      <button @click="decrement">减1</button>
      <h3>count is {{count}}</h3>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed:{
    ...mapGetters({
      count:'getCount'
    })
  },
  methods: {
    ...mapActions(["increment","decrement"])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
