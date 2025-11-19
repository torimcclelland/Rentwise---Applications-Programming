# Rentwise---Applications-Programming
CMPSC 475 - Fall 2025

Authors: Inesa Cosic, Samantha Groner, Tori McClelland

Rentwise is a mobile application built for Android phones using React Native. Rentwise is designed as an all-in-one platform for renters and landlords, facilitating the processes of selling/buying properties, communication, and review systems.

Rentwise features a dashboard overview, a rental listings and documents manager, payment ability, inter-user messaging, and secure login/authentication.

Tech Stack:
 - React Native
 - Firebase
 - Github Projects
 - VS Code
 - Expo Go

To Get Started:
1. git clone (https://github.com/torimcclelland/Rentwise---Applications-Programming)
2. npm install
3. npm expo start


# Misc notes Sam put here

Note from Sam: I have a bit of a specific notation that may or may not appear in my code by habit, so here's an explanation in case it does. These are words that may appear in comments mostly so I can find areas I was working on easily and quickly.

- "KELSIER": immediately relevant or important, also "TODO"
- "WAXILLIUM": Likely to be relevant to what I'm working on next, AKA 'jump here when you start on the next item'
- "MARSH": clean this up later

### Research/documentation/useful resources

For app.json file set up: https://docs.expo.dev/versions/latest/config/app/#android

For fireSTORE set up with EXPO set up: https://rnfirebase.io/ 

Seems relevant to the firestore initialization mystery: 

- https://stackoverflow.com/questions/76762689/how-to-use-firestore-persistence-on-react-native-expo-app
- https://firebase.google.com/docs/firestore/quickstart (VERY IMPORTANT AND USEFUL)

Typescript cheatsheet: https://www.typescriptlang.org/cheatsheets/

React Navigation: https://reactnavigation.org/docs/hello-react-navigation?config=dynamic

Retrieving data in batches: https://rnfirebase.io/firestore/usage-with-flatlists
^ check out the Canvas page, seems incredibly relevant


## Checkpoint notes:

- Fluff stuff first
- Do not lose audience, don't just jump right into an IDE
- Set the stage
    - what we did, what we accomplished, show what we accomplished
- show data storage, at least show it exists
    - and during demo, show "here's front, here's back, here's the data moving between the two"
- for demoing different components, make a demo page, show them all. Don't do "here's the file structure, here's the code". Then demo the structure/code of one or two components

- 8 total checkpoints
- after the 8th, we'll focus on finishing the functionality of our app and preparing for a final presentation. won't have checkpoints after that, but will keep progressing

- make it EVEN MORE of a pitch. start with appealing to the user, go back to our original "problem statement"
- have no "dead air" while typing into fields



CODE/PROJECT REVIEW, 11/12/2025:
- text on labels should be left justified, not center (**DONE Tori**)
- need password requirements (**DONE Tori**)
- mask password on sign up page (**DONE Tori**)
- landlords shouldn't be able to apply to properties (**DONE Inesa**)
    - analytics should be improved (try to convey who's looking at what)
- why can landlords browse properties? (shouldn't be able to apply)
    - allows them to more easily access information on what's trending or what's valued
    - if they're looking to purchase and re-sell a properties
    - can maybe make list that landlords save properties to
    - let them track what's in the area
    - additional statistics
    - providing them with marketing information (premium account)

- city state and zip on one field (**DONE Inesa**)

- need to update the edit property page  (**DONE Inesa**)

- also check zillow to see the values for properties that we NEED to have
    - list from Zillow: square feet, singlefamily VS condo, year built, yard acres
        
- rent price should be formatted as actual dollar amounts (**DONE Tori**)
    - no decmials, doesn't need to track down to that (**DONE Tori**)
- standardize property creation data a bit more (num baths shouldn't be number they have to enter, like 100) (**DONE Tori**)
- give ability to view public listing AS LANDLORD (what does a property look like to renters?)
- limit characters in zipcode field a bit more - limited to 5 now (**DONE Tori**)
- organize property creation a bit better
    - fix in general
    - if pets yes, should them prompt further fields (**DONE Tori**)
- need to be able to see difference between renter and landlord, should be pretty apparent
- make sure flow of "using it" makes sense
    - interaction between renters and landlords
    - break out code to not just be in one user role
- polish is missing (**Tori working**)






* Need a slightly better lead in and hook for the audience. Why is this an issue for them. what is the pain point. what does your app do to solve those pain points.
* As discussed in class could have used this narrative to walk through creating the user and having them setup from scratch. Instead there is a lot of dead air in the demo while doing the setup. want to avoid that.
* The ask was to start from the beginning, setup account, configure profile, add properties, manage those properties submit complaints/tasks etc.
    > Same with the renter walkthrough....connect to the audience and make them understand the pain point and why your app does that.
* You mention free membership so then i would like to have known what a free account gets me, what does premium offer and how much. Then to show a user who is free and then one with premium features enabled. Or say as demoing the renter that some of these features are premium.
    * maybe while demoing each user type: 
* Wouldnt I setup my personal information on account creation and the data you entered for applying would be prefilled. As a user I dont want to have to enter it each time.
    * say we have the most basic information autofilled
* You have the bits and pieces of the demo just the narrative is lacking and the feeling of excitement for the user.
  > What about saving properties I like, sharing those with friends/family, landlord notifications that someone applied, commenting or messaging back and forth, etc. There are many features that users come to expect in these types of apps and you will need to work over the next month to add those into the application. 
    * features to come once the core functionality is complete

Feedback during class 11/10:

