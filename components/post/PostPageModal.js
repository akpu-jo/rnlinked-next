import React from 'react'
import PostPageTemplate from './PostPageTemplate'

const PostPageModal = ({open, close, post}) => {
    if (!open) return null;

  return (
    <>
     <div
        onClick={close}
        className="fixed z-50 inset-0 bg-elephant-600 bg-opacity-60 "
      />
      <div className=" rounded-t-lg py-6 shadow-xl">
        <PostPageTemplate post={post} />
      </div>
    </>
  )
}

export default PostPageModal