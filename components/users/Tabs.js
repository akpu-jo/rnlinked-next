import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import axios from 'axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({cats, children}) {

  return (
    <div className="w-full max-w-lg px-2 sm:px-0 mx-auto">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/10 rounded-xl ">
          {cats.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-elm-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-elm-400 ring-slate-300 ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-slate-600 hover:bg-elm-800/10 hover:font-semibold'
                )
              }
            >
              <div onClick={() => console.log(category)}>

              {category}
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
              {children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
