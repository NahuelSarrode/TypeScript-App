# Mysql_node_jwt Proyect. 

This API allow you create, edit, show and delete posts, also the users can create, edit, delete and show your own comments and posts. Also you can create a new user, login with your credentials and test de api. The admin have full access of all data, but normal users only can see, create update and delete your own data. 

In the root folder you'll find POSTMAN or INSOMNIA collection and the Mysql migration with test data. 


## Proyect Initialization

### Install all dependencies: 


```bash
npm i
```

### Create a .config file: 

```bash
You must create a .config file on a config folder, in this folder you'll find a .config.example.
```

## Run Aplication:

```python
npm run dev
```

## Implemented Technologies: 

```python
Mysql to save de data. 
Express framework for the API. 
Async/Await for handler async functions. 
Winston for log system. 
JsonWebToken for authentication system. 
Squel query builder to make dinamics querys.
```

## API endpoints: 

# Posts: 
```python
Get All: return all posts saved on a database. 
Get By Id: return a post for id asigned. 
CreatePost: saved a post on database. 
UpdatePost: An user can update an post. 
Eliminate Post: You can delete a post saved. 
```

# Comments: 
```python
Get All: return all comments from a post. 
Get By Id: return a specific comment for a post. 
CreateComment: saved a comment on database. 
UpdateComment: An user can update your own comments. 
EliminateCommnet: the user can delete only your comments.  
```
# Auth: 
```python
Signup: Allow to an user create a new acount into the system and create a jwt.
Signin: The user can login into system with username, email and password.  
Profile: Validate that password, email and token that correspond with the user. 
``` 


