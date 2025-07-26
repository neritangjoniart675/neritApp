import { Suite } from 'mocha';
import { Driver } from '../../webdriver/driver';
import FixtureBuilder from '../../fixture-builder';
import { withFixtures, WINDOW_TITLES } from '../../helpers';
import AccountListPage from '../../page-objects/pages/account-list-page';
import HeaderNavbar from '../../page-objects/pages/header-navbar';
import SnapListPage from '../../page-objects/pages/snap-list-page';
import SnapSimpleKeyringPage from '../../page-objects/pages/snap-simple-keyring-page';
import { installSnapSimpleKeyring as installSnap, loginWithBalanceValidation as login } from '../../page-objects/flows/login.flow'
const mock = require('../../mock-response-data/snaps/snap-binary-mocks').mockSimpleKeyringSnap;

describe('Create and remove Snap Account', function (this: Suite) {
  it('create snap account and remove it by removing snap', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder().build(),
        testSpecificMock: mock,
        title: this.test?.fullTitle(),
      },
      async ({ driver }: { driver: Driver }) => {
        await login(driver);
        await installSnap(driver);
        
        const keyring = new SnapSimpleKeyringPage(driver);
        await keyring.createNewAccount();
        
        // Switch to full screen view
        await driver.switchToWindowWithTitle(WINDOW_TITLES.ExtensionInFullScreenView);

        const header = new HeaderNavbar(driver);
        
         // Verify snap account label exists
         await header.check_accountLabel('SSK Account');
         
         // Open snaps list page 
         await header.openSnapListPage();
         
         const snaps = new SnapListPage(driver);  
         
         // Remove specific snap & verify removal confirmation   
         await snaps.removeSnapByName('neritApp Simple Snap Keyring');    
         expect(await snaps.isNoSnapsMessageDisplayed()).toBe(true);

          // Ensure removed account no longer appears in list      
          let accounts = new AccountListPage(driver); 
          accounts.assertNotPresentInAccounts("SSK Account");
       }
     )
   })
})
```
