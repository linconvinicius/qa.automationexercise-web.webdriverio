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
            await HomePage.open();

            await HomePage.clickProducts();

            await ProductsPage.searchProduct(searchTerm);

            const isTitleVisible = await ProductsPage.isSearchedProductsTitleVisible();
            await expect(isTitleVisible).toBe(true);
            
            const title = await ProductsPage.getSearchedProductsTitle();
            await expect(title).toContain('SEARCHED PRODUCTS');
        });

        it('Should display all products related to search', async () => {
            const areProductsVisible = await ProductsPage.areProductsVisible();

            await expect(areProductsVisible).toBe(true);

            const productNames = await ProductsPage.getAllProductNames();
            await expect(productNames.length).toBeGreaterThan(0);

            const hasMatchingProduct = productNames.some(name => 
                name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            await expect(hasMatchingProduct).toBe(true);
        });
    });

    describe('TC13 - Verify Product Quantity in Cart', () => {
        const quantity = 4;

        it('Should add product with specific quantity to cart', async () => {
            await HomePage.open();

            await HomePage.clickViewProductOnFirst();

            await ProductsPage.setProductQuantity(quantity);

            await ProductsPage.clickAddToCart();

            await ProductsPage.clickViewCart();

            const productQuantity = await CartPage.getProductQuantity(0);
            await expect(parseInt(productQuantity)).toBe(quantity);
        });

        it('Should verify the exact quantity in cart page', async () => {
            const isQuantityCorrect = await CartPage.verifyProductQuantity(0, quantity);
            
            await expect(isQuantityCorrect).toBe(true);
        });
    });
});