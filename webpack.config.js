"use strict";

const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const yargs = require("yargs");
const startServer = require("./backend/server.js");
const appConfig = require("./app-config.json");

const flags = yargs.argv;
const env = flags.env || "prod";

const navMenu = require("./assets/static-data/nav-menu.json");
const staticData = {
    navMenu: navMenu
};

const cdnResources = {
    js: [
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-route.js",
        "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js",
        "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js",
        "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js",
        "http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js",
        "https://use.fontawesome.com/8a2e588d30.js"
    ],
    fonts: [
        "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic",
        "https://fonts.googleapis.com/css?family=Cinzel",
        "https://fonts.googleapis.com/icon?family=Material+Icons"
    ],
    css: [
        "http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css"
    ]
};

const externals = [
    "angular"
];

if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
    startServer();
}

module.exports = {
    entry: "./app/app.ts",
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.[hash].js"
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: "tslint" },
            { test: /\.scss$/, loader: "sasslint" }
        ],
        loaders: [
            { test: /\.ts$/, loader: "ts" },
            { test: /\.hbs$/, loader: "handlebars" },
            { test: /\.html$/, loader: "html" },
            { test: /\.scss$/, loader: "style!css!sass!" },
            { test: /\.css$/, loader: "style!css!" },
            { test: /\.(png|ttf|eot|svg|woff|woff2)/, loader: "file-loader" }
        ]
    },
    externals: externals,
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    devServer: {
        port: 7010,
        proxy: {"*": { target: "http://localhost:3012" } }
    },
    tslint: {
        emitErrors: true,
        formatter: "stylish",
        formattersDirectory: "./node_modules/tslint-stylish"
    },
    sasslint: {
        configFile: './sass-lint.yml'
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./assets/favicon.png",
            title: "Ravaged Minds",
            ngAppName: "App",
            template: "./app/indexTemplate.hbs",
            cdnResources: cdnResources
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConfig[env]),
            STATIC: JSON.stringify(staticData)
        })
    ]
};