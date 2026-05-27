# Pac-Man

A browser-based Pac-Man game built with WebGL (via the MV.js library). Navigate the triangle around the board, collect points, and avoid ghosts. Grab the gold square for ghost collision protection.

![gameplay](demo.gif)

## Controls

| Key | Action |
|---|---|
| `S` | Start game |
| `P` | Pause |
| `R` | Resume |
| `Shift + R` | Restart |
| Arrow keys | Move (North / South / East / West) |

## How to Play

Open `index.html` in any browser — no install needed.

Collect the yellow dots to score points. Ghosts move randomly; a collision costs 1000 points and resets ghost positions. Step on the gold square to gain one hit of protection against the next ghost collision.

## Tech

Built with vanilla JavaScript and WebGL using the MV.js utility library for matrix and vector math. Rendering is done entirely on the GPU via two stacked canvases — one WebGL canvas for the game, one 2D canvas for the score overlay.
