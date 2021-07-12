# Automated tests for MOP QA task

## Description


This repository contains both API and UI automated tests. Both API and UI automated tests require nodejs being installed.
Besides nodejs, the reporting requires `allure` framework being installed. Since allure requires Java to create reports, Java is also a requirement.

Java version installed:
```
$ java --version
openjdk 11.0.11 2021-04-20
OpenJDK Runtime Environment (build 11.0.11+9-post-Debian-1deb10u1)
OpenJDK 64-Bit Server VM (build 11.0.11+9-post-Debian-1deb10u1, mixed mode, sharing)

```

NodeJS version installed:
```
$ node --version
v14.17.2
```

Installing allure on Debian based Linux distros:
```
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update 
sudo apt-get install allure
```

Installing allure on macOS:
```
brew install allure
```

UI automated tests are currently configured to execute via Chrome browser, so make sure you also have Google Chrome latest version installed.


## API
API integration tests are implemented using Mocha and Axios npm packages. Programming language for API tests is JavaScript.

To run the API tests navigate to the API directory and then run the npm command to run tests:
```
cd API
npm install
npm test
```

To open the report after test execution is completed (make sure you are still in API directory):
```
npm run allure:report
```

To clear up the report run:
```
rm -rf allure-results/*
```


### Test report
Allure automated test report for api integration:
https://mop-qa-api-integration-test-report.netlify.app/


## UI
UI automated tests are implemented using WebdriverIO + Typescript + Cucumber.

To run the UI automated tests first navigate to the UI directory then run the npm test command:
```
cd UI
npm install
npm test
```

To open the report after test execution is completed (make sure you are still in UI directory):
```
npm run allure:report
```

To clear up the report run:
```
rm -rf allure-results/*
```


### Test report
Allure automated test report for UI:
https://mop-qa-ui-automation-report.netlify.app/


## Test plan
The plan is to implement continuous testing via Docker and have both UI and API automated tests executing on daily basis in Docker containers.
There is an option to use Jenkins instead of Docker, as a continuous testing tool. But there is also an option to use both Jenkins and Docker together for continuous testing. So this can be decided later on in the future, because both options have pros and cons.
Also, plan is to extend the test coverage, since both UI and API tests don't cover all setions of the system.
Tests currently cover login and registration sections for both UI and the API.

Currently the tests will run only on local test development machine, but when continuous testing is implemented, then tests will be executed remotely on a machine where report will be automatically generated and publicly available.

To enable tests to be executed in different environments,there will be an option to choose whether to run it in DEV, QA, STAGE, PROD or CI. This will just mean adding new npm script in package.json for every new environment.

Here is an example of how this parametrization will look like for stage and ci environments:
```
"scripts": {
    "test": "./node_modules/.bin/wdio wdio.conf.ts",
    "test:ci": "./node_modules/.bin/wdio wdio.ci.conf.ts",
    "test:stage": "./node_modules/.bin/wdio wdio.stage.conf.ts",
}
```