import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/crud for post requests', async () => {
    const respose = await request(app)
        .post('/api/crud')
        .send({});

    expect(respose.status).not.toEqual(404);
});
////

it('can only be accessed if the user is signed in', async () => {

    const response = await request(app)
        .post('/api/crud')
        .send({})
        .expect(401);

});
////

// it('returns a status other than 401 if the users is signed in', async () => {

//     const response = await request(app)
//         .post('/api/crud')
//         .set('Cookie', global.signin())
//         .send({});
//     console.log(response.status);
//     // expect(response.status).not.toEqual(401);
// }
// );
// ////
// it('returns an error if an invalid title is provided', async () => {
//     await request(app)
//         .post('/api/crud')
//         .set('Cookie', global.signin())
//         .send({
//             title: '',
//             price: -10
//         })
//         .expect(400);


// });


// it('creates a ticket with valid inputs', async () => {
//     await request(app)
//         .post('/api/crud')
//         .send({
//             title: 'saasads',
//             price: 10,
//         })
//         .expect(201);
// });
