# Genius-Idea-Coming

## App Description

Our app offers users the ability to generate and save 'genius ideas' at the touch of a button. With a simple press, users receive unique and creative suggestions, which they can save to their personal collection log for future reference. Users will also be able to tag, filter, and sort their collections. Also they will be able to remove suggestions from their collection.

## Genius idea wire frame 
<img src=imgs/Genius_ideas.png>

## API Routes
| API Route  	| Request<br>Method 	| Body                                                            	| Response                                                            	|
|------------	|-------------------	|-----------------------------------------------------------------	|---------------------------------------------------------------------	|
| /form     	| POST              	| {id, title, description, comments, category_id}             	    | {id, title, description,  comments, category_id}                  	|
| /collection   | GET               	| {id, title, description, comments, category_id}                 	| [{...}]                                                           	|
| /collection/:id| PATCH              	| {id, title, description, comments, category_id} 	                | {id, title, description, comments, category_id}                     	|
| /collection/:id| DELETE              	| {id, title, description, comments, category_id} 	                | {id, title, description, comments, category_id}                     	|
| /login 	    | GET                	| {username, name}                                                 	| {username, name}                                                  	|
| /profile/:id 	| Patch             	|                                                                   	| {name, location}                                                     	|


## Client Side Routes
| API Route           	| Component        	|
|---------------------	|------------------	|
| /home                 | Home.js           |
| /login            	| Login.js         	|
| /form                	| Form.js         	|
| /profile          	| Profile.js       	|
| /about               	| About.js         	|
| /category            	| Category.js      	|
| /profile/collection   | Collection.js     |

## React tree
<img src= imgs/Reacttree.png>

## Schema
<img src= imgs/Tables.png>

## Genius Trello
<img src=imgs/TrelloPhase4.png>
