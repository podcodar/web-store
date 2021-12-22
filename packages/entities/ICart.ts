import IProduct from './IProduct';

export default interface ICart {
  products: IProduct[];
  amount: number;
}
