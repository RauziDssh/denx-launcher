var gameconfig = {
  test: function () {
    console.log('hoge')
  },
  getGameConfig: function (folderPath) {
    // denxconf.jsonを探索
    const fs = require('fs')
    const path = require('path')
    let result = []
    const readTopDirSync = folderPath => {
      let items = fs.readdirSync(folderPath)
      items = items.map((itemName) => {
        return path.join(folderPath, itemName)
      })
      items.forEach((itemPath) => {
        if (/.*denxconf.json$/.test(itemPath)) {
          result.push(itemPath)
        }
        if (fs.statSync(itemPath).isDirectory()) {
          readTopDirSync(itemPath)
        }
      })
    }

    readTopDirSync(folderPath)
    //  json読み込み
    let resultParsed = []
    result.forEach((itemPath, index) => {
      let obj = JSON.parse(fs.readFileSync(itemPath))
      obj.index = index
      obj.contentId = 'content' + index
      obj.dir = path.dirname(itemPath)
      console.log(obj.dir)
      // バナーを取得
      obj.banner_src = obj.dir + '\\banner.png'
      obj.banner_src = obj.banner_src.replace(/^data:image\/\w+;base64,/, '')
      //  readmeを取得
      obj.markdown_raw = obj.dir + '\\README.md'
      obj.markdown_raw = fs.readFileSync(obj.markdown_raw, 'utf-8')
      console.log(obj.markdown_raw)
      //  実行ファイルへの絶対パスを取得する
      let relativePath = obj.exe_path.slice(1)
      obj.exe_path = obj.dir + relativePath
      console.log(obj.exe_path)
      //  画像を取得
      let imgSrcs = []
      let folderOfImgs = obj.dir + '\\imgs'
      let items = fs.readdirSync(folderOfImgs)
      items = items.map((itemName) => {
        return path.join(folderOfImgs, itemName)
      })
      imgSrcs = items.map((itemPath) => {
        return itemPath.replace(/^data:image\/\w+;base64,/, '')
      })
      console.log(imgSrcs)
      obj.img_srcs = imgSrcs
      resultParsed.push(obj)
    })
    return resultParsed
  }
}
module.exports = gameconfig
