import IProduct from './IProduct';

export default interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
}
