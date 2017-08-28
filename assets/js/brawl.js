$(document).ready(function(){
    // Define Variables

    // Object constructor for multiple characters
    function character(hp, att, maAtt, def, maD){
        this.startingHealth = hp;
        this.health = hp;
        this.baseAttack = att;
        this.baseMagic = maAtt;
        this.currentAttack = att;
        this.currentMagic = maAtt;
        this.defense = def; 
        this.magicDefense = maD;
    }

    character.prototype.takeDamage = function (damage){
        this.health -= damage;
        console.log("Damage Taken", damage);
    }

    character.prototype.increaseAttack = function(){
        this.currentAttack += this.baseAttack;
    };

    character.prototype.increaseMagic = function(){
        this.currentMagic += this.baseMagic;
    };

    character.prototype.reset = function(){
        this.currentMagic = this.baseMagic;
        this.currentAttack = this.baseAttack;
        this.health = this.startingHealth;
    };

    // character.prototype.takeDamage = takeDamage();

    // Make new characters with values
    // Balancing is done here
    var fighter = new character(40, 20, 0, 25, 5);
    var mage = new character(60, 5, 25, 10, 40);
    var rogue = new character(30, 50, 10, 15, 10);
    var paladin = new character(100, 10, 15, 30, 30);

    var player;
    var defender;

    var originalState = $('.content').clone(true);

    // Assign Character Data to Character Classes
    $('#fighter').data(fighter);
    $('#mage').data(mage);
    $('#rogue').data(rogue);
    $('#paladin').data(paladin);

    UpdateStats();
    StartGame();

    function StartGame(){
        $('#bttn-phys').hide();
        $('#bttn-magic').hide();
        $('#alert-window').css("display","none");

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
    
        $('#bttn-phys').on("click", function () {
            Attack("physical");
        });
        
        $('#bttn-magic').on("click", function () {
            Attack("magic");
        });
    }

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
                    $(this).prependTo("#characters-defender");
                    $(this).on("click", Attack);
                    $('#bttn-phys').show();
                    $('#bttn-magic').show();
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

    function Attack(type) {

        if(type == "physical"){
            defender.takeDamage(player.currentAttack);
            player.increaseAttack();    
        }
        else if(type == "magic"){
            defender.takeDamage(player.currentMagic);
            player.increaseMagic();
        }
        console.log("Defender Health", defender.health);

        if(defender.health > 0){
            player.takeDamage(defender.defense);
            console.log("Player Health", player.health);            
        }
        else {
            $('#characters-defender > .character').remove();
            $('#bttn-phys').hide();
            $('#bttn-magic').hide();
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
            $(this).find('.character-health').text("Health: " + character.health);
            $(this).find('.character-attack').text("Attk: " + character.currentAttack);
            $(this).find('.character-defense').text("Def: " + character.defense);
            $(this).find('.character-magic-attack').text("MAttk: " + character.currentMagic);
            $(this).find('.character-magic-defense').text("MDef: " + character.magicDefense);
        });
    }

    function GameOver(playerWin) {
        console.log("Game Over!!!!!")
        
        $('#alert-window').css("display", "block");
        $('.alert-body').find('*').not('#bttn-reset').remove();
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
        $('.content').replaceWith(originalState.clone());
        $('#alert-window').css("display","none");
        $('.character').each(function(){
            var character = $(this).data();
            character.reset();
        });

        StartGame();
    }
});