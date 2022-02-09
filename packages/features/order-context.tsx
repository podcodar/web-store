import { useMemo, useState } from 'react';

import IOrder from '@packages/entities/IOrder';
import createCtx from '@packages/utils/createCtx';
import { ChildrenProps, useEffectOnce } from '@packages/utils/react';

const DEFAULT_ORDER: IOrder = {
  buyer: undefined,
  delivery: undefined,
};

const LOCAL_STORAGE_KEY = 'podcodar:order';

interface IOrderActions {
  readonly setOrder: (order: IOrder) => void;
}

interface IOrderStates {
  readonly order: IOrder;
}

const [useOrderActions, OrderActionsProvider] =
  createCtx<IOrderActions>('OrderActionsCtx');
const [useOrderStates, OrderStatesProvider] =
  createCtx<IOrderStates>('OrderStatesCtx');

export { useOrderActions, useOrderStates };

export default function OrderProvider({ children }: ChildrenProps) {
  const [order, setOrder] = useState<IOrder>(DEFAULT_ORDER);

  const state: IOrderStates = useMemo(() => ({ order }), [order]);
  const actions: IOrderActions = useMemo(
    () => ({
      setOrder: (order) => {
        setOrder(order);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(order));
      },
    }),
    [],
  );

  useEffectOnce(() => {
    const storedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedOrder) {
      actions.setOrder(JSON.parse(storedOrder));
    }
  });

  return (
    <OrderActionsProvider value={actions}>
      <OrderStatesProvider value={state}>{children}</OrderStatesProvider>
    </OrderActionsProvider>
  );
}
