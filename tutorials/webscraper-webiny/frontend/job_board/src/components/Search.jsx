import React, { useState, useEffect } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const Search = ({ onSearch, uniqueCompanies }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [datePostedFilter, setDatePostedFilter] = useState('');

    useEffect(() => {
        // Clear company filter when uniqueCompanies changes
        setCompanyFilter('');
    }, [uniqueCompanies]);

    const handleSearch = () => {
        onSearch({
            searchTerm: searchTerm.trim(),
            locationFilter: locationFilter.trim(),
            companyFilter: companyFilter.trim(),
            datePostedFilter: datePostedFilter.trim(),
        });
    };

    return (
        <div className="flex justify-between items-center mb-4 space-x-4 p-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Filter by location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="border p-2"
                />
                <div className="w-40">
                    <select
                        value={companyFilter}
                        onChange={(e) => setCompanyFilter(e.target.value)}
                        className="border p-2 rounded-md"
                        style={{ maxWidth: "10rem" }}
                    >
                        <option value="">Select company</option>
                        {uniqueCompanies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                </div>
                <div className="w-40 ">
                    <select
                        value={datePostedFilter}
                        onChange={(e) => setDatePostedFilter(e.target.value)}
                        className="border p-2"
                    >
                        <option value="" disabled>Select Date Posted</option>
                        <option value="anytime">Anytime</option>
                        <option value="lastDay">Last Day</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastTwoWeeks">Last Two Weeks</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastTwoMonths">Last Two Months</option>
                    </select>
                </div>
            </div>
            <ButtonComponent
                onClick={handleSearch}
                cssClass="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400 transition"
            >
                Search
            </ButtonComponent>
        </div>
    );
};

export default Search;
