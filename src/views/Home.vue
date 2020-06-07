<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        :default-openeds="['1']"
        unique-opened
        :default-active="$route.path"
      >
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>导航一</template
          >
          <el-menu-item-group>
            <template slot="title">列表信息</template>
            <el-menu-item index="/book/list">图书</el-menu-item>
            <el-menu-item index="/user/list">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <h3>
          图书借阅系统
        </h3>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
}
</script>

<style>
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
