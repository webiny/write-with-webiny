import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const JobCard = ({ job }) => {
    return (
        <div className="max-w-md mx-auto mt-4 shadow-md rounded-md p-6 bg-white flex flex-col justify-between h-full">
            <div>
                <img src={job.image} alt={`${job.company} Logo`} className="mb-4 h-16 w-auto mx-auto" />
                <p className="text-xl font-semibold mb-2">{job.title}</p>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <p className="text-gray-600 mb-2">{job.datePosted}</p>
                <p className="text-gray-600 mb-2">{job.salary}</p>
            </div>
            <ButtonComponent
                onClick={() => window.open(job.jobLink, '_blank')}
                target="_blank"
                rel="noopener noreferrer"
                isPrimary={true} 
                className="text-blue-500 hover:underline"
            >
                View Job
            </ButtonComponent>
        </div>
    );
}

export default JobCard;
