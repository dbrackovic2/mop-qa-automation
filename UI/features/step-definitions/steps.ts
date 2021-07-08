import { Given, When, Then } from '@cucumber/cucumber';

import LoginPage from '../pageobjects/login.page';
import DashboardPage from '../pageobjects/dashboard.page';

const pages = {
    login: LoginPage
}

Given(/^I am on the (.*) page$/, async (page:string) => {
    await pages[page].open()
});

When(/^I login with (.*) and (.*)$/, async (username:string, password:string) => {
    await LoginPage.login(username, password)
});

Then(/^User is logged into the website$/, async () => {
    await expect(DashboardPage.userSettingsBtn).toBeExisting();
    await expect(DashboardPage.searchEventsSection).toBeExisting();
    await expect(DashboardPage.eventsTab).toHaveTextContaining("Events");
});


