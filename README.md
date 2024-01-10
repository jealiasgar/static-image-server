To start the app:

npm install

node app.js

Once the server is up, you can go to:

1. localhost:3000 - Get a random image from the server with default width and height.
2. localhost:3000/200 - Get a random image from the server with height and width of 200px.
3. localhost:3000/200/300 - Get a random image from the server with width of 200px and height of 300px.
4. localhost:3000?grayscale - Get a random image from the server with default width and height and filter of grayscale applied.
5. localhost:3000?grayscale&blur - Get a random image from the server with default width and height and filter of grayscale applied and blur of default value applied.
6. localhost:3000?blur=10 - Get a random image from the server with default width and height and blur of value 10 applied (The value must be between 0.3 to 20).

Note: The filters can be applied by specifying the width and height as well.....
