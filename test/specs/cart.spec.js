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
            // Arrange
            await HomePage.open();

            // Act - Navigate to products page
            await HomePage.clickProducts();
            
            // Act - Add first product to cart
            await ProductsPage.addFirstProductToCart();
            
            // Act - Continue shopping
            await ProductsPage.clickContinueShopping();

            // Assert - Verify modal closed (implicit by continuing)
            await browser.pause(500);
        });

        it('Should add second product to cart', async () => {
            // Act - Add second product to cart
            await ProductsPage.addSecondProductToCart();
            
            // Act - View cart
            await ProductsPage.clickViewCart();

            // Assert - Verify we are on cart page
            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain('/view_cart');
        });

        it('Should verify both products are added to cart', async () => {
            // Act - Get cart items count
            const cartItemCount = await CartPage.getCartItemCount();
            
            // Assert - Verify two products are in cart
            await expect(cartItemCount).toBeGreaterThanOrEqual(2);
        });

        it('Should verify first product details in cart', async () => {
            // Act - Get first product details
            firstProductDetails = await CartPage.getProductDetails(0);
            
            // Assert - Verify product details exist
            await expect(firstProductDetails.name).toBeTruthy();
            await expect(firstProductDetails.price).toBeTruthy();
            await expect(firstProductDetails.quantity).toBeTruthy();
            await expect(firstProductDetails.totalPrice).toBeTruthy();
            
            // Assert - Verify quantity is 1
            await expect(parseInt(firstProductDetails.quantity)).toBe(1);
        });

        it('Should verify second product details in cart', async () => {
            // Act - Get second product details
            secondProductDetails = await CartPage.getProductDetails(1);
            
            // Assert - Verify product details exist
            await expect(secondProductDetails.name).toBeTruthy();
            await expect(secondProductDetails.price).toBeTruthy();
            await expect(secondProductDetails.quantity).toBeTruthy();
            await expect(secondProductDetails.totalPrice).toBeTruthy();
            
            // Assert - Verify quantity is 1
            await expect(parseInt(secondProductDetails.quantity)).toBe(1);
        });

        it('Should verify total price calculation for first product', async () => {
            // Arrange
            const expectedTotal = CartPage.calculateExpectedTotal(
                firstProductDetails.price, 
                parseInt(firstProductDetails.quantity)
            );

            // Assert - Verify total price matches calculation
            await expect(firstProductDetails.totalPrice).toBe(expectedTotal);
        });

        it('Should verify total price calculation for second product', async () => {
            // Arrange
            const expectedTotal = CartPage.calculateExpectedTotal(
                secondProductDetails.price, 
                parseInt(secondProductDetails.quantity)
            );

            // Assert - Verify total price matches calculation
            await expect(secondProductDetails.totalPrice).toBe(expectedTotal);
        });
    });

    describe('TC17 - Remove Products From Cart', () => {
        let initialProductName;

        it('Should navigate to home and add products to cart', async () => {
            // Arrange
            await HomePage.open();

            // Act - Navigate to products page
            await HomePage.clickProducts();
            
            // Act - Add first product to cart
            await ProductsPage.addFirstProductToCart();
            
            // Act - Continue shopping
            await ProductsPage.clickContinueShopping();
            
            // Act - Add second product to cart
            await ProductsPage.addSecondProductToCart();
            
            // Act - View cart
            await ProductsPage.clickViewCart();

            // Assert - Verify cart has products
            const cartItemCount = await CartPage.getCartItemCount();
            await expect(cartItemCount).toBeGreaterThanOrEqual(2);
        });

        it('Should get the name of product to be removed', async () => {
            // Act - Get first product name
            const productNames = await CartPage.getAllProductNames();
            initialProductName = productNames[0];
            
            // Assert - Verify product name exists
            await expect(initialProductName).toBeTruthy();
        });

        it('Should remove first product from cart', async () => {
            // Arrange
            const initialCount = await CartPage.getCartItemCount();

            // Act - Delete first product
            await CartPage.deleteFirstProduct();
            
            // Wait for deletion to complete
            await browser.pause(1000);

            // Assert - Verify product count decreased
            const finalCount = await CartPage.getCartItemCount();
            await expect(finalCount).toBe(initialCount - 1);
        });

        it('Should verify removed product is no longer in cart', async () => {
            // Act - Check if product still exists
            const isProductInCart = await CartPage.isProductInCart(initialProductName);
            
            // Assert - Verify product is removed
            await expect(isProductInCart).toBe(false);
        });

        it('Should verify remaining products are still in cart', async () => {
            // Act - Get remaining product count
            const remainingCount = await CartPage.getCartItemCount();
            
            // Assert - Verify at least one product remains
            await expect(remainingCount).toBeGreaterThanOrEqual(1);
        });
    });
});