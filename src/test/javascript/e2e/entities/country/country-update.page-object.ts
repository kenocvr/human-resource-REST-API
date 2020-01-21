import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryNameInput: ElementFinder = element(by.css('input#country-countryName'));
  regionSelect: ElementFinder = element(by.css('select#country-region'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryNameInput(countryName) {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput() {
    return this.countryNameInput.getAttribute('value');
  }

  async regionSelectLastOption() {
    await this.regionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async regionSelectOption(option) {
    await this.regionSelect.sendKeys(option);
  }

  getRegionSelect() {
    return this.regionSelect;
  }

  async getRegionSelectedOption() {
    return this.regionSelect.element(by.css('option:checked')).getText();
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
