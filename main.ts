/**
 * <-- Sprite created (paddle)
 */
/**
 * <--sprite created (SUN)
 */
/**
 * <--What happens when the sun hits the star?
 * 
 * ----
 */
/**
 * <-- This is where we control
 */
/**
 * <-- This function creates and controls the placement of the star.
 */
/**
 * <-- This controls when/what happens when you lose a life
 * 
 * <--
 */
// Bounce Sun off paddle
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (p, s) {
    s.vy = 0 - s.vy
    music.baDing.play()
})
/**
 * <-- Add sound for when the ball hits the paddle
 */
// Function to create a random star
function createStar () {
    star = sprites.create(img`
        . . . . 5 . . . 5 . . . . 
        . . 5 . . 5 . 5 . . 5 . . 
        . 5 . . . 5 5 5 . . . 5 . 
        . . 5 . . 5 . 5 . . 5 . . 
        . . . . 5 . . . 5 . . . . 
        `, SpriteKind.Food)
    star.setPosition(Math.randomRange(10, 150), Math.randomRange(10, 80))
}
/**
 * The score goes up 1 point.          <-
 */
/**
 * <-- New Star appears
 */
/**
 * <--This controls when you are allowed to go to the next level
 */
/**
 * <-- This is the sound the ball makes when hitting the paddle
 */
/**
 * <-- When the sun hits the paddle, the sun changes directions
 */
// When Sun hits a star
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (s, star) {
    star.destroy()
    info.changeScoreBy(1)
    createStar()
    // Check for level up
    if (info.score() >= scoreNeeded) {
        level += 1
        scoreNeeded += 10
        game.splash("Level " + level)
        // Increase Sun speed slightly each level
        Sun.vx += 10
        Sun.vy += 10
    }
})
/**
 * To Do List:
 * 
 * 1) Set Game Basics (Set Life, Set Score, Create Variables "Sun, Star, Level, ScoreNeeded, Set Level =1 *score to get to next level is 10*
 * 
 * 2)Create the Paddle (Create Paddle, Set the Paddle to Stay in the Screen, Place Paddle near bottom of screen, create movement for paddle.
 * 
 * 3)Create the Sun (Ball)
 * 
 * (Create new sprite, Give Velocity, Set to bounce on wall)
 * 
 * 4)Bounce Sun off Paddle *what happens when the ball interacts with paddle?*
 * 
 * (Sprite needs to overlap  kind projectile, reverse the walls vy, Place ding sound effect)
 * 
 * 5) Add a Star *These are to be collected for points)
 * 
 * (Make a Function: "createStar", Create "sprite of kind Food" with a picture of a star, Set the position of the star to place randomly, Make the star regenerate each time it is hit by the sun.
 * 
 * 6)Collect Stars for Points
 * 
 * (Add "on sprite of kind Projectile overlaps sprite of kind food" block, Destroy Star, Increase score by 1, call : createStar function again *This regenerates the star")
 * 
 * *add an if statement this will be for leveling up to the next level*
 * 
 * 7)Losing Lives
 * 
 * (use "on game update" block, Decrease life by 1, reset ball position, Reset velocity, pause briefly, create game over block)
 * 
 * **When testing game: Lives should decrease when sun misses paddle**
 */
/**
 * <-- set level and score needed to level up
 */
/**
 * <--How does the paddle Move?
 */
/**
 * <--Set Life
 */
/**
 * <--recall the star
 */
/**
 * <--How does the sun move?
 */
let speed = 0
let star: Sprite = null
let Sun: Sprite = null
let scoreNeeded = 0
let level = 0
level = 1
scoreNeeded = 10
// Create the paddle at the bottom
let paddle = sprites.create(assets.image`Paddle`, SpriteKind.Player)
paddle.setStayInScreen(true)
paddle.y = 110
controller.moveSprite(paddle, 100, 0)
// Set up lives and score
info.setLife(3)
info.setScore(0)
// Spawn first star
createStar()
// Create the Sun (ball)
Sun = sprites.create(assets.image`Sun`, SpriteKind.Projectile)
Sun.setVelocity(50, 50)
Sun.setBounceOnWall(true)
/**
 * <--This area controls when the game ends
 */
// Lose life if Sun hits the bottom of the screen (safe-guarded)
game.onUpdate(function () {
    // guard in case Sun hasn't been created yet
    if (Sun && Sun.y > 115) {
        info.changeLifeBy(-1)
        // Reset Sun position and velocity (send it upward so it doesn't immediately fall)
        speed = 50 + level * 10
        Sun.setPosition(80, 60)
        Sun.setVelocity(speed, 0 - speed)
        // small pause so player has a moment to react
        pause(500)
        // Game over if no lives left
        if (info.life() <= 0) {
            game.over(false, effects.dissolve)
        }
    }
})
