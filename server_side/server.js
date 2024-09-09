
const http = require("http");
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");
const { MongoClient } = require("mongodb");
const { log } = require("console");
// connect mongodb
const client = new MongoClient("mongodb://127.0.0.1:27017/");
const app = http.createServer(async(req, res) => {
  // create databse
  const db = client.db("project");
  // create collection
  const collection = db.collection("teachers");
  const path = url.parse(req.url);
  console.log(req.method);

  console.log(path);
  if (path.pathname == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("../client_side/index.html"));
  } else if (path.pathname == "/js/custom.js") {
    res.writeHead(200, { "Content-Type": "text/js" });
    res.end(fs.readFileSync("../client_side/js/custom.js"));
  } else if (path.pathname == "/add") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("../client_side/pages/form.html"));
  }
  else if (path.pathname == "/css/index.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(fs.readFileSync("../client_side/css/index.css"));
  }
  else if (path.pathname == "/css/form.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(fs.readFileSync("../client_side/css/form.css"));
  }
  if (req.method == "POST" && path.pathname == "/submit") {
    let body = "";
    req.on("data", (chunks) => {
      console.log(chunks);
      body += chunks.toString();
      console.log(body);
    });
    req.on("end", async () => {
      if (body != null) {
        // convert to object
        const formData = queryString.parse(body);
        console.log(formData);
        // insert data
        collection
          .insertOne(formData)
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("../client_side/index.html"));
  }
  //read data from database and display into front-end
  if(path.pathname=="/getTeachers" && req.method=="GET"){
    const  data=await collection.find().toArray();
    const jsonData=JSON.stringify(data);
    console.log(jsonData);
    res.writeHead(200,{"Content-Type":"text/json"});
    res.end(jsonData);
    
  }
});

app.listen(3001);