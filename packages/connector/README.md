# Dijets Connector

This is a connector for the Decypher Browser Extension.

## Getting started

There is a working example in this repo under the package `dijets connector example`

```typescript
import { createContext, useContext } from 'react';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Dijets } from '@dijetsinc/dijets-connector';

const Web3ConnectionContext = createContext<
  {
    connector: Dijets;
  } & Web3ReactHooks
>({} as any);

export function Web3ConnectionContextProvider({ children }: { children: any }) {
  const [connector, hooks] = initializeConnector(
    (actions) => new Dijets(actions, true)
  );

  return (
    <Web3ConnectionContext.Provider
      value={{
        connector,
        ...hooks,
      }}
    >
      {children}
    </Web3ConnectionContext.Provider>
  );
}

export function useWeb3ConnectionContext() {
  return useContext(Web3ConnectionContext);
}
```

```html
<Web3ConnectionContextProvider>
  <App />
</Web3ConnectionContextProvider>
```

```typescript
import { useWeb3ConnectionContext } from 'your-path-here';

export function YourFancyComponent() {
  const { provider, hooks } = useWeb3ConnectionContext();
}
```
