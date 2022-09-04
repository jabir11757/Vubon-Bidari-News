const loadCategories = async () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(err => console.log(err))
}

const displayCategories = (categories) => {

    const divContainer = document.getElementById('div-container');
    divContainer.classList.add('d-flex');
    divContainer.classList.add('justify-content-between');
    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button onclick="newsSection('${category.category_id}')" class="btn btn-light mt-4">${category.category_name}</button>
`
        divContainer.appendChild(categoryDiv);

    }

};


const newsSection = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsSection(data.data))
}


const displayNewsSection = (allNews) => {


    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    for (const news of allNews) {
        toggleSpinner(false);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
                <div class="d-flex bg-light mt-4">
                    <div style="width:20% ;"><img class="img-fluid h-100" src="${news.thumbnail_url}" alt=""></div>
                    <div style="width:80% ;" class="mt-4 mx-4">
                        <h3 class="fw-bold">${news.title}</h3>
                        <p class="my-4">${news.details.length > 300 ? news.details.slice(0, 300) && news.details.slice(0, 300) + "  ..." : " "}</p>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img style="height: 30px; width: 30px; margin-right: 1vw;" class="rounded-circle"
                                    src="${news.author.img}" alt="">
                                <h6>${news.author.name}</h6>
                            </div>
                            <button onclick="showNewsModal('${news._id}')" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#showModal">Show Detail</button>
                            <button class="btn btn-light">Next</button>
                        </div>
                    </div>
                </div>
        `
        newsDiv.classList.add('row');
        newsContainer.appendChild(newsDiv);
    }
}

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}

const showNewsModal = (news_id) => {
    // console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayShowModal(data.data[0]))

}
const displayShowModal = (detalInfo) => {
    // console.log(detalInfo);
    const modalHeader = document.getElementById('showModalLabel');
    modalHeader.innerText = detalInfo.rating.badge;

    const modalDetail = document.getElementById('modal-detail');
    modalDetail.classList.add('modal-body');
    modalDetail.innerHTML = `
    <p>Author Name: ${detalInfo.author.name ? detalInfo.author.name : "No Author Name Found"}</p>
    <p>Publish Date: ${detalInfo.author.publish_date ? detalInfo.author.publish_date : "No Date Found"}</p>
    <p>Total Views: ${detalInfo.total_view ? detalInfo.total_view : "No Views"}</p>
    `


}
newsSection();

loadCategories();