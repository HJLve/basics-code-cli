/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	separator: '__', // 如果是小程序项目需要设置这一项，将 : 选择器替换成 __，之后 hover:bg-red-500 将改为 hover__bg-red-500  
	corePlugins: {
		// 预设样式  
		preflight: false, // 一般uniapp都有预设样式，所以不需要tailwindcss的预设  
		// 以下功能小程序不支持  
		space: false, // > 子节点选择器  
		divideWidth: false,
		divideColor: false,
		divideStyle: false,
		divideOpacity: false,
	},
	// 指定要处理的文件  
	content: [
		'./pages/**/*.{vue,js}',
		'./components/**/*.{vue,js}',
		'./main.js',
		'./App.vue',
		'./index.html'
	],
	theme: {
		extend: {
			spacing(config) {
				let result = {
					0: '0'
				}
				// 允许的数值大一些也无所谓，最后打包tailwindcss会摇树优化，未使用的样式并不会打包  
				for (let i = 1; i <= 1000; i++) {
					result[i] = `${i}rpx`
				}
				return result
			},
			// 其余更多配置见官网
			colors: {
				"baseBlue": '#E4F4FF',
			}
		},
	},
	plugins: [],
}