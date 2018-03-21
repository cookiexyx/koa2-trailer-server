const mongoose = require('mongoose')
// mongodb的本地地址:数据库的名字douban-test
const db = 'mongodb://localhost/douban-test'

mongoose.Promise = global.Promise
// 暴露出这个connect，会在index.js中调用
exports.connect = () => {
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        // 判断是否是生产环境
        if (process.env.NODE_ENV !== 'production') {
            // 打印日志
            mongoose.set('debug', true)
        }
        // 连接数据库
        mongoose.connect(db)
        // 监听:断开时重新连接
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++
            if (maxConnectTimes < 5){
                mongoose.connect(db)
            }else{
                throw new Error('数据库应该是挂了')
            }
            
        })
        mongoose.connection.on('error', err => {
            maxConnectTimes++
            if (maxConnectTimes < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库应该是挂了')
            }
        })
        mongoose.connection.once('open', () => {
            // 测试数据库连接
            const Dog = mongoose.model('Dog',{name: String})
            const doga = new Dog({ name: '阿尔法'})
            doga.save().then(() => {
                console.log('汪')
            })

            console.log('MongoDB Connected successfully!')
        })
    })


}