const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://gutrot619:kaka619@nerm-tutorial-shard-00-00.bsbo5.mongodb.net:27017,nerm-tutorial-shard-00-01.bsbo5.mongodb.net:27017,nerm-tutorial-shard-00-02.bsbo5.mongodb.net:27017/NermTutorial?ssl=true&replicaSet=atlas-xn623s-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connection success')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB