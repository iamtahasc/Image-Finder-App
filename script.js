const button = document.getElementById("searchBtn");
const viewMoreBtn = document.getElementById("viewMoreBtn");
const gallery = document.getElementById("gallery");
let page=1;
let totalPages = 0;
let keyword = "";

async function fetchImages(keyword, pageNo) {
    let accessKey = "nrjSMFln1u_ZhttSaNIe_Il6FAEiz8WPXq4EZSOtabE";
    document.getElementById("loader").style.display="block";
    try {
        let response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}`);
        let data = await response.json();
        let result = data.results;
        totalPages = data.total_pages;
        // console.log(data);
        
        if (pageNo === 1) {
            gallery.innerHTML = "";
        }

        result.forEach((image) => {
            const imgCard = `<div class="card">
                                <img src=${image.urls.small} alt=${image.description} />
                            </div>`;
            gallery.innerHTML += imgCard;
        });

        if (page < totalPages) {
            viewMoreBtn.style.display = "block";
        } else {
            viewMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.log("Can't Load Images : ", error);
    } finally{
        document.getElementById("loader").style.display="none";
    }
}

const getKeyword = () => {
    keyword = document.getElementById("searchInput").value;
    if (keyword === "") {
        gallery.innerHTML = "";
        alert("Please Enter a Keyword");
        viewMoreBtn.style.display = "none";
        return;
    }
    page = 1;
    gallery.innerHTML = "";
    fetchImages(keyword, page);
}

const viewMore = () => {
    page++;
    fetchImages(keyword, page);
}

button.addEventListener("click", getKeyword);
viewMoreBtn.addEventListener("click", viewMore);