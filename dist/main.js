"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _mongodb = require("mongodb");
const _dotenv = require("dotenv");
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
(0, _dotenv.config)();
app.use(_bodyparser.default.urlencoded({
    extended: true
}));
app.use(_bodyparser.default.json());
app.get("/getSample", async (req, res)=>{
    const name = req.query.name;
    const client = new _mongodb.MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("Samples");
    const result = await collection.findOne({
        name
    });
    res.status(200).send(result);
});
app.post("/createSample", async (req, res)=>{
    const body = req.body;
    console.log(body.name);
    const client = new _mongodb.MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("Samples");
    const result = await collection.insertOne({
        name: body.name,
        age: body.age
    });
    res.status(200).send(result.insertedId);
});
app.listen(5001, ()=>{
    console.log('Server is running on port 5007');
});
