import { Provider } from '@web3-react/types';

export type DijetsProvider = Provider & {
  isDijets?: boolean;
  isConnected?: () => boolean;
  providers?: DijetsProvider[];
};
