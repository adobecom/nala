/** @module common/steps */
const { Given } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { AnalyticsLogs } = require('../support/classes/analytics_logs');

Then(
    /^I should see analytics data posted in the last (\d+)(?:st|nd|rd|th) log:$/,
    iShouldSeeAnalyticsDataPostedInTheLastIndexLog
);

Then(
    /^I should see analytics data posted in one of the last (\d+) log(?:s|):$/,
    iShouldSeeAnalyticsDataPostedInOneOfTheLastCount
);

Then(
    /^I should see analytics data posted within the last (\d+) log(?:s|):$/,
    iShouldSeeAnalyticsDataPostedWithinTheLastCountLogs
);

Then(
    /^I should see analytics data posted within the last (\d+) log(?:s|) matched with "([^\"]*)"$/,
    iShouldSeeAnalyticsDataPostedWithinTheLastCountLogsMatchedWithEvent
);

Then(
    /^I should see analytics data posted within all log(?:s|) matched with "([^\"]*)"$/,
    iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithEvent
);

Then(
    /^I should see analytics data posted within all log(?:s|) matched with above event order$/,
    iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithThisEventOrder
);

Then(
    /^I should see analytics data posted within all log(?:s|) matched with all events in order "([^\"]*)"$/,
    iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithAllEventsInOrder
);

Then(
    /^I should see analytics data posted to suite "([^\"]*)"$/,
    iShouldSeeAnalyticsDataPostedToSuiteSuiteid
);

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted in the last (\d+)(?:st|nd|rd|th) log:$/
 * ```
 * @param {string} index Index of logs counting backward
 * @param {string[][]} table Table of analytics spec
 */
function iShouldSeeAnalyticsDataPostedInTheLastIndexLog(index, table) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    // wait until the expected log to come
    browser.waitUntil(
        () => {
            try {
                this.analyticsLogs.appendLogs(browser.getLogs('performance'));
            } catch (err) {
                this.log.error(err);
            }
            return this.analyticsLogs.length >= index;
        }, {
            timeout: 30000,
            timeoutMsg: 'Timeout waiting for the count of analytics logs to reach ${index}',
            interval: 1000
        }
    );
    let msgs = this.analyticsLogs.compare(table.hashes(), { ordinal: index });
    expect(msgs).toHaveLength(0, { message: msgs.join('\n') });
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted in one of the last (\d+) log(?:s|):$/
 * ```
 * @param {string} count Number of logs to be examed
 * @param {string[][]} table Table of analytics spec
 */
function iShouldSeeAnalyticsDataPostedInOneOfTheLastCount(count, table) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    try {
        this.analyticsLogs.appendLogs(browser.getLogs('performance'));
    } catch (err) {
        this.log.error(err);
    }
    let msgs = this.analyticsLogs.compare(table.hashes(), {
        range: count,
        all: true
    });
    if (msgs.length > 0) {
        throw msgs.join('\n');
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted within the last (\d+) log(?:s|):$/
 * ```
 * @param {string} count Number of logs to be examined
 * @param {string[][]} table Table of analytics specs
 */
function iShouldSeeAnalyticsDataPostedWithinTheLastCountLogs(count, table) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    try {
        this.analyticsLogs.appendLogs(browser.getLogs('performance'));
    } catch (err) {
        this.log.error(err);
    }
    let msgs = this.analyticsLogs.compare(table.hashes(), {
        range: count,
        all: false
    });
    if (msgs.length > 0) {
        throw msgs.join('\n');
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted within the last (\d+) log(?:s|) matched with "([^\"]*)"$/
 * ```
 * @param {string} count Number of logs to be examined
 * @param {string} event Analytics event to be matched
 */
function iShouldSeeAnalyticsDataPostedWithinTheLastCountLogsMatchedWithEvent(
    count,
    event
) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    try {
        this.analyticsLogs.appendLogs(browser.getLogs('performance'));
    } catch (err) {
        this.log.error(err);
    }
    let wikiAnalyticsData = this.page.wikiAnalyticsData[event];
    console.log(event);
    console.log(wikiAnalyticsData);
    let msgs = this.analyticsLogs.compare(wikiAnalyticsData, {
        range: count,
        all: false
    });
    if (msgs.length > 0) {
        throw msgs.join('\n');
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted within all log(?:s|) matched with "([^\"]*)"$/
 * ```
 * @param {string} event Analytics event to be matched
 */
function iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithEvent(event) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    try {
        this.analyticsLogs.appendLogs(browser.getLogs('performance'));
    } catch (err) {
        this.log.error(err);
    }

    if (event in this.page.wikiAnalyticsData) {
        let wikiAnalyticsData = this.page.wikiAnalyticsData[event];
        // console.log('event: ' + event);
        // console.log('wikiAnalyticsData:');
        // console.log(wikiAnalyticsData);
        let msgs = this.analyticsLogs.compare(wikiAnalyticsData, {
            range: this.analyticsLogs.length,
            all: false
        });
        if (msgs.length > 0) {
            throw msgs.join('\n');
        }
    } else {
        let msg = `Warning: trigger event "${event}" is not found in wiki page table, please remove from test case`;
        console.log(msg);
        this.log.error(msg);
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted within all log(?:s|) matched with all events in order "([^\"]*)"$/
 * ```
 * @param {string} events Analytics events to be matched
 */
function iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithAllEventsInOrder(
    events
) {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();
    try {
        this.analyticsLogs.appendLogs(browser.getLogs('performance'));
    } catch (err) {
        this.log.error(err);
    }

    let eventsArray = events.split(',');
    let matchedEvents = [];
    let notExistingEvents = [];
    var wikiEvents = [];

    for (let key in this.page.wikiAnalyticsData) {
        wikiEvents.push(key);
    }

    for (let event of eventsArray) {
        if (event in this.page.wikiAnalyticsData) {
            matchedEvents.push(event);
            let wikiAnalyticsData = this.page.wikiAnalyticsData[event];
            // console.log(event);
            // console.log(wikiAnalyticsData);
            let msgs = this.analyticsLogs.compare(wikiAnalyticsData, {
                range: this.analyticsLogs.length,
                all: false
            });
            if (msgs.length > 0) {
                throw msgs.join('\n');
            }
        } else {
            notExistingEvents.push(event);
        }
    }

    const isSorted = arr => arr.every((v, i, a) => !i || a[i - 1] <= v);
    console.log('Event order: ' + this.analyticsLogs.eventOrder);
    if (isSorted(this.analyticsLogs.eventOrder)) {
        console.log('Event order is correct');
    } else {
        throw 'Event order is not correct';
    }

    if (notExistingEvents.length > 0) {
        let msg = `Warning: trigger event(s) "${notExistingEvents}" is not found in wiki page table, please remove from test case`;
        console.log(msg);
        this.log.error(msg);
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted within all log(?:s|) matched with above event order$/
 * ```
 */
function iShouldSeeAnalyticsDataPostedWithinAllLogsMatchedWithThisEventOrder() {
    this.analyticsLogs = this.analyticsLogs || new AnalyticsLogs();

    const isSorted = arr => arr.every((v, i, a) => !i || a[i - 1] <= v);
    console.log('Event order: ' + this.analyticsLogs.eventOrder);
    if (isSorted(this.analyticsLogs.eventOrder)) {
        console.log('Event order is correct');
    } else {
        throw 'Event order is not correct';
    }
}

/**
 * Step Definition:
 * ```
 * /^I should see analytics data posted to suite "([^\"]*)"$/
 * ```
 * @param {string} suiteId Adobe Analytics suite ID
 */
function iShouldSeeAnalyticsDataPostedToSuiteSuiteid(suiteId) {
    if (suiteId.includes('adbadobenonacdcprod')) {
        // other suiteIds might sometimes get lost
        // so the important thing is to check for data in adbadobenonacdcprod
        expect(this.analyticsLogs.suiteId.includes(suiteId));
    } else {
        expect(this.analyticsLogs.suiteId).toEqual(suiteId);
    }
}