import React, { useState, useEffect, memo } from 'react';
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BeatLoader } from 'react-spinners';
import useInfiniteScroll from '../../Hooks/useInfiniteScroll';
import { COMMENTS_API } from '../../utils/constantsAPI';

const CommentsContainer = ({ videoId, comments, isLoading, firstNextPageToken }) => {
  const [openCommentId, setOpenCommentId] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  
  
  useEffect(() => {
    setCommentsData(comments);
    // eslint-disable-next-line
  }, [comments]);
  
  const { data, lastElementRef, loading } = useInfiniteScroll(
    COMMENTS_API + `${videoId}&textFormat=plainText&part=replies&maxResults=10&key=${process.env.REACT_APP_API_KEY}`,
    commentsData,
    firstNextPageToken
  );
  
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setCommentsData((prevState) => [...prevState, ...data]);
    }
  }, [data]);


  const toggleCommentReply = (commentId) => {
    setOpenCommentId(openCommentId === commentId ? null : commentId);
  };
  
  return (
    <div>
      <h1 className='font-bold font-poppins text-left text-3xl'>Comments</h1>
      <div className='my-3'>
        {commentsData?.map((eComment, index) => (
          <React.Fragment key={eComment.id}>
            <div ref={index === commentsData.length - 1 ? lastElementRef : null} className='flex text-left my-4'>
              <img className='rounded-full h-[50px] w-[50px] mr-3 object-cover' src={eComment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h5 className='font-bold font-poppins'>{eComment.snippet.topLevelComment.snippet?.authorDisplayName}</h5>
                <h6>{eComment.snippet.topLevelComment.snippet.textDisplay}</h6>
                {eComment.snippet?.totalReplyCount > 0 && (
                  <div className='flex m-3 cursor-pointer' onClick={() => toggleCommentReply(eComment.id)}>
                    {openCommentId === eComment.id ? <GoTriangleUp style={{ color: "blue", fontSize: "30px" }} /> : <GoTriangleDown style={{ color: "blue", fontSize: "30px" }} />}
                    <span className='font-bold'>View {eComment?.replies?.comments?.length} Replies</span>
                  </div>
                )}
                {openCommentId === eComment.id && eComment.snippet.totalReplyCount > 0 && (
                  <div>
                    {eComment.replies?.comments?.map((eReply) => (
                      <div className='flex m-4' key={eReply.id}>
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
          </React.Fragment>
        ))}
      </div>
      {isLoading && <BeatLoader color='blue' />}
      {loading && <BeatLoader color='blue' />}
    </div>
  );
}

export default memo(CommentsContainer);
