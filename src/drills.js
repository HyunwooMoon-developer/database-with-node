/* eslint-disable no-undef */
require('dotenv').config()
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

// drill - 1 get all items that contain text searching

//SELECT id, name, price, category
//FROM shopping_list
//WHERE name ILKIE '%burger%' ;

function searchByproductName(searchTerm){
    db
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ilike', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        })       
}

searchByproductName('burger');

//drill 2 - Paginating Amazong products

//SELECT id, name, price, category
//FROM shopping_list
//LIMIT 6
//OFFSET 24;  (5)

function paginateProducts(page){

    const productsPerPage = 6
    const offset = productsPerPage*(page -1);

    db
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateProducts(5);

//drill 3 - get all items added after date
//SELECT id, name, price, date_added, checked, category
//FROM shopping_list
//WHERE date_added > (now() - 5days :: INTERVAL);


 function productsAfterDate(daysAgo){
    db
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where(
        'date_added',
        '>',
            db.raw(`now() - '??days' :: INTERVAL`, daysAgo)
        )
        .then(result =>{
            console.log(result);
        })

 }

 productsAfterDate(5)

// drill 4 - get the total cost for each category

//SELECT category , SUM(price) AS total
//FROM shopping_list
//GROUP BY category;

function totalPerCategory(){
    db
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
        console.log(result)
    })
}

totalPerCategory();