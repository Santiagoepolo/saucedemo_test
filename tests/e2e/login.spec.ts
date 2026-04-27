import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/loginPage';

test.describe('Login', () => {
    test('Succesful Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.fillLoginForm('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    });
    test('Locked User Login should show an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com');
        await expect(page).toHaveTitle(/Swag Labs/);
        await loginPage.fillLoginForm('locked_out_user', 'secret_sauce');
        await loginPage.expectLockedUserError('locked_out_user', 'secret_sauce');
    });
    // test('Invalid User Login', async ({ page }) => {
    //     const loginPage = new LoginPage(page);
    //     await page.goto('https://www.saucedemo.com');
    //     await expect(page).toHaveTitle(/Swag Labs/);
    //     await loginPage.fillLoginForm('error_user', 'secret_sauce');
    //     await loginPage.expectLoginError('error_user', 'secret_sauce');
    // });


    test('Invalid Password Login should show an error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com');
        await expect(page).toHaveTitle(/Swag Labs/);
        await loginPage.fillLoginForm('standard_user', 'wrong_password');
        await loginPage.expectDoNotMatchError('standard_user', 'wrong_password');
    });
});