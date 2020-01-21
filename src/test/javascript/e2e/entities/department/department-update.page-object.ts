import { element, by, ElementFinder } from 'protractor';

export default class DepartmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.department.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  departmentNameInput: ElementFinder = element(by.css('input#department-departmentName'));
  locationSelect: ElementFinder = element(by.css('select#department-location'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDepartmentNameInput(departmentName) {
    await this.departmentNameInput.sendKeys(departmentName);
  }

  async getDepartmentNameInput() {
    return this.departmentNameInput.getAttribute('value');
  }

  async locationSelectLastOption() {
    await this.locationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
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
