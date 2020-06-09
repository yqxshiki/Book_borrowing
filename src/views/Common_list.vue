<template>
  <div id="Common_list">
    <avue-crud
      v-if="this.option.column !== ''"
      :data="data"
      :option="option"
      v-model="obj"
      @row-save="save"
      @row-del="remove"
      @row-update="update"
    ></avue-crud>
  </div>
</template>

<script>
export default {
  name: 'Common_list',
  props: ['path'],
  data() {
    return {
      obj: {},
      data: [],
      option: {
        title: '11111111',
        page: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          { label: '姓名', prop: 'SName' },
          { label: '性别', prop: 'Sex' },
          {
            label: '生日',
            prop: 'Birthday',
            type: 'data',
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
          },
          { label: '学历', prop: 'Education' },
        ],
      },
    }
  },
  methods: {
    async getinfo() {
      const res = await this.$axios.get(`/${this.path}/GetAllAsync`)
      this.data = res.data
    },
    async save(row, done, loading) {
      await this.$axios.post(`/${this.path}/Add`, row)
      this.$message({
        message: '创建成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },

    async update(row, index, done, loading) {
      await this.$axios.post(`/${this.path}/Update`, row)
      this.$message({
        message: '修改成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },
    async remove(row, index) {
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
    get_id(data) {
      for (var key in data) return [key, data[key]]
    },
    async get_column() {
      const res = await this.$axios.get(`/${this.path}/Info`)
      var value_name = res.data.response.replace(/'/g, '"')
      var column = JSON.parse(value_name)
      this.$set(this.option, 'column', column)
    },
  },
  created() {
    this.getinfo()
    this.get_column()
  },
}
</script>
<style></style>
