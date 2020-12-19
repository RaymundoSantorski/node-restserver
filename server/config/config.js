/* Puerto */
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* Vencimiento de token */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/* Seed de autenticación */
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

/* Database */
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;