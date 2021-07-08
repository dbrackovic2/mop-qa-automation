import { Given, When, Then } from '@cucumber/cucumber'

import LoginPage from '../pageobjects/login.page'
import DashboardPage from '../pageobjects/dashboard.page'
import SignupPage from '../pageobjects/signup.page'

const pages = {
    login: LoginPage,
    signup: SignupPage,
    dashboard: DashboardPage
}

Given(/^I am on the (.*) page$/, async (page: string) => {
    await pages[page].open()
})

When(/^I login with (.*) and (.*)$/, async (username: string, password: string) => {
    await LoginPage.login(username, password)
})

Then(/^User is logged into the website$/, async () => {
    await expect(DashboardPage.userSettingsBtn).toBeExisting()
    await expect(DashboardPage.searchEventsSection).toBeExisting()
    await expect(DashboardPage.eventsTab).toHaveTextContaining("Events")
})

When(/^User submits a valid registration form$/, async () => {
    await SignupPage.createFakeUser()
    await expect(SignupPage.inputEmail).toBeExisting()
    await expect(SignupPage.inputName).toBeExisting()
    await SignupPage.register()
})

When(/^User submits a valid phone number authentication code$/, async () => {
    await SignupPage.submitPhoneNumberVerification()
})

Then(/^User is successfully registered to the website$/, async () => {
    await expect(DashboardPage.searchEventsSection).toBeDisplayed()
})



