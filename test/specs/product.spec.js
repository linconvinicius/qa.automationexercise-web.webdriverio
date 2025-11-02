import HomePage from '../pages/home.page.js';
import ProductsPage from '../pages/products.page.js';
import CartPage from '../pages/cart.page.js';

/**
 * Product Test Suite
 * Test Case 9: Search Product
 * Test Case 13: Verify Product quantity in Cart
 */
describe('Product Test Suite', () => {
    
    describe('TC09 - Search Product', () => {
        const searchTerm = 'Blue';

        it('Should search for a product successfully', async () => {
            // Arrange
            await HomePage.open();

            // Act - Navigate to products page
            await HomePage.clickProducts();
            
            // Act - Search for product
            await ProductsPage.searchProduct(searchTerm);

            // Assert - Verify searched products title is visible
            const isTitleVisible = await ProductsPage.isSearchedProductsTitleVisible();
            await expect(isTitleVisible).toBe(true);
            
            const title = await ProductsPage.getSearchedProductsTitle();
            await expect(title).toContain('SEARCHED PRODUCTS');
        });

        it('Should display all products related to search', async () => {
            // Act - Get all products
            const areProductsVisible = await ProductsPage.areProductsVisible();
            
            // Assert - Verify products are visible
            await expect(areProductsVisible).toBe(true);
            
            // Assert - Verify product names contain search term
            const productNames = await ProductsPage.getAllProductNames();
            await expect(productNames.length).toBeGreaterThan(0);
            
            // Verify at least one product matches the search term
            const hasMatchingProduct = productNames.some(name => 
                name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            await expect(hasMatchingProduct).toBe(true);
        });
    });

    describe('TC13 - Verify Product Quantity in Cart', () => {
        const quantity = 4;

        it('Should add product with specific quantity to cart', async () => {
            // Arrange
            await HomePage.open();

            // Act - Click on View Product for any product
            await HomePage.clickViewProductOnFirst();
            
            // Act - Increase quantity
            await ProductsPage.setProductQuantity(quantity);
            
            // Act - Add to cart
            await ProductsPage.clickAddToCart();
            
            // Act - View cart
            await ProductsPage.clickViewCart();

            // Assert - Verify product is displayed in cart with exact quantity
            const productQuantity = await CartPage.getProductQuantity(0);
            await expect(parseInt(productQuantity)).toBe(quantity);
        });

        it('Should verify the exact quantity in cart page', async () => {
            // Act - Get product details
            const isQuantityCorrect = await CartPage.verifyProductQuantity(0, quantity);
            
            // Assert - Verify quantity matches
            await expect(isQuantityCorrect).toBe(true);
        });
    });
});