import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../../../../../../store/store';
import { TransactionAccountDetails } from './transaction-account-details';
import { ConfirmContextProvider } from '../../../../../context/confirm';
import { genUnapprovedContractInteractionConfirmation } from '../../../../../../../../test/data/confirmations/contract-interaction';
import { getMockConfirmStateForTransaction } from '../../../../../../../../test/data/confirmations/helper';

const DELEGATION_MOCK = '0x1234567890abcdef1234567890abcdef12345678';

const TRANSACTION_MOCK = genUnapprovedContractInteractionConfirmation({
  authorizationList: [{ address: DELEGATION_MOCK }],
});

const STATE_MOCK = getMockConfirmStateForTransaction(TRANSACTION_MOCK, {
  neritapp: {
    preferences: {
      petnamesEnabled: true,
    },
  },
});

const store = configureStore(STATE_MOCK);

export default {
  title: 'Confirmations/Components/Confirm/TransactionAccountDetails',
  component: TransactionAccountDetails,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ConfirmContextProvider>
          <Story />
        </ConfirmContextProvider>
      </Provider>
    ),
  ],
};

export const DefaultStory = () => <TransactionAccountDetails />;
DefaultStory.storyName = 'Default';
