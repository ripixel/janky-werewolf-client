import * as React from 'react';
import { IVillageService, VillageService } from '../../service/Village';
import WebSocketVillageProvider from '../../provider/Village/WebSocket';
import { StoreInteractorService } from '../../service/StoreInteractor';
import store from '../../store';

export const initVillageServiceContext = (): IVillageService =>
  new VillageService(
    new WebSocketVillageProvider(),
    new StoreInteractorService(store)
  );

export const VillageServiceContext = React.createContext<IVillageService>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as any
);

export const VillageServiceContextProvider = VillageServiceContext.Provider;
export const VillageServiceContextConsumer = VillageServiceContext.Consumer;
