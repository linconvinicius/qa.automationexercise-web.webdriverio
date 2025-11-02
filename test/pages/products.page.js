import BasePage from './base.page.js';

/**
 * Products Page Object
 * Contains methods and selectors for products page
 */
class ProductsPage extends BasePage {
    // Selectors
    get searchInput() {
        return '#search_product';
    }

    get searchButton() {
        return '#submit_search';
    }

    get searchedProductsTitle() {
        return '.features_items h2.title';
    }

    get allProducts() {
        return '.features_items .col-sm-4';
    }

    get productNames() {
        return '.features_items .productinfo p';
    }

    get firstProduct() {
        return '.features_items .col-sm-4:nth-child(3)';
    }

    get firstProductAddToCart() {
        return '.features_items .col-sm-4:nth-child(3) .add-to-cart';
    }

    get secondProduct() {
        return '.features_items .col-sm-4:nth-child(4)';
    }

    get secondProductAddToCart() {
        return '.features_items .col-sm-4:nth-child(4) .add-to-cart';
    }

    get firstProductViewDetails() {
        return '.features_items .col-sm-4:nth-child(3) a[href*="/product_details"]';
    }

    get continueShoppingButton() {
        return '.modal-footer .btn-success';
    }

    get viewCartButton() {
        return '.modal-body a[href="/view_cart"]';
    }

    // Product Details Selectors
    get productQuantityInput() {
        return '#quantity';
    }

    get addToCartButton() {
        return 'button.cart';
    }

    get productName() {
        return '.product-information h2';
    }

    get productPrice() {
        return '.product-information span span';
    }

    // Methods
    /**
     * Search for a product
     * @param {string} productName - Product name to search
     */
    async searchProduct(productName) {
        await this.setValue(this.searchInput, productName);
        await this.click(this.searchButton);
    }

    /**
     * Verify searched products title is visible
     * @returns {Promise<boolean>} True if title is visible
     */
    async isSearchedProductsTitleVisible() {
        return await this.isDisplayed(this.searchedProductsTitle);
    }

    /**
     * Get searched products title text
     * @returns {Promise<string>} Title text
     */
    async getSearchedProductsTitle() {
        return await this.getText(this.searchedProductsTitle);
    }

    /**
     * Get all visible products
     * @returns {Promise<Array>} Array of product elements
     */
    async getAllProducts() {
        const products = await $$(this.allProducts);
        return products;
    }

    /**
     * Verify products are visible
     * @returns {Promise<boolean>} True if products are visible
     */
    async areProductsVisible() {
        const products = await this.getAllProducts();
        return products.length > 0;
    }

    /**
     * Get all product names
     * @returns {Promise<Array<string>>} Array of product names
     */
    async getAllProductNames() {
        const nameElements = await $$(this.productNames);
        const names = [];
        
        for (const element of nameElements) {
            const name = await element.getText();
            names.push(name);
        }
        
        return names;
    }

    /**
     * Hover over first product and add to cart
     */
    async addFirstProductToCart() {
        await this.hover(this.firstProduct);
        await browser.pause(500);
        await this.click(this.firstProductAddToCart);
    }

    /**
     * Hover over second product and add to cart
     */
    async addSecondProductToCart() {
        await this.hover(this.secondProduct);
        await browser.pause(500);
        await this.click(this.secondProductAddToCart);
    }

    /**
     * Click Continue Shopping button
     */
    async clickContinueShopping() {
        await this.waitForDisplayed(this.continueShoppingButton);
        await this.click(this.continueShoppingButton);
    }

    /**
     * Click View Cart button
     */
    async clickViewCart() {
        await this.waitForDisplayed(this.viewCartButton);
        await this.click(this.viewCartButton);
    }

    /**
     * Click View Product on first product
     */
    async clickViewProductOnFirst() {
        await this.scrollToElement(this.firstProductViewDetails);
        await this.click(this.firstProductViewDetails);
    }

    /**
     * Set product quantity
     * @param {number} quantity - Quantity to set
     */
    async setProductQuantity(quantity) {
        await this.waitForDisplayed(this.productQuantityInput);
        const input = await $(this.productQuantityInput);
        await input.clearValue();
        await this.setValue(this.productQuantityInput, quantity.toString());
    }

    /**
     * Click Add to Cart button on product details page
     */
    async clickAddToCart() {
        await this.click(this.addToCartButton);
    }

    /**
     * Get product name from details page
     * @returns {Promise<string>} Product name
     */
    async getProductName() {
        return await this.getText(this.productName);
    }

    /**
     * Get product price from details page
     * @returns {Promise<string>} Product price
     */
    async getProductPrice() {
        return await this.getText(this.productPrice);
    }
}

export default new ProductsPage();