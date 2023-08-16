import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import 'taro-ui/dist/style/index.scss'
export default function Index() {
    useLoad(() => {
        console.log('Page loaded.')
    })
    const openImg = () => {
        wx.chooseMedia({
            mediaType: ['image'],
            sourceType: ['album'],
            success: (data) => {
                wx.navigateTo({
                    url: '/pages/img_edit/index',
                    success: (res)=>{
                        res.eventChannel.emit('acceptDataFromOpenerPage', { data: data.tempFiles })
                    }

                })
                console.log(data)
                // 跳转到编辑页面
            }
        })
    }
    return (
        <View className='index'>
            <Text className='title'>制作</Text>
            <View className='img' onClick={openImg}>
                <View className='logo'>
                </View>
                图片转gif
            </View>
            <View className='video'>
                <View className='logo'>
                </View>
                视频转gif
           </View>
            <Text>分享给好友</Text>
        </View>
    )
}
