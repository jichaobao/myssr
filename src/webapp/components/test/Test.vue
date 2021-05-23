<template>
        <div class="test">test component {{ num }}</div>
</template>

<script>
export default {
        data() {
                return {
                        num: 0
                }
        },
        mounted() {
                import("./test.js").then(res => {
                        this.num = res.default();
                })
        },
}
</script>