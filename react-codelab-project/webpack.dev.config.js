var webpack = require('webpack');

module.exports = {

    /*
        webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 땐,
        HotReloadingModule를 사용하기 위해선 dev-server 클라이언트와
        핫 모듈을 따로 entry에 넣어주어야 합니다.
    */

    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4000', // 개발 서버의 포트가 이 부분에 입력되어야 제대로 작동합니다.
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/', //public이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용합니다.
        filename: 'bundle.js'
    },

    // 개발서버 설정입니다.
    devServer: {
        hot: true,
        filename: 'bundle.js',
        historyApiFallback: true,
        contentBase: './public',
        /*
            모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
            bundle 파일의 경우엔 우선권을 가져서 devserver의 스크립트를 
            사용하게 됩니다.
        */
       proxy: {
           '**': 'http://localhost:3000' // express 서버 주소 
       },
       status: {
           // 콘솔 로그를 최소화합니다.
           assets: false,
           colors: true,
           version: false,
           hash: false,
           timings: false,
           chunks: false,
           chunkModules: false
       }
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            }
        ]
    }

    /*
        최근 react-hot-loader 가 업데이트 되어서, 
        그냥 설치하시면 “react-hot-loader”: “^3.0.0-beta.3” 가 설치됩니다.
        설치 하실 때, npm install –save react-hot-loader@1.3.0 을 하시거나, 
        버전 3을 쓰고 싶다면 수정을 다음과 같이 하세요:

        module:{
            loaders: [
                {
                    test: /.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react'],
                        plugins: ["react-hot-loader/babel"]
                    }
                }
            ]
        },
    */

}