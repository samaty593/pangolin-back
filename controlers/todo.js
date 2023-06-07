const { MongoClient } = require("mongodb");

async function dbConnect() {
    const uri = "mongodb+srv://abdelboussaboun:uyZQLIVDBqq3cN4i@cluster0.qgdicmo.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri)
    return client;
}

exports.getMyProfilInfo = async (req, res, next) => {
        const client = await dbConnect();
        
        try {
          const database = client.db('pangolin');
          const lists = database.collection('profils');
          const query = { 'emailAddress': req.query.email } 
          const data = await lists.findOne(query);
          
          if(data.emailAddress == req.query.email && data.password == req.query.password ){
            res.status(200).send(JSON.stringify({
                verified: true,
                name: data.name
            }))
          }
        } catch(err) {
            console.log(err);
        } finally {
            await client.close();
        }
};


