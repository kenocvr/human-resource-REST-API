import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobHistoryComponentsPage, { JobHistoryDeleteDialog } from './job-history.page-object';
import JobHistoryUpdatePage from './job-history-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('JobHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobHistoryComponentsPage: JobHistoryComponentsPage;
  let jobHistoryUpdatePage: JobHistoryUpdatePage;
  let jobHistoryDeleteDialog: JobHistoryDeleteDialog;

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

  it('should load JobHistories', async () => {
    await navBarPage.getEntityPage('job-history');
    jobHistoryComponentsPage = new JobHistoryComponentsPage();
    expect(await jobHistoryComponentsPage.getTitle().getText()).to.match(/Job Histories/);
  });

  it('should load create JobHistory page', async () => {
    await jobHistoryComponentsPage.clickOnCreateButton();
    jobHistoryUpdatePage = new JobHistoryUpdatePage();
    expect(await jobHistoryUpdatePage.getPageTitle().getText()).to.match(/Create or edit a JobHistory/);
    await jobHistoryUpdatePage.cancel();
  });

  it('should create and save JobHistories', async () => {
    async function createJobHistory() {
      await jobHistoryComponentsPage.clickOnCreateButton();
      await jobHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await jobHistoryUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
      await jobHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await jobHistoryUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
      await jobHistoryUpdatePage.languageSelectLastOption();
      await jobHistoryUpdatePage.jobSelectLastOption();
      await jobHistoryUpdatePage.departmentSelectLastOption();
      await jobHistoryUpdatePage.employeeSelectLastOption();
      await waitUntilDisplayed(jobHistoryUpdatePage.getSaveButton());
      await jobHistoryUpdatePage.save();
      await waitUntilHidden(jobHistoryUpdatePage.getSaveButton());
      expect(await jobHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createJobHistory();
    await jobHistoryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await jobHistoryComponentsPage.countDeleteButtons();
    await createJobHistory();
    await jobHistoryComponentsPage.waitUntilLoaded();

    await jobHistoryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last JobHistory', async () => {
    await jobHistoryComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await jobHistoryComponentsPage.countDeleteButtons();
    await jobHistoryComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    jobHistoryDeleteDialog = new JobHistoryDeleteDialog();
    expect(await jobHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.jobHistory.delete.question/);
    await jobHistoryDeleteDialog.clickOnConfirmButton();

    await jobHistoryComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
