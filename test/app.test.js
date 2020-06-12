require('dotenv').config();
const app = require('../app')
const supertest = require('supertest');
const { expect } = require('chai');

describe('app', () => {
    it('returns error', () => {
        return supertest(app)
            .get('/types')
            .expect(401)
    })

    let auth = process.env.API_TOKEN
    let validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, 
    `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]
    
    it('returns array of types', () => {
        return supertest(app)
            .get('/types')
            .set('Authorization', 'Bearer ' + auth)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.deep.equal(validTypes)
            })
    })
})