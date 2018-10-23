module.exports = {
    mode: 'development',
    entry: {
        BundleEditor: "./client-Editor.jsx",
        BundleGame: "./client-App.jsx"
    },
    output: {
        filename: "./public/js/[name].js"
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
    },
    externals: ["p5"]
}