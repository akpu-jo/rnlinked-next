import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PostCard } from '../post/PostCard'

export const Timeline = ({posts}) => {

    // const loadPosts = async() => {
    //     const {data} = await axios.get(`api/posts`)
    //     // console.log(data)
    //     setPosts(data.posts)
    // }
    //     useEffect(() => {
    //         loadPosts()
    //     }, [])

  return (
      <>
      {/* <pre className=' hidden md:block'>{JSON.stringify(posts, null, 4)}</pre> */}
      {posts.map((post, i) => (
          <PostCard key={post._id} post={post} />
      ))}
          </>
  )
}
