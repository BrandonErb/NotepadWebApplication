 module.exports = {
     entry: './src/app.js',
     output: {
         path: '',
         filename: 'bundle.js',
     },
     module: {
         loaders: [{
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015','react'],
                plugins: ['react-html-attrs', 'transform-class-properties','transform-decorators-legacy']
             }
         }]
     }
 }
