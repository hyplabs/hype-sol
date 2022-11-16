# Solana Registration System

This is a sign-in form and user registration form for a generic web 3.0 app. This is a suitable starting point if you want to create a user cookie, and you also want to pass this user cookie to various locations.

# Special Files
- UserManager - A special place for all the user / data operations. It *should* be possible to ONLY edit this file, and to support login, logout, and session management. The userManager is a singleton, so you can safely carry it around any application to detect the current user, and any other data you feel like tracking. It uses cookies, and can also easily handle auth. This should be yor main class.
- MessageCenter - A class that can help send messages and alerts to the user, in a clean-ish manner. It does alerts, popups, and spinners, and is low touch.
- MainFrame - Uses react router to manage pages. Useful to edit if you are managing a whole app and want to change pages around.

## Prerequisites

You will need nodejs and npm installed. 

## Installation

Run `npm install`. In needed you may beed to run extra npm commands.
- npm i --save @fortawesome/fontawesome-svg-core
- npm i --save @fortawesome/free-solid-svg-icons

## Local deployment

The project is deployed locally by running `npm run deploy-local`.  Once deployed locally, the sign-in page is accessible at `http://localhost:PORT`. Please to set up .env.local with your ports, and there is a .env.local.example


## Notes
- This code base was adapted from a few past personal examples. So there may be a couple of little artifacts, but overall this should be a clean and extensible forms interface.

