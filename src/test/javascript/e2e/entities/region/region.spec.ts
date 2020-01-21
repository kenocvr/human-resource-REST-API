import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RegionComponentsPage, { RegionDeleteDialog } from './region.page-object';
import RegionUpdatePage from './region-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Region e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let regionComponentsPage: RegionComponentsPage;
  let regionUpdatePage: RegionUpdatePage;
  let regionDeleteDialog: RegionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Regions', async () => {
    await navBarPage.getEntityPage('region');
    regionComponentsPage = new RegionComponentsPage();
    expect(await regionComponentsPage.getTitle().getText()).to.match(/Regions/);
  });

  it('should load create Region page', async () => {
    await regionComponentsPage.clickOnCreateButton();
    regionUpdatePage = new RegionUpdatePage();
    expect(await regionUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Region/);
    await regionUpdatePage.cancel();
  });

  it('should create and save Regions', async () => {
    async function createRegion() {
      await regionComponentsPage.clickOnCreateButton();
      await regionUpdatePage.setRegionNameInput('regionName');
      expect(await regionUpdatePage.getRegionNameInput()).to.match(/regionName/);
      await waitUntilDisplayed(regionUpdatePage.getSaveButton());
      await regionUpdatePage.save();
      await waitUntilHidden(regionUpdatePage.getSaveButton());
      expect(await regionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createRegion();
    await regionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await regionComponentsPage.countDeleteButtons();
    await createRegion();
    await regionComponentsPage.waitUntilLoaded();

    await regionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await regionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Region', async () => {
    await regionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await regionComponentsPage.countDeleteButtons();
    await regionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    regionDeleteDialog = new RegionDeleteDialog();
    expect(await regionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.region.delete.question/);
    await regionDeleteDialog.clickOnConfirmButton();

    await regionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await regionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
