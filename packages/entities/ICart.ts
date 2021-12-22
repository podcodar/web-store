import ICartItem from './ICartItem';

export default interface ICart {
  items: ICartItem[];
  amount: number;
}
