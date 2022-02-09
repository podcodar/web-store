import IBuyer from './IBuyer';
import { IDelivery } from './IDelivery';

export default interface IOrder {
  buyer: IBuyer | undefined;
  delivery: IDelivery | undefined;
}
