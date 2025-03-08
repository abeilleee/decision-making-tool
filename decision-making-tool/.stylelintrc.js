module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-clean-order/error',
        'stylelint-config-idiomatic-order',
    ],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {},
};
