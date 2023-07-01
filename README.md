# OpenGameComponentLibrary

The Open Game Component Library is a simple, easy-to-learn library for 2D-Game-Proramming using JavaScript. It contains different components which makes it easy to code a simple 2D-Game in just a few lines.

## Get Started

To initialize the library call the 'init'-function with the stage's parent object:

  ```ogc.init(destination);```

  After initialization, select the components you want to use in your program. For example:

  ```const {figure, stage} = ogc;```

By running this line, you are abled to call the components by their name instead of ogc.name:

```componentName```
 instead of 
```ogc.componentName```

## Components

The components are the central elements of ogc. These components make it easy for you to code your game and make it alive.

### ogc.figure

  * `create(name, costumes)`
  * `all`

Figure is a component of ogc. Figures are elements on the stage which can be used as players, enemies, displays and many more.
To create a figure you have to call the 'create'-function of figure with the name and an array of different costumes. After creating, you can call the figure by the 'all' property and the figure's name.

For example:
```js

  ogc.figure.create(name, costumes); //create figure
  ogc.figure.all.name //access the figure

```

Every figure has different properties which help you to interact with them. Your calling them by access the figure and the property name.

```js

  ogc.figure.create(name, costumes); //create figure
  ogc.figure.all.name.property //access the property

```
#### Properties

  * `position`
    - `x` position on the x-axis
    - `y` position on the y-axis
  * `move(direction, length)` move the figure about a length into a direction
  * `moveTo(x, y)` move the figure to an x and y coordinate
  * `moveToObject(object)` move the figure to another object
  * `gravity`
    - `weight` figure specific weight
    - `enable(weight)` enable gravity with a figure specific weight
    - `disable()` disable gravity for the figure
  * `rotation` rotation of figure
  * `rotate(value, type)` chance the figures rotation to or about a specific value
  * `distance(object)` calculate the distance to an object
  * `collision`
    - `radius` figure specific collision radius
    - `withObject(object)` check for a collision with a specific object
    - `add(title, object, radius, method)` add a collision listener
    - `remove(title)` remove a collision listener
    - `list` list of collision listeners
  * `size`
    - `width` width of the figure
    - `height` height of the figure
  * `resize(width, height)` resize the figure
  * `visibility`
    - `state` state of visibility
    - `show()` change visibility to true
    - `hide()` change visibility to false
    - `toggle()` toggle visibility
  * `costumes`
    - `list` list of costumes
    - `actual` number of actual costume
    - `add(src)` add a costume
    - `remove(index)` remove a costume
    - `next()` next costume
    - `last()` last costume
    - `to(index)` chance to specific costume
  * `event`
    - `list` list of event listeners
    - `add(event, method, title)` add an event listener
    - `remove(title)` remove an event listener
  * `element` figure element
  * `update` update figure
  * `remove` remove figure
  * `prototype`
    - `initialize(prototype)` initialize prototype of figure
    - `all` collection of usable prototypes
