<template>
  <el-container>
    <el-aside width="240px"
              style="background-color: rgb(238, 241, 246)">
      <!-- :default-openeds="['1']" -->

      <el-menu router
               unique-opened
               :default-active="$route.path"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#f40">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>功能列表1</template>
          <el-menu-item-group>
            <el-menu-item index="/Staff/list">Staff</el-menu-item>
            <el-menu-item index="/ReaderType/list">ReaderType</el-menu-item>
            <el-menu-item index="/about">about</el-menu-item>
            <el-menu-item index="/BookDamaged/list">BookDamaged</el-menu-item>
            <el-menu-item index="/BookDamagedDetailsDetails/list">BookDamagedDetailsDetails</el-menu-item>
            <el-menu-item index="/BookModel/list">BookModel</el-menu-item>
            <el-menu-item index="/BookStorage/list">BookStorage</el-menu-item>
            <el-menu-item index="/PublishingHouse/list">PublishingHouse</el-menu-item>
            <el-menu-item index="/Reader/list">Reader</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>功能列表2</template>
          <el-menu-item-group>
            <el-menu-item index="/Role/list">Role</el-menu-item>
            <el-menu-item index="/RoleModulePermissionPermission/list">RoleModulePermissionPermission</el-menu-item>
            <el-menu-item index="/sysUserInfo/list">sysUserInfo</el-menu-item>
            <el-menu-item index="/UserRole/list">UserRole</el-menu-item>
            <el-menu-item index="/BookStorageDetails/list">BookStorageDetails</el-menu-item>
            <el-menu-item index="/BookType/list">BookType</el-menu-item>
            <el-menu-item index="/Borrow/list">Borrow</el-menu-item>
            <el-menu-item index="/FineBill/list">FineBill</el-menu-item>
            <el-menu-item index="/Library/list">Library</el-menu-item>
            <el-menu-item index="/Module/list">Module</el-menu-item>
            <el-menu-item index="/ModuleModulePermission/list">ModuleModulePermission</el-menu-item>
            <el-menu-item index="/Permisson/list">Permisson</el-menu-item>
          </el-menu-item-group>
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
        <el-tabs :value="getTabNameByRoute($route)"
                 type="border-card"
                 addable
                 closable
                 editable
                 @tab-click="handleClick"
                 @tab-remove="removeTab">
          <el-tab-pane :key="`${index}`"
                       v-for="(item,index) in tabList"
                       :label="item.path | path_filter"
                       :name="getTabNameByRoute(item)">
            <keep-alive>
              <router-view :key="$route.path"></router-view>
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>  
import { mapState, mapActions, mapMutations } from 'vuex'
import { getRouteById, getTabNameByRoute } from '../lib/utils'
export default {
  name: "home",
  data () {
    return {
      // 当前打开tab页
      editableTabsValue: this.$route.name,
      tabIndex: 2,
      getTabNameByRoute
    }
  },
  filters: {
    path_filter (value) {
      return value.split('/')[1]
    }
  },
  computed: {
    ...mapState({
      tabList: state => state.tabNav.tabList
    }),
  },
  methods: {
    ...mapMutations([
      'remove_tabNav'
    ]),
    ...mapActions(['handleRemove']),
    handleClick (id) {
      let route = getRouteById(id.name)
      this.$router.push(route)
    },
    removeTab (id) {
      this.handleRemove({ id, $route: this.$route })
        .then(nextRoute => {
          this.$router.push(nextRoute)
        })
    }
  },
}
</script>

<style>
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100vh;
}
.el-menu {
  height: 100%;
  overflow-x: hidden;
}
.el-menu li {
  margin-right: -20px;
}
</style>
