export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SZNx9yDegUrO3x',
    priceId: 'price_1ReFBPFKZ9amnZJR7ilYSPtw',
    name: 'Donation',
    description: 'Supporting further development of the website, covering the running costs',
    mode: 'payment'
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};