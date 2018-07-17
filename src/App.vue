<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header style="background:#336699;">
        <el-menu 
          :default-active="defaultActive" 
          mode="horizontal" 
          background-color="#336699" 
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect">
          <el-menu-item index="1">充电桩</el-menu-item>
          <el-menu-item index="2">用户</el-menu-item>
        </el-menu>
      </el-header>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    defaultActive () {
      var index = sessionStorage.getItem('activeIndex')
      return index? index : 1
    }
  },
  methods: {
    handleSelect (index) {
      switch (index) {
        case '1':
          this.$router.push('/pail')
          break;
        case '2':
          this.$router.push('/user')
          break;
        default: break;
      }
      sessionStorage.setItem('activeIndex', index)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
