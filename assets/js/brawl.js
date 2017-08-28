$(document).ready(function(){
    // Define Variables

    // Object constructor for multiple characters
    function character(hp, att, def){
        this.health = hp;
        this.baseAttack = att;
        this.currentAttack = att;
        this.defense = def;
        this.takeDamage = function (damage){
            this.health -= damage;
            console.log("Damage Taken", damage);
        }
    }

    // character.prototype.increaseAttack = takeDamage();

    // character.prototype.takeDamage = takeDamage();

    // Make new characters with values
    // Balancing is done here
    var fighter = new character(60, 10, 15);
    var mage = new character(60, 10, 25);
    var rogue = new character(60, 10, 25);
    var paladin = new character(60, 10, 25);

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
        console.log("Player Health", player.health);
        console.log("Defender Health", defender.health);
        // player.takeDamage(defender.data("defense")));
        // console.log('Player health', player.data("health"));
        defender.takeDamage(player.currentAttack);
        console.log("Player Health", player.health);
    }
});