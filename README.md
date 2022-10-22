## Description

A Cloud Native application built using NestJS framework

## Bootstraping ORM
Prisma.io
## Third Party Libraries

Bcrypt: For password hasing
Passport.js: For Basic Token Auth 

## Installation

Clone repository to your local machine 

Run following commands:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Hosting

This app is hosted on AWS EC2 instance

## Github actions

Validation on PR for node unit test and packer file validation.
Build packer on push to origin/main


## License

Nest is [MIT licensed](LICENSE).
