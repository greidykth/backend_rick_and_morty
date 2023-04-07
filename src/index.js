var http = require("http");
const PORT = 3001;
const getCharById = require("./controllers/getCharById");

http.createServer((req, res) => {
    console.log(`Server raised in port ${PORT}`);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const {url} = req;

  if(url.includes('/rickandmorty/character')){
    let id = url.split('/').pop();
    getCharById(res, id);
  }

  return res.writeHead(404, {"Content-Type": "text/plain"}).end("Not found");

}).listen(PORT, "localhost");

