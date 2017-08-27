$(document).ready(function(){
    // Define Variables

    // Object constructor for multiple characters
    function character(hp, att, def){
        this.health = hp;
        this.baseAttack = att;
        this.currentAttack = att;
        this.defense = def;
    }

    character.prototype.increaseAttack = function(){
        this.currentAttack += baseAttack;
    }

    character.prototype.takeDamage = function(damage){
        this.health -= damage;
    }

    // Make new characters with values
    // Balancing is done here
    var fighter = new character(60, 10, 15);
    var mage = new character(60, 10, 25);
    var rogue = new character(60, 10, 25);
    var paladin = new character(60, 10, 25);

    //Global Variable for easy access
    var player;
    var defender;

    // Assign Character Data to Character Classes
    $('#fighter').data(fighter);
    $('#mage').data(mage);
    $('#rogue').data(rogue);
    $('#paladin').data(paladin);

    console.log("Fighter Health: " + $('#fighter').data("health"));

    // Assign event functionality to elements

    // First State
    // Click any starting character
    // Character clicked goes left becomes player character
    // Other characters go right become enemies
    // New click functionality added for second phase
    $('.character').on("click", function () {
        console.log("Button Clicked");

        // To all character divs not clicked
        $('.character').not(this).each(function(){
            console.log("Not selected: ", this);
            // Move right
            $(this).remove().appendTo("#characters-enemy");
            // Advance to Stage Two
            SelectDefender();
        });

        // To clicked div
        console.log("Selected: ", this);
        // Move left
        $(this).remove().appendTo('#characters-player');
        player = $(this).data()
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
            $('.character').on("click", function () {
                RemoveListeners();
                $(this).appendTo("#characters-defender");
                defender = $(this).data();
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
        //var playerHealth = player.data("health");
        //var defenderHealth = defender.data("health");

        console.log("The Player is a: " + player);
        console.log("The Defender is a: " + defender);
        //console.log("Player Health: " + playerHealth);
        //console.log("Defender Health: " + defenderHealth);
    }
});