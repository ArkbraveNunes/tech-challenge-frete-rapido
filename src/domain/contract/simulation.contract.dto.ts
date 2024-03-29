export type GetMetricsInput = { skip?: number; limit?: number };

export type GetMetricsOutput = {
  name: string;
  maxPrice: number;
  minPrice: number;
  totalPrice: number;
  mediaPrice: number;
  totalSimulations: number;
}[];
