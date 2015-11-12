# KLAX

Open source puzzle game invented to simulate hacking a computer system in a game of D&D.

## Generate an encryption key for the Encrypter player

The hard encryption key for Level 4 shuffles the keys.

```bash
rake generate_encryption_key
rake generate_hard_encryption_key
```

## Create a new puzzle

Visit the `index.html` page. Supply the URL param `difficulty` between 1-4 to receive a map for the appropriate level.

## Rules
Klax (pronounced "kay-lax") is a group puzzle game used to simulate hacking in TILR D&D.

Whenever the players wish to lookup information that they don't have access to, they need to complete a successful hack
by winning a game of Klax.

### Game Difficulty
The DM will set the difficulty of the hack based on how difficult the information will be to retrieve. The levels
of Klax difficulty are 1-4, with 4 being the hardest.

### Hacker's Advantage
The group's hackers can attempt to reduce the difficulty of a particular game of Klax by writing an excellent
algorithm, simulated by rolling 1D20.

A roll of 25 or above (including the hacker's intelligence bonus) reduces the difficulty of the round by 1. 

A natural 20 reduces the game by 2 level of difficulty.

### Goal
The goal of a game of Klax is to successfully locate the information in TILR (by solving a maze).

### Level 1
In every game of Klax, each square in the maze is marked with a symbol.

In level 1, each symbol is a card from a deck of playing cards.

One player acts as the Navigator. Only the navigator can see the map of the maze, 
and it's their job to lead the players from its start to its exit. 

For each square they wish to navigate to, they shout out the name of playing card on the square. The rest of the
players must locate the correct card and hand it to the Navigator.

There is no limit to the number of cards the Navigator can shout out at once, but the Navigator must receive the cards
in the order they are required--they cannot jump over spaces on the map.

Once the team reaches the exit, the game is won. If the team does not reach the exit within 2 minutes, they are caught and
locked out of the system.

### Level 2
In level 2, there are two navigators, each with one half of the maze. They cannot look at each others' mazes.

It's up to the two navigators to coordinate a solution between the two panels of the maze, again by shouting out
the name of each card to the other players.

### Level 3
In level 3, all icons on the board are encrypted. In addition to the two Navigators, there is a Decrypter role.

The Decrypter must listen for the icons called out by the Naviagtors, and decrypt them into the playing cards they represent
using the decryption key. The remaining players pass the playing cards to the appropriate navigator, in order, as before.

### Level 4
In level 4, their are 4 quadrants on the map. The two navigators receive two random segments of the map.

The players do not know which corners of the map they've received, and they don't know the orientation of their segments.

They must communicate with the decrypter to figure out the symbols representing the name of each square (ie. A1, B2, etc.),
and use that information to align the 4 corners of the map appropriately.

Then all play continues as in level 3.
