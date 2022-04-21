# Allocation Proration Tool

## Tools

### React

I am most comfortable using React so I decided to leverage it for this project. I decided against TypeScript since this application is designed to be a small office tool and I feel like TypeScript would've been overkill for something like this. I used React's Context API for the application's global state as an alternative to Redux.

### Material UI

I decided to use Material UI for a few reason:

- It's got a great library of pre-made components with a decent base styles
- It's very easy to apply a theme (a future improvement that I would add)
- MUI's grid system is my favorite to use - I find it much easier to maintain than CSS Grid/Flexbox

### FastAPI

I have used Flask in the past and this was my first time using FastAPI. It comes pre-baked with a ton of cool features (one being if you run the server and go to `localhost:8000/docs` you'll see SwaggerUI docs) and it was pretty fun to use. I liked using Pydantic to define the types and fields on the `request` and `response` bodies. It is simialr to Django serializers so if you define a request with the field `temp` and send `temp, temp2` only `temp` will ever reach the endpoint's code so it's a nice way to improve security.


## Running the application

- Docker
  - `docker-compose up --build` from the root of the project
- Local
  - Requirements
    - Node LTS
    - Python > 3.7.x
  - Client
    - `cd` into the `/client` directory
    - Run `npm install` to download & install deps
    - Run `npm start` to start the UI
  - Server
    - `cd` into the `/server` directory
    - Run `pip install -r requirements.txt` to download & install deps
    - Run `uvicorn main:app --reload` to start the server

## Future Improvements

- Add tests (UI and API)
  - Especially for the calculator
- Improve "leftover" logic for calculator
- Add improved MUI theme
  - https://bareynol.github.io/mui-theme-creator/