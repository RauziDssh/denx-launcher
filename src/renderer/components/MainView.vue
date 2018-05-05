<template>
<el-container style="height: 100vh;">
  <el-header>Header</el-header>
  <el-main style="height: 100%;overflow: auto;">
    <vue-splitter :margin="0" ref="splitter">
      <div slot="left-pane" style="text-align: center;">
        <el-radio-group v-model="isCollapse" v-on:change="onChange" style="margin-bottom: 20px;">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <div>
          <ul id="example-1">
            <li v-for="item in tableData" style="display: inline-block;">
              <el-card style="width: 30vh; margin: 1vh;">
                 {{item.name}} 
                 <el-button type="success" icon="el-icon-check" circle v-on:click="onCardClick(item)"></el-button>
              </el-card>
            </li>
          </ul>
        </div>
      </div>
      <div slot="right-pane">
        <information-view :currentCell="currentCell"></information-view>
      </div>
    </vue-splitter>
  </el-main>
</el-container>
</template>

<style>
  .body {
    height: 100vh;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    float: right;
    width: 65%;
    height: 70vh;
    min-width: 100px;
    visibility: visible;
  }

  .el-menu--collapse {
    float: right;
    visibility: hidden;
    overflow: hidden;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 160px;
  }
</style>

<script>
import VueSplitter from '@rmp135/vue-splitter'
import informationView from './MainView/informationView'

let defaultPath = 'C:\\Users\\rauzi\\Documents\\Games'

export default {
  data () {
    return {
      isCollapse: true,
      tableData: null,
      currentCell: {
        img_srcs: null
      }
    }
  },
  methods: {
    onChange () {
      console.log(this.isCollapse)
      //  let percent = this.isCollapse ? 100 : 30
      //  this.setPercent(percent)
      let self = this
      if (this.isCollapse) {
        $({count: 30}).animate({count: 100}, {duration: 50, progress: function () { self.setPercent(this.count) }})
      } else {
        $({count: 100}).animate({count: 30}, {duration: 50, progress: function () { self.setPercent(this.count) }})
      }
      //  eslint-disable-next-line
    },
    setPercent (val) {
      this.$refs.splitter.percent = val
    },
    onCardClick (item) {
      this.currentCell = item
      console.log(this.currentCell.name)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$refs.splitter.percent = 100
      let gameconfig = require('../assets/gameconfig')
      gameconfig.test()
      let result = gameconfig.getGameConfig(defaultPath)
      this.tableData = result
      this.currentCell = this.tableData[0]
    })
  },
  components: {
    'vue-splitter': VueSplitter,
    'information-view': informationView
  }
}
</script>
