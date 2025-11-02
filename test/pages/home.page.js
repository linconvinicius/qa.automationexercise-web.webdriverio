import BasePage from './base.page.js';

/**
 * Home Page Object
 * Contains methods and selectors for the home page
 */
class HomePage extends BasePage {
    // Selectors
    get signupLoginButton() {
        return 'a[href="/login"]';
    }

    get productsButton() {
        return 'a[href="/products"]';
    }

    get cartButton() {
        return 'a[href="/view_cart"]';
    }

    get logoutButton() {
        return 'a[href="/logout"]';
    }

    get deleteAccountButton() {
        return 'a[href="/delete_account"]';
    }

    get homeButton() {
        return 'a[href="/"]';
    }

    get loggedInUser() {
        return '.shop-menu .fa-user';
    }

    get firstProduct() {
        return '.features_items .col-sm-4:nth-child(3)';
    }

    get firstProductAddToCart() {
        return '.features_items .col-sm-4:nth-child(3) .add-to-cart';
    }

    get firstProductViewProduct() {
        return '.features_items .col-sm-4:nth-child(3) a[href*="/product_details"]';
    }

    get continueShoppingButton() {
        return 'button.btn-success';
    }

    get modalContinueShoppingButton() {
        return '.modal-footer .btn-success';
    }

    get viewCartButton() {
        return '.modal-body a[href="/view_cart"]';
    }

    // Methods
    /**
     * Navigate to home page
     */
    async open() {
        await super.open('http://automationexercise.com');
    }

    /**
     * Click on Signup/Login button
     */
    async clickSignupLogin() {
        await this.click(this.signupLoginButton);
    }

    /**
     * Click on Products button
     */
    async clickProducts() {
        await this.click(this.productsButton);
    }

    /**
     * Click on Cart button
     */
    async clickCart() {
        await this.click(this.cartButton);
    }

    /**
     * Click on Delete Account button
     */
    async clickDeleteAccount() {
        await this.click(this.deleteAccountButton);
    }

    /**
     * Click on Logout button
     */
    async clickLogout() {
        await this.click(this.logoutButton);
    }

    /**
     * Verify if user is logged in
     * @returns {Promise<boolean>} True if logged in
     */
    async isUserLoggedIn() {
        return await this.isDisplayed(this.loggedInUser);
    }

    /**
     * Get logged in username
     * @returns {Promise<string>} Username
     */
    async getLoggedInUsername() {
        return await this.getText(this.loggedInUser);
    }

    /**
     * Hover over first product and click Add to Cart
     */
    async addFirstProductToCart() {
        await this.hover(this.firstProduct);
        await browser.pause(500);
        await this.click(this.firstProductAddToCart);
    }

    /**
     * Click View Product on first product
     */
    async clickViewProductOnFirst() {
        await this.scrollToElement(this.firstProductViewProduct);
        await this.click(this.firstProductViewProduct);
    }

    /**
     * Click Continue Shopping button in modal
     */
    async clickContinueShopping() {
        await this.waitForDisplayed(this.modalContinueShoppingButton);
        await this.click(this.modalContinueShoppingButton);
    }

    /**
     * Click View Cart button in modal
     */
    async clickViewCart() {
        await this.waitForDisplayed(this.viewCartButton);
        await this.click(this.viewCartButton);
    }
}

export default new HomePage();