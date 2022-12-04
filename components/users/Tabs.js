import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import axios from 'axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({cats, children}) {

  let [categories] = useState({
    Articles: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  })

  return (
    <div className="w-full max-w-lg px-2 sm:px-0">
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
                    : 'text-slate-600 hover:bg-white/[0.12] hover:text-white'
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
