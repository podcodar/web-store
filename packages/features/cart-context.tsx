import { useMemo, useState } from 'react';

import ICart from '@packages/entities/ICart';
import createCtx from '@packages/utils/createCtx';
import { ChildrenProps, useEffectOnce } from '@packages/utils/react';

const DEFAULT_CART: ICart = {
  items: [],
};

const LOCAL_STORAGE_KEY = 'podcodar:cart';

interface ICartActions {
  readonly setCart: (cart: ICart) => void;
}

interface ICartStates {
  readonly cart: ICart;
}

const [useCartActions, CartActionsProvider] =
  createCtx<ICartActions>('CartActionsCtx');
const [useCartStates, CartStatesProvider] =
  createCtx<ICartStates>('CartStatesCtx');

export { useCartActions, useCartStates };

export default function CartProvider({ children }: ChildrenProps) {
  const [cart, setCart] = useState<ICart>(DEFAULT_CART);

  const state: ICartStates = useMemo(() => ({ cart }), [cart]);
  const actions: ICartActions = useMemo(
    () => ({
      setCart: (cart) => {
        setCart(cart);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
      },
    }),
    [],
  );

  useEffectOnce(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedCart) {
      actions.setCart(JSON.parse(storedCart));
    }
  });

  return (
    <CartActionsProvider value={actions}>
      <CartStatesProvider value={state}>{children}</CartStatesProvider>
    </CartActionsProvider>
  );
}
