import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <Link href="/">
        <div className='header'>
            <p>*</p>
            <h1>CSS-TRICKS</h1>
        </div>
    </Link>
  )
}

export default Header