/*
 * @Autor: huasenjio
 * @Date: 2022-01-18 00:13:03
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-03-21 15:39:32
 * @Description: 编译精灵图
 */

const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith');
const FileManagerPlugin = require('filemanager-webpack-plugin')

let templateFunction = function (data) {
  var shared = '.icon-hs { background-image: url(I);background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width)
    .replace('H', data.spritesheet.height)

  var perSprite = data.sprites.map(function (sprite) {
    return '.icon-hs-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name) // 精灵的名字
      // .replace('W', 50) // 精灵的宽度
      // .replace('H', 50) // 精灵的高度
      .replace('W', sprite.width) // 精灵的宽度
      .replace('H', sprite.height) // 精灵的高度
      .replace('X', sprite.offset_x) // 精灵在精灵图中的x偏移
      .replace('Y', sprite.offset_y); // 精灵在精灵图中的y偏移
  }).join('\n');

  return shared + '\n' + perSprite;
};

module.exports = {
  entry: {},
  output: {},
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          copy: [
            { source: './public/default/spriteImg/*.png', destination: '../huasen-public-icon' },
          ],
        }
      }
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../huasen-public-icon'), // 图标的位置
        glob: '*.png' // 图标的后缀
      },
      target: {
        image: path.resolve(__dirname, './public/webapp/sprite.png'), // 输出精灵图的位置
        css: [
          [
            // 精灵样式输出的路径和格式
            path.resolve(__dirname, './public/webapp/sprite.css'),
            {
              // 标记引用自己的模板
              format: 'function_based_template'
            }],
        ]
      },
      // 精灵图和精灵使用的格式方法
      customTemplates: {
        'function_based_template': templateFunction,
      },
      // 精灵图的引用前缀
      apiOptions: {
        cssImageRef: './sprite.png'
      },
      // 精灵之间的间隔
      spritesmithOptions: {
        padding: 20
      }
    })
  ],
  resolve: {
    modules: ['node_modules', '../huasen-public-icon']
  },
  mode: "development",
}