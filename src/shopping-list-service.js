/* eslint-disable no-undef */
const shoppingListService = {
    getAllList(knex){
        return knex.select('*').from('shopping_list')
    },insertList(knex, newList){
        return knex
        .insert(newList)
        .into('shopping_list')
        .returning("*")
        .then(row => {
            return row[0]
        })
    },
    getById(knex, id){
        return knex.from('shopping_list')
                    .select("*")
                    .where('id', id)
                    .first()
    },
    deleteList(knex, id){
        return knex('shopping_list')
                .where({id})
                .delete()
    },
    updateList(knex, id, newListData){
        return knex('shopping_list')
                .where({id})
                .update(newListData)
    },
}

module.exports = shoppingListService;