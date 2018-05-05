<template>
  <div>
    <el-carousel :interval="4000" style="text-align: center;">
      <el-carousel-item v-for="item in currentCell.img_srcs" :key="item">
        <img :src="item" style="height: 100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: [
    'currentCell'
  ]
}
</script>
