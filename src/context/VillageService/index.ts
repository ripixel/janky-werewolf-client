import * as React from 'react';
import { IVillageService, VillageService } from '../../service/Village';
import { DevVillageProvider } from '../../provider/Village/Dev';
import { StoreInteractorService } from '../../service/StoreInteractor';
import store from '../../store';

export const initVillageServiceContext = (): IVillageService =>
  new VillageService(
    new DevVillageProvider(),
    new StoreInteractorService(store)
  );

export const VillageServiceContext = React.createContext<IVillageService>(
  // always set something to shut TypeScript up
  initVillageServiceContext()
);

export const VillageServiceContextProvider = VillageServiceContext.Provider;
export const VillageServiceContextConsumer = VillageServiceContext.Consumer;
