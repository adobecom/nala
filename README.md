# janus
Test Automation Framework for the Milo Helix Project

The framework is currently based on WDIO v7. See docs [here](https://webdriver.io/docs/api).

## Development Environment

* [Node.JS](https://nodejs.org/) Please install the latest version of NodeJS.
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)

    ```npm install --global yarn```
* [Handpick](https://www.npmjs.com/package/handpick)

    ```npm install --global handpick```


## Install Dependencies

* [Install IDE and Plugins](https://milo.adobe.com/wiki/test-automation/development-setup)
* [Setting up the janus project](https://milo.adobe.com/wiki/test-automation/janus-project-setup)
* In the project directory, run the command

    ```yarn install```

## Run

For example, test @desc-marquee on Milo prod environment

```node run milo -p prod -t @desc-marquee```

To override the default profile and settings, for example, use Firefox browser

```node run milo -p prod -t @desc-marquee -b firefox```

To run a matrix of configurations, for example, run test @desc-marquee on \[chrome, firefox\] x \[fr, jp\]

```node matrix milo --tags @desc-marquee --browsers chrome,firefox --locales fr,jp```

If async execution is desired, add `--async`.

For more info, see [Wiki](https://milo.adobe.com/wiki/test-automation/test-automation-framework)
