if(!process.env.IS_PRODUCTION) {
    module.exports = {
        jwtSecret: 'FaPpXwh68mMqtvnkaqgR4iBkrdF2R4eBxe8HSJPtgQnVQ',
        jwtExpire: '24h'
    }
} else if(process.env.IS_PRODUCTION) {
    module.exports = {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpire: process.env.JWT_EXPIRE
    }
}