const app = require('../index')
const request = require('supertest')
jest.setTimeout(1000)

describe(`POST /register`, () => {
    describe(`POST /register sukses`, () => {
        it(`should return an object with status 201`, async () => {
            const data = { email: "admin@gmail.com", password: "test1", username:"test" }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(201);
        })
    })

    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: null, password: "12345", username:"test" }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Please enter your email`]))
        })

    })
    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: '', password: "12345", username:"test"  }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Please enter your email`]))
        })
    })

    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: 'email@yahoo.com', password: null, username:"test"  }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Please enter your password`]))
        })
    })

    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: 'email@yahoo.com', password: "", username:"test"  }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Please enter your password`]))
        })
    })

    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: 'wfefcasc', password: "12345", username:"test"  }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Must be a valid email`]))
        })
    })

    describe(`POST /register fail`, () => {
        it(`should be return an object with status 400`, async () => {
            const data = { email: 'admin@gmail.com', password: "12345", username:'test' }
            const res = await request(app).post('/register').send(data)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', expect.arrayContaining([`Your email has been used`]))
        })
    })
})

describe(`POST /login`, () => {
    describe(`POST /login sukses`, () => {
        it(`should return an object with status 200`, async () => {
            const data = { email: "admin@gmail.com", password: "test1" }
            const res = await request(app).post('/login').send(data)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('access_token', expect.any(String))
        })
    })

    describe(`POST /login fail`, () => {
        it(`should return an object with status 401`, async () => {
            const data = { email: "admin@gmail.com", password: "qwertytre" }
            const res = await request(app).post('/login').send(data)
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('msg')
            expect(res.body).toHaveProperty('msg', expect.any(String))
            expect(res.body).toHaveProperty('msg', `wrong email/password`)
        })

        describe(`POST /login fail`, () => {
            it(`should return an object with status 401`, async () => {
                const data = { email: "emailytrewq@gmail.com", password: "qwertytre" }
                const res = await request(app).post('/login').send(data)
                expect(res.status).toBe(401);
                expect(res.body).toHaveProperty('msg')
                expect(res.body).toHaveProperty('msg', expect.any(String))
                expect(res.body).toHaveProperty('msg', `email/password not valid`)
            })
        })
    })
})

describe(`GET /guestList`, () => {
    describe(`GET /guestList sukses`, () => {
        it(`should return array of object with status 200`, async () => {
            const res = await request(app).get('/guestList')
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Object);
        })
    })
})
