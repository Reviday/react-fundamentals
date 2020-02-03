var webpack = require('webpack');

module.exports = { // 이 객체를 모듈로 내보냄
    entry: './src/index.js', // 재귀적으로 모든 파일들을 require함.

    output: { // 그렇게 합친 파일들을 public 아래  bundle.js라는 파일로 저장한다는 의미
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: { // 개발 서버의 설정
        hot: true, // 파일이 수정될 떄마다 리로딩 
        inline: true, // hot 리로딩에 필요한 devServer의 클라이언트를 bundle.js에 포함
        host: '0.0.0.0', // server를 listen할 주소
        port: 4000, // 개발서버 port
        contentBase: __dirname + '/public/',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}