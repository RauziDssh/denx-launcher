<template>
  <el-container style="height: 100%;">
    <el-header style="text-align: center; z-index: 2; filter: drop-shadow(0vh 0.5vh 0.5vh rgba(0,0,0,0.6));">
        <b-row>
          <b-col md="2">
            <el-button icon="el-icon-arrow-right" type="info" circle @click="$emit('closeMessage')"></el-button>
          </b-col>
          <b-col md="8"><p>{{currentCell.name}}</p></b-col>
          <b-col md="2">
            <el-button type="success" icon="el-icon-caret-right" v-on:click="play(currentCell.exe_path)">PLAY</el-button>
          </b-col>
        </b-row>
    </el-header>
    <el-main id="infopage">
        <div style="line-height: 3vh;">
          <el-carousel :interval="4000" style="text-align: center; background-color: #303030; z-index: 1; box-shadow: inset 0vh -0.3vh 0.5vh rgba(0,0,0,0.6);">
            <el-carousel-item v-for="item in currentCell.img_srcs" :key="item">
              <img :src="item" style="position: relative; height: 100%; z-index: 0;">
            </el-carousel-item>
          </el-carousel>
          <div>
            <div v-html="compiledMarkdown" class="vscode-dark" style="line-height: 3vh; padding:2vh;">
          </div>
        </div>          
        </div>
    </el-main>
  </el-container>
</template>

<style>
  .vscode-dark a {
    color: #61AFEF;
  }

  .vscode-dark h1,
  .vscode-dark h2,
  .vscode-dark h3,
  .vscode-dark h4,
  .vscode-dark h5,
  .vscode-dark h6 {
    font-weight: 600;
    color: #E06C75;
  }

  .vscode-dark,
  .vscode-dark pre code {
    color: #ABB2BF;
  }

  .vscode-dark code {
    color: #90C378;
  }

  .vscode-dark pre:not(.hljs),
  .vscode-dark code>div {
    background-color: #2C323C;
  }

  .vscode-dark table>thead>tr>th {
    border-color: #2C323C;
  }

  .vscode-dark h1,
  .vscode-dark hr,
  .vscode-dark table>tbody>tr+tr>td {
    border-color: #2C323C;
  }

  .vscode-dark blockquote {
    color: #5C6370;
    font-style: italic;
    background: transparent;
    border-color: #2C323C;
  }
</style>


<script>
import marked from 'marked'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    resetView () {
      console.log('reset')
      $('#infopage').animate({scrollTop: 0})
    },
    play (val) {
      var child = require('child_process').execFile
      //  var executablePath = 'C:\\Users\\rauzi\\Documents\\Games\\Game1\\Debug\\DemoApp1.exe'
      //  var executablePath = 'C:\\Program Files\\Unity\\Editor\\Unity.exe'
      var executablePath = val

      child(executablePath, function (err, data) {
        if (err) {
          console.error(err)
          return
        }
        console.log(data.toString())
      })
      console.log(val)
    }
  },
  props: [
    'currentCell'
  ],
  computed: {
    compiledMarkdown () {
      return marked(this.currentCell.markdown_raw, { sanitize: true })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
