import { element, by, ElementFinder } from 'protractor';

export default class JobHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.jobHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startDateInput: ElementFinder = element(by.css('input#job-history-startDate'));
  endDateInput: ElementFinder = element(by.css('input#job-history-endDate'));
  languageSelect: ElementFinder = element(by.css('select#job-history-language'));
  jobSelect: ElementFinder = element(by.css('select#job-history-job'));
  departmentSelect: ElementFinder = element(by.css('select#job-history-department'));
  employeeSelect: ElementFinder = element(by.css('select#job-history-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setLanguageSelect(language) {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect() {
    return this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption() {
    await this.languageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async jobSelectLastOption() {
    await this.jobSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async jobSelectOption(option) {
    await this.jobSelect.sendKeys(option);
  }

  getJobSelect() {
    return this.jobSelect;
  }

  async getJobSelectedOption() {
    return this.jobSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
  }

  async employeeSelectLastOption() {
    await this.employeeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect() {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return this.employeeSelect.element(by.css('option:checked')).getText();
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
