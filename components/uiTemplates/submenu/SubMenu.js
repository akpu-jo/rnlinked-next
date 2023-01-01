import React, { useEffect, useRef } from 'react'

const SubMenu = ({children, show, onClickOutside}) => {

  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)){
        onClickOutside && onClickOutside()
      }
    }
  
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])
  
  if (!show) return null

  return (
    <div ref={ref} className=' absolute top-full right-0 z-5 whitespace-nowrap bg-white rounded-sm shadow-2xl ring-1 ring-slate-100'>
        {children}
    </div>
  )
}

export default SubMenu