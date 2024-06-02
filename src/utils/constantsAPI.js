export const GOOGLE_API_KEY = "AIzaSyB_PiF37026pXVW_eDGvT4V5tplStX-P3A" //"AIzaSyB_PiF37026pXVW_eDGvT4V5tplStX-P3A"
export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&type=video&key=" +GOOGLE_API_KEY
export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const COMMENTS_API = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId="
export const LIVE_CHAT_COUNT = 25
export const VIDEO_DETAILS = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='
export const SUGGESTIONS_VIDEOS_API = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&key='+ GOOGLE_API_KEY