import BasePage from './base.page.js';

/**
 * Signup/Login Page Object
 * Contains methods and selectors for signup and login functionality
 */
class SignupPage extends BasePage {
    // Selectors - Signup Form
    get signupNameInput() {
        return 'input[data-qa="signup-name"]';
    }

    get signupEmailInput() {
        return 'input[data-qa="signup-email"]';
    }

    get signupButton() {
        return 'button[data-qa="signup-button"]';
    }

    // Selectors - Account Information
    get titleMr() {
        return '#id_gender1';
    }

    get titleMrs() {
        return '#id_gender2';
    }

    get nameInput() {
        return '#name';
    }

    get emailInput() {
        return '#email';
    }

    get passwordInput() {
        return '#password';
    }

    get daySelect() {
        return '#days';
    }

    get monthSelect() {
        return '#months';
    }

    get yearSelect() {
        return '#years';
    }

    get newsletterCheckbox() {
        return '#newsletter';
    }

    get specialOffersCheckbox() {
        return '#optin';
    }

    // Selectors - Address Information
    get firstNameInput() {
        return '#first_name';
    }

    get lastNameInput() {
        return '#last_name';
    }

    get companyInput() {
        return '#company';
    }

    get address1Input() {
        return '#address1';
    }

    get address2Input() {
        return '#address2';
    }

    get countrySelect() {
        return '#country';
    }

    get stateInput() {
        return '#state';
    }

    get cityInput() {
        return '#city';
    }

    get zipcodeInput() {
        return '#zipcode';
    }

    get mobileNumberInput() {
        return '#mobile_number';
    }

    get createAccountButton() {
        return 'button[data-qa="create-account"]';
    }

    // Selectors - Messages and Actions
    get accountCreatedMessage() {
        return 'h2[data-qa="account-created"]';
    }

    get continueButton() {
        return 'a[data-qa="continue-button"]';
    }

    get accountDeletedMessage() {
        return 'h2[data-qa="account-deleted"]';
    }

    // Methods
    /**
     * Fill signup form with name and email
     * @param {string} name - User name
     * @param {string} email - User email
     */
    async fillSignupForm(name, email) {
        await this.setValue(this.signupNameInput, name);
        await this.setValue(this.signupEmailInput, email);
    }

    /**
     * Click signup button
     */
    async clickSignup() {
        await this.click(this.signupButton);
    }

    /**
     * Select gender title
     * @param {string} gender - 'Mr' or 'Mrs'
     */
    async selectGender(gender) {
        if (gender.toLowerCase() === 'mr') {
            await this.click(this.titleMr);
        } else {
            await this.click(this.titleMrs);
        }
    }

    /**
     * Fill account details
     * @param {Object} userData - User data object
     */
    async fillAccountDetails(userData) {
        // Gender and basic info
        await this.selectGender(userData.title);
        await this.setValue(this.passwordInput, userData.password);
        
        // Date of birth
        await this.selectByValue(this.daySelect, userData.dateOfBirth.day);
        await this.selectByValue(this.monthSelect, userData.dateOfBirth.month);
        await this.selectByValue(this.yearSelect, userData.dateOfBirth.year);

        // Newsletter and offers
        if (userData.newsletter) {
            await this.selectCheckbox(this.newsletterCheckbox);
        }
        if (userData.specialOffers) {
            await this.selectCheckbox(this.specialOffersCheckbox);
        }

        // Address information
        await this.setValue(this.firstNameInput, userData.firstName);
        await this.setValue(this.lastNameInput, userData.lastName);
        await this.setValue(this.companyInput, userData.company);
        await this.setValue(this.address1Input, userData.address1);
        await this.setValue(this.address2Input, userData.address2);
        await this.selectByValue(this.countrySelect, userData.country);
        await this.setValue(this.stateInput, userData.state);
        await this.setValue(this.cityInput, userData.city);
        await this.setValue(this.zipcodeInput, userData.zipcode);
        await this.setValue(this.mobileNumberInput, userData.mobileNumber);
    }

    /**
     * Click Create Account button
     */
    async clickCreateAccount() {
        await this.click(this.createAccountButton);
    }

    /**
     * Click Continue button
     */
    async clickContinue() {
        await this.waitForDisplayed(this.continueButton);
        await this.click(this.continueButton);
    }

    /**
     * Delete account
     */
    async deleteAccount() {
        const deleteButton = 'a[href="/delete_account"]';
        await this.waitForDisplayed(deleteButton);
        await this.click(deleteButton);
    }

    /**
     * Verify account created message is visible
     * @returns {Promise<boolean>} True if message is visible
     */
    async isAccountCreatedVisible() {
        return await this.isDisplayed(this.accountCreatedMessage);
    }

    /**
     * Verify account deleted message is visible
     * @returns {Promise<boolean>} True if message is visible
     */
    async isAccountDeletedVisible() {
        return await this.isDisplayed(this.accountDeletedMessage);
    }
}

export default new SignupPage();