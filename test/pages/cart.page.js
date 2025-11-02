import BasePage from './base.page.js';

/**
 * Cart Page Object
 * Contains methods and selectors for cart page
 */
class CartPage extends BasePage {
    // Selectors
    get cartItems() {
        return '.cart_info tbody tr';
    }

    get cartProductNames() {
        return '.cart_description h4 a';
    }

    get cartProductPrices() {
        return '.cart_price p';
    }

    get cartProductQuantities() {
        return '.cart_quantity button';
    }

    get cartProductTotalPrices() {
        return '.cart_total_price';
    }

    get deleteButtons() {
        return '.cart_quantity_delete';
    }

    get emptyCartMessage() {
        return '#empty_cart';
    }

    get firstProductDeleteButton() {
        return '#product-1 .cart_quantity_delete';
    }

    // Methods
    /**
     * Get all cart items
     * @returns {Promise<Array>} Array of cart item elements
     */
    async getCartItems() {
        const items = await $$(this.cartItems);
        return items.filter(async (item) => {
            const classes = await item.getAttribute('class');
            return !classes || classes.indexOf('cart_menu') === -1;
        });
    }

    /**
     * Get number of items in cart
     * @returns {Promise<number>} Number of items
     */
    async getCartItemCount() {
        const items = await this.getCartItems();
        return items.length;
    }

    /**
     * Get all product names in cart
     * @returns {Promise<Array<string>>} Array of product names
     */
    async getAllProductNames() {
        const nameElements = await $$(this.cartProductNames);
        const names = [];
        
        for (const element of nameElements) {
            const name = await element.getText();
            names.push(name);
        }
        
        return names;
    }

    /**
     * Get all product prices in cart
     * @returns {Promise<Array<string>>} Array of product prices
     */
    async getAllProductPrices() {
        const priceElements = await $$(this.cartProductPrices);
        const prices = [];
        
        for (const element of priceElements) {
            const price = await element.getText();
            prices.push(price);
        }
        
        return prices;
    }

    /**
     * Get all product quantities in cart
     * @returns {Promise<Array<string>>} Array of product quantities
     */
    async getAllProductQuantities() {
        const quantityElements = await $$(this.cartProductQuantities);
        const quantities = [];
        
        for (const element of quantityElements) {
            const quantity = await element.getText();
            quantities.push(quantity);
        }
        
        return quantities;
    }

    /**
     * Get all product total prices in cart
     * @returns {Promise<Array<string>>} Array of product total prices
     */
    async getAllProductTotalPrices() {
        const totalPriceElements = await $$(this.cartProductTotalPrices);
        const totalPrices = [];
        
        for (const element of totalPriceElements) {
            const totalPrice = await element.getText();
            totalPrices.push(totalPrice);
        }
        
        return totalPrices;
    }

    /**
     * Get product details by index
     * @param {number} index - Product index (0-based)
     * @returns {Promise<Object>} Product details object
     */
    async getProductDetails(index) {
        const names = await this.getAllProductNames();
        const prices = await this.getAllProductPrices();
        const quantities = await this.getAllProductQuantities();
        const totalPrices = await this.getAllProductTotalPrices();

        return {
            name: names[index],
            price: prices[index],
            quantity: quantities[index],
            totalPrice: totalPrices[index]
        };
    }

    /**
     * Verify product is in cart
     * @param {string} productName - Product name to verify
     * @returns {Promise<boolean>} True if product is in cart
     */
    async isProductInCart(productName) {
        const names = await this.getAllProductNames();
        return names.some(name => name.includes(productName));
    }

    /**
     * Delete product from cart by index
     * @param {number} index - Product index (0-based)
     */
    async deleteProductByIndex(index) {
        const deleteButtons = await $$(this.deleteButtons);
        if (deleteButtons[index]) {
            await deleteButtons[index].scrollIntoView();
            await deleteButtons[index].click();
            await browser.pause(1000); // Wait for deletion animation
        }
    }

    /**
     * Delete first product from cart
     */
    async deleteFirstProduct() {
        await this.deleteProductByIndex(0);
    }

    /**
     * Verify cart is empty
     * @returns {Promise<boolean>} True if cart is empty
     */
    async isCartEmpty() {
        try {
            await this.waitForDisplayed(this.emptyCartMessage, 5000);
            return true;
        } catch (error) {
            const items = await this.getCartItems();
            return items.length === 0;
        }
    }

    /**
     * Get quantity for specific product
     * @param {number} index - Product index
     * @returns {Promise<string>} Product quantity
     */
    async getProductQuantity(index) {
        const quantities = await this.getAllProductQuantities();
        return quantities[index];
    }

    /**
     * Verify product quantity
     * @param {number} index - Product index
     * @param {number} expectedQuantity - Expected quantity
     * @returns {Promise<boolean>} True if quantity matches
     */
    async verifyProductQuantity(index, expectedQuantity) {
        const quantity = await this.getProductQuantity(index);
        return parseInt(quantity) === expectedQuantity;
    }

    /**
     * Calculate expected total price
     * @param {string} price - Unit price (e.g., "Rs. 500")
     * @param {number} quantity - Quantity
     * @returns {string} Expected total price
     */
    calculateExpectedTotal(price, quantity) {
        const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
        const total = numericPrice * quantity;
        return `Rs. ${total}`;
    }

    /**
     * Verify product total price
     * @param {number} index - Product index
     * @param {string} expectedTotal - Expected total price
     * @returns {Promise<boolean>} True if total matches
     */
    async verifyProductTotalPrice(index, expectedTotal) {
        const totalPrices = await this.getAllProductTotalPrices();
        return totalPrices[index] === expectedTotal;
    }
}

export default new CartPage();