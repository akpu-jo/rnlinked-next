import React from 'react'
import { PostCard } from '../post/PostCard'

export const Timeline = ({posts}) => {

  return (
      <div className=' pb-20'>
      {posts?.map((post, i) => (
          <PostCard key={post._id} post={post} />
      ))}
          </div>
  )
}
