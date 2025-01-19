const http = require('http');
const url = require('url');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    let result = '';

    if (pathname === '/contacts' && req.method === 'GET') {
        const id = query.id;

        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db(process.env.DB_NAME);
        const collection = database.collection(process.env.COLLECTION_NAME);
            
        if(id) {
            const contact = await collection.findOne(  { _id: new ObjectId(id) } );
            result = JSON.stringify(contact);
        }
        else{
            const contacts = await collection.find().toArray();
            result = JSON.stringify(contacts);
        }        

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(result);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
});


// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);

  

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
