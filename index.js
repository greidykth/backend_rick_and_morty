require('dotenv').config(); //para usar las variables de entorno
const server = require('./src/server');
const { conn } = require('./src/DB_connection');

const PORT = process.env.PORT || 3001;

conn.sync({force:true}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch((err) => console.log(err.message));