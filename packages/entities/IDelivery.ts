import { DeliveryType } from '@packages/enums/DeliveryType';

import IAddress from './IAddress';

export interface IDelivery {
  type: DeliveryType;
  address: IAddress;
}
