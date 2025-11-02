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
            // Arrange
            userData = generateUser();

            // Act - Navigate to home page
            await HomePage.open();
            
            // Act - Navigate to signup page
            await HomePage.clickSignupLogin();
            
            // Act - Fill signup form
            await SignupPage.fillSignupForm(userData.name, userData.email);
            await SignupPage.clickSignup();
            
            // Act - Fill account details
            await SignupPage.fillAccountDetails(userData);
            
            // Act - Create account
            await SignupPage.clickCreateAccount();
            
            // Assert - Verify account created
            const isAccountCreated = await SignupPage.isAccountCreatedVisible();
            await expect(isAccountCreated).toBe(true);
            
            // Act - Continue after account creation
            await SignupPage.clickContinue();
            
            // Assert - Verify user is logged in
            const isLoggedIn = await HomePage.isUserLoggedIn();
            await expect(isLoggedIn).toBe(true);
        });

        it('Should delete the created account', async () => {
            // Act - Delete account
            await SignupPage.deleteAccount();
            
            // Assert - Verify account deleted
            const isAccountDeleted = await SignupPage.isAccountDeletedVisible();
            await expect(isAccountDeleted).toBe(true);
            
            // Act - Continue after deletion
            await SignupPage.clickContinue();
        });
    });
});