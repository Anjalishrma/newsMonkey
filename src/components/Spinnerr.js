import React from 'react'
import loading from './Spinner.gif'

const Spinnerr=()=> { 
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    ) 
}

export default Spinnerr
