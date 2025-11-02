import HomePage from '../pages/home.page.js';
import SignupPage from '../pages/signup.page.js';
import { generateUser } from '../data/user.data.js';

/**
 * User Registration Test Suite
 * Test Case 1: Register User
 */
describe('User Registration Suite', () => {
    
    describe('TC01 - Register User', () => {
        let userData;

        it('Should register a new user successfully', async () => {
            userData = generateUser();

            await HomePage.open();
            
            await HomePage.clickSignupLogin();
            
            await SignupPage.fillSignupForm(userData.name, userData.email);
            await SignupPage.clickSignup();
            
            await SignupPage.fillAccountDetails(userData);
            
            await SignupPage.clickCreateAccount();
            
            const isAccountCreated = await SignupPage.isAccountCreatedVisible();
            await expect(isAccountCreated).toBe(true);
            
            await SignupPage.clickContinue();
            
            const isLoggedIn = await HomePage.isUserLoggedIn();
            await expect(isLoggedIn).toBe(true);
        });

        it('Should delete the created account', async () => {
            await SignupPage.deleteAccount();
            
            const isAccountDeleted = await SignupPage.isAccountDeletedVisible();
            await expect(isAccountDeleted).toBe(true);
            
            await SignupPage.clickContinue();
        });
    });
});