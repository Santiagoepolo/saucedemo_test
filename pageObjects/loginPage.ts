import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorLockedText: Locator;
    private readonly errorUserText: Locator;
    private readonly errorDoNotMatchText: Locator;
    constructor (page: Page){
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button',{ name: 'Login'});
        this.errorLockedText= page.getByRole('heading', { name: "Epic sadface: Sorry, this user has been locked out."});
        this.errorUserText= page.getByRole('heading', { name: "Epic sadface: Username and password do not match any user in this service"});
        this.errorDoNotMatchText= page.getByRole('heading', { name: "Epic sadface: Username and password do not match any user in this service"});
    }
    async fillLoginForm(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLockedUserError(username: string, password: string){
        await this.usernameInput.fill('locked_out_user');
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.errorLockedText).toBeVisible();
    }

    async expectLoginError(username: string, password: string){
        await this.usernameInput.fill('error_user');
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.errorUserText).toBeVisible();
}
    async expectDoNotMatchError(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill('wrong_password');
        await this.loginButton.click();
        await expect(this.errorDoNotMatchText).toBeVisible();
    }
}
