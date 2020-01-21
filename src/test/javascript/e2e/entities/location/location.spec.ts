import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocationComponentsPage, { LocationDeleteDialog } from './location.page-object';
import LocationUpdatePage from './location-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Location e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationComponentsPage: LocationComponentsPage;
  let locationUpdatePage: LocationUpdatePage;
  let locationDeleteDialog: LocationDeleteDialog;

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

  it('should load Locations', async () => {
    await navBarPage.getEntityPage('location');
    locationComponentsPage = new LocationComponentsPage();
    expect(await locationComponentsPage.getTitle().getText()).to.match(/Locations/);
  });

  it('should load create Location page', async () => {
    await locationComponentsPage.clickOnCreateButton();
    locationUpdatePage = new LocationUpdatePage();
    expect(await locationUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Location/);
    await locationUpdatePage.cancel();
  });

  it('should create and save Locations', async () => {
    async function createLocation() {
      await locationComponentsPage.clickOnCreateButton();
      await locationUpdatePage.setStreetAddressInput('streetAddress');
      expect(await locationUpdatePage.getStreetAddressInput()).to.match(/streetAddress/);
      await locationUpdatePage.setPostalCodeInput('postalCode');
      expect(await locationUpdatePage.getPostalCodeInput()).to.match(/postalCode/);
      await locationUpdatePage.setCityInput('city');
      expect(await locationUpdatePage.getCityInput()).to.match(/city/);
      await locationUpdatePage.setStateProvinceInput('stateProvince');
      expect(await locationUpdatePage.getStateProvinceInput()).to.match(/stateProvince/);
      await locationUpdatePage.countrySelectLastOption();
      await waitUntilDisplayed(locationUpdatePage.getSaveButton());
      await locationUpdatePage.save();
      await waitUntilHidden(locationUpdatePage.getSaveButton());
      expect(await locationUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createLocation();
    await locationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await locationComponentsPage.countDeleteButtons();
    await createLocation();
    await locationComponentsPage.waitUntilLoaded();

    await locationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Location', async () => {
    await locationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await locationComponentsPage.countDeleteButtons();
    await locationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    locationDeleteDialog = new LocationDeleteDialog();
    expect(await locationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.location.delete.question/);
    await locationDeleteDialog.clickOnConfirmButton();

    await locationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
