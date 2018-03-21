const url = "https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=rank&page_limit=20&page_start=0"
// 引入
const puppeteer = require('puppeteer')
// promise的定时函数
const sleep = time => new Promise(resolve => {
	setTimeout(resolve,time)
})
// 声明一个自动执行的异步函数
;(async () => {
	console.log("开始爬取: 豆瓣高分")
	const browser = await puppeteer.launch({
		arg: ['--no-sandbox'],
		dumpio: false
	})
	// 开启一个新页面爬取
	const page = await browser.newPage()
	await page.goto(url, {
		// 网络空闲时加载完毕
		waitUntil: 'networkidle2'
	})
	await sleep(3000)
	// 等待加载更多按钮出现
	// await page.waitForSelector('.more')
	// 只爬取2页数据,i控制页数
	for(let i = 0; i < 1; i++){
		await sleep(3000)
		// 自动点击加载更多
		// await page.click('.more')
	}

	const result = await page.evaluate(() => {
		// 豆瓣页面中有引入jQuery，直接拿到页面中的jQuery
		var $ = window.$
		// 拿到放置电影的元素
		var items = $('.RichContent')
		// 用来接收数据的数组
		var links = []

		if (items.length >= 1) {
			items.each((index, item) => {
				// let it = $(item)
				// let doubanId = it.find('div').data('id')
				// let title = it.find('img').attr('alt')
				// // 电影的评分
				// let rate = Number(it.find('strong').text())
				let poster = it.find('img').attr('src')
				// 然后把以上拿到的数据都放到links里面
				links.push({
					// doubanId,
					// title,
					// rate,
					poster
				})
			})
		}
		return links
	})

	browser.close()
	console.log(result)
})()