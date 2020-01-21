import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmployeeComponentsPage, { EmployeeDeleteDialog } from './employee.page-object';
import EmployeeUpdatePage from './employee-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  let employeeDeleteDialog: EmployeeDeleteDialog;

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

  it('should load Employees', async () => {
    await navBarPage.getEntityPage('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    expect(await employeeComponentsPage.getTitle().getText()).to.match(/Employees/);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Employee/);
    await employeeUpdatePage.cancel();
  });

  it('should create and save Employees', async () => {
    async function createEmployee() {
      await employeeComponentsPage.clickOnCreateButton();
      await employeeUpdatePage.setFirstNameInput('firstName');
      expect(await employeeUpdatePage.getFirstNameInput()).to.match(/firstName/);
      await employeeUpdatePage.setLastNameInput('lastName');
      expect(await employeeUpdatePage.getLastNameInput()).to.match(/lastName/);
      await employeeUpdatePage.setEmailInput('email');
      expect(await employeeUpdatePage.getEmailInput()).to.match(/email/);
      await employeeUpdatePage.setPhoneNumberInput('phoneNumber');
      expect(await employeeUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
      await employeeUpdatePage.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await employeeUpdatePage.getHireDateInput()).to.contain('2001-01-01T02:30');
      await employeeUpdatePage.setSalaryInput('5');
      expect(await employeeUpdatePage.getSalaryInput()).to.eq('5');
      await employeeUpdatePage.setCommissionPctInput('5');
      expect(await employeeUpdatePage.getCommissionPctInput()).to.eq('5');
      await employeeUpdatePage.managerSelectLastOption();
      await employeeUpdatePage.departmentSelectLastOption();
      await waitUntilDisplayed(employeeUpdatePage.getSaveButton());
      await employeeUpdatePage.save();
      await waitUntilHidden(employeeUpdatePage.getSaveButton());
      expect(await employeeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEmployee();
    await employeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();
    await createEmployee();
    await employeeComponentsPage.waitUntilLoaded();

    await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Employee', async () => {
    await employeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
    await employeeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    employeeDeleteDialog = new EmployeeDeleteDialog();
    expect(await employeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.employee.delete.question/);
    await employeeDeleteDialog.clickOnConfirmButton();

    await employeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
