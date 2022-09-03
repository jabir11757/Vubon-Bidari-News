const loadCategories = async () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = (categories) => {

    const divContainer = document.getElementById('div-container');
    for (const category of categories) {
        // console.log(category.category_name)
        // const categoryDiv = document.createElement('div');
        divContainer.innerHTML = `
        <button onclick="newsSection('${category.category_id}')" class="btn btn-light">${category.category_name}</button>
        `
        // divContainer.appendChild(categoryDiv);
    }

};



const newsSection = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsSection(data.data))


}






const displayNewsSection = (allNews) => {
    for (const news of allNews) {
        // console.log(news)
        const newsContainer = document.getElementById('news-container');
        const newsDiv = document.createElement('div');

        newsDiv.innerHTML = `
                    <div class="d-flex bg-light">
                        <div style="width:20% ;"><img class="img-fluid h-100" src="${news.thumbnail_url}" alt=""></div>
                        <div style="width:80% ;" class="mt-3 mx-4">
                            <h3 class="fw-bold">${news.title}</h3>
                            <p>${news.details}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <img style="height: 30px; width: 30px; margin-right: 1vw;" class="rounded-circle"
                                        src="${news.author.img}" alt="">
                                    <h6>${news.author.name}</h6>
                                </div>
                                <button class="btn btn-light">Next</button>
                            </div>
                        </div>
                    </div>
        `
        newsDiv.classList.add('row');
        newsContainer.appendChild(newsDiv);
    }
}
newsSection();

loadCategories();