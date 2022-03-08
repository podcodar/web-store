import IProduct from '@packages/entities/IProduct';

export function makeThrowMissingImplementation(
  message = 'missing implementation',
) {
  return function throwMissingImplementation() {
    throw new Error(message);
  };
}

export type Result<V, E = Error> = [V, null] | [null, E];

export function currencyFormat(value: number = 0) {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function calculateDiscount(product: IProduct) {
  const price = product.price - (product.price * product.discountPrice) / 100;
  return price;
}
