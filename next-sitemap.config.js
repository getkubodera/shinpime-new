module.exports = {
    siteUrl: 'https://www.shinpi.me',
    generateRobotsTxt: true,
    additionalPaths: async (config) => [
        await config.transform(config, '/about'),
        await config.transform(config, '/books'),
        await config.transform(config, '/'),
        await config.transform(config, '/products'),
    ],
};
