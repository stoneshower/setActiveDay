var webpack = require('webpack'),
	BannerWebpackPlugin = require('banner-webpack-plugin'),
	packageJSON = require('./package.json'),
	banner = '/*\n';

function generateBanner(){
	var date = new Date(),
		banner = '/*\n';
	
		banner += packageJSON.name + '-' + packageJSON.version + '.js' + '\n';
		banner += 'Copyright (c) ' + date.getFullYear() + ' Rakuten.Inc\n';
		banner += 'Date: ' + getFullDate(date) + '\n';
		banner += '*/\n';

		return banner;
}

function pad2z(str){
	str = '' + str;
	while(str.length < 2){
		str = '0' + str;
	}
	return str;
}

function getFullDate(date){
	var year = date.getFullYear(),
		month = pad2z(date.getMonth() + 1),
		day = pad2z(date.getDate()),
		hour = pad2z(date.getHours()),
		min = pad2z(date.getMinutes()),
		sec = pad2z(date.getSeconds());
	return year + '-' + month + '-' + day + '-' + hour + '-' + min + ':' + sec;
}

module.exports = {
	entry: {
		'r-setActiveDay': './lib/r-setActiveDay.js' 
	},
	output: {
		path: './dist',
		filename: '[name]-' + packageJSON.version + 'min.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false		  
			}
		}),
		new BannerWebpackPlugin({
			chunks: {
				'r-setActiveDay': {
					'beforeContent': generateBanner()
				}
			}
		})
	],
	module: {
	
	},
	resolve: {
		extensions: ['', '.js']
	}
};
