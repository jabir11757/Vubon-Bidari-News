const loadCategories = async () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = (categories) => {
    // console.log(categories)

    for (const category of categories) {
        console.log(category.category_id);
        // const divContainer = document.getElementById('div-container');
        // const categoryList = document.createElement('button');
        // categoryList.classList.add('btn')
        // categoryList.innerHTML = `${category.category_name}`;
        // categoryList.setAttribute("onclick", newsSection(category.category_id));

        // divContainer.appendChild(categoryList);

    }

};



const newsSection = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        // console.log(url)
        .then(res => res.json())
        .then(data => displayNewsSection(data.data))

}






const displayNewsSection = (allNews) => {
    for (const news of allNews) {
        console.log(news)
        const newsContainer = document.getElementById('news-container');
        const newsDiv = document.createElement('div');

        newsDiv.innerHTML = `
                    <div class="d-flex bg-light">
                        <div style="width:20% ;"><img class="img-fluid h-100" src="images/fanush.jpg" alt=""></div>
                        <div style="width:80% ;" class="mt-3 mx-4">
                            <h3 class="fw-bold">The best fashion influencers to follow for sartorial inspiration</h3>
                            <p>From our favourite UK influencers to the best missives from Milan and the coolest New
                                Yorkers, read on some of the
                                best fashion blogs out there, and for even more inspiration, do head to our separate
                                black fashion influencer roundup.Fancy some shopping deals? Check out these amazing
                                sales: Zara Black Friday, ASOS Black
                                Friday, Missoma Black
                                Friday and Gucci Black Friday</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <img style="height: 30px; width: 30px; margin-right: 1vw;" class="rounded-circle"
                                        src="images/fanush.jpg" alt="">
                                    <h5>Name</h5>
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