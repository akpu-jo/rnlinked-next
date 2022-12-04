import React from 'react'
import { PostCard } from '../post/PostCard'

export const Timeline = ({posts}) => {

  return (
      <>
      {posts.map((post, i) => (
          <PostCard key={post._id} post={post} />
      ))}
          </>
  )
}
