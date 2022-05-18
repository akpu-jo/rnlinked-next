import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SearchTabs({cats, children}) {


  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-3 rounded-full ">
          {cats.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-slate-100 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-elm-400 ring-slate-300 ring-opacity-60',
                  selected
                    ? 'bg-slate-900 shadow'
                    : 'text-slate-600 bg-slate-200 hover:bg-white/[0.12] hover:text-white'
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
