import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  apiFreteRapidoUrl: process.env.API_FRETE_RAPIDO_URL,
  apiFreteRapidoToken: process.env.API_FRETE_RAPIDO_TOKEN,
  apiFreteRapidoCNPJ: process.env.API_FRETE_RAPIDO_CNPJ,
  apiFreteRapidoCode: process.env.API_FRETE_RAPIDO_CODE,
  apiFreteRapidoCep: process.env.API_FRETE_RAPIDO_CEP,
};
