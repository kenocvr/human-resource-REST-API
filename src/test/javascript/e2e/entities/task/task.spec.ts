import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TaskComponentsPage, { TaskDeleteDialog } from './task.page-object';
import TaskUpdatePage from './task-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Task e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskComponentsPage: TaskComponentsPage;
  let taskUpdatePage: TaskUpdatePage;
  let taskDeleteDialog: TaskDeleteDialog;

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

  it('should load Tasks', async () => {
    await navBarPage.getEntityPage('task');
    taskComponentsPage = new TaskComponentsPage();
    expect(await taskComponentsPage.getTitle().getText()).to.match(/Tasks/);
  });

  it('should load create Task page', async () => {
    await taskComponentsPage.clickOnCreateButton();
    taskUpdatePage = new TaskUpdatePage();
    expect(await taskUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Task/);
    await taskUpdatePage.cancel();
  });

  it('should create and save Tasks', async () => {
    async function createTask() {
      await taskComponentsPage.clickOnCreateButton();
      await taskUpdatePage.setTitleInput('title');
      expect(await taskUpdatePage.getTitleInput()).to.match(/title/);
      await taskUpdatePage.setDescriptionInput('description');
      expect(await taskUpdatePage.getDescriptionInput()).to.match(/description/);
      await waitUntilDisplayed(taskUpdatePage.getSaveButton());
      await taskUpdatePage.save();
      await waitUntilHidden(taskUpdatePage.getSaveButton());
      expect(await taskUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTask();
    await taskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();
    await createTask();
    await taskComponentsPage.waitUntilLoaded();

    await taskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Task', async () => {
    await taskComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
    await taskComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    taskDeleteDialog = new TaskDeleteDialog();
    expect(await taskDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/humanresourcesApp.task.delete.question/);
    await taskDeleteDialog.clickOnConfirmButton();

    await taskComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
