import './styles.css';
import Hero from './Hero';
import { useState } from 'react';
import JobCard from './JobCard';

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [jobLevel, setJobLevel] = useState([])
  const [jobType, setJobType] = useState([])
  const [jobStation, setJobStation] = useState([])

  return (
    <div className="app">
      <Hero 
        searchValue={searchValue}
        setSearchValue = {setSearchValue}
        jobLevel={jobLevel}
        setJobLevel={setJobLevel}
        jobStation={jobStation}
        setJobStation={setJobStation}
        jobType={jobType}
        setJobType={setJobType}
      />
      <div className='jobs wrapper'>
        <JobCard 
          title='JavaScript developer'
          station='Remote'
          type='Full-time'
          level='Entery level'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin nulla turpis, ac convallis ligula euismod ut. Sed volutpat ac ligula a consectetur. Aenean ultrices finibus tellus, sit amet aliquet orci.'
        />
      </div>
    </div>
  );
}

export default App;
