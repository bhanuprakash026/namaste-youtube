import React, { useState, useEffect } from 'react'
import { COMMENTS_API, GOOGLE_API_KEY } from '../utils/constantsAPI'
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";


const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [openCommentId, setOpenCommentId] = useState(null);

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const data = await fetch(COMMENTS_API + `${videoId}&textFormat=plainText&part=replies&maxResults=100&key=${GOOGLE_API_KEY}`);
    const json = await data.json();
    setComments(json.items || []);
    console.log(comments)
  }

  const toggleCommentReply = (commentId) => {
    setOpenCommentId(openCommentId === commentId ? null : commentId);
  }

  return (
    <div className='flex flex-col items-start'>
      <h1>Comments</h1>
      <div className='commentContainer flex flex-col my-4'>
        {comments.map((eComment) => (
          <div className='flex my-3' key={eComment.id}>
            <img className='h-12 w-12 round rounded-full' src={eComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div className='pl-3 flex flex-col items-start flex-wrap w-[500px]'>
              <h5>{eComment.snippet.topLevelComment.snippet?.authorDisplayName}</h5>
              <h6 className=''>{eComment.snippet.topLevelComment.snippet.textDisplay}</h6>
              {eComment.snippet?.totalReplyCount > 0 && (<div className='flex mt-2 bg-slate-100 hover:bg-[#ddddfc] px-3 py-1 hover:cursor-pointer round rounded-3xl' onClick={() => toggleCommentReply(eComment.id)}>
                {openCommentId === eComment.id ? <GoTriangleUp style={{ color: "blue", fontSize: "30px" }} /> : <GoTriangleDown style={{ color: "blue", fontSize: "30px" }} />}
                {eComment?.snippet.totalReplyCount > 0 && <span>{eComment?.replies?.comments?.length} Replies</span>}
              </div>)}
              {openCommentId === eComment.id && eComment.snippet.totalReplyCount > 0 && (
                <div className='m-3'>
                  {eComment.replies?.comments?.map((eReply) => (
                    <div className='ml-3 flex items-start m-5'>
                      <img src={eReply?.snippet?.authorProfileImageUrl} alt=""/>
                      <div className='flex flex-col items-start ml-3'>
                        <p>{eReply?.snippet?.authorDisplayName}</p>
                        <p>{eReply?.snippet?.textDisplay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsContainer;

