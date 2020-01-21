import { element, by, ElementFinder } from 'protractor';

export default class JobUpdatePage {
  pageTitle: ElementFinder = element(by.id('humanresourcesApp.job.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  jobTitleInput: ElementFinder = element(by.css('input#job-jobTitle'));
  minSalaryInput: ElementFinder = element(by.css('input#job-minSalary'));
  maxSalaryInput: ElementFinder = element(by.css('input#job-maxSalary'));
  taskSelect: ElementFinder = element(by.css('select#job-task'));
  employeeSelect: ElementFinder = element(by.css('select#job-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setJobTitleInput(jobTitle) {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput() {
    return this.jobTitleInput.getAttribute('value');
  }

  async setMinSalaryInput(minSalary) {
    await this.minSalaryInput.sendKeys(minSalary);
  }

  async getMinSalaryInput() {
    return this.minSalaryInput.getAttribute('value');
  }

  async setMaxSalaryInput(maxSalary) {
    await this.maxSalaryInput.sendKeys(maxSalary);
  }

  async getMaxSalaryInput() {
    return this.maxSalaryInput.getAttribute('value');
  }

  async taskSelectLastOption() {
    await this.taskSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async taskSelectOption(option) {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect() {
    return this.taskSelect;
  }

  async getTaskSelectedOption() {
    return this.taskSelect.element(by.css('option:checked')).getText();
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
