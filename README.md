# Zibble
#####A Chinese character flashcard app

For the ever-growing number of students studying Chinese, the writing system can be a major stumbling block. The 50,000 or so characters are a challenge even to native speakers.

Zibble (字堡) aims to make learning the characters easier and more enjoyable. The app has a library of nearly 7,000 characters (enough to read a newspaper), and presents them in the form of flashcards, progressing from the most common to the more obscure. Users can log in to save and review a record of the characters they have got wrong.

The app is optimized for mobile use, and uses screen-swipes for a satisfying user experience.

It is online at [http://zibble.herokuapp.com](http://zibble.herokuapp.com) (the back end is hosted separately at [http://zibble-back-end.herokuapp.com](http://zibble-back-end.herokuapp.com).

<img src="http://i.imgur.com/w3kkvuZ.png">

## Technology

* Node.js
* MongoDB
* Mongoose
* Express
* Angular.js
* Passport
* JWT
* Skeleton CSS


## Wins

* Swipe events with Angular extensions ngTouch and angular-swipe
* Pulled in data on nearly 7,000 Chinese characters from a 3rd-party API ([http://ccdb.hemiola.com](http://ccdb.hemiola.com))
* Cleaned the data and turned numerical tone indicators into diacritical tone marks (e.g. WU2 => wú) using RegEx
* Authentication using Passport
* Positive feedback from trial users

## Challenges

* Struggled to set timeouts with the $timeout function in Angular - appears not to work well with $location
* The choice of API was not ideal, with some definitions long or irrelevant
* Seeding the database was a challenge - I was temporarily frozen out of the API due to the large volume of requests
* There may be some cross-device compaitibilty issues, although early bugs on iOS have been resolved

## For the future

* Facebook login and posts to social media
* Ability to delete 'blockers', or frequently forgotten characters
* More options for customization
* Spaced repitition for optimal learning


