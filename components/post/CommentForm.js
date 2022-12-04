import { useAuth } from '@/contexts/AuthContext';
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { Textarea } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const CommentForm = ({setComments, comments, makeFocus=false, postId}) => {
  const {user} = useAuth()
    const commentInputRef = useRef();
    const [body, setBody] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`/api/comments`, {
          body,
          userId: user._id,
          postId,
        });
    
        console.log(data);
        setComments((comments) => [...[data.comment], ...comments]);
        setBody("");
      };

      useEffect(() => {
        makeFocus && commentInputRef.current.focus()
        console.log(makeFocus)
    }, [makeFocus]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex justify-between  items-end py-3 border-t shadow-md bg-white "
    >
      <Textarea
        className="flex-1 text-gray-800 w-full  overflow-y-auto bg-gry-100 p-2 py-1 rounded-sm focus:outline-none"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="Type you message"
        minRows={1}
        maxRows={4}
        size="xl"
        shadow={false}
        fullWidth={true}
        cacheMeasurements={false}
        placeholder="Share your thoughts..."
        ref={commentInputRef}
      />

      <button className="mr-2 " type="submit">
        <PaperAirplaneIcon className=" text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center " />
      </button>
    </form>
  )
}

export default CommentForm