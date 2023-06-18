const { MongoClient } = require("mongodb");
const BSON = require('bson');

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
          const queryUser = { 'emailAddress': req.query.email } 
          const data = await lists.findOne(queryUser);
          if(data.emailAddress == req.query.email && data.password == req.query.password ){
            const friendsList = [];
            const cusror = await lists.find({"_id" : { "$in" : data.friendsList } });
            for await (const doc of cusror) {
               friendsList.push(doc);
            }

            res.status(200).send(JSON.stringify({
                verified: true,
                email: data.emailAddress,
                name: data.name,
                role: data.role,
                friendsList: friendsList,
                password: data.password,
            }))
          }
        } catch(err) {
            console.log(err);
        } finally {
            await client.close();
        }
};

exports.createProfil = async (req, res, next) => {
    const client = await dbConnect();

    try {
        const database = client.db('pangolin');
        const lists = database.collection('profils');
        const newProfil = {
            name: req.body.params.name,
            emailAddress: req.body.params.emailAddress,
            role: req.body.params.role,
            password: req.body.params.password,
            friendsList: [],
        };
        await lists.insertOne(newProfil);

          res.status(200).send({ message: 'your profil has been recorded' })
        } catch(err) {
          console.log(err);
      } finally {
          await client.close();
      }

}

exports.deleteFriend = async (req, res, next) => {
    const client = await dbConnect();
    try {
        const database = client.db('pangolin');
        const lists = database.collection('profils');

        const queryUser = { 'name': req.query.user };
        console.log(queryUser)
        const update = {  $pull: { 'friendsList': new BSON.ObjectId(req.query.friend_Id)}};
        const data = await lists.updateOne(queryUser, update);
        console.log(data)
        // const dataUp = await lists.findOne(queryUser);
        // const friendsList = [];
        // const cusror = await lists.find({"_id" : { "$in" : dataUp.friendsList } });
        // for await (const doc of cusror) {
        //    friendsList.push(doc);
        // };
        res.status(200).send(JSON.stringify({
            message: 'your friend has been deleted'
        }));
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
};

exports.getAllPangolin = async(req, res, next) => {
    const client = await dbConnect();
    try {
        const listAll = [];
        const database = client.db('pangolin');
        const lists = database.collection('profils');
        const cusror = await lists.find();
        for await (const doc of cusror) {
            listAll.push(doc);
         }
        
        res.status(200).send(JSON.stringify({
            allPangolin: listAll,
        }));
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

exports.addFriend = async (req, res, next) => {
    const client = await dbConnect();
    try {
        const database = client.db('pangolin');
        const lists = database.collection('profils');
        const queryUser = { 'name': req.body.params.user };
        const update = {  $push: { 'friendsList': new BSON.ObjectId(req.body.params.friend_Id)}};
        const data = await lists.updateOne(queryUser, update);
        
        res.status(200).send(JSON.stringify({
            message: 'your friend has been added to your list',
            friendAdded: data
        }));
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }

}


