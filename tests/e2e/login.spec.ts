import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';
import { BasePage } from '../../pageObjects/basePage';

test.describe('Login', () => {
    test('1.1. Succesful Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.fillLoginForm('standard_user', 'secret_sauce');
        await page.waitForURL('**/inventory.html');
    });
    test('1.2. Locked User Login should show an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.fillLoginForm('locked_out_user', 'secret_sauce');
        await loginPage.expectLockedUserError('locked_out_user', 'secret_sauce');
    });
    // test('1.3. Invalid User Login', async ({ page }) => {
    //     const loginPage = new LoginPage(page);
    //     await loginPage.visit();
    //     await loginPage.fillLoginForm('error_user', 'secret_sauce');
    //     await loginPage.expectLoginError('error_user', 'secret_sauce');
    // });


    test('1.4. Invalid Password Login should show an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.fillLoginForm('standard_user', 'wrong_password');
        await loginPage.expectDoNotMatchError('standard_user', 'wrong_password');
    });
});