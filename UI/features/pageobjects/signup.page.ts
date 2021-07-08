import Page from './page';
import * as faker from 'faker';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail() { return $('#email') }
    get inputName() { return $('#name') }
    get inputPassword() { return $('#password') }
    get inputConfirmPassword() { return $('#confirm_password') }
    get inputPhoneNumber() { return $('#phone_number') }
    get inputTermsAndConditions() { return $('div[class="css-2vmmyj e1n1lbzj0"][display="flex"]') }
    get btnSubmit() { return $('button[type="submit"]') }
    get phoneVerificationCodeInput() { return $('input#registration_code') }
    get circleCheckMark() { return $('circle') }
    async createFakeUser() {
        global.profile = {
            fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            password: faker.internet.password()
        }
    }
    async register() {
        await (await this.inputEmail).setValue(global.profile.email)
        await (await this.inputName).setValue(global.profile.fullName)
        await (await this.inputPassword).setValue(`${global.profile.password}_A+2?`)
        await (await this.inputConfirmPassword).setValue(`${global.profile.password}_A+2?`)
        await (await this.inputPhoneNumber).setValue(`+123456789`)
        await (await this.inputTermsAndConditions).click()
        await (await this.btnSubmit).click()
    }
    async submitPhoneNumberVerification() {
        await expect(this.phoneVerificationCodeInput).toBeExisting()
        await expect(this.btnSubmit).toBeExisting();
        await (await this.phoneVerificationCodeInput).setValue(9999)
        await (await this.btnSubmit).click()
        await expect(this.circleCheckMark).toBeDisplayed()
        await (await this.btnSubmit).click()
    }
    open() {
        return super.open('signup');
    }
}

export default new SignupPage();
