import IBuyer from './IBuyer';
import { IDelivery } from './IDelivery';
import IOrderItem from './IOrderItem';

export default interface IOrder {
  buyer: IBuyer | undefined;
  delivery: IDelivery | undefined;
  paymentType: number | undefined;
  items: IOrderItem[];
}
