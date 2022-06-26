<div align="center">
<a href="https://nanite-systems.net/" target="blank">
  <img src="https://nanite-systems.net/images/ns.colored.svg" width="200" alt="Nest Logo" />
</a>

![version](https://img.shields.io/github/package-json/v/nanite-systems/auth)
[![issues](https://img.shields.io/github/issues/nanite-systems/auth)](https://github.com/nanite-systems/auth/issues)
[![dependecies](https://img.shields.io/librariesio/github/nanite-systems/auth)](https://libraries.io/github/nanite-systems/auth)
[![license](https://img.shields.io/github/license/nanite-systems/auth)](https://github.com/nanite-systems/auth/blob/main/LICENSE)

</div>

## Description

Authentication service that validates service ids against Census in a secure way using Bcrypt hashing.

## Requirements

- NodeJS v16

## Installation

```bash
# configuration
$ cp .env.example .env

# install dependencies
$ yarn install
```

## Running the service

```bash
# development
$ yarn start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

All NS projects are [Apache-2.0 licensed](LICENSE).
