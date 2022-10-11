# Everest Cricket

## Setup

```shell
git clone https://github.com/kiran9866/everest-cricket-challenge.git
cd everest-cricket-challenge
npm install
npm test
npm start
```

## Usage

- The program asks for a selection of the challege: simple or superover. Choose one.
- Supply the file path with the inputs in the format mentioned in the problem.
- Supply any additional inputs required.
- THe program should run and show the correct output.

## Libraries

Only two very popular libraries, Prompt and LoDash are used to reduce some boilerplate and
concentrate on the problem.

- [Prompt](https://github.com/flatiron/prompt) is used for the command line interactions.
- [Lodash](https://lodash.com/) is the popular JS utility library.

## Entities

- Balls - Contains the ball data such as players, type of shots and outcomes.
- Shots - Contains the timing of the shot such as early, good, perfect and late.
- Innings - Contains current state of the innings and ball.
- Outcomes - Contains commentary and description for each ball.
- Superover - Is the another innings with target score and only two wickets.

## Additional Notes

Babel Node is used to compile modern Javascript to run in NodeJS.
