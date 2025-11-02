/**
 * User Data Factory
 * Generates random user data for testing
 */

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
function generateRandomString(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Generate a random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random email
 * @returns {string} Random email
 */
function generateRandomEmail() {
    const timestamp = Date.now();
    const randomString = generateRandomString(5);
    return `test_${randomString}_${timestamp}@test.com`;
}

/**
 * Generate a random phone number
 * @returns {string} Random phone number
 */
function generateRandomPhoneNumber() {
    return `+1${generateRandomNumber(1000000000, 9999999999)}`;
}

/**
 * Generate a random date of birth
 * @returns {Object} Date of birth object with day, month, year
 */
function generateRandomDateOfBirth() {
    const day = generateRandomNumber(1, 28).toString();
    const month = generateRandomNumber(1, 12).toString();
    const year = generateRandomNumber(1950, 2000).toString();
    
    return {
        day,
        month,
        year
    };
}

/**
 * Generate complete user data
 * @returns {Object} Complete user data object
 */
export function generateUser() {
    const firstName = generateRandomString(6);
    const lastName = generateRandomString(8);
    
    return {
        name: `${firstName} ${lastName}`,
        email: generateRandomEmail(),
        title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
        password: 'Test@123',
        dateOfBirth: generateRandomDateOfBirth(),
        newsletter: true,
        specialOffers: true,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        company: 'Test Company Inc',
        address1: `${generateRandomNumber(100, 9999)} Test Street`,
        address2: `Apt ${generateRandomNumber(1, 999)}`,
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: generateRandomNumber(10000, 99999).toString(),
        mobileNumber: generateRandomPhoneNumber()
    };
}

/**
 * Generate minimal user data (only required fields)
 * @returns {Object} Minimal user data object
 */
export function generateMinimalUser() {
    return {
        name: generateRandomString(10),
        email: generateRandomEmail(),
        password: 'Test@123'
    };
}

/**
 * Generate invalid user data for negative testing
 * @returns {Object} Invalid user data object
 */
export function generateInvalidUser() {
    return {
        name: '',
        email: 'invalid-email',
        password: '123'
    };
}