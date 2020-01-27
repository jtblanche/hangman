module.exports = {
    entry: './assets/js/hangman.js',
    output: {
        path: __dirname + "/assets/js/dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    }
}