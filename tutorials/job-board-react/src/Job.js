import { useState } from "react"
import Input from "./Input"

function Job({
  station,
  level,
  type,
  description,
  noOfApplicants,
  closeModal,
  id
}) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [website, setWebsite] = useState('')
  const [linkedInProfile, setlinkedInProfile] = useState('')

  return (
    <div className='job'>
      <div>
        <span className="dot">{station}</span>
        <span className='job__applicants'>
          {noOfApplicants || 0} appliacants
        </span>
      </div>
      <div>
        <img src="/briefcase.png" alt="briefcase"/>
        <span className="dot">{type}</span>
        <span>{level}</span>
      </div>
      <div>
        <h2>Description</h2>
        <p>{description}</p>
      </div>

      <div className="job__apply">
        <h2>Submit Your Application</h2>
        <form name='applicationForm'>
          <Input
            label='Full name'
            required={true}
            value={name}
            setValue={(e) => setName(e.target.value)}
          />
          <Input
            label='Email'
            required={true}
            type='email'
            value={email}
            setValue={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Phone'
            value={phoneNumber}
            removeArrows={true}
            type='number'
            setValue={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            label='Website'
            required={true}
            value={website}
            setValue={(e) => setWebsite(e.target.value)}
          />
          <Input
            label='LinkedIn Profile'
            required={true}
            value={linkedInProfile}
            setValue={(e) => setlinkedInProfile(e.target.value)}
          />
          <button>Submit Application</button>
        </form>
      </div>
    </div>
  )
}

export default Job