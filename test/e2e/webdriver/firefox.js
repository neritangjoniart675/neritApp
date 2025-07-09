const fs = require('fs');
const os = require('os');
const path = require('path');
const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { retry } = require('../../../development/lib/retry');
const { isHeadless } = require('../../helpers/env');

const TEMP_PROFILE_PATH_PREFIX = path.join(os.tmpdir(), 'neritApp-Fx-Profile');

function getProxyServerURL(proxyPort) {
  const DEFAULT_PROXY_HOST = 'http://127.0.0.1:8000';
  const proxyHostURL = proxyPort ? `http://127.0.0.1:${proxyPort}` : process.env.SELENIUM_HTTPS_PROXY || DEFAULT_PROXY_HOST;
  return new URL(proxyHostURL);
}

class FirefoxDriver {
  static async build({ responsive, port, constrainWindowSize, proxyPort }) {
    const profileDir = fs.mkdtempSync(TEMP_PROFILE_PATH_PREFIX);
    const options = new firefox.Options().setProfile(profileDir);

    const proxyServerURL = getProxyServerURL(proxyPort);

    options.setPreference('network.proxy.type', 1);
    options.setPreference('network.proxy.ssl', proxyServerURL.hostname);
    options.setPreference('network.proxy.ssl_port', Number(proxyServerURL.port));
    options.setAcceptInsecureCerts(true);
    options.setPreference('browser.download.folderList', 2);
    options.setPreference('browser.download.dir', path.join(process.cwd(), 'test-artifacts/downloads'));

    if (isHeadless('SELENIUM')) {
      console.warn(
        '*** Running e2e tests in headless mode is experimental and some tests are known to fail for unknown reasons',
      );
      options.addArguments('-headless');
    }

    const builder = new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options);

    const servicePath = process.env.FIREFOX_SNAP ? '/snap/bin/geckodriver' : undefined;
    const serviceBuilder =
      servicePath !== undefined ? new firefox.ServiceBuilder(servicePath) : new firefox.ServiceBuilder();
    
    if (port) serviceBuilder.setPort(port);

    builder.setFirefoxService(serviceBuilder);

    const driver = builder.build();
    
    const fxDriverInstance = new FirefoxDriver(driver);
    
     // Install extension & fetch internal ID
     const extensionIdPromise=fxDriverInstance.installExtension("dist/firefox");
     const internalExtensionIdPromise=fxDriverInstance.getInternalId();
     
     await Promise.all([extensionIdPromise, internalExtensionIdPromise]);
     
     if(responsive || constrainWindowSize){
       await driver.manage().window().setRect({width:320,height:600});
     }
     
     return {
       driver,
       extensionId: await extensionIdPromise,
       extensionUrl:`moz-extension://${await internalExtensionIdPromise}`
     };
   }

   constructor(driver){
     this._driver=driver;
   }

   async installExtension(addonPath){
      return this._driver.installAddon(addonPath,true);
   }

   async getInternalId(){
      await this._driver.get("about:debugging#addons");
      
      let uuid;
      
      await retry({retries:2},()=>uuid=this._waitOnceForUUID());
      
      return uuid;
   }
   
   async _waitOnceForUUID(){
        try{
          let elem=await this._driver.wait(
            until.elementLocated(By.xpath("//dl/div[contains(., 'UUID')]/dd")),
            1000
          );
          return elem.getText?await elem.getText():null;
        }catch{
          return null;
        }
   }
}

module.exports=FirefoxDriver;
