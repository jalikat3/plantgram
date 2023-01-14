# PlantGram
## Semester Project for Application Development II
### Spring 2022

## Directions to run the initial application
1.  Clone the repo.
2.  Install the dependencies with the command: `npm install`
3.  Start MongoDB with the command:`mongod -dbpath ../MongoData`
4.  Start the Dev Server with the command: `npm start`
5.  Start the api server with the command: `node server.js`

Note: You will have to restart the api server when you make changes to the server code.  The Dev Server will recompile the React application
every time you resave a file in the React system.

## PlantGram Requirement
### Project Description
PlantGram is an application that allows a community of users to collaboratively identifying plants.  A user of the application may post a photo of a plant and a short description to the plant to a common board read by all users.  Users may then post messages debating the identity of the plant.  This process is known as identifying a plant.  Users may certify the identification of a plant by voting for an identification.  When the 75% of the users vote for a plant identification, the plant is entered into the club’s catalog of successfully identified plants.  This catalog is known as “the Plant Catalog” and can be browsed by all club members.

Clubs are created by one user who is known as the Club Facilitator.  The Club Facilitator creates the club by uploading club information, including a club logo and any rules that govern the behavior of club members.  In addition, they are responsible for inviting members to join the club and for moderating the posts of users.  

### Use Case Description of PlantGram
![PlantGram Use Case Description](README/plantgram_initial_use_case.png)

### PlantGram User Stories
**Post Plant Discovery**: As a *Plant Fanatic* I want to post information on an interesting plant  so that my discovery can be shared with other club members.

**Identify a Plant**: As a *Plant Fanatic* I want to propose an identification for a plant posted to the club’s board so that a new plant can be identified.

**Add Photo**:  As a *Plant Fanatic* I want to add a photo to a plant description so that the description is clearer.

**Certify an Identification**:  As a *Plant Fanatic* I want to indicate my agreement with a plant’s identification so that the plant is correctly identified and added to the club’s Plant Catalog.

**Create Account**: As a *Plant Fanatic* I want to create a PlantGram account so that I can join a club.

**Login**:  As a *Plant Fanatic I* want to login to the PlantGram application so that I can use the application.

**Browse the Plant Catalog**:  As a *Plant Fanatic* I want to browse the plants in the club’s Plant Catalog so that I can learn more about plants.

**Propose New Club Member**:  As a *Plant Fanatic* I want to submit a name of a person as a possible member of the club so that friends and acquaintances may enjoy my plant hobby.

**Create a Club**:  As a *Club Facilitator* I want to create a new club so that others interested in plants can learn from one another.

**Modify a Club**:  As a *Club Facilitator* I want to modify our club banner, logo, or rules so that we can accommodate changes in the club that occur over time.

**Invite Members**:  As a *Club Facilitator* I want to invite members, including those proposed by existing members, to join the club so that more people can enjoy plants.

**Moderate Users**:  As a *Club Facilitator* I want to moderate the posts made by users in order to maintain the norms of the club.

## Sprint Synopsis
