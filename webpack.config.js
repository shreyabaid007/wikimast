
var path=require('path');

module.exports={
	entry:'./index.js',
	output:{
		path:path.resolve(__dirname, ''),
		filename:'transpiled.js'
	},
	module:{
		loaders:[
			{
			test: /\.js$/,
			loader:'babel-loader',
			exclude:/node_module/,
			query:{
				presets:['es2015','react']
			}
			
			}
		]
	}
}
