import HomePage from '../pages/home.page.js';
import ProductsPage from '../pages/products.page.js';
import CartPage from '../pages/cart.page.js';

/**
 * Cart Test Suite
 * Test Case 12: Add Products in Cart
 * Test Case 17: Remove Products From Cart
 */
describe('Cart Test Suite', () => {
    
    describe('TC12 - Add Products in Cart', () => {
        let firstProductDetails;
        let secondProductDetails;

        it('Should add first product to cart', async () => {
            await HomePage.open();

            await HomePage.clickProducts();

            await ProductsPage.addFirstProductToCart();

            await ProductsPage.clickContinueShopping();

            await browser.pause(500);
        });

        it('Should add second product to cart', async () => {
            await ProductsPage.addSecondProductToCart();

            await ProductsPage.clickViewCart();

            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain('/view_cart');
        });

        it('Should verify both products are added to cart', async () => {
            const cartItemCount = await CartPage.getCartItemCount();

            await expect(cartItemCount).toBeGreaterThanOrEqual(2);
        });

        it('Should verify first product details in cart', async () => {
            firstProductDetails = await CartPage.getProductDetails(0);

            await expect(firstProductDetails.name).toBeTruthy();
            await expect(firstProductDetails.price).toBeTruthy();
            await expect(firstProductDetails.quantity).toBeTruthy();
            await expect(firstProductDetails.totalPrice).toBeTruthy();

            await expect(parseInt(firstProductDetails.quantity)).toBe(1);
        });

        it('Should verify second product details in cart', async () => {
            secondProductDetails = await CartPage.getProductDetails(1);

            await expect(secondProductDetails.name).toBeTruthy();
            await expect(secondProductDetails.price).toBeTruthy();
            await expect(secondProductDetails.quantity).toBeTruthy();
            await expect(secondProductDetails.totalPrice).toBeTruthy();

            await expect(parseInt(secondProductDetails.quantity)).toBe(1);
        });

        it('Should verify total price calculation for first product', async () => {
            const expectedTotal = CartPage.calculateExpectedTotal(
                firstProductDetails.price, 
                parseInt(firstProductDetails.quantity)
            );

            await expect(firstProductDetails.totalPrice).toBe(expectedTotal);
        });

        it('Should verify total price calculation for second product', async () => {
            const expectedTotal = CartPage.calculateExpectedTotal(
                secondProductDetails.price, 
                parseInt(secondProductDetails.quantity)
            );

            await expect(secondProductDetails.totalPrice).toBe(expectedTotal);
        });
    });

    describe('TC17 - Remove Products From Cart', () => {
        let initialProductName;

        it('Should navigate to home and add products to cart', async () => {
            await HomePage.open();

            await HomePage.clickProducts();

            await ProductsPage.addFirstProductToCart();

            await ProductsPage.clickContinueShopping();

            await ProductsPage.addSecondProductToCart();

            await ProductsPage.clickViewCart();

            const cartItemCount = await CartPage.getCartItemCount();
            await expect(cartItemCount).toBeGreaterThanOrEqual(2);
        });

        it('Should get the name of product to be removed', async () => {
            const productNames = await CartPage.getAllProductNames();
            initialProductName = productNames[0];
            
            await expect(initialProductName).toBeTruthy();
        });

        it('Should remove first product from cart', async () => {
            const initialCount = await CartPage.getCartItemCount();

            await CartPage.deleteFirstProduct();

            await browser.pause(1000);

            const finalCount = await CartPage.getCartItemCount();
            await expect(finalCount).toBe(initialCount - 1);
        });

        it('Should verify removed product is no longer in cart', async () => {
            const isProductInCart = await CartPage.isProductInCart(initialProductName);

            await expect(isProductInCart).toBe(false);
        });

        it('Should verify remaining products are still in cart', async () => {
            const remainingCount = await CartPage.getCartItemCount();

            await expect(remainingCount).toBeGreaterThanOrEqual(1);
        });
    });
});