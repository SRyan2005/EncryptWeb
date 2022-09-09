let videosUl = document.getElementById('videos');
let videoList = [];
let channelId = 'UCW3u7kksReiKE5vgPLDNznQ';

//The below http request fetches the youtube playlist data for the channels videos in json format.
const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=UUW3u7kksReiKE5vgPLDNznQ&key=AIzaSyAghAHiJ3QQhGTj5RGG6aiOOrj_W1b-iWc';
//Playlist Id = UUW3u7kksReiKE5vgPLDNznQ
//API Key = AIzaSyAghAHiJ3QQhGTj5RGG6aiOOrj_W1b-iWc

let fetched = false;
fetch(url)
.then(data=>{return data.json()})
.then(res=>{storeVideoData(res.items)})
.then(rend=>{renderVideos()})

function storeVideoData(inpData) {
    videoList = [];
    for(vid of inpData) {
        let video = {
            title: vid.snippet.title,
            id: vid.snippet.resourceId.videoId,
            description: vid.snippet.description,
        };
        videoList.push(video);
    }
    fetched = true;
}

function renderVideos() {
    let html = ``;
    for(let vid of videoList) {
        let tmp =
        `
        <li>
            <span class="videoContainer">
                <iframe class="video"
                src="https://www.youtube.com/embed/` + vid.id + `" frameborder="0"
                allowfullscreen="true" loading="lazy"></iframe>
            </span>
            <a href="https://www.youtube.com/watch?v=` + vid.id + `">` + vid.title + `</a>
        </li>
        `;
        html += tmp;
    }
    videosUl.innerHTML = html;
}