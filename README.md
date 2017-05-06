# Message Bored

Angular 1.x Exercise


## Setup the Server

1. create a new node project using `npm`
1. add the `express` and `body-parser` dependency
1. add the `sequelize` `pg` and `pg-hstore` dependencies
1. initialize a new `sequelize` project
1. create a postgres user named `bored` with a password
1. create a postgres database named `message_bored` owned by `bored`
1. update `config/config.json`
1. create a 3 models, `Users`, `Topics`, and `Messages` _refer to **[schemas](#schemas)**_
1. sync your models with postgres _refer to **[sql](#sql)**_
1. setup an express project in `index.js`
1. set up express static middleware configured to serve content from `./public`
1. set up express static middleware for `body-parser`
1. add router middleware for `/api` to use the `/api/index.js` module
1. `/api/index.js` will require and use the three modules, `./messages`, `./topics`, `./users`
1. implement the routes defined in **[routes](#routes)**

## Setup the Client

1. create the `./public` directory
1. create the `./public/index.html` html5 boilerplate code
1. include the latest stable angular 1.x minified `angular` js source file
1. include the latest stable angular 1.x minified `angular-router` js source file
1. create the `./public/scripts` directory
1. create the `./public/scripts/app.js` source file
1. include the `./scripts/app.js` source file

### Angular App Requirements

#### Authorization

For mvp, it's sufficient for a user to login with just a username, if the username exists, store the user's `user_id` in `localStorage`.

The user can logout. On logout, delete the `user_id` value from `localStorage` and redirect the user back to the home route `/`.

A user must be `loggedIn` in order to create a new `Topic` or post a new `Message` to a topic.

#### Navigation

There should be a navigation area (like side bar), each links to it's own route

some items are visible only if the user is `loggedIn`.

**If the user is not loggedIn**

```
Home
Login
Register
Users
-------------------
Latest
( list of all topics )
```

**If the user is loggedIn**

```
Home
Logout
Users
-------------------
Latest
( list of all topics )
Create New Topic
```

**Example: If the user is not loggedIn**

```
Home
Login
Register
Users
-------------------
Latest
Javascript
Golang
Elixir
```

**If the user is loggedIn**

```
Home
Logout
Users
-------------------
Latest
Javascript
Golang
Elixir
Create New Topic
```

#### Users

The `/users` route will list all users.

The list of all users has links to the `/users/:id` route.

The `/users/:id` route will show the user's name at the top, when they joined the message board, and a list of all their message posts, sorted by `createdAt` in descending order.

Each message post will show what topic the message was posted on, and the date of when the message was posted.

#### Topics

There is no `/topics` route.

The list of all topics is listed in the Navigation area and links to the `/topics/:id` route.

The `/topics/:id` route will show the topic's name at the top, when the topic was created, the name of the topic creator, and a list of all the messages posted in this topic, sorted by `createdAt` in ascending order.

Each message post will show the name of the `Author` and the date of when the message was posted.

#### Latest

There is a `/latest` route which will list the 10 most recent messages.

Each message post will show what topic the message was posted on, the date of when the message was posted, and the name of the `Author`.


## Stretch Goals

1. add supertest
1. enable real auth
1. add protractor tests
1. styles


### Schemas

_**hint**: while writing your models, `db.sequelize.sync({force:true})` is helpful_

#### Users

| Property | Type   | Options |
| -------- | ------ | ------- |
| name     | string | not null, unique  |

**associations**

| Foreign Key | Name    | Relation         |
| ----------- | ------- | ---------------- |
| created_by  | Topic   | has many Topics  |
| author_id   | Author  | has many Messages |

#### Topics

| Property    | Type   | Options          |
| ----------- | ------ | ---------------- |
| name        | string | not null, unique |

**associations**

| Foreign Key | Name    | Relation         |
| ----------- | ------  | ---------------- |
| created_by  | Creator | belongs to Users |
| topic_id    | Topic   | has many Messages |

#### Messages

| Property   | Type    | Options         |
| ---------- | ------- | --------------- |
| body       | text    | not null        |

**associations**

| Foreign Key | Name    | Relation         |
| ----------- | ------  | ---------------- |
| topic_id    | Topic   | belongs to Topic |
| author_id   | Author  | belongs to Author |


## SQL

`\dS "Users"`

```
                                    Table "public.Users"
  Column   |           Type           |                      Modifiers
-----------+--------------------------+------------------------------------------------------
 id        | integer                  | not null default nextval('"Users_id_seq"'::regclass)
 name      | character varying(255)   | not null
 createdAt | timestamp with time zone | not null
 updatedAt | timestamp with time zone | not null
Indexes:
    "Users_pkey" PRIMARY KEY, btree (id)
    "Users_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE ""Messages"" CONSTRAINT "Messages_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "Users"(id) ON UPDATE CASCADE
    TABLE ""Topics"" CONSTRAINT "Topics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "Users"(id) ON UPDATE CASCADE
```

`\dS "Topics"`

```
                                     Table "public.Topics"
   Column   |           Type           |                       Modifiers
------------+--------------------------+-------------------------------------------------------
 id         | integer                  | not null default nextval('"Topics_id_seq"'::regclass)
 name       | character varying(255)   | not null
 createdAt  | timestamp with time zone | not null
 updatedAt  | timestamp with time zone | not null
 created_by | integer                  | not null
Indexes:
    "Topics_pkey" PRIMARY KEY, btree (id)
    "Topics_name_key" UNIQUE CONSTRAINT, btree (name)
Foreign-key constraints:
    "Topics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "Users"(id) ON UPDATE CASCADE
Referenced by:
    TABLE ""Messages"" CONSTRAINT "Messages_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES "Topics"(id) ON UPDATE CASCADE
```

`\dS "Messages"`

```
                                    Table "public.Messages"
  Column   |           Type           |                        Modifiers
-----------+--------------------------+---------------------------------------------------------
 id        | integer                  | not null default nextval('"Messages_id_seq"'::regclass)
 body      | text                     | not null
 createdAt | timestamp with time zone | not null
 updatedAt | timestamp with time zone | not null
 author_id | integer                  | not null
 topic_id  | integer                  | not null
Indexes:
    "Messages_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "Messages_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "Users"(id) ON UPDATE CASCADE
    "Messages_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES "Topics"(id) ON UPDATE CASCADE
```

## Routes

| module source file    | route                        | action                                                                                          |
| --------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| api/users/index.js    | GET /api/users               | respond with all users                                                                          |
| api/users/index.js    | GET /api/users/:id           | respond with user and all messages author'd by this user                                        |
| api/users/index.js    | POST /api/users              | create and respond with new user                                                                |
| api/topics/index.js   | GET /api/topics              | respond with all topics including the creator's name                                            |
| api/topics/index.js   | POST /api/topics             | create and respond with a new topic                                                             |
| api/topics/index.js   | PUT /api/topics/:name        | update and respond with the updated topic                                                       |
| api/messages/index.js | GET /api/messages/latest     | respond with the latest 10 messages including the name of the topic including the author's name |
| api/messages/index.js | POST /api/messages           | create and respond with the new message                                                         |
| api/messages/index.js | GET /api/messages/by-topic/:topic_id  | respond with all messages that belong to the topic by :topic_id  including the author's name, including the topic's name, ordered by createdAt ascending   |

