module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "jest/globals": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react-prop-types": 0,
        "react/prop-types": 0
    }
};
