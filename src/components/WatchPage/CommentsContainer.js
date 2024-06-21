import React, { useState, useEffect,  useRef, useCallback, memo } from 'react'
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BeatLoader } from 'react-spinners';
// import { useSearchParams } from 'react-router-dom';


const CommentsContainer = ({ videoId, comments, getMoreComments, isLoading }) => {
  const [openCommentId, setOpenCommentId] = useState(null);
  // const [searchParam] = useSearchParams()

  const observer = useRef()
  const lastCommentContainer = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getMoreComments()
      }
    })
    console.log(node)
    if (node) observer.current.observe(node)

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, getMoreComments])

  
  useEffect(() => {

  }, [videoId])
  

  const toggleCommentReply = (commentId) => {
    setOpenCommentId(openCommentId === commentId ? null : commentId);
  }

  return (
    <div>
      <h1 className='font-bold font-poppins text-left text-3xl'>Comments</h1>
      <div className='my-3'>
        {comments?.map((eComment, index) => {
          if (comments.length === index + 1) {
            return <div ref={lastCommentContainer} className='flex text-left my-4' key={eComment.id}>
              {console.log('if', eComment.id)}
              <img className='rounded-full h-[50px] w-[50px] mr-3 object-cover' src={eComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div className=''>
                <h5 className='font-bold font-poppins'>{eComment.snippet.topLevelComment.snippet?.authorDisplayName}</h5>
                <h6>{eComment.snippet.topLevelComment.snippet.textDisplay}</h6>
                {eComment.snippet?.totalReplyCount > 0 && (<div className='flex m-3 cursor-pointer' onClick={() => toggleCommentReply(eComment.id)}>
                  {openCommentId === eComment.id ? <GoTriangleUp style={{ color: "blue", fontSize: "30px" }} /> : <GoTriangleDown style={{ color: "blue", fontSize: "30px" }} />}
                  {eComment?.snippet.totalReplyCount > 0 && <span className='font-bold'>View {eComment?.replies?.comments?.length} Replies</span>}
                </div>)}
                {openCommentId === eComment.id && eComment.snippet.totalReplyCount > 0 && (
                  <div>
                    {eComment.replies?.comments?.map((eReply) => (
                      <div className='flex m-4'>
                        <img className='rounded-full h-[50px] w-[50px] mr-3 object-cover' src={eReply?.snippet?.authorProfileImageUrl} alt="" />
                        <div>
                          <p className='font-bold font-poppins'>{eReply?.snippet?.authorDisplayName}</p>
                          <p>{eReply?.snippet?.textDisplay}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          } else {
            return <div className='flex text-left my-4' key={eComment.id}>
              <img className='rounded-full h-[50px] w-[50px] mr-3 object-cover' src={eComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div className=''>
                <h5 className='font-bold font-poppins'>{eComment.snippet.topLevelComment.snippet?.authorDisplayName}</h5>
                <h6>{eComment.snippet.topLevelComment.snippet.textDisplay}</h6>
                {eComment.snippet?.totalReplyCount > 0 && (<div className='flex m-3 cursor-pointer' onClick={() => toggleCommentReply(eComment.id)}>
                  {openCommentId === eComment.id ? <GoTriangleUp style={{ color: "blue", fontSize: "30px" }} /> : <GoTriangleDown style={{ color: "blue", fontSize: "30px" }} />}
                  {eComment?.snippet.totalReplyCount > 0 && <span className='font-bold'>View {eComment?.replies?.comments?.length} Replies</span>}
                </div>)}
                {openCommentId === eComment.id && eComment.snippet.totalReplyCount > 0 && (
                  <div>
                    {eComment.replies?.comments?.map((eReply) => (
                      <div className='flex m-4'>
                        <img className='rounded-full h-[50px] w-[50px] mr-3 object-cover' src={eReply?.snippet?.authorProfileImageUrl} alt="" />
                        <div>
                          <p className='font-bold font-poppins'>{eReply?.snippet?.authorDisplayName}</p>
                          <p>{eReply?.snippet?.textDisplay}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          }

        })}
      </div>
      {isLoading && <BeatLoader color='blue'/>}
    </div>
  );
}

export default memo(CommentsContainer);

