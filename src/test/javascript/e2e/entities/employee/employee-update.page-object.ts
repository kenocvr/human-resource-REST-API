import { element, by, ElementFinder } from 'protractor';

export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.employee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#employee-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#employee-lastName'));
  emailInput: ElementFinder = element(by.css('input#employee-email'));
  phoneNumberInput: ElementFinder = element(by.css('input#employee-phoneNumber'));
  hireDateInput: ElementFinder = element(by.css('input#employee-hireDate'));
  salaryInput: ElementFinder = element(by.css('input#employee-salary'));
  commissionPctInput: ElementFinder = element(by.css('input#employee-commissionPct'));
  managerSelect: ElementFinder = element(by.css('select#employee-manager'));
  departmentSelect: ElementFinder = element(by.css('select#employee-department'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setHireDateInput(hireDate) {
    await this.hireDateInput.sendKeys(hireDate);
  }

  async getHireDateInput() {
    return this.hireDateInput.getAttribute('value');
  }

  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return this.salaryInput.getAttribute('value');
  }

  async setCommissionPctInput(commissionPct) {
    await this.commissionPctInput.sendKeys(commissionPct);
  }

  async getCommissionPctInput() {
    return this.commissionPctInput.getAttribute('value');
  }

  async managerSelectLastOption() {
    await this.managerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async managerSelectOption(option) {
    await this.managerSelect.sendKeys(option);
  }

  getManagerSelect() {
    return this.managerSelect;
  }

  async getManagerSelectedOption() {
    return this.managerSelect.element(by.css('option:checked')).getText();
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
