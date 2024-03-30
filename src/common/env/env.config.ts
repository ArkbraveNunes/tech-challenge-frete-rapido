import dotenv from 'dotenv';
dotenv.config();

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APPLICATION__PORT) || 3000,
  appName: 'Frete Rapido Integration API',
  appDescription: 'Frete Rapido Integration API',
  appVersion: process.env.VERSION || 'localhost',
  appBasePath: '/frete-rapido',
  database: {
    host: process.env.APPLICATION__DB_HOST,
    port: process.env.APPLICATION__DB_PORT,
    database: process.env.APPLICATION__DB_NAME,
    username: process.env.APPLICATION__DB_USER,
    password: process.env.APPLICATION__DB_PASS,
    type: process.env.APPLICATION__DB_TYPE || '',
  },
  apiFreteRapidoUrl: process.env.API_FRETE_RAPIDO__URL,
  apiFreteRapidoToken: process.env.API_FRETE_RAPIDO__TOKEN,
  apiFreteRapidoCNPJ: process.env.API_FRETE_RAPIDO__CNPJ,
  apiFreteRapidoCode: process.env.API_FRETE_RAPIDO__CODE,
  apiFreteRapidoCep: process.env.API_FRETE_RAPIDO__CEP,
});
