import { element, by, ElementFinder } from 'protractor';

export default class RegionUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.region.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  regionNameInput: ElementFinder = element(by.css('input#region-regionName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRegionNameInput(regionName) {
    await this.regionNameInput.sendKeys(regionName);
  }

  async getRegionNameInput() {
    return this.regionNameInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
