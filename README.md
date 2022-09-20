# janus
Test Automation Framework for the Milo Helix Project

The framework is currently based on WDIO v7. See docs [here](https://webdriver.io/docs/api).

Many of the framework files, runner code, common and tools files was originally instituted and copied/shared over from the [Platform UI Adobe Automation Project](https://git.corp.adobe.com/wcms/Platform-UI).  Various files, framework dependencies, common and tool files were updated to reflect only the Milo Helix Project's testing needs.

## Development Environment

* [Node.JS](https://nodejs.org/) (>=14.16)
  Please install the latest version 14 of NodeJS. There are [known issues](https://www.npmjs.com/package/fibers) with version 15 or greater.
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)

    ```npm install --global yarn```
* [Handpick](https://www.npmjs.com/package/handpick)

    ```npm install --global handpick```
* [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) or [OpenJDK](https://jdk.java.net/). Please follow [Adobe Java Standard](https://wiki.corp.adobe.com/display/TechOpsArchitecture/Adobe+Java+Strategy+FAQ#AdobeJavaStrategyFAQ-AdobeStandard). JDK 11 or higher is recommended.


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
