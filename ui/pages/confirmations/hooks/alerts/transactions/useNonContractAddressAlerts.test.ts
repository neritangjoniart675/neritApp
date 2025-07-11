import { Hex } from '@neritapp/utils';
import {
  TransactionMeta,
  TransactionStatus,
  TransactionType,
} from '@neritapp/transaction-controller';
import { waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const TRANSACTION_ID_MOCK = '123-456';
const ACCOUNT_ADDRESS_MOCK = '0x0dcd5d886577d5081b0c52e242ef29e70be3e7bc';
const ACCOUNT_ADDRESS_2_MOCK = '0x2e0d7e8c45221fca00d74a3609a0f7097035d09b';

const TRANSACTION_META_MOCK = {
  id: TRANSACTION_ID_MOCK,
  chainId: 'chainId',
};

function runHook({ currentConfirmation }) {
  const state = currentConfirmation || {};
  
  return renderHookWithConfirmContextProvider(useNonContractAddressAlerts, state);
}

describe('useNonContractAddressAlerts', () => {
  
});
```
