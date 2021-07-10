const axios = require('axios');
const faker = require('faker');
const { expect } = require('chai');
require("mocha-allure-reporter");

describe('User login', async () => {
    let userAccount = {
        email: faker.internet.email(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password: `${faker.internet.password()}_A+2?`,
        phoneNumber: '+123456789'
    };
    let refreshToken;
    let accessToken;

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
        console.log(userRegistered.data.data);
        allure.createAttachment('User registration data', JSON.stringify(userAccount));
        allure.createAttachment('User registration response', JSON.stringify(userRegistered.data.data));
    });

    it('Login a user to the website', async () => {
        const userLoggedIn = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/login',
            data: {
                email: userAccount.email,
                password: userAccount.password
            }
        });
        expect(userLoggedIn.data.error).to.be.equal(null);
        expect(userLoggedIn.status).to.be.equal(200);
        accessToken = userLoggedIn.data.data.accessToken;
        refreshToken = userLoggedIn.data.data.refreshToken;
        console.log(userLoggedIn.data);
        allure.createAttachment('User login data', JSON.stringify(userAccount));
        allure.createAttachment('User registration response', JSON.stringify(userLoggedIn.data.data));
    });

    it('Logout a user from the website', async () => {
        const userLoggedOut = await axios({
            method: 'post',
            url: 'https://production-qa-fxhcwcz4ja-ew.a.run.app/account/logout',
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                token: refreshToken
            }
        });
        expect(userLoggedOut.data.error).to.be.equal(null);
        expect(userLoggedOut.status).to.be.equal(200);
        console.log(userLoggedOut.data);
        allure.createAttachment('User logged out response', JSON.stringify(userLoggedOut.data));
    });
});