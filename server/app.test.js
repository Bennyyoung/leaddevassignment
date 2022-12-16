const express = require("express")
const supertest = require('supertest')
const app  = require('./app')

beforeEach(() => {
    jest.setTimeout(60000)
})

test("GET /order_items", async (req, res) => {

    await supertest(app)
        .get('/order_items')
        .expect(200)
        .then(response => {
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toEqual(112650)
    })
})