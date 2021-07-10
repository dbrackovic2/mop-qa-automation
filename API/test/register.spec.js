const axios = require('axios');
const faker = require('faker');
const { expect } = require('chai');
require("mocha-allure-reporter");

describe('User registration', async () => {
    let userAccount = {
        email: faker.internet.email(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password: `${faker.internet.password()}_A+2?`,
        phoneNumber: '+123456789'
    };
    let registrationToken;

    it('Register a user to the website', async () => {
        const userRegistered = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/register',
            data: {
                email: userAccount.email,
                name: userAccount.name,
                password: userAccount.password,
                phoneNumber: userAccount.phoneNumber
            }
        });
        expect(userRegistered.data.error).to.be.equal(null);
        expect(userRegistered.status).to.be.equal(200);
        registrationToken = userRegistered.data.data.accessToken;
        console.log(userRegistered.data.data);
        allure.createAttachment('User registration data', JSON.stringify(userAccount));
        allure.createAttachment('User registration response', JSON.stringify(userRegistered.data.data));
    });

    it('Confirm user phone', async () => {
        const confirmedPhone = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/confirm-phone',
            headers: { Authorization: `Bearer ${registrationToken}` },
            data: {
                code: '9999'
            }
        });
        console.log(confirmedPhone.data);
        expect(confirmedPhone.status).to.be.equal(202);
        allure.createAttachment('Confirm user phone response', JSON.stringify(confirmedPhone.data));
    });

    it('Accept terms of service', async () => {
        const acceptTos = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/accept-tos',
            headers: { Authorization: `Bearer ${registrationToken}` }
        });
        console.log(acceptTos.data);
        expect(acceptTos.status).to.be.equal(202);
        allure.createAttachment('Accept terms of service response', JSON.stringify(acceptTos.data));
    });

    it('Authorize user session', async () => {
        const authorizeSession = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/authorize',
            headers: { Authorization: `Bearer ${registrationToken}` },
            data: {
                code: '9999'
            }
        });
        console.log(authorizeSession.data);
        expect(authorizeSession.status).to.be.equal(200);
        allure.createAttachment('Authorize user session response', JSON.stringify(authorizeSession.data));
    });

    it('Retrieve account deleting token', async () => {
        const requestDelete = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/request-delete',
            headers: { Authorization: `Bearer ${registrationToken}` },
            data: {
                password: userAccount.password
            }
        });
        console.log(requestDelete.data);
        console.log(userAccount.password);
        expect(requestDelete.status).to.be.equal(202);
        allure.createAttachment('Retrieve account deleting token response', JSON.stringify(requestDelete.data));
    });
});