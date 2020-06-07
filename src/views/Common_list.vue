<template>
  <div id="Common_list">
    <avue-crud
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
          { label: 'id', prop: 'Sid' },
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
        // column: [
        //   {
        //     label: '图书编号',
        //     prop: 'number',
        //   },
        //   {
        //     label: '出版社编号',
        //     prop: 'number',
        //   },
        //   {
        //     label: '图书类型编号',
        //     prop: 'name',
        //   },
        //   {
        //     label: '作者',
        //     prop: 'author',
        //   },
        //   {
        //     label: '书名',
        //     prop: 'name',
        //   },
        //   {
        //     label: '作者',
        //     prop: 'author',
        //   },
        //   {
        //     label: '价格',
        //     prop: 'number',
        //   },
        //   {
        //     label: '页码',
        //     prop: 'name',
        //   },
        //   {
        //     label: '库存总量',
        //     prop: 'author',
        //   },
        //   {
        //     label: '现存量',
        //     prop: 'number',
        //   },
        //   {
        //     label: '入库时间',
        //     prop: 'name',
        //   },
        //   {
        //     label: '借出次数',
        //     prop: 'author',
        //   },
        // ],
      },
    }
  },
  methods: {
    async getinfo() {
      const res = await this.$axios.get('/Staff/GetAllAsync')
      this.data = res.data
    },
    async save(row, done, loading) {
      await this.$axios.post('/Staff/Add', row)
      this.$message({
        message: '创建成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },

    async update(row, index, done, loading) {
      await this.$axios.post('/Staff/Update', row)
      this.$message({
        message: '修改成功',
        type: 'success',
      })
      this.getinfo()
      done()
      loading()
    },
    async remove(row, index) {
      await this.$axios.delete('/Staff/DeleteStaff', row._id)
      this.$message({
        message: '删除成功',
        type: 'success',
      })
      this.getinfo()
    },
  },
  created() {
    this.getinfo()
  },
}
</script>
<style></style>
