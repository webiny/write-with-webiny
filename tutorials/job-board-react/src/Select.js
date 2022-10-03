function Select({text, replaceText, open, toggleSelect, children}) {

  return (
    <span className='select'>
      <button onClick={toggleSelect} type="button">
        {replaceText || text} 
        <img src='/down-arrow.png' alt='down arrow'/>
      </button>
      {open &&
        <div className='select__options'>
          {children}
        </div>
      }
    </span>
  )
}

export default Select