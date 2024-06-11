import React, { useState, useEffect, useRef, useCallback } from 'react'
import { COMMENTS_API, GOOGLE_API_KEY } from '../../utils/constantsAPI'
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BeatLoader } from 'react-spinners';


const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [openCommentId, setOpenCommentId] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const filterUniqueComment = (commentsArray) => {
    let uniqueComments = []
    let uniqueCommentId = new Set();

    commentsArray.forEach(comment => {
      if (!uniqueCommentId.has(comment.id)) {
        uniqueComments.push(comment)
        uniqueCommentId.add(comment.id)
      }
    });

    return uniqueComments
  }

  const observer = useRef()
  const lastCommentContainer = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreComments()
      }
    })
    console.log(node)
    if (node) observer.current.observe(node)

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPageToken])

  const fetchMoreComments = async () => {
    try {
      setIsLoading(true)
      const data = await fetch(COMMENTS_API + `${videoId}&textFormat=plainText&part=replies&maxResults=10&key=${GOOGLE_API_KEY}&pageToken=${nextPageToken}`)
      const json = await data.json()
      setComments((prevState) => filterUniqueComment([...prevState, ...json?.items]))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComments();
    setComments([])
    // eslint-disable-next-line
  }, [videoId]);

  async function getComments() {
    try {
      setIsLoading(true)
      const data = await fetch(COMMENTS_API + `${videoId}&textFormat=plainText&part=replies&maxResults=50&key=${GOOGLE_API_KEY}`);
      const json = await data.json();
      setComments((prevState) => filterUniqueComment([...prevState, ...json?.items]))
      setNextPageToken(json?.nextPageToken)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

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

export default CommentsContainer;

