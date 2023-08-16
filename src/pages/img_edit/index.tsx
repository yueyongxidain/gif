import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import 'taro-ui/dist/style/index.scss'
import { useState } from 'react'
import * as GIF from '../../pkg/gif/gif'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

let gifInstance
export default function ImgIndex() {
    const [files, setFiles] = useState<Array<{
        fileType: string
        size: number
        tempFilePath: string
    }>>([])
    useLoad(() => {
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
        const buf = new ArrayBuffer(1024 * 1024);
        if (!gifInstance) {
            gifInstance = new (GIF as any).GifWriter(buf, 2, 2, { palette: [0xff0000, 0x0000ff] });
        }
        console.log(files)
        console.log(gifInstance)
        files.forEach((file) => {
            const img = document.createElement('img')
            img.src = file.tempFilePath
            gifInstance.addFrame(0, 0, 2, 2,
                [0, 1, 1, 0],
                { palette: [0xff0000, 0x0000ff] });
           
            Taro.canvasPutImageData({
                canvasId: 'myCanvas',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                data: gifInstance,
                success: function (res) {
                    console.log(111, res)
                }
            })
        })
        // gifInstance.render();
    }

    return (
        <View className='img_edit'>
            <View className='canvas'>
                <Canvas canvasId="myCanvas" width="100vw" height="420px" />
            </View>
            <View className='actions'>
                我是操作部分
            </View>
        </View>
    )
}
