module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer')({browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']}),
        require('cssnano')
    ]
}

// if(process.env.NODE_ENV === 'production') doesn't get production value