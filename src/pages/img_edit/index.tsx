import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import 'taro-ui/dist/style/index.scss'
import { useEffect, useState } from 'react'
import * as GIF from '../../pkg/gif/gif'
import { Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useReady } from '@tarojs/taro'

let gifInstance
export default function ImgIndex() {
    const [files, setFiles] = useState<Array<{
        fileType: string
        size: number
        tempFilePath: string
    }>>([])
    useReady(() => {
        const pages = getCurrentPages();
        const current = pages[pages.length - 1];
        const eventChannel = current.getOpenerEventChannel();
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', function ({ data }) {
            setFiles(data)
            init(data)
        })
    })
    const init = (files) => {
        const buf = new Uint16Array(new ArrayBuffer(1024 * 1024));
        if (!gifInstance) {
            gifInstance = new (GIF as any).GifWriter(buf, 256, 256, {
                palette: [0x000000, 0xff0000],
                background: 1
            });
        }
        var indices: any = [];
        for (var i = 0; i < 256; ++i) indices.push(i);

        for (var j = 0; j < 256; ++j) {
            var palette: any = [];
            for (var i = 0; i < 256; ++i) {
                palette.push(j << 16 | i << 8 | i);
            }
            gifInstance.addFrame(0, j, 256, 1, indices, { palette: palette, disposal: 1 });
        }
        // files.forEach(() => {
        // let data: any = buf.slice(0, gifInstance.end())
        // data = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength)
        const data = new Uint8ClampedArray([255, 0, 0, 1])
        Taro.canvasPutImageData({
            canvasId: 'myCanvas',
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            data: data,
            success: function (res) { console.log(res) }
        })
        // Taro.createSelectorQuery().select('#myCanvas').fields({ node: true }).exec((res) => {
        //     const canvas = res[0].node
        //     const ctx = canvas.getContext('2d')
        //     const dpr = wx.getSystemInfoSync().pixelRatio
        //     canvas.width = res[0].width * dpr
        //     canvas.height = res[0].height * dpr
        //     ctx.scale(dpr, dpr)
    
        //     ctx.fillRect(0, 0, 100, 100)

           

        // })

    }

    return (
        <View className='img_edit'>
            <View >
                <Canvas  style='width: 300px; height: 256px;' canvasId="myCanvas" />
            </View>
            <View className='actions'>
                我是操作部分
            </View>
        </View>
    )
}
