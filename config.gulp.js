module.exports = {
    browserSyncConfig: {
        server: {
            baseDir: "./dist"
        },
        tunnel: true,
        host: 'localhost',
        port: 9300,
        logPrefix: "Frontend_Build"
    },

    build: {
        fonts: './dist/assets/font/',
        js: './dist/assets/js/',
        css: './dist/assets/css/',
        html: './dist/'
    },

    src: {
        fonts: ['node_modules/materialize-css/font/**/*.*', 'bower_components/font-awesome/fonts/**/*.*'],
        js: 'src/js/main.jsx',
        style: 'src/styles/**/*.scss',
        html: 'src/*.jade'
    },

    watch: {
        js: 'src/js/**/*.jsx',
        style: 'src/styles/**/*.scss',
        html: 'src/*.jade'
    },

    clean: './dist/'
};