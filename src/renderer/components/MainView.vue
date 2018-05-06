<template>
<el-container style="height: 100vh;">
  <el-header>Header</el-header>
  <el-main style="height: 100%;overflow: auto;">
    <vue-splitter :margin="0" ref="splitter">
      <div id="left-pane" slot="left-pane" style="text-align: center;">
        <!-- <el-radio-group v-model="isCollapse" v-on:change="onChange" style="margin-bottom: 20px;">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group> -->
        <div>
          <ul id="example-1" style="padding: 1vh;">
            <li v-for="item in tableData" style="display: inline-block;">
              <!-- <el-card style="width: 30vh; margin: 1vh; margin-bottom: -7vh;">
                 {{item.name}} 
                 <el-button type="success" icon="el-icon-check" circle v-on:click="onCardClick(item)"></el-button>
              </el-card> -->
              <el-popover
                placement="right"
                :open-delay="1000"
                :visible-arrow="false"
                trigger="hover">
                <div>
                  <el-carousel :interval="5000" arrow="never" height= "15vh">
                    <el-carousel-item v-for="item2 in item.img_srcs" :key="item2">
                      <img :src="item2" style="width: 100%; ">
                    </el-carousel-item>
                  </el-carousel>
                  <div style="color: #383838; margin-top: 0.3vh;">
                    以下の要素が含まれています
                  </div>
                  <li v-for="item2 in item.usertags" style="display: inline-block;">
                     <div class="badge badge-info" style="margin: 0.2vh;">{{item2}}</div>
                  </li>
                </div>
                <div class="card" slot="reference" :id="item.contentId">
                  <div class="imgAspect ratio16_9">
                    <img class="card-img-top" @click.self="onCardClick(item)" :src="item.banner_src" alt="Card image cap" style="width:30vh;">
                  </div>
                  <div class="card-body"　@click.self="onCardClick(item)">
                    <div class="card-text">{{item.name}}</div>
                  </div>
                    <div class="badge badge-danger absolute">RPG</div>
                </div>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
      <div slot="right-pane" style="height: 100%;">
        <information-view :currentCell="currentCell" v-on:closeMessage="closePain" ref="infoview"></information-view>
      </div>
    </vue-splitter>
  </el-main>
</el-container>
</template>

<style>
  .el-popover {
    background-color: #7a7a7a;
    border: none;
    width: 30vh;
    height: 24vh;
  }

  .badge.absolute {
    position: absolute;
    margin: 1vh;
  }

  .card-text {
    height: auto; 
    font-weight: 600;
  }

  .card-body {
    position: relative;
    height: -10%; 
    line-height: 2vh;
    padding: 0.5vh; 
  }

  .imgAspect {
    position: relative;
    width: 100%;

    overflow:hidden;
    }
    .imgAspect:before {
        content:"";
        display: block;
    }
    .imgAspect.ratio4_3:before {
        padding-top:75%;
    }
    .imgAspect.ratio16_9:before {
        padding-top:59.25%;
    }
    .imgAspect img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

  .card {
    position: relative;
    background-color: #505050; 
    width: 30vh; 
    height: 25vh; 
    margin: 1vh;
    margin-bottom: -7vh;
    border: none;
    color: #ffffff;
   }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

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
    background-color: #393939;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
    border-bottom: medium outset #383838;
    height: 5vh;
  }
  
  .el-main {
    background-color: #393939;
    color: rgb(255, 255, 255);
    line-height: 160px;
    padding: 0%;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 50, .5);
    border-radius: 10px;
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
    onChange (item) {
      console.log(this.isCollapse)
      //  let percent = this.isCollapse ? 100 : 30
      //  this.setPercent(percent)
      let self = this
      if (this.isCollapse) {
        $({count: 25}).animate({count: 100}, {duration: 50,
          progress: function () { self.setPercent(this.count) },
          complete: function () { $('.left-pane').animate({scrollTop: 0}) }
        })
      } else {
        $({count: 100}).animate({count: 25}, {duration: 50,
          progress: function () { self.setPercent(this.count) },
          complete: function () { if (item != null) $('.left-pane').animate({scrollTop: $('.left-pane').scrollTop() + $('#' + item.contentId).offset().top - $('#' + item.contentId).height() / 2}) }
        })
      }
      //  eslint-disable-next-line
    },
    setPercent (val) {
      this.$refs.splitter.percent = val
    },
    onCardClick (item) {
      console.log($('#' + item.contentId).offset().top)
      if (!this.isCollapse) {
        if (item.index === this.currentCell.index) {
          this.isCollapse = true
          this.onChange(null)
        }
        this.$refs.infoview.resetView()
        $('.left-pane').animate({scrollTop: $('.left-pane').scrollTop() + $('#' + item.contentId).offset().top - $('#' + item.contentId).height() / 2})
      } else {
        this.isCollapse = false
        this.onChange(item)
      }
      this.currentCell = item
    },
    closePain () {
      this.isCollapse = true
      this.onChange()
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
