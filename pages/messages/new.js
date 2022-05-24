import Recommendations from '@/components/explore/Recommendations'
import SearchChat from '@/components/messages/SearchChat'
import AltHeader from '@/components/navs/AltHeader'
import Link from 'next/link'
import React, { useState } from 'react'

const NewMessage = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [recommendedUsers, setRecommendedUsers] = useState([]);

  return (
    <div><AltHeader>
    <p className="">Inbox</p>
    <div className="w-1/3"></div>
    <Link href={"/messages/new"}>
      <a className=' px-5 py-1 bg-burntSienna-50 rounded-full text-base'>
        Next
      </a>
    </Link>
  </AltHeader>
  <SearchChat showSearch={showSearch} setShowSearch={setShowSearch} setRecommendedUsers={setRecommendedUsers} focus={true} />
  <Recommendations recommendedUsers={recommendedUsers} />
  </div>
  )
}

export default NewMessage