import { defineConfig } from "vite";

export default defineConfig({
    base: './',
    root: './src',
    build: {
        outDir: '../dist',
        rollupOptions: { //ファイル出力設定
            output: {
              assetFileNames: (assetInfo) => {
                let extType = assetInfo.name.split('.')[1];
                //Webフォントファイルの振り分け
                if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
                  extType = 'fonts';
                }
                if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                  extType = 'images';
                }
                //ビルド時のCSS名を明記してコントロールする
                if(extType === 'css') {
                  return `css/style.css`;
                }
                return `${extType}/[name][extname]`;
              },
              chunkFileNames: 'js/[name].js',
              entryFileNames: 'js/[name].js',
            },
          },
    },
})
