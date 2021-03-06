//PUERTO
process.env.PORT = process.env.PORT || 5023;
// Declaracion de entorno, funcion que nos dara en que ambiente estamos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conexion a la base de datios 
let urlDB;

if (process.env.NODE_ENV === 'dev') { //Son todas las funciones y procesos que tienen el amibiente del desarrollo que es local 
    //urlDB = 'mongodb://localhost:27017/calendarioacademico';
    //urlDB = 'mongodb+srv://admin:ortizdeluna10@cluster0-uw13s.mongodb.net/calendarioacademico?retryWrites=true&w=majority';
    urlDB = 'mongodb+srv://admin:toor.tic,1@calendarioacademico-e4tpz.mongodb.net/calendario?retryWrites=true&w=majority';
} else { //Ambiente de produccion nube = Heroku
    urlDB = 'mongodb+srv://admin:toor.tic,1@calendarioacademico-e4tpz.mongodb.net/calendario?retryWrites=true&w=majority';

    //urlDB = 'mongodb+srv://admin:WsLgybDun0V1DwtE@cluster0-idtoj.mongodb.net/cafeteria';
}

//Tenemos dos ambientes el de produccion y el de desarrollo 

//env = entorno  
process.env.URLDB = urlDB;

//Firma de JWt 
process.env.SEED = process.env.SEED || 'Frima-super-secreta';

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';