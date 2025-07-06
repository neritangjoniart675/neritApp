import { Driver } from '../../../webdriver/driver';

class BackupAndSyncSettings {
  private readonly driver: Driver;

  private readonly toggles = {
    accountSync: '[data-testid="account-syncing-toggle-container"]',
    backupAndSync: '[data-testid="backup-and-sync-toggle-container"]',
    contactSync: '[data-testid="contact-syncing-toggle-container"]',
  };

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async check_pageIsLoaded(): Promise<void> {
    try {
      await this.driver.waitForMultipleSelectors(Object.values(this.toggles));
      console.log('Backup And Sync page is loaded');
    } catch (e) {
      console.log('Timeout while waiting for Backup And Sync Settings page to be loaded', e);
      throw e;
    }
  }

  async toggleAccountSync(): Promise<void> {
    console.log('Toggling account sync setting');
    await this.driver.clickElement(this.toggles.accountSync);
  }

  async toggleBackupAndSync(): Promise<void> {
    console.log('Toggling backup and sync setting');
    await this.driver.clickElement(this.toggles.backupAndSync);
  }

  async toggleContactSync(): Promise<void> {
    console.log('Toggling contact sync setting');
    await this.driver.clickElement(this.toggles.contactSync);
  }
}

export default BackupAndSyncSettings;
