// JobList.jsx
import React, { useEffect, useState } from 'react';
import { JobCard, Search } from '../components';
import { useQuery } from '@apollo/client';
import { LIST_WEB_SCRAPERS_QUERY } from '../api/scraper';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [uniqueCompanies, setUniqueCompanies] = useState([]);
    const { loading, error, data } = useQuery(LIST_WEB_SCRAPERS_QUERY);

    useEffect(() => {
        if (data) {
            setJobs(data.listWebScrapers?.data || []);
            setFilteredJobs(data.listWebScrapers?.data || []);

            // Extract unique company names
            const companies = [...new Set(data.listWebScrapers?.data?.map((job) => job.company))];
            setUniqueCompanies(companies);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleSearch = ({ searchTerm, locationFilter, companyFilter, datePostedFilter }) => {
        const filtered = jobs.filter((job) => {
            const titleMatch = searchTerm ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

            if (titleMatch) {
                const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
                const companyMatch = !companyFilter || job.company.toLowerCase().includes(companyFilter.toLowerCase());

                if (datePostedFilter === 'anytime') {
                    return locationMatch && companyMatch;
                }

                if (job.datePosted.includes('h')) {
                    // If 'h' is present, classify as "Last Day"
                    return locationMatch && companyMatch && datePostedFilter === 'lastDay';
                }

                if (job.datePosted.includes('d')) {
                    // If 'd' is present, convert to number
                    const numericValue = parseInt(job.datePosted);

                    if (numericValue < 1) {
                        return false; // Exclude jobs with non-positive numeric values
                    } else if (numericValue < 7) {
                        // Classify as "Last Week"
                        return locationMatch && companyMatch && datePostedFilter === 'lastWeek';
                    } else if (numericValue < 14) {
                        // Classify as "Last Two Weeks"
                        return locationMatch && companyMatch && datePostedFilter === 'lastTwoWeeks';
                    } else if (numericValue < 30) {
                        // Classify as "Last Month"
                        return locationMatch && companyMatch && datePostedFilter === 'lastMonth';
                    } else {
                        // Classify as "Last Two Months"
                        return locationMatch && companyMatch && datePostedFilter === 'lastTwoMonths';
                    }
                }

                // If no 'h' or 'd', default to numeric value
                return locationMatch && companyMatch;

            }

            return false;
        });

        setFilteredJobs(filtered || []);
    };

    return (
        <div className="container mx-auto px-16 py-8">
            <Search onSearch={handleSearch} uniqueCompanies={uniqueCompanies} />
            <div className="flex flex-wrap justify-start -mx-4 items-stretch">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <div key={index} className="w-1/4 mb-8 px-2">
                            <JobCard job={job} className="flex-1 h-full" />
                        </div>
                    ))
                ) : (
                    <p>No matching jobs found.</p>
                )}
            </div>
            <div className="flex justify-center mt-4">
                {/* Pagination component */}
            </div>

        </div>
    );
};

export default JobList;
