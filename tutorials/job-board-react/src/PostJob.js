import { useState } from "react"
import Input from "./Input"
import Select from "./Select"

function PostJob({jobLevelOptions, jobTypeOptions, jobStationOptions, closeModal, queryToRefresh}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [jobType, setJobType] = useState('')
  const [jobStation, setJobStation] = useState('')
  const [jobLevel, setJobLevel] = useState('')
  const [openSelect, setOpenSelect] = useState({
    jobLevel: false, 
    jobType: false, 
    jobStation: false
  })

  return (
    <form name='postJob' className="postJob">
        <Input
          label='Job title'
          required={true}
          value={title}
          setValue={(e) => setTitle(e.target.value)}
        />

        <div className="postJob__description">
          <label htmlFor="desc">Job decscription</label>
          <textarea
            id='desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="postJob__selects">
          <Select
            text='Job Level'
            replaceText={jobLevel}
            open={openSelect.jobLevel}
            toggleSelect = {
              () => setOpenSelect({...openSelect, jobLevel: !openSelect.jobLevel})
            }
          >
            {jobLevelOptions.map((option) => (
              <span 
                key={option}
                className="postJob__option"
                onClick={() => {
                  setJobLevel(option)
                  setOpenSelect({...openSelect, jobLevel: !openSelect.jobLevel})
                }}
              >
                {option}
              </span>
            ))}
          </Select>

          <Select
            text='Job Station'
            replaceText={jobStation}
            open={openSelect.jobStation}
            toggleSelect = {
              () => setOpenSelect({...openSelect, jobStation: !openSelect.jobStation})
            }
          >
            {jobStationOptions.map((option) => (
              <span 
                key={option}
                className="postJob__option" 
                onClick={() => {
                  setJobStation(option)
                  setOpenSelect({...openSelect, jobStation: !openSelect.jobStation})
                }}
              >
                {option}
              </span>
            ))}
          </Select>

          <Select
            text='Job Type'
            replaceText={jobType}
            open={openSelect.jobType}
            toggleSelect = {
              () => setOpenSelect({...openSelect, jobType: !openSelect.jobType})
            }
          >
            {jobTypeOptions.map((option) => (
              <span 
                key={option}
                className="postJob__option"
                onClick={() => {
                  setJobType(option)
                  setOpenSelect({...openSelect, jobType: !openSelect.jobType})
                }}
              >
                {option}
              </span>
            ))}
          </Select>
        </div>
        <button>Post</button>
      </form>
)
}

export default PostJob