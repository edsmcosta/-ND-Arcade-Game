    const allSprites = [
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
    ];
    class Character{
        constructor(x, y, sprite){
            /**
            * @description represents an character
            * @constructor
            * @param {int} x - the initial axis X position
            * @param {int} y - the initial axis Y position
            * @param {string} sprite - the initial sprite used for represent the character
            */
            this.initX = this.x = x;
            this.initY = this.y = y;
            this.sprite = sprite;
        }
        // Draw the character on the screen, required method for game
        render() {
            /**
            * @description Render the character position with the correct sprite
            * @returns {function} a canvas drawer function ctx.drawImage();
            */
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }

    class Enemy extends Character{
        constructor(x, y, speed) {

            super(101-101*x, 72+72*y, allSprites[0]);
            this.speed = 1+speed;       
        }
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        update(dt) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            (this.x > 606 ? this.x = this.initX : this.x += 101*this.speed* dt);
        }
    }



    class Player extends Character{
        constructor() {

            super(202, 404, allSprites[1]);
            this.level = 0;
            this.score = 0;
            this.lives = 3;
        }
        //handle the player position by the event of keydown and avoid walk off the screen;
        handleInput(key) {
            var futX = this.x
            , futY = this.y
            ;
            switch (key) {
                case 'left':
                    futX -= 101;
                    (futX < 0 ? '' : this.x = futX);
                    break;
                case 'up':
                    futY -= 83;
                    (this.y === -11 ? this.reset("win") : this.y = futY);
                    break;
                case 'right':
                    futX += 101;
                    (futX > 404 ? '' : this.x = futX);
                    break;
                case 'down':
                    futY += 83;
                    (futY > 404 ? '' : this.y = futY);
                    break;
            }
            return;
        };
        //reset the player position and status in each case possible
        reset(cond) {
            this.x = this.initX;
            this.y = this.initY;
            switch(cond){
                case 'win':
                    this.level += 1;
                    this.score += 30; 
                    console.log('hey there!');
                    document.querySelector('.score-counter').textContent = 'Score: '+player.score;
                break;
                case 'loose':
                    this.lives -= 1;
                    console.log("lives: ", this.lives,'~~you loose~~');
                    document.querySelector('.life-counter').textContent = this.lives+'x';
                break;
                case 'die':
                    // this.lives = 3;
                    // this.level = 0;
                    // this.score = 0;
                    alert('~~you\'re dead =\\~~');
                    location.reload();
                break;
            }

        }
        // Update the player's position, required method for game
        update() {
            this.render();
        }
    }


    /**
    * @description generate a random number for the position of enemies
    * @param {int} al - the multiplier of the random number, that represents the degree of the X distance or the Y position in the screen. 
    */
    const randomPos =  (al) => {return Math.floor((Math.random() * al));}

    let complexX = 33; 
    let complexY = 3;

    const allEnemies = new Array( new Enemy(randomPos(complexX),randomPos(complexY),complexY), new Enemy(randomPos(complexX),randomPos(complexY),1)
                            , new Enemy(randomPos(complexX),randomPos(complexY),1), new Enemy(randomPos(complexX),randomPos(complexY),1)
                            , new Enemy(randomPos(complexX),randomPos(complexY),1), new Enemy(randomPos(complexX),randomPos(complexY),0.8)
                            , new Enemy(randomPos(complexX),randomPos(complexY),0.4), new Enemy(randomPos(complexX),randomPos(complexY),1)
                            , new Enemy(randomPos(complexX),randomPos(complexY),1), new Enemy(randomPos(complexX),randomPos(complexY),1)
                            , new Enemy(randomPos(complexX),randomPos(complexY),1), new Enemy(randomPos(complexX),randomPos(complexY),complexY)
                            );

    const player = new Player();

    /**
    * @description Initialize all the Menu components and information
    * @returns {callback} menuOptions()
    */
    const initMenu = (callback) => {
        allSprites.forEach((sp)=>{

            let elChild = document.createElement('div');
            elChild.setAttribute('class', 'char');
            elChild.innerHTML = '<button class="char-button"><img src="'+sp+'" data-img="'+sp+'" class="char"/></button>';
            document.querySelector('.chares').appendChild(elChild);
            
        });
    document.querySelector('.life-counter').textContent = player.lives+'x';
    document.querySelector('.score-counter').textContent = 'Score: '+player.score;

    return callback();
    }

    // Add the respective resources to the menu components
    const menuOptions = () => {
        const charChange = document.querySelectorAll('img.char');

        charChange.forEach((sp) => { 
            let newSprite = sp.getAttribute('data-img');
            sp.addEventListener('click', (char) => {
                player.sprite = newSprite; 
            });
        });
    }

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keydown', (e) => {
        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });

    //this block make all the no-game-play-element functional
    window.addEventListener('load', () =>{

        initMenu(menuOptions);
        // Get the modal
        const modal = document.getElementById('myModal');

        // Get the button that opens the modal
        const btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        btn.onclick = () => {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = () => {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });