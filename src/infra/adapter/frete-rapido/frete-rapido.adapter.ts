import { RequestFactory, RequestFactoryService } from '@common/request-factory';
import {
  FreteRapidoQuoteSimulateInput,
  FreteRapidoQuoteSimulateOutput,
  QuoteSimulateBody,
} from './frete-rapido.dto';
import { FRETE_RAPIDO_SIMULATION_TYPE } from './frete-rapido.enum';
import { env } from '@common/env';

export class FreteRapidoAdapter {
  _requestFactory: RequestFactory;

  constructor() {
    this._requestFactory = new RequestFactoryService({
      baseURL: env.apiFreteRapidoUrl,
    });
  }

  async quoteSimulate(
    quoteSimulateInput: FreteRapidoQuoteSimulateInput,
  ): Promise<FreteRapidoQuoteSimulateOutput> {
    const body: QuoteSimulateBody = {
      shipper: {
        registered_number: env.apiFreteRapidoCNPJ,
        token: env.apiFreteRapidoToken,
        platform_code: env.apiFreteRapidoCode,
      },
      recipient: {
        type: 1,
        country: 'BRA',
        zipcode: Number(quoteSimulateInput.zipCode),
      },
      dispatchers: [
        {
          registered_number: env.apiFreteRapidoCNPJ,
          zipcode: Number(env.apiFreteRapidoCep),
          volumes: quoteSimulateInput.volumes.map(
            ({ category, price: unitary_price, ...volumeItem }) => ({
              category: category.toString(),
              unitary_price,
              ...volumeItem,
            }),
          ),
        },
      ],
      simulation_type: [FRETE_RAPIDO_SIMULATION_TYPE.FRACTIONED],
    };

    const result = await this._requestFactory.post({
      url: '/v3/quote/simulate',
      data: { ...body },
    });

    return result as FreteRapidoQuoteSimulateOutput;
  }
}
