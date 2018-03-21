const mongoose = require('mongoose')
const Schema = mongoose.Schema // 建模工具schema
const Mixed = Schema.Types.Mixed // 可以声明任何类型

const movieSchema = new Schema({
    doubanId: String,
    rate: Number,
    title: String,
    summary: String,
    video: String,
    poster: String,
    cover: String,

    videoKey: String,
    posterKey: String,
    coverKey: String,

    rawTitle: String,
    movieType: [String],
    pubdate: Mixed,
    year: Number,
    tags: [String],
    meta:{
        createdAt:{
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
// 根据schema生成model,并且通过mongoose.model发布出去
mongoose.model('Movie', movieSchema)