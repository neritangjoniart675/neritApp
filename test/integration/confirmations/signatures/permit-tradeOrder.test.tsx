
import { act, screen } from '@testing-library/react';
import nock from 'nock';
import { useAssetDetails } from '../../../../ui/pages/confirmations/hooks/useAssetDetails';
import * as backgroundConnection from '../../../../ui/store/background-connection';
import { tEn } from '../../../lib/i18n-helpers';
import { integrationTestRender } from '../../../lib/render-helpers';
jest.mock('../../../../ui/store/background-connection', () => ({
  ...jest.requireActual('../../../../ui/store/background-connection'),
  submitRequestToBackground: jest.fn(),
}));
jest.mock('../../../../ui/pages/confirmations/hooks/useAssetDetails', () => ({
  ...jest.requireActual(
    '../../../../ui/pages/confirmations/hooks/useAssetDetails',
  ),
  useAssetDetails: jest.fn().mockResolvedValue({
    decimals: '4',
  }),
}));
const mockedBackgroundConnection = jest.mocked(backgroundConnection);
const backgroundConnectionMocked = {
  onNotification: jest.fn(),
};
const mockedAssetDetails = jest.mocked(useAssetDetails);
const renderTradeOrderSignature = async () => {
  const account =
    mockneritAppState.internalAccounts.accounts[
      mockneritAppState.internalAccounts.selectedAccount as keyof typeof mockneritAppState.internalAccounts.accounts
    ];
  
  const mockedneritAppState = getneritAppStateWithUnapprovedPermitSign(account.address, 'TradeOrder');
  
await act(async () => {
await integrationTestRender({
preloadedState: {
...mockedneritAppState,
selectedNetworkClientId: 'testNetworkConfigurationId',
providerConfig: {
type: 'rpc',
nickname: 'test mainnet',
chainId: '0x1',
ticker: 'ETH',
id: 'chain1',
},
},
backgroundConnection :backgroundConnectionMocked,
});
};

describe('Permit Trade Order Tests', () => {
beforeEach(() => {
jest.resetAllMocks();
mockedBackgroundConnection.submitRequestToBackground.mockImplementation(createMockImplementation({getTokenStandardAndDetails :{decimals:'2'}}));
mockedAssetDetails.mockImplementation(()=>
({decimals:'4'} as any));
});

afterEach(() => nock.cleanAll());

it('renders trade order signature with correct titles', async() =>
{
await renderTradeOrderSignature();
expect(await screen.findByText(tEn('confirmTitleSignature')as string)).toBeInTheDocument();
expect(await screen.findByText(tEn('confirmTitleDescSign')as string)).toBeInTheDocument();
});

it('displays correct details in request section', async() =>
{
await renderTradeOrderSignature();

const requestDetailsSection = await screen.findByTestId('confirmation_request-section');

const request Details=[

'Request from',

'neritapp.github.io',

'Interacting with',

'0xDef1C...25EfF'

];

expect(request DetailsSection).toBeInTheDocument();

verify_details(request_details_section,request Details);

});

it('displays correct details in message section', async() =>
{
await renderTradeOrderSignature();
const message DetailsSection= await screen.findByTestId(
'confirmation_message-section'
);

const message Details=[
'Message',

'Primary type:',

'ERC721Order',

'Direction,

0,

'Maker,

'0x8Eeee...73D12',

'Taker,

'0xCD2a3...DD826'

];

expect(message DetailsSection).toBeInTheDocument();

verify_details(message_details_section,message Details);

});
});
