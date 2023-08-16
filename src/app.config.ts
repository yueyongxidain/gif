export default defineAppConfig({
    pages: [
        'pages/index/index',
        "pages/logs/index",
        "pages/img_edit/index"
    ],
    workers: "workers",
    tabBar: {
        "list": [{
            "pagePath": "pages/index/index",
            "text": "制作"
        }, {
            "pagePath": "pages/logs/index",
            "text": "日志"
        }]
    },
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    }
})
