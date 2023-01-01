import React from 'react'

const SubMenuItem = ({item, action}) => {
  return (
    <button onClick={action} className='py-2 px-5 text-xl tracking-wide hover:font-medium hover:text-slate-800 hover:bg-elm-50 '>
        {item}
    </button>
  )
}

export default SubMenuItem