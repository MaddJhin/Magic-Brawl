$(document).ready(function(){
    // Define Variables

    // Object constructor for multiple characters
    function character(hp, att, def){
        this.health = hp;
        this.baseAttack = att;
        this.currentAttack = att;
        this.defense = def; 
    }

    character.prototype.takeDamage = function (damage){
        this.health -= damage;
        console.log("Damage Taken", damage);
    }

    character.prototype.increaseAttack = function(){
        this.currentAttack += this.baseAttack;
    };

    // character.prototype.takeDamage = takeDamage();

    // Make new characters with values
    // Balancing is done here
    var fighter = new character(40, 20, 15);
    var mage = new character(60, 30, 25);
    var rogue = new character(30, 50, 10);
    var paladin = new character(100, 10, 30);

    var player;
    var defender;

    // Assign Character Data to Character Classes
    $('#fighter').data(fighter);
    $('#mage').data(mage);
    $('#rogue').data(rogue);
    $('#paladin').data(paladin);

    // Assign event functionality to elements

    // First State
    // Click any starting character
    // Character clicked goes left becomes player character
    // Other characters go right become enemies
    // New click functionality added for second phase
    UpdateStats();

    $('.character').on("click", function () {
        RemoveListeners();

        // To clicked div
        player = $(this).data();
        console.log(player);
        console.log("Player health", player.health);
        
        // Move left
        $(this).appendTo('#characters-player');

        // To all character divs not clicked
        $('.character').not(this).each(function(){
            // Move right
            $(this).appendTo("#characters-enemy");
        });

        SelectDefender();
    });

    // Repeated functionality
    // Remove all event listeners from character buttons
    function RemoveListeners() {
        $('.character').each(function(){
            $(this).off("click");
        })
    }

    // Second Stage
    // Clicking on an enemy brings him to the middle
    // Sets attack and counter attack values
    // Buttons to attack appear
    function SelectDefender() {
        if($('#characters-enemy').find('.character').length == 0)
        {
            GameOver(true);
        }
        else
        {
            $('#characters-enemy > .character').each(function(){
                $(this).on("click", function () {
                    RemoveListeners();
                    defender = $(this).data();
                    console.log("The Defender", defender)
                    $(this).appendTo("#characters-defender");
                    $(this).on("click", Attack);
                });
            });
        }
    }


    // Third Stage
    // Clicking Attack Button Damages player and enemy
    // Set new damage and health totals
        // On Enemy kill
            // Hide enemy 
            // If there are more enemies repeat stage 2
            // Else Game Over Player Wins
        //On player kill
            // Game Over Player Losses

    // Fourth Stage Reset Game
        // Attack and Health Values to Original
        // All Characters In middle
        // Click buttons to first stage

    function Attack() {
        defender.takeDamage(player.currentAttack);
        player.increaseAttack();
        console.log("Defender Health", defender.health);

        if(defender.health > 0){
            player.takeDamage(defender.defense);
            console.log("Player Health", player.health);            
        }
        else {
            $('#characters-defender > .character').remove();
            SelectDefender();
        }
        
        if(player.health <= 0){
            GameOver(false);
        }

        UpdateStats();

    }

    function UpdateStats() {
        $('.character').each(function(){
            console.log("Updating Stats", this);
            var character = $(this).data();
            $(this).find('.character-health').text("HP: " + character.health);
            $(this).find('.character-attack').text("Attack: " + character.currentAttack);
            $(this).find('.character-defense').text("Defense: " + character.defense);
        });
    }

    function GameOver(playerWin) {
        console.log("Game Over!!!!!")
        
        $('#alert-window').css("opacity", 1);
        if(playerWin == true){
            $('.alert-body').prepend('<p>Player Won!!!</p>');
        }
        else{
            $('.alert-body').prepend('<p>Player Lost!!!</p>');
        }
        RemoveListeners();

        $('#bttn-reset').on("click",function(){
            GameReset();
        });
    }

    function GameReset() {
        console.log("Game has Reset!");
    }
});