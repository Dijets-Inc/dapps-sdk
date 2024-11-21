import { useState, useCallback } from 'react';
import { DijetsProvider } from '@dijetsinc/dijets-connector';
import { Contact } from '@dijetsinc/types';

type getContactsResult = { result: Contact[] };

export function useContacts(provider: DijetsProvider) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(
    () =>
      provider
        .request({ method: 'dijets_getContacts' })
        .then((res) => setContacts((res as getContactsResult).result)),
    [provider]
  );

  return { contacts, getContacts };
}
