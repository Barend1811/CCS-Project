# CCS-Project

Requirements:

Node
<br/>
PostgreSQL
<br/>
Any CLI

Steps:

1. Install required software
2. Clone git repository to your local device
3. In your CLI navigate to the client folder within the project
4. Run the following command while in the client folder: "npm install"
5. Navigate to the server folder within the project
6. Run the following command while in the server folder: "npm install"
7. Create a .env file with the following values:

PORT=3000
<br/>
DB_NAME=testdb
<br/>
DB_USER=(YOUR POSTGRESQL USERNAME)
<br/>
DB_HOST=(YOUR POSTGRESQL HOST)
<br/>
DB_PASSWORD=(YOUR POSTGRESQL PASSWORD)
<br/>
DB_PORT=(YOUR POSTGRESQL PORT)
<br/>
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTU0OWIwMTIwMWUyZjMzZWE3NmFkZjYiLCJlbWFpbCI6InNtdHdpbmtsZTQ1MkBnbWFpbC5jb20iLCJpYXQiOjE2MzI5MzQ2NTgsImV4cCI6MTYzMjkzODI1OH0._oHr3REme2pjDDdRliArAeVG_HuimbdM5suTw8HI7uc
<br/>
CRYPTR_SECRET=qY7NqEAaluEoZ16q3CYVl0flgSWunKC7
<br/>
SENDGRID_API_KEY='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'
<br/>
SENDGRID_TEMPLATE_ID='d-40e82ab8c39846839e7d474bb1a21c1a'
<br/>
SORTCODES_API_KEY=F7EABNqMquWKXX4B0H8ioIYZUDKz3NCj

Change only the values in parentheses to your own.

8. While still in the server folder run the command: "npm start"
9. On your search engine open the url "http://localhost:5173/"
10. Go to the Setup tab on the webpage and follow the instruction there

The details that will be added to your postgresql server, to log into the web app are: 

email: test@company.com
password: testing.123


