const { MongoClient } = require("mongodb");

let dbConnection

// const dbConnect = async (cb) => {
//     try {
//         const client = await MongoClient.connect(process.env.MONGO_URI)
//         // console.log(client.db())
//         dbConnection = await client.db()
//         console.log('dbConnection 1', dbConnection)
//         return cb()

//     } catch (error) {
//         console.log(error)
//         return cb(err)
//     }
// }

console.log('dbConnection', dbConnection)

module.exports = {
    connectToDb: (cb) => {
        console.log(process.env.MONGO_URI)
        MongoClient.connect(process.env.MONGO_URI)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}

