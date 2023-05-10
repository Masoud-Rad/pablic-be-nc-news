const request = require("supertest");
const app = require("../app")
const connection = require("../db/connection")
const seed = require("../db/seeds/seed")

const devData = require('../db/data/test-data/index');
const { expect } = require("@jest/globals");




beforeEach(() => seed(devData))
afterAll(() => connection.end())

describe('/api', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => { 
        expect(typeof response).toBe('object');
      });
  });
})

describe('/api/topics', () => {
    test("GET - status: 200 - respond with all the properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          response.body.topics.forEach((topic) => {
            expect(Object.keys(topic).length).toBe(2);
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          })
        });
    });
})

describe('/api/articles', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => { 
       // console.log("artic:", response.body)
        response.body.articles.forEach((article) => {
          expect(Object.keys(article).length).toBe(8);
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect( article.hasOwnProperty('body')).toBe(false);
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.comment_count).toBe("string");
        })
      });
  });

//   test("GET - status: 200 - respond with all the properties", () => {
//     return request(app)
//       .get("/api/articles")
//       .expect(200)
//       .then((response) => { 
//         response.body.articles.forEach((article) => {
//         expect(article).toBeSordetBy("created_at")
//         })
//       })

})




describe('/api/articles/:article_id', () => {
  test("GET - status: 200 - respond with all the properties", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((response) => { 
        
          expect(Object.keys(response.body.article).length).toBe(8);
          expect(typeof response.body.article.title).toBe("string");
          expect(typeof response.body.article.topic).toBe("string");
          expect(typeof response.body.article.author).toBe("string");
          expect(typeof response.body.article.body).toBe("string");
          expect(typeof response.body.article.created_at).toBe("string");
          expect(typeof response.body.article.votes).toBe("number");
        
      });
  });
})



describe('request with incorect Id', () => {
  test("GET - status: 404 - respond with Not Found!", () => {
    return request(app)
      .get("/api/articles/nnnn")
      .expect(404)
      .then((response) => { 
        expect(typeof response).toBe('object');
        expect(response.body.msg).toBe("Not Found!")
      });
  });
}) 

describe('incorect api', () => {
  test("GET - status: 404 - not exist", () => {
    return request(app)
      .get("/nonsence")
      .expect(404)
      .then((response) => { 
        expect(typeof response).toBe('object');
        expect(response.body.msg).toBe("Not Found!")
      });
  });
})       
         