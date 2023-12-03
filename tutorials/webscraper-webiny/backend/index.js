const puppeteer = require('puppeteer');
const axios = require('axios');
require('dotenv').config();

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.3',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
];

const delayBetweenScrapes = 1000; // Adjust the delay time in milliseconds
const recordsPerDelay = 20; // Adjust the number of records to scrape before the delay

const graphqlApiEndpoint = process.env.GRAPHQL_API_ENDPOINT;
const apiToken = process.env.API_TOKEN;

if (!graphqlApiEndpoint || !apiToken) {
    console.error('Missing GraphQL API endpoint or API token in the .env file');
    process.exit(1);
}

const password = "Brainiedude1$"

    (async () => {
        const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'], });
        const page = await browser.newPage();

        let scrapedCount = 0;
        let jobData = [];
        let jobIdCounter = 1; // Initialize jobData array

        for (userAgent of userAgents) {
            try {

                await page.setUserAgent(userAgent);

                // Navigate to the Glassdoor homepage
                await page.goto('https://www.glassdoor.com/index.htm');
                // console.log(page.title())

                await page.waitForSelector('#inlineUserEmail');

                // Type the email address into the input field
                await page.type('#inlineUserEmail', 'brainiedude@gmail.com');

                // Click on the "Continue with Email" button
                await Promise.all([
                    page.click('.emailButton button[data-test="email-form-button"]')
                ]);

                // Wait for the password input element to be present
                await page.waitForSelector('#inlineUserPassword');

                // Type the password into the input field
                await page.type('#inlineUserPassword', password);


                // Click the "Sign In" button
                await page.click('.gd-ui-button[data-size-variant="default"]');

                // Introduce a delay to ensure the sign-in action takes effect
                await delay(3000);

                // Navigate directly to the job page
                await page.goto('https://www.glassdoor.com/Job/index.htm');

                // Wait for necessary elements to load on the protected page
                await page.waitForSelector('#left-column');
                await page.waitForSelector('.JobsList_jobListItem__JBBUV');


                while (jobData.length <= 101) {
                    // Scrape job data
                    const scrapeJobData = async () => {
                        const jobs = await page.evaluate(() => {
                            const jobsArray = [];
                            const jobElements = document.querySelectorAll('.JobsList_jobListItem__JBBUV');

                            jobElements.forEach((jobElement) => {
                                const titleElement = jobElement.querySelector('.JobCard_seoLink__WdqHZ');
                                const companyElement = jobElement.querySelector('.EmployerProfile_employerName__Xemli');
                                const imageElement = jobElement.querySelector('.EmployerProfile_profileContainer__d5rMb img');
                                const datePostedElement = jobElement.querySelector('.JobCard_listingAge__KuaxZ');
                                const salaryElement = jobElement.querySelector('.JobCard_salaryEstimate___m9kY');
                                const locationElement = jobElement.querySelector('.JobCard_location__N_iYE');
                                const jobLinkElement = jobElement.querySelector('.JobCard_trackingLink__zUSOo');

                                const title = titleElement ? titleElement.textContent.trim() : 'N/A';
                                const company = companyElement ? companyElement.textContent.trim() : 'N/A';
                                const image = imageElement ? imageElement.src : 'N/A';
                                const datePosted = datePostedElement ? datePostedElement.textContent.trim() : 'N/A';
                                const salary = salaryElement ? salaryElement.textContent.trim() : 'N/A';
                                const location = locationElement ? locationElement.textContent.trim() : 'N/A';
                                const jobLink = jobLinkElement ? jobLinkElement.href : 'N/A';


                                jobsArray.push({ title, company, image, datePosted, salary, location, jobLink });
                            });

                            return jobsArray;
                        });
                        return jobs;
                    };

                    // Scrape initial job data
                    jobData = await scrapeJobData();
                    scrapedCount = jobData.length;

                    // Check if the number of records scraped is a multiple of recordsPerDelay
                    if ((scrapedCount - 1) % recordsPerDelay === 0) {
                        console.log(`Waiting for ${delayBetweenScrapes / 1000} seconds before the next batch...`);
                        await page.evaluate(() => {
                            const jobsListElement = document.querySelector('.JobsList_jobsList__Ey2Vo');
                            if (jobsListElement) {
                                const lastChild = jobsListElement.lastElementChild;
                                if (lastChild) {
                                    lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
                                }
                            }
                        });

                        await delay(delayBetweenScrapes);
                    };

                    // Function to load more jobs by clicking the button
                    const loadMoreJobs = async () => {
                        const loadMoreButton = await page.waitForSelector('.JobsList_buttonWrapper__haBp5 [data-size-variant="md"]');
                        if (loadMoreButton) {
                            await loadMoreButton.click();
                            // Wait for the additional jobs to load
                            await delay(5000);

                            // Scrape the new job data after loading more content
                            jobData = await scrapeJobData();

                            console.log(scrapedCount);
                        }
                    };

                    await loadMoreJobs()
                };

                // Map the job data to an object with jobId
                const mappedJobData = jobData.reduce((acc, job) => {
                    acc[jobIdCounter++] = {  // Increment jobId for each job
                        title: job.title,
                        image: job.image,
                        location: job.location,
                        salary: job.salary,
                        company: job.company,
                        datePosted: job.datePosted,
                        jobLink: job.jobLink,
                    };
                    return acc;
                }, {});

                // Send data to GraphQL API
                await sendToGraphqlApi(mappedJobData);
                console.log('Loop finished with jobData.length:', jobData.length);


                // Close the browser
                await browser.close();
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        }

    })();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function sendToGraphqlApi(data) {
    try {
        for (const [jobId, job] of Object.entries(data)) {
            const response = await axios.post(
                graphqlApiEndpoint,
                {
                    query: `
                        mutation CreateWebScraper(
                            $title: String!, 
                            $image: String!, 
                            $location: String!, 
                            $salary: String!, 
                            $company: String!, 
                            $datePosted: String!, 
                            $jobLink: String!
                        ) {
                            createWebScraper(
                                data: {
                                    title: $title, 
                                    image: $image, 
                                    location: $location, 
                                    salary: $salary, 
                                    company: $company, 
                                    datePosted: $datePosted, 
                                    jobLink: $jobLink
                                }
                            ) {
                                data {
                                    id
                                    title
                                    image
                                    location
                                    salary
                                    company
                                    datePosted
                                    jobLink
                                }
                            }
                        }
                    `,
                    variables: {
                        title: job.title || '',
                        image: job.image || '',
                        location: job.location || '',
                        salary: job.salary || '',
                        company: job.company || '',
                        datePosted: job.datePosted || '',
                        jobLink: job.jobLink || '',
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(`JobId: ${jobId}, Id: ${response.data.data.createWebScraper.data.id},GraphQL API response:`, response.data);

            // Now, publish the created web scraper
            await publishWebScraper(response.data.data.createWebScraper.data.id);
        }
    } catch (error) {
        console.error('Error sending data to GraphQL API:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
    }
}


async function publishWebScraper(id) {
    try {
        const publishResponse = await axios.post(
            graphqlApiEndpoint,
            {
                query: `
                    mutation PublishWebScraper($id: ID!) {
                        publishWebScraper(revision: $id) {
                            data{
                                id
                            }
                           
                        }
                    }
                `,
                variables: {
                    id: id,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(publishResponse.data)
        return publishResponse.data;
    } catch (error) {
        console.error('Error publishing web scraper:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        return null;
    }
}