/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const shoppingListService = require('../src/shopping-list-service');
const knex = require('knex');
const { expect } = require('chai');

describe(`ShoppingList object `, ()=> {
    let db;
    let testList = [
        {
        id: 1,
        date_added :  new Date('2021-01-06T13:44:30.877Z'),
        name: 'First',
        category:  'Main',
        price : "10.00",
        },
        {
        id: 2,
        date_added :  new Date('2021-01-06T13:44:30.877Z'),
        name: 'Second',
        category:  'Main',
        price : "10.00",
        },
        {
        id: 3,
        date_added :  new Date('2021-01-06T13:44:30.877Z'),
        name: 'Third',
        category:  'Main',
        price : "11.00",
        }
    ];
    before(()=> {
       db = knex({
           client: 'pg',
           connection: process.env.TEST_DB_URL,
       });
    });
    before(()=> db('shopping_list').truncate());
    afterEach(()=> db('shopping_list').truncate());

    after(()=> db.destroy());


    context(`Given 'shopping_list' has data` , () => {
        beforeEach(()=>{
            return db
                .into('shopping_list')
                .insert(testList)
        })

        it(`getAllList() resolves all lists from 'shopping_list' table`, ()=> {
            return shoppingListService.getAllList(db)
                .then(actual => {
                    expect(actual).to.eql(testList.map(list => ({
                        ...list,
                        checked: false,
                        date_added : new Date(list.date_added)
                    })))
                })
        })
        it(`getById() resolves an list by id from 'shopping_list' table`, ()=>{
            const secondId = 2;
            const secondTestList = testList[secondId -1];
            return shoppingListService.getById(db, secondId)
                .then(actual => {
                    expect(actual).to.eql({
                     id: secondId,
                     name: secondTestList.name,
                     category : secondTestList.category,
                     price: secondTestList.price,
                     checked : false,
                     date_added : secondTestList.date_added,
                    })
                })
        })
    it(`deleteList() removes a list by id from 'shopping_list'`, ()=>{
        const listId = 3;
        return shoppingListService.deleteList(db, listId)
            .then(()=> shoppingListService.getAllList(db))
            .then(allList => {
                const expected = testList.filter(list => list.id !== listId)
                                        .map(list => ({ ...list, checked : false}))
                expect(allList).to.eql(expected)
            })
    })
    it(`updateList() update a list from the 'shopping_list' table`, ()=>{
        const idOfListToUpdate = 2;
        const newListData = {
            name: 'updated name',
            price : '5.99',
            checked : false,
            date_added : new Date(),
            category : 'Lunch',
        }
        return shoppingListService.updateList(db, idOfListToUpdate, newListData)
        .then(()=> shoppingListService.getById(db, idOfListToUpdate))
        .then(list => {
            expect(list).to.eql({
                id: idOfListToUpdate,
                ...newListData,
            })
        })
    })
    })
    context(`Given 'shopping_list' has no data`, ()=> {
        it(`getAllList() resolves an empty array`, ()=> {
            return shoppingListService.getAllList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
        it(`insertList() inserts a new list and resolves the new list with an 'id'`, ()=>{
            const newList = {
                name : 'Test new Name',
                category : 'Main',
                price: '12.00',
                date_added : new Date('2021-01-06T14:19:30.877Z')
            }
                return shoppingListService.insertList(db, newList)
                    .then(actual=>{
                        expect(actual).to.eql({
                            id: 1,
                            name: newList.name,
                            category: newList.category,
                            price: newList.price,
                            checked : false,
                            date_added : new Date(newList.date_added),
                        })
                    })
        })
    })

})