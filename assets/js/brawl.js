$(document).ready(function(){
    // Define Variables

    // Object constructor for multiple characters
    function character(hp, att, def){
        this.health = hp;
        this.baseAttack = att;
        this.currentAttack = att;
        this.defense = def;
    }

    function takeDamage(damage){
        this.health -= damage;
    }
    character.prototype.increaseAttack = function(){
        this.currentAttack += baseAttack;
    }

    character.prototype.takeDamage = takeDamage();

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

        // To clicked div
        player = $(this);
        console.log(player);
        console.log("Player health", player.data("health"));
        // Move left
        $(this).remove().appendTo('#characters-player');

        // To all character divs not clicked
        $('.character').not(this).each(function(){
            // Move right
            $(this).remove().appendTo("#characters-enemy");
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
        $('#characters-enemy > .character').on("click", function () {

            $(this).remove().appendTo("#characters-defender");
            // To clicked div
            defender = $(this);
            console.log(defender);
            console.log("Defender health", defender.data("health"));
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
        console.log(player);
        console.log(defender);
        console.log(player.data());
        
        // player.takeDamage(defender.data("defense")));
        // console.log('Player health', player.data("health"));
    }
});