import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { PostCard } from "../post/PostCard";

export const UserPosts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const loadPosts = async () => {
    const { data } = await axios.get(`api/posts?userId=${user._id}`);
    console.log(data.posts);
    setPosts(data.posts);
  };
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Tab.Panel>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </Tab.Panel>
  );
};
