{
  "extends": "@nestjs/eslint-config",
  "root": true,
  "env": {
    "node": true,
    "jest": true
  },
  "ignorePatterns": [".eslintignore"],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
