<template>
  <div id="Common_list">
    <avue-crud v-if="this.isColumn"
               :data="data"
               :option="option"
               v-model="obj"
               @row-save="save"
               @row-del="remove"
               @row-update="update"></avue-crud>
  </div>
</template>

<script>
export default {
  name: 'Common_list',
  props: ['path'],
  data () {
    return {
      isColumn: false,
      obj: {},
      data: [],
      option: {
        title: '11111111',
        page: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          { label: '读者类型名', prop: 'ReaderTypeName' },
          {
            label: '可借阅册数',
            prop: 'BorrowNumbers',
            type: 'number',
          },
          {            label: '借期天数', prop: 'BorrowDays',
            type: 'number',          },
          {            label: '可续借天数', prop: 'RenewDays',
            type: 'number',          }
        ],
      },
    }
  },
  methods: {
    async getinfo () {
      const res = await this.$axios.get(`/${this.path}/GetAllAsync`)
      this.data = res.data
    },
    async save (row, done, loading) {
      await this.$axios.post(`/${this.path}/Add`, row)
      this.$message({
        message: '创建成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },

    async update (row, index, done, loading) {
      const data = JSON.parse(JSON.stringify(row))
      delete data.$index
      const res = await this.$axios.post(`/${this.path}/Update`, data)
      this.$message({
        message: '修改成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },
    async remove (row, index) {
      try {
        await this.$confirm('是否确认删除?')
      } catch (e) {
        return
      }
      let arr = this.get_id(row)
      let _id = arr[1]
      await this.$axios.delete(`/${this.path}/Delete?id=${_id}`)
      this.$message({
        message: '删除成功',
        type: 'success',
      })
      this.getinfo()
    },
    get_id (data) {
      for (var key in data) return [key, data[key]]
    },
    // 获取字段
    async get_column () {
      const res = await this.$axios.get(`/${this.path}/Info`)
      const column = JSON.parse(res.data.response)
      this.$set(this.option, 'column', column)
      this.isColumn = true
    },
  },
  created () {
    console.log(this.path)
    this.getinfo()
    this.get_column()
  },
}
</script>
<style></style>
