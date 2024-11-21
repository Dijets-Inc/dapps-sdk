import { useWeb3ConnectionContext } from '../context/web3Connection.context';
import styled from 'styled-components';
import { DIJETS_NOT_INSTALLED_ERROR } from '@dijetsinc/dijets-connector';
import logo from '../images/icon-192.png';

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
  cursor: pointer;
`;

export function Connect() {
  const { connector, useIsActive, useAccount, useError } =
    useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();

  const error = useError();

  if (error?.message === DIJETS_NOT_INSTALLED_ERROR) {
    return (
      <>
        You currently do not have Decypher installed. Follow the link below to install it from
        <h1>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://dijets.io/download-decypher"
          >
            Haere
          </a>
        </h1>
      </>
    );
  }

  if (!isActive) {
    return (
      <ConnectButton onClick={() => connector.activate()}>
        <img height={20} src={logo} alt="logo" />
        <span style={{ marginLeft: '5px' }}>Connect Dijets</span>
      </ConnectButton>
    );
  }

  return <>connected: {activeAccount}</>;
}
