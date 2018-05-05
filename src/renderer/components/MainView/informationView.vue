<template>
  <el-container>
    <el-header>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-button icon="el-icon-arrow-right" type="info" circle @click="$emit('closeMessage')"></el-button>
          </el-col>
          <el-col :span="10"><p>{{currentCell.name}}</p></el-col>
        </el-row>
    </el-header>
    <el-main>
        <div>
          <el-carousel :interval="4000" style="text-align: center; margin: 1vh; background-color: #303030;">
            <el-carousel-item v-for="item in currentCell.img_srcs" :key="item">
              <img :src="item" style="height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-html="compiledMarkdown" class="vscode-dark" style="line-height: 3vh; padding:2vh">
          
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
  props: [
    'currentCell'
  ],
  computed: {
    compiledMarkdown () {
      return marked(this.currentCell.markdown_raw, { sanitize: true })
    }
  }
}
</script>
