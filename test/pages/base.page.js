/**
 * Base Page Object
 * Contains common methods used across all page objects
 */
export default class BasePage {
    /**
     * Navigate to a specific path
     * @param {string} path - URL path to navigate to
     */
    async open(path = '') {
        await browser.url(path);
    }

    /**
     * Click on an element
     * @param {string} selector - Element selector
     */
    async click(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        await element.scrollIntoView();
        await element.click();
    }

    /**
     * Set value in an input field
     * @param {string} selector - Element selector
     * @param {string} value - Value to set
     */
    async setValue(selector, value) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        await element.scrollIntoView();
        await element.setValue(value);
    }

    /**
     * Get text from an element
     * @param {string} selector - Element selector
     * @returns {Promise<string>} Element text
     */
    async getText(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param {string} selector - Element selector
     * @returns {Promise<boolean>} True if displayed
     */
    async isDisplayed(selector) {
        try {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout: 10000 });
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to be displayed
     * @param {string} selector - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForDisplayed(selector, timeout = 15000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Hover over an element
     * @param {string} selector - Element selector
     */
    async hover(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        await element.scrollIntoView();
        await element.moveTo();
    }

    /**
     * Select checkbox
     * @param {string} selector - Element selector
     */
    async selectCheckbox(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        await element.scrollIntoView();
        
        const isSelected = await element.isSelected();
        if (!isSelected) {
            await element.click();
        }
    }

    /**
     * Select option from dropdown by value
     * @param {string} selector - Element selector
     * @param {string} value - Option value
     */
    async selectByValue(selector, value) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        await element.scrollIntoView();
        await element.selectByAttribute('value', value);
    }

    /**
     * Get element attribute
     * @param {string} selector - Element selector
     * @param {string} attribute - Attribute name
     * @returns {Promise<string>} Attribute value
     */
    async getAttribute(selector, attribute) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        return await element.getAttribute(attribute);
    }

    /**
     * Wait for element to be clickable
     * @param {string} selector - Element selector
     */
    async waitForClickable(selector) {
        const element = await $(selector);
        await element.waitForClickable({ timeout: 15000 });
    }

    /**
     * Scroll to element
     * @param {string} selector - Element selector
     */
    async scrollToElement(selector) {
        const element = await $(selector);
        await element.scrollIntoView();
    }
}