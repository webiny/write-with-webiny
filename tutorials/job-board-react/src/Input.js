function Input({placehoder, type, value, setValue, label, required, removeArrows}) {
  return (
    <div className="input">
      <label className={required && 'input__addSymbol'}>{label}</label>
      <input 
        className={removeArrows ? 'removeArrows' : ''}
        value={value}
        type={type || 'text'}
        required={required}
        placeholder={placehoder}
        onChange={setValue}
      />
    </div>
  )
}

export default Input