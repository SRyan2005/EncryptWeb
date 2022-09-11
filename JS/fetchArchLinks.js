let pagesUl = document.getElementById('pages');
let pagesNav = document.getElementById('pageNav');
let videoList = [];
let pages = [];
let currentPageIndx = 0;
let numOfPages;
let vidPerPage = 10;
let channelId = 'UCW3u7kksReiKE5vgPLDNznQ';

//The below http request fetches the youtube playlist data for the channels videos in json format.
const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=UUW3u7kksReiKE5vgPLDNznQ&key=AIzaSyAghAHiJ3QQhGTj5RGG6aiOOrj_W1b-iWc';
//Playlist Id = UUW3u7kksReiKE5vgPLDNznQ
//API Key = AIzaSyAghAHiJ3QQhGTj5RGG6aiOOrj_W1b-iWc

let fetched = false;
fetch(url)
.then(data=>{return data.json()})
.then(res=>{main(res.items)})

function main(inpData) {
    storeVideoData(inpData);
    pagination();
    console.log(pages);
    renderVideos();
    addPageLinks();
}

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
    let finalHtml = ``;
    let cnt = 0;
    for(let page of pages) {
        let pageHtml = `
        <li class="`+((cnt===0)?`active`:`inactive`)+`" id="pageNo`+cnt+`">
            <ul class="videoList">
        `;
        cnt++;
        for(let v of page) {
            pageHtml += `
            <li>
                <span class="videoContainer">
                    <iframe class="video"
                    src="https://www.youtube.com/embed/` + v.id + `" frameborder="0"
                    allowfullscreen="true" loading="lazy"></iframe>
                </span>
                <a href="https://www.youtube.com/watch?v=` + v.id + `">` + v.title + `</a>
            </li>
            `;
        }
        pageHtml += `
            </ul>
        </li>
        `;
        finalHtml += pageHtml;
    }
    pagesUl.innerHTML = finalHtml;
}

function addPageLinks() {
    let finalHtml = `
    `;
    for(let i=0; i<pages.length; i++) {
        finalHtml+=`
        <a onclick="switchPage(`+i+`)" class="`+((i==currentPageIndx)?`current`:``)+`">`+(i+1)+`</a>
        `;
    }
    pagesNav.innerHTML = finalHtml;
}

function pagination() {
    let pageCnt = 0;
    pages = [[]];
    for(let i=0; i<videoList.length; i++) {
        if(pages[pageCnt].length>=vidPerPage) {
            pageCnt++;
            pages.push([]);
        }
        pages[pageCnt].push(videoList[i]);
    }
    numOfPages = pages.length;
}

function switchPage(indx) {
    let currentPage = document.getElementById('pageNo'+currentPageIndx);
    currentPage.classList.remove('active');
    currentPage.classList.add('inactive');
    currentPageIndx = indx;
    let nextPage = document.getElementById('pageNo'+indx);
    nextPage.classList.remove('inactive');
    nextPage.classList.add('active');
    addPageLinks();
}