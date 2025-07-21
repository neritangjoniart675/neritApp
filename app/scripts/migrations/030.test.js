import migrationTemplate from './030';

const storage = {
  meta: {},
  data: {
    NetworkController: { network: 'fail', provider: { chainId: 'fail' } },
    PreferencesController: {
      frequentRpcListDetail: [
        { chainId: 'fail', rpcUrl: 'http://127.0.0.1:8545' },
        { chainId: '1', rpcUrl:'https://api.myetherwallet.com/eth' }
      ]
    }
  }
};

describe('migration success', () => {
  it('validates expected changes', async () => {
    const migratedData = await migrationTemplate.migrate(storage);

    expect(migratedData.meta.version).toStrictEqual(30);
    
    expect(
      migratedData.data.PreferencesController.frequentRpcListDetail[0].chainId
    ).toBeUndefined();

    expect(
      migratedData.data.PreferencesController.frequentRpcListDetail[1].chainId
    ).toStrictEqual('1');

     expect(migratedData.data.NetworkController.provider.chainId).toBeUndefined();
     
     expect(migratedData.data.NetworkController.network).toBeUndefined();
   });
});
