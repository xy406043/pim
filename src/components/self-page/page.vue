<template>
  <div>
    <Page
    :total="totalCount"
    size="small"
    show-elevator
    show-sizer
    class="page"
    :current="current"
    @on-change="changePage"
    @on-page-size-change="changePageSize"
    :page-size="pageSize"
    :page-size-opts="[3,5,10,20,30,40,50,100]"
    show-total/>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize:{
        type: Number,
        default:5
    }
  },
  data () {
    return {
      current: 1
    }
  },
  watch: {
    currentPage () {
      this.current = this.currentPage
    }
  },
  methods: {
    changePage (page) {
      this.$emit('update:currentPage', page)
      this.$emit('pageChanged')
    },
    changePageSize (size) {
      this.$emit('update:currentPage', 1)
      this.$emit('update:pageSize', size)
      this.$emit('pageChanged')
    }
  }
}
</script>

<style scoped>
.page {
  margin-top: 10px;
  text-align: right;
}
</style>
