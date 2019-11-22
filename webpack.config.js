module.exports = {
    cache: true,
    entry: './src/app.js',
    output: {
        filename: './static/build/main.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['env', 'react', 'stage-2']
            }
        },
        ]
    }
};
