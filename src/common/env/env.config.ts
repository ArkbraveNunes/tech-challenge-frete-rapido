import * as dotenv from 'dotenv';
dotenv.config();

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT) || 3000,
  appName: 'Frete Rapido Integration API',
  appDescription: 'Frete Rapido Integration API',
  appVersion: process.env.VERSION || 'localhost',
  apiFreteRapidoUrl: process.env.API_FRETE_RAPIDO_URL,
  apiFreteRapidoToken: process.env.API_FRETE_RAPIDO_TOKEN,
  apiFreteRapidoCNPJ: process.env.API_FRETE_RAPIDO_CNPJ,
  apiFreteRapidoCode: process.env.API_FRETE_RAPIDO_CODE,
  apiFreteRapidoCep: process.env.API_FRETE_RAPIDO_CEP,
});
