import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JobComponentsPage, { JobDeleteDialog } from './job.page-object';
import JobUpdatePage from './job-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Job e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobComponentsPage: JobComponentsPage;
  let jobUpdatePage: JobUpdatePage;
  let jobDeleteDialog: JobDeleteDialog;

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

  it('should load Jobs', async () => {
    await navBarPage.getEntityPage('job');
    jobComponentsPage = new JobComponentsPage();
    expect(await jobComponentsPage.getTitle().getText()).to.match(/Jobs/);
  });

  it('should load create Job page', async () => {
    await jobComponentsPage.clickOnCreateButton();
    jobUpdatePage = new JobUpdatePage();
    expect(await jobUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Job/);
    await jobUpdatePage.cancel();
  });

  it('should create and save Jobs', async () => {
    async function createJob() {
      await jobComponentsPage.clickOnCreateButton();
      await jobUpdatePage.setJobTitleInput('jobTitle');
      expect(await jobUpdatePage.getJobTitleInput()).to.match(/jobTitle/);
      await jobUpdatePage.setMinSalaryInput('5');
      expect(await jobUpdatePage.getMinSalaryInput()).to.eq('5');
      await jobUpdatePage.setMaxSalaryInput('5');
      expect(await jobUpdatePage.getMaxSalaryInput()).to.eq('5');
      // jobUpdatePage.taskSelectLastOption();
      await jobUpdatePage.employeeSelectLastOption();
      await waitUntilDisplayed(jobUpdatePage.getSaveButton());
      await jobUpdatePage.save();
      await waitUntilHidden(jobUpdatePage.getSaveButton());
      expect(await jobUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createJob();
    await jobComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await jobComponentsPage.countDeleteButtons();
    await createJob();
    await jobComponentsPage.waitUntilLoaded();

    await jobComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Job', async () => {
    await jobComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await jobComponentsPage.countDeleteButtons();
    await jobComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    jobDeleteDialog = new JobDeleteDialog();
    expect(await jobDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.job.delete.question/);
    await jobDeleteDialog.clickOnConfirmButton();

    await jobComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await jobComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
