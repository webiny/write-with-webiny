import { useEffect, useState } from 'react'
import Select from './Select'
import Search from './Search'
import Modal from './Modal'; 
import PostJob from './PostJob';

function Hero({
  searchValue,
  setSearchValue,
  jobType,
  jobStation,
  jobLevel, 
  setJobLevel, 
  setJobType, 
  setJobStation,
  queryToRefresh,
  onSearch
}) {
  const jobLevelOptions = ['Entry level', 'Intermediate', 'Senior']
  const jobTypeOptions = ['Full-time', 'Part-time', 'Contract']
  const jobStationOptions = ['Remote', 'Hybrid', 'On-site']

  const [openSelect, setOpenSelect] = useState({
    jobLevel: false, 
    jobType: false, 
    jobStation: false
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selected, setSelected] = useState([])

  // Adding checked checkbox to the state and removing unchecked checkbox from the state
  const handleChange = (e, state, setState) => {
    let isChecked = e.target.checked;
    if(isChecked) setState([...state, e.target.value])
    else setState(state.filter((option) => option !== e.target.value))
  }

   // Keeping checkbox checked even after a render 
   useEffect(() => {
    let checkboxes = document.getElementsByClassName('chk')
      for(let i = 0; i < checkboxes.length; i++) {
        if(selected.includes(checkboxes[i].value)) {
          checkboxes[i].checked = true
        }
      }
  }, [openSelect, selected])

  const toggleJobLevelSelect = () => {
    setOpenSelect({
      jobLevel: !openSelect.jobLevel, 
      jobType: false, 
      jobStation: false
    })
    setSelected(jobLevel)
  }

  const toggleJobTypeSelect = () => {
    setOpenSelect({
      jobLevel: false, 
      jobType: !openSelect.jobType, 
      jobStation: false
    })
    setSelected(jobType)
  }

  const toggleJobStationSelect = () => {
    setOpenSelect({
      jobLevel: false, 
      jobType: false, 
      jobStation: !openSelect.jobStation
    })
    setSelected(jobStation)
  }

  return (
    <>
      <div className='hero'>
        <div className='wrapper'>
          <header>
            <h1>Job Board</h1>
            <button onClick={() => setModalIsOpen(true)}>Post Job</button>
          </header>
          <h2>Find Your Dream Job. Start Searching</h2>
          <div className='hero__searchNfilter'>
            <Search 
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
              onSearch={onSearch}/>
 
            <Select 
              text='Job Level'
              open={openSelect.jobLevel}
              toggleSelect={toggleJobLevelSelect}
            >
              {jobLevelOptions.map((option, i) => 
                <div key={i}>
                  <input 
                    type='checkbox' 
                    id={option} 
                    value={option} 
                    className='chk'
                    onChange={(e) => handleChange(e, jobLevel, setJobLevel)}/>
                  <label htmlFor={option}>{option}</label>
                </div>
              )}
            </Select>

            <Select 
              text='Job station'
              open={openSelect.jobStation}
              toggleSelect={toggleJobStationSelect}
            >
              {jobStationOptions.map((option, i) => 
                <div key={i}>
                  <input 
                    type='checkbox' 
                    id={option} 
                    value={option} 
                    className='chk'
                    onChange={(e) => handleChange(e, jobStation, setJobStation)}/>
                  <label htmlFor={option}>{option}</label>
                </div>
              )}
            </Select>

            <Select 
              text='Job Type'
              open={openSelect.jobType}
              toggleSelect = {toggleJobTypeSelect}
            >
              {jobTypeOptions.map((option, i) => 
                <div key={i}>
                  <input 
                    type='checkbox' 
                    id={option} 
                    value={option} 
                    className='chk'
                    onChange={(e) => handleChange(e, jobType, setJobType)}/>
                  <label htmlFor={option}>{option}</label>
                </div>
              )}
            </Select>
          </div>
        </div>
      </div>

      <Modal 
        open={modalIsOpen} 
        onClose={() => setModalIsOpen(false)}
        modalLable='Post a Job'
      >
        <PostJob 
          jobLevelOptions={jobLevelOptions}
          jobTypeOptions={jobTypeOptions}
          jobStationOptions={jobStationOptions}
          closeModal={() => setModalIsOpen(false)}
          queryToRefresh={queryToRefresh}
        />
      </Modal>
    </>
  )
}

export default Hero