# Good Enough Game Engine (GeGe): Bubble Ninja demo game

**CodersCamp 2020 - Project TypeScript**

## Table of contents

- [General info](#general-info)
- [Engine Characteristics](#engine-characteristics)
- [Engine API](#engine-API)
- [Gameplay](#gameplay)
- [Technologies](#technologies)
- [Project scope](#project-scope)
- [Team](#team)
- [Live Preview](#live-preview)

## General info

The aim of this project was to build a simple and intuitive game engine applicable to developing a variety of 2D canvas-based browser games.  
Good Enough Game Engine (GeGe) follows Entity-Component-System design pattern, widely used in game development. This approach enables great level of flexibility in defining game objects.
To showcase our engine we have prepared simple, yet visually stunning game - Bubble Ninja. In Bubble Ninja player earns points by hovering cursor over blue floating bubbles. For each missed bubble player loses points.

Project was created during [CodersCamp Course](https://coderscamp.edu.pl) in Jan - Feb 2021 using TypeScript.

## Engine Characteristics:

1. creating and removing game objects and their customisable components during runtime
2. pause and resume game
3. powerfully simple 2D physics engine
4. 2D objects and backgrounds rendering
5. textures
6. highly customisable
7. very easy to grasp and fast to use

## Engine API:

| Classes / Interfaces / Types | Members                 | Params           | Description |
|------------------------------|-------------------------|------------------|-------------|
| Engine                       | entities                |                  |             |
|                              | gamePaused              |                  |             |
|                              | cursorPosition          |                  |             |
|                              | previousCursorPositions |                  |             |
|                              |                         |                  |             |
|                              | addEntity               | Entity           |             |
|                              | removeEntity            | Entity           |             |
|                              | pauseGame               | -                |             |
|                              | resumeGame              | -                |             |
|                              | changeBackground        | CanvasBackground |             |
|                              | mainLoop                | callback         |             |
| Entity                       | id                      |                  |             |
|                              | components              |                  |             |
|                              |                         |                  |             |
|                              | addComponent            | Component        |             |
|                              | removeComponent         | typeof Component |             |
|                              | hasComponent            | typeof Component |             |
| Component                    | entity                  | Entity           |             |
| CRenderable                  | color                   |                  |             |
|                              | shape                   |                  |             |
|                              | size                    |                  |             |
|                              | img                     |                  |             |
| CPosition                    | x, y                    |                  |             |
| CVelocity                    | x, y                    |                  |             |
| CGravity                     | x, y                    |                  |             |
| IPointerDevice               | cursorPosition          |                  |             |
| Mouse                        | cursorPosition          |                  |             |
| CanvasBackground             | color                   |                  |             |
|                              | gradient                |                  |             |
|                              | imagePath               |                  |             |
| Vector                       | x, y                    |                  |             |
| Size                         | width, height           |                  |             |
| Shape                        | square                  |                  |             |
|                              | circle                  |                  |             |
| RenderSettings               | width, height           |                  |             |

## Gameplay

1. Basically Fruit Ninja clone...
2. ...but underwater!
3. Slash bubbles to earn points.
4. Beware of the sinister, however cute, fishes!
5. Sea (pun intended) how well you've done by taking a look at your final score.

## Technologies

### Project was created with:

- TypeScript
- CSS
- HTML

## Project scope

- basic types
- type aliases
- unions and intersection types
- types / classes / interfaces
- implementation / inheritance / composition / interface implementation
- visibility modifiers
- generics
- unit testing and TDD

## Team

#### Development:

- [Michał Ciborowski](https://github.com/Cidebur)
- [Anna Pastor](https://github.com/anpastor)
- [Ernest Szczeblewski](https://github.com/ESzczeblewski)
- [Anna Żak](https://github.com/AnnZak)
- [Aleksandra Żochowska](https://github.com/AleksandraZochowska)

##### Tech Lead:

- [Michał Ciborowski](https://github.com/Cidebur)

##### Product Owner:

- [Aleksandra Żochowska](https://github.com/AleksandraZochowska)

##### Development Manager:

- [Ernest Szczeblewski](https://github.com/ESzczeblewski)

## Live Preview

To see our project, visit:

https://cidebur.github.io/CodersCamp2020-Project3-TypeScript/