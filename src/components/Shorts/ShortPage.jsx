import React from 'react'

const shortsData = [
    // Example data
    {
        id: 1,
        videoUrl: 'https://example.com/video1.mp4',
        title: 'Funny Cat Video',
        likes: 1020,
        comments: 140,
    },
    {
        id: 2,
        videoUrl: 'https://example.com/video2.mp4',
        title: 'Amazing Trick Shots',
        likes: 850,
        comments: 98,
    },
    // Add more short video data here...
];


const video = {
    "kind": "youtube#video",
    "etag": "jRXfG8fNjilEcCKVWKUQCrtCPTo",
    "id": "T-q30Kwy8sY",
    "snippet": {
        "publishedAt": "2024-07-07T13:48:36Z",
        "channelId": "UCaooZvg_gT3gagtkbqJCxMw",
        "title": "When you boss is your wife 🙂\u200d↕️ #ravisivateja #comedy #viraajitha #infinitumshorts",
        "description": "Subscribe for more videos :)",
        "thumbnails": {
            "default": {
                "url": "https://i.ytimg.com/vi/T-q30Kwy8sY/default.jpg",
                "width": 120,
                "height": 90
            },
            "medium": {
                "url": "https://i.ytimg.com/vi/T-q30Kwy8sY/mqdefault.jpg",
                "width": 320,
                "height": 180
            },
            "high": {
                "url": "https://i.ytimg.com/vi/T-q30Kwy8sY/hqdefault.jpg",
                "width": 480,
                "height": 360
            },
            "standard": {
                "url": "https://i.ytimg.com/vi/T-q30Kwy8sY/sddefault.jpg",
                "width": 640,
                "height": 480
            },
            "maxres": {
                "url": "https://i.ytimg.com/vi/T-q30Kwy8sY/maxresdefault.jpg",
                "width": 1280,
                "height": 720
            }
        },
        "channelTitle": "Infinitum Theatre",
        "tags": [
            "A date with Boss",
            "A date with boss season 2",
            "A date with boss web series season 2",
            "A date with boss season 2 web series",
            "ravi siva teja viraajitha",
            "ravi siva teja short films",
            "viraajitha",
            "virajitha sharma short film",
            "ravi siva teja",
            "virajitha ravi siva teja short film",
            "telugu short films",
            "telugu love short films",
            "date with boss",
            "latest telugu short films 2024",
            "telugu short films 2024",
            "latest short films telugu 2024",
            "ravi siva teja virajitha latest",
            "A date with boss season 2 ep 2"
        ],
        "categoryId": "24",
        "liveBroadcastContent": "none",
        "defaultLanguage": "te",
        "localized": {
            "title": "When you boss is your wife 🙂\u200d↕️ #ravisivateja #comedy #viraajitha #infinitumshorts",
            "description": "Subscribe for more videos :)"
        },
        "defaultAudioLanguage": "te"
    },
    "contentDetails": {
        "duration": "PT28S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "false",
        "licensedContent": true,
        "contentRating": {},
        "projection": "rectangular"
    },
    "statistics": {
        "viewCount": "386425",
        "likeCount": "28540",
        "favoriteCount": "0",
        "commentCount": "28"
    }
}

const ShortsPage = () => {
    const { snippet, statistics } = video;
    return (
        <iframe className='h-[20%]'
        width="500"
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>


    )


};

export default ShortsPage;