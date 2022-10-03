# parser-rss-api

##### Main responsibilities:

- parses posts from according Cron scheduler
- builds post object to add to database
- sends response the result of requestes in JSON format

## Running locally

#### _Step 1_: Clone the repository

```bash
git clone git@github.com:iraand/parser-rss.git
cd parser-rss
```

### _Step 2_: Install NPM packages

```bash
$ npm i
```

#### _Step 4_: Start app

##### _Step 4.1_: Start server (env -> DEVELOPMENT)

```bash
$ npm run dev
```

## API Documentation

There are two ways to reach API documentation:

- run app locally`

Then API Documentation will be available on http://localhost:8080/api/docs

## How it works

Workflow by steps:

1. Updates posts by parsing.
2. Checks new posts.
3. Adds new posts to database.
4. Responds with `posts`.
5. Receives a request for a result by `id`.
6. Responds with a status or a result of the requested post.

### Examples of the body for request on `GET /posts`\*

```json
{
"data": {
"docs": [
  {
    "_id": "6336c387802684a5c33f26f4",
    "id": "65d45618-3ccd-4a1d-b502-db8fb9b4b520",
    "title": "19 of the Best JRPGs You Can Play on Modern Consoles",
    "creator": "Aidan Moher",
    "link": "https://lifehacker.com/19-of-the-best-jrpgs-you-can-play-on-modern-consoles-1849371946",
    "content": "<img src=\"https://i.kinja-img.com/gawker-media/image/upload/s--C-z8QeUq--/c_fit,fl_progressive,q_80,w_636/56b8f266804a6bd09af836f86823b0a2.png\" /><p>Working on my book <a href=\"https://fightmagicitems.rocks\" target=\"\_blank\" rel=\"noopener noreferrer\"><em>Fight, Magic, Items: The History of Final Fantasy, Dragon Quest, and the rise of Japanese RPGs in the West</em></a> took me back through the annals of JRPG history. Along the way, I was reintroduced to many of the classic titles that defined the genre—from its earliest days on the NES, to the golden age …</p><p><a href=\"https://lifehacker.com/19-of-the-best-jrpgs-you-can-play-on-modern-consoles-1849371946\">Read more...</a></p>",
    "contentSnippet": "Working on my book Fight, Magic, Items: The History of Final Fantasy, Dragon Quest, and the rise of Japanese RPGs in the West took me back through the annals of JRPG history. Along the way, I was reintroduced to many of the classic titles that defined the genre—from its earliest days on the NES, to the golden age …\nRead more...",
    "categories": [
    "creativeworks",
    "papermario",
  ],
  "pubDate": "Thu, 29 Sep 2022 16:30:00 +0000",
  "**v": 0
  },
  ...
  ],
  "totalDocs": 45,
  "offset": 0,
  "limit": 10,
  "totalPages": 5,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
  }
}



`* all requests and responses are described in API Documentation`


#### Current implementations

GET "/posts"
GET "/posts/&?"
POST "/posts"
PATCH "/posts/:id"
DELETE "/posts/:id"
