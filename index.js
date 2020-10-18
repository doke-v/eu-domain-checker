const axios = require('axios');
const CronJob = require('cron').CronJob;

const URL = 'https://eurid.eu/en/das/?domain=';
const DEFAULT_CRON_EXPRESSION = '0 0 * * *';
const DEFAULT_STATUS = 'AVAILABLE';

class EuDomainChecker {
    constructor(domain) {
        if (!domain) {
            throw new Error('Missing domain name.');
        }
        this.domain = encodeURIComponent(domain);
    }

    fetchDomainData() {
        return axios.get(URL + this.domain).then(({ data }) => data);
    }

    check({
        status = DEFAULT_STATUS,
        cronExpression = DEFAULT_CRON_EXPRESSION,
    }) {
        return new Promise((resolve) => {
            const job = new CronJob(cronExpression, () => {
                this.fetchDomainData()
                    .then(data => {
                        if (data.status === status) {
                            job.stop();
                            resolve(data);
                        }
                    })
                    .catch(e => {
                        console.error(e.message);
                    });
            });
            job.start();
        });
    }

    checkOnce() {
        return this.fetchDomainData();
    }

    isAvailable() {
        return this.fetchDomainData().then(({ status }) => status === DEFAULT_STATUS);
    }
}

module.exports = EuDomainChecker;
