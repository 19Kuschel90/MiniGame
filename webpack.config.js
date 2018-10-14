module.exports = {
    mode: 'development',
    entry: "./client-App.jsx",
    output: {
        filename: "./public/js/Bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']

        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};