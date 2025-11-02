export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.spec.js'
    ],
    exclude: [],
    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        },
        acceptInsecureCerts: true
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://automationexercise.com',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // Removido services: ['chromedriver']
    // WebdriverIO vai gerenciar automaticamente
    
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // Hooks
    before: async function () {
        await browser.maximizeWindow();
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};