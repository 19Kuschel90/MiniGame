module.exports = {
    mode: 'development',
    entry: "./client-Editor.jsx",
    output: {
        filename: "./public/js/BundleEditor.js"
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
}