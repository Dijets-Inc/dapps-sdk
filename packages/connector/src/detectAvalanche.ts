export interface DijetsEthereumProvider {
  isDijets?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this;
  removeAllListeners(event?: string | symbol): this;
}

interface Window {
  dijets?: DijetsEthereumProvider;
}

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeDijets - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
export function detectDijetsProvider<T = DijetsEthereumProvider>({
  mustBeDijets = true,
  silent = false,
  timeout = 3000,
} = {}): Promise<T | null> {
  _validateInputs();

  let handled = false;

  return new Promise((resolve) => {
    if ((window as Window).dijets) {
      handleEthereum();
    } else {
      window.addEventListener("dijets#initialized", handleEthereum, {
        once: true,
      });

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }

    function handleEthereum() {
      if (handled) {
        return;
      }
      handled = true;

      window.removeEventListener("dijets#initialized", handleEthereum);

      const { dijets } = window as Window;

      if (dijets && (!mustBeDijets || dijets.isDijets)) {
        resolve(dijets as unknown as T);
      } else {
        const message =
          mustBeDijets && dijets
            ? "Non-Dijets window.dijets detected."
            : "Unable to detect window.dijets.";

        !silent && console.error("@dijets/detect-provider:", message);
        resolve(null);
      }
    }
  });

  function _validateInputs() {
    if (typeof mustBeDijets !== "boolean") {
      throw new Error(
        `@dijets/detect-provider: Expected option 'mustBeDijets' to be a boolean.`
      );
    }
    if (typeof silent !== "boolean") {
      throw new Error(
        `@dijets/detect-provider: Expected option 'silent' to be a boolean.`
      );
    }
    if (typeof timeout !== "number") {
      throw new Error(
        `@dijets/detect-provider: Expected option 'timeout' to be a number.`
      );
    }
  }
}
