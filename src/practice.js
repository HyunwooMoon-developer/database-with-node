/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

//searching Amazong products

//SELECT product_id, name, price, category
//FROM amazong_products
//WHERE name ILIKE '%holo%';   <-- LIKE is sensitive(uppercase, lowercase)


function searchByProduceName(searchTerm){
knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ilike', `%${searchTerm}%`)
    .then(result => {
    console.log(result)
    });
}

searchByProduceName('holo');


//Paginating Amazong products

//SELECT product_id, name, price, category
//FROM amazong_products
//LIMIT 10
//OFFSET 30;

function paginateProducts(page){
    const productsPerPage = 10
    const offset = productsPerPage*(page -1);
    knexInstance
        .select('product_id',"name","price","category")
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result);
        })
}

paginateProducts(2);


//Filter Amazong products that have images

//SELECT product_id, name, price, category, image
//FROM amazong_products
//WHERE image IS NOT NULL;

function getProductsWithImage(){
    knexInstance
        .select('product_id','name','price','category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}

getProductsWithImage();

//Find the most popular Whopipe videos

//SELECT video_name, region, count(date_viewed) AS views
//FROM whopipe_video_views
//WHERE date_viewed > (now() - '30 days' :: INTERVAL)
//GROUP BY video_name, region
//ORDER BY region ASC, views DESC;

function mostPopularVideosForDays(days){
    knexInstance
        .select('video_name', 'region')
        .count('date_viewed as views')
        .where(
            'date_viewed',
            '>',
            knexInstance.raw(`now() - '?? days'::interval`, days)
        )
        .from('whopipe_video_views')
        .groupBy('video_name', 'region')
        .orderBy([
            {column : 'region' , order: 'asc'},
            {column : 'views', order : 'desc'},
        ])
        .then(result => {
            console.log(result)
        })
}

mostPopularVideosForDays(30);