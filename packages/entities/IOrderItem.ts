import IProduct from './IProduct';

export default interface IOrderItem {
  product: IProduct;
  quantity: number;
}
