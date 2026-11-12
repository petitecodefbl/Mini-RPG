// ========================================
// ÉLÉMENTS DU JEU
// ========================================

const player = document.getElementById("player");
const game = document.getElementById("game");

const npc = document.getElementById("npc");
const interaction = document.getElementById("interaction");

const dialogue = document.getElementById("dialogue");
const dialogueText = document.getElementById("dialogue-text");
const dialogueName = document.getElementById("dialogue-name");

const coffee = document.getElementById("coffee");

const questBox = document.getElementById("quest-box");
const questTitle = document.querySelector(".quest-title");
const questObjective = document.getElementById("quest-objective");

const levelUpMessage =
  document.getElementById("level-up-message");

const levelUpText =
  document.getElementById("level-up-text");


// ========================================
// MAPS
// ========================================

const mapOutside =
  document.getElementById("map-outside");

const mapOffice =
  document.getElementById("map-office");

const officeDoor =
  document.getElementById("office-door");

const officeExit =
  document.getElementById("office-exit");

const printer =
  document.getElementById("printer");

let currentMap = "outside";

let canEnterOffice = false;
let canExitOffice = false;

let canExaminePrinter = false;


// ========================================
// QUÊTE CAFÉ
// ========================================

let coffeeQuestActive = false;
let coffeeQuestCompleted = false;

let canPickCoffee = false;
let hasCoffee = false;


// ========================================
// QUÊTE IMPRIMANTE
// ========================================

let printerQuestAvailable = false;
let printerQuestActive = false;
let printerQuestCompleted = false;

let printerFixed = false;


// ========================================
// DIALOGUES
// ========================================

let canTalk = false;

let dialogueOpen = false;
let dialogueStep = 0;

let printerMessageOpen = false;


// ========================================
// POSITION DE JOËL
// ========================================

let x = 330;
let y = 205;

const speed = 10;


// ========================================
// STATS DE JOËL
// ========================================

const joel = {

  level: 1,

  xp: 0,
  xpToNextLevel: 100,

  health: 100,
  maxHealth: 100,

  money: 0

};


const levelDisplay =
  document.getElementById("level");

const healthDisplay =
  document.getElementById("health");

const xpText =
  document.getElementById("xp-text");

const xpFill =
  document.getElementById("xp-fill");


// ========================================
// CONTRÔLES MOBILE
// ========================================

const joystick =
  document.getElementById("joystick");

const joystickStick =
  document.getElementById("joystick-stick");

const mobileAction =
  document.getElementById("mobile-action");

let joystickX = 0;
let joystickY = 0;

let joystickActive = false;


// ========================================
// DIALOGUE 1 : CAFÉ
// ========================================

const thiryDialogue = [

  {
    speaker: "Thiry",
    text: "Joël ! Café ?"
  },

  {
    speaker: "Joël",
    text: "Déjà ??"
  },

  {
    speaker: "Thiry",
    text: "Je me disais qu'une petite pause café ferait pas de mal..."
  },

  {
    speaker: "Joël",
    text: "Il est 8h..."
  },

  {
    speaker: "Thiry",
    text: "J'ai envie d'un café."
  },

  {
    speaker: "Joël",
    text: "Bon, attends. Je vais voir si je peux t'en trouver un."
  },

  {
    speaker: "Thiry",
    text: "Ah ! Je savais que je pouvais compter sur toi."
  }

];


// ========================================
// RETOUR DU CAFÉ
// ========================================

const thiryCoffeeDialogue = [

  {
    speaker: "Joël",
    text: "Tiens, ton café."
  },

  {
    speaker: "Thiry",
    text: "Ah ! Enfin une bonne nouvelle."
  },

  {
    speaker: "Joël",
    text: "Ça fait même pas cinq minutes..."
  },

  {
    speaker: "Thiry",
    text: "Parfait. Pause café !"
  }

];


// ========================================
// QUÊTE 2 : IMPRIMANTE
// ========================================

const printerQuestDialogue = [

  {
    speaker: "Joël",
    text: "Bon, maintenant je vais peut-être pouvoir bosser."
  },

  {
    speaker: "Thiry",
    text: "Justement..."
  },

  {
    speaker: "Joël",
    text: "Quoi encore ?"
  },

  {
    speaker: "Thiry",
    text: "J'ai une imprimante qui répond plus sur le réseau."
  },

  {
    speaker: "Joël",
    text: "T'as vérifié le câble ?"
  },

  {
    speaker: "Thiry",
    text: "...C'est pour ça que je viens voir l'admin réseau."
  },

  {
    speaker: "Joël",
    text: "Bon. Je vais voir."
  }

];


// ========================================
// FIN QUÊTE IMPRIMANTE
// ========================================

const printerQuestCompleteDialogue = [

  {
    speaker: "Joël",
    text: "C'est bon, ton imprimante est reconnectée."
  },

  {
    speaker: "Thiry",
    text: "Ah ! C'était quoi ?"
  },

  {
    speaker: "Joël",
    text: "Le câble réseau était branché dans le mauvais port."
  },

  {
    speaker: "Thiry",
    text: "Donc c'était bien un problème réseau."
  },

  {
    speaker: "Joël",
    text: "...Si tu veux."
  }

];


// ========================================
// POSITION DE DÉPART
// ========================================

player.style.left = x + "px";
player.style.top = y + "px";

updateStats();


// ========================================
// CLAVIER
// ========================================

document.addEventListener(
  "keydown",
  function(event) {

    const key =
      event.key.toLowerCase();


    // ====================================
    // MESSAGE DE L'IMPRIMANTE
    // ====================================

    if (
      key === "e" &&
      printerMessageOpen
    ) {

      printerMessageOpen = false;
      dialogueOpen = false;

      dialogue.style.display = "none";

      return;
    }


    // ====================================
    // EXAMINER L'IMPRIMANTE
    // ====================================

    if (
      key === "e" &&
      canExaminePrinter &&
      printerQuestActive &&
      !printerFixed
    ) {

      fixPrinter();

      return;
    }


    // ====================================
    // ENTRER DANS L'UNIVERSITÉ
    // ====================================

    if (
      key === "e" &&
      canEnterOffice
    ) {

      changeMap("office");

      return;
    }


    // ====================================
    // SORTIR DE L'UNIVERSITÉ
    // ====================================

    if (
      key === "e" &&
      canExitOffice
    ) {

      changeMap("outside");

      return;
    }


    // ====================================
    // RAMASSER LE CAFÉ
    // ====================================

    if (
      key === "e" &&
      canPickCoffee &&
      !hasCoffee
    ) {

      hasCoffee = true;
      canPickCoffee = false;

      coffee.style.display = "none";

      interaction.style.display = "none";

      questObjective.textContent =
        "☑ Café récupéré — Retourner voir Thiry";

      return;
    }


    // ====================================
    // PARLER À THIRY
    // ====================================

    if (
      key === "e" &&
      canTalk
    ) {

      let currentDialogue;


      // FIN DE LA QUÊTE IMPRIMANTE

      if (
        printerFixed &&
        printerQuestActive &&
        !printerQuestCompleted
      ) {

        currentDialogue =
          printerQuestCompleteDialogue;

      }


      // RETOUR AVEC LE CAFÉ

      else if (hasCoffee) {

        currentDialogue =
          thiryCoffeeDialogue;

      }


      // THIRY DONNE LA QUÊTE IMPRIMANTE

      else if (
        printerQuestAvailable &&
        !printerQuestActive &&
        !printerQuestCompleted
      ) {

        currentDialogue =
          printerQuestDialogue;

      }


      // PREMIER DIALOGUE

      else {

        currentDialogue =
          thiryDialogue;

      }


      // ==================================
      // OUVRIR LE DIALOGUE
      // ==================================

      if (!dialogueOpen) {

        dialogueOpen = true;
        dialogueStep = 0;

        dialogue.style.display =
          "block";

        dialogueName.textContent =
          currentDialogue[
            dialogueStep
          ].speaker;

        dialogueText.textContent =
          currentDialogue[
            dialogueStep
          ].text;

      }


      // ==================================
      // PHRASE SUIVANTE
      // ==================================

      else {

        dialogueStep++;


        if (
          dialogueStep <
          currentDialogue.length
        ) {

          dialogueName.textContent =
            currentDialogue[
              dialogueStep
            ].speaker;

          dialogueText.textContent =
            currentDialogue[
              dialogueStep
            ].text;

        }


        // ================================
        // FIN DU DIALOGUE
        // ================================

        else {

          dialogueOpen = false;

          dialogue.style.display =
            "none";


          // FIN QUÊTE IMPRIMANTE

          if (
            printerFixed &&
            printerQuestActive &&
            !printerQuestCompleted
          ) {

            completePrinterQuest();

          }


          // FIN QUÊTE CAFÉ

          else if (hasCoffee) {

            completeCoffeeQuest();

          }


          // DÉBUT QUÊTE IMPRIMANTE

          else if (
            printerQuestAvailable &&
            !printerQuestActive
          ) {

            startPrinterQuest();

          }


          // DÉBUT QUÊTE CAFÉ

          else if (
            !coffeeQuestActive &&
            !coffeeQuestCompleted
          ) {

            startCoffeeQuest();

          }

        }

      }

      return;
    }


    // ====================================
    // ANCIENNE POSITION
    // ====================================

    const oldX = x;
    const oldY = y;


    // ====================================
    // DÉPLACEMENT
    // ====================================

    if (
      key === "z" ||
      event.key === "ArrowUp"
    ) {

      y -= speed;

    }


    if (
      key === "s" ||
      event.key === "ArrowDown"
    ) {

      y += speed;

    }


    if (
      key === "q" ||
      event.key === "ArrowLeft"
    ) {

      x -= speed;

    }


    if (
      key === "d" ||
      event.key === "ArrowRight"
    ) {

      x += speed;

    }


    // ====================================
    // LIMITES DE LA MAP
    // ====================================

    const gameWidth =
      game.clientWidth;

    const gameHeight =
      game.clientHeight;

    const playerWidth =
      player.offsetWidth;

    const playerHeight =
      player.offsetHeight;


    if (x < 0) {
      x = 0;
    }


    if (
      x >
      gameWidth - playerWidth
    ) {

      x =
        gameWidth - playerWidth;

    }


    if (y < 0) {
      y = 0;
    }


    if (
      y >
      gameHeight - playerHeight
    ) {

      y =
        gameHeight - playerHeight;

    }


    player.style.left =
      x + "px";

    player.style.top =
      y + "px";


    // ====================================
    // HITBOX DE JOËL
    // ====================================

    const fullPlayerRect =
      player.getBoundingClientRect();


    const playerRect = {

      left:
        fullPlayerRect.left + 10,

      right:
        fullPlayerRect.right - 10,

      top:
        fullPlayerRect.bottom - 25,

      bottom:
        fullPlayerRect.bottom

    };


    // ====================================
    // OBSTACLES DE LA MAP ACTUELLE
    // ====================================

    let currentObstacles;


    if (
      currentMap === "outside"
    ) {

      currentObstacles =
        mapOutside.querySelectorAll(
          ".obstacle"
        );

    }

    else {

      currentObstacles =
        mapOffice.querySelectorAll(
          ".obstacle"
        );

    }


    let collision = false;


    currentObstacles.forEach(
      function(obstacle) {

        const fullObstacleRect =
          obstacle.getBoundingClientRect();

        let obstacleRect;


        // ================================
        // ARBRE
        // ================================

        if (
          obstacle.classList.contains(
            "tree"
          )
        ) {

          obstacleRect = {

            left:
              fullObstacleRect.left + 25,

            right:
              fullObstacleRect.right - 25,

            top:
              fullObstacleRect.bottom - 30,

            bottom:
              fullObstacleRect.bottom

          };

        }


        // ================================
        // ROCHER
        // ================================

        else if (
          obstacle.classList.contains(
            "rock"
          )
        ) {

          obstacleRect = {

            left:
              fullObstacleRect.left + 10,

            right:
              fullObstacleRect.right - 10,

            top:
              fullObstacleRect.top + 20,

            bottom:
              fullObstacleRect.bottom

          };

        }


        // ================================
        // AUTRES OBSTACLES
        // ================================

        else {

          obstacleRect =
            fullObstacleRect;

        }


        // ================================
        // COLLISION
        // ================================

        if (

          playerRect.left <
          obstacleRect.right &&

          playerRect.right >
          obstacleRect.left &&

          playerRect.top <
          obstacleRect.bottom &&

          playerRect.bottom >
          obstacleRect.top

        ) {

          collision = true;

        }

      }
    );


    // ====================================
    // ANNULER LE DÉPLACEMENT
    // ====================================

    if (collision) {

      x = oldX;
      y = oldY;

      player.style.left =
        x + "px";

      player.style.top =
        y + "px";

    }


    // ====================================
    // PROFONDEUR DE JOËL
    // ====================================

    let playerZ = 30;


    if (
      currentMap === "outside"
    ) {

      const trees =
        mapOutside.querySelectorAll(
          ".tree"
        );


      trees.forEach(
        function(tree) {

          const treeRect =
            tree.getBoundingClientRect();

          const currentPlayerRect =
            player.getBoundingClientRect();


          const playerCenterX =
            currentPlayerRect.left +
            currentPlayerRect.width / 2;


          const procheDeLarbre =

            playerCenterX >
            treeRect.left - 20

            &&

            playerCenterX <
            treeRect.right + 20;


          if (

            procheDeLarbre &&

            currentPlayerRect.bottom <
            treeRect.bottom - 10

          ) {

            playerZ = 5;

          }

        }
      );

    }


    player.style.zIndex =
      playerZ;


    // ====================================
    // THIRY
    // ====================================

    if (
      currentMap === "outside"
    ) {

      const playerPosition =
        player.getBoundingClientRect();

      const npcPosition =
        npc.getBoundingClientRect();


      const playerCenterX =
        playerPosition.left +
        playerPosition.width / 2;

      const playerCenterY =
        playerPosition.top +
        playerPosition.height / 2;


      const npcCenterX =
        npcPosition.left +
        npcPosition.width / 2;

      const npcCenterY =
        npcPosition.top +
        npcPosition.height / 2;


      const distanceX =
        playerCenterX -
        npcCenterX;

      const distanceY =
        playerCenterY -
        npcCenterY;


      const distance =
        Math.sqrt(

          distanceX * distanceX +

          distanceY * distanceY

        );


      if (
        distance < 120
      ) {

        canTalk = true;

        interaction.textContent =
          "E — Parler";

        interaction.style.left =
          npc.offsetLeft +
          10 +
          "px";

        interaction.style.top =
          npc.offsetTop -
          35 +
          "px";

        interaction.style.display =
          "block";

      }

      else {

        canTalk = false;

      }

    }

    else {

      canTalk = false;

    }


    // ====================================
    // CAFÉ
    // ====================================

    if (
      currentMap === "outside" &&
      coffeeQuestActive &&
      !hasCoffee
    ) {

      const playerPosition =
        player.getBoundingClientRect();

      const coffeePosition =
        coffee.getBoundingClientRect();


      const nearCoffee =

        playerPosition.right >
        coffeePosition.left - 35 &&

        playerPosition.left <
        coffeePosition.right + 35 &&

        playerPosition.bottom >
        coffeePosition.top - 35 &&

        playerPosition.top <
        coffeePosition.bottom + 35;


      if (nearCoffee) {

        canPickCoffee = true;

        interaction.textContent =
          "E — Ramasser";

        interaction.style.left =
          coffee.offsetLeft -
          20 +
          "px";

        interaction.style.top =
          coffee.offsetTop -
          35 +
          "px";

        interaction.style.display =
          "block";

      }

      else {

        canPickCoffee = false;

      }

    }

    else {

      canPickCoffee = false;

    }


    // ====================================
    // PORTE DE L'UNIVERSITÉ
    // ====================================

    if (
      currentMap === "outside"
    ) {

      const playerPosition =
        player.getBoundingClientRect();

      const doorPosition =
        officeDoor.getBoundingClientRect();


      const nearDoor =

        playerPosition.right >
        doorPosition.left - 30 &&

        playerPosition.left <
        doorPosition.right + 30 &&

        playerPosition.bottom >
        doorPosition.top - 30 &&

        playerPosition.top <
        doorPosition.bottom + 30;


      if (nearDoor) {

        canEnterOffice = true;

        interaction.textContent =
          "E — Entrer";

        interaction.style.left =
          officeDoor.offsetLeft +
          5 +
          "px";

        interaction.style.top =
          officeDoor.offsetTop -
          35 +
          "px";

        interaction.style.display =
          "block";

      }

      else {

        canEnterOffice = false;

      }

    }

    else {

      canEnterOffice = false;

    }


    // ====================================
    // SORTIE DE L'UNIVERSITÉ
    // ====================================

    if (
      currentMap === "office"
    ) {

      const playerPosition =
        player.getBoundingClientRect();

      const exitPosition =
        officeExit.getBoundingClientRect();


      const nearExit =

        playerPosition.right >
        exitPosition.left - 30 &&

        playerPosition.left <
        exitPosition.right + 30 &&

        playerPosition.bottom >
        exitPosition.top - 30 &&

        playerPosition.top <
        exitPosition.bottom + 30;


      if (nearExit) {

        canExitOffice = true;

        interaction.textContent =
          "E — Sortir";

        interaction.style.left =
          officeExit.offsetLeft -
          5 +
          "px";

        interaction.style.top =
          officeExit.offsetTop -
          35 +
          "px";

        interaction.style.display =
          "block";

      }

      else {

        canExitOffice = false;

      }

    }

    else {

      canExitOffice = false;

    }


    // ====================================
    // IMPRIMANTE
    // ====================================

    if (
      currentMap === "office" &&
      printerQuestActive &&
      !printerFixed
    ) {

      const playerPosition =
        player.getBoundingClientRect();

      const printerPosition =
        printer.getBoundingClientRect();


      const nearPrinter =

        playerPosition.right >
        printerPosition.left - 40 &&

        playerPosition.left <
        printerPosition.right + 40 &&

        playerPosition.bottom >
        printerPosition.top - 40 &&

        playerPosition.top <
        printerPosition.bottom + 40;


      if (nearPrinter) {

        canExaminePrinter = true;

        interaction.textContent =
          "E — Examiner";

        interaction.style.left =
          printer.offsetLeft -
          10 +
          "px";

        interaction.style.top =
          printer.offsetTop -
          35 +
          "px";

        interaction.style.display =
          "block";

      }

      else {

        canExaminePrinter = false;

      }

    }

    else {

      canExaminePrinter = false;

    }


    // ====================================
    // CACHER L'INTERACTION
    // ====================================

    if (
      !canTalk &&
      !canPickCoffee &&
      !canEnterOffice &&
      !canExitOffice &&
      !canExaminePrinter
    ) {

      interaction.style.display =
        "none";

    }

  }
);


// ========================================
// DÉMARRER LA QUÊTE CAFÉ
// ========================================

function startCoffeeQuest() {

  coffeeQuestActive = true;

  questBox.style.display =
    "block";

  questTitle.textContent =
    "☕ La pause café";

  questObjective.textContent =
    "□ Trouver un café pour Thiry";

  coffee.style.display =
    "block";

}


// ========================================
// TERMINER LA QUÊTE CAFÉ
// ========================================

function completeCoffeeQuest() {

  coffeeQuestCompleted = true;

  coffeeQuestActive = false;

  hasCoffee = false;


  questTitle.textContent =
    "☕ La pause café";

  questObjective.textContent =
    "✅ Quête terminée !";


  addXP(40);


  printerQuestAvailable = true;

}


// ========================================
// DÉMARRER QUÊTE IMPRIMANTE
// ========================================

function startPrinterQuest() {

  printerQuestActive = true;

  printerQuestAvailable = false;


  questBox.style.display =
    "block";

  questTitle.textContent =
    "🖨️ Problème réseau";

  questObjective.textContent =
    "□ Aller voir l'imprimante";

}


// ========================================
// RÉPARER L'IMPRIMANTE
// ========================================

function fixPrinter() {

  printerFixed = true;

  canExaminePrinter = false;


  interaction.style.display =
    "none";


  printerMessageOpen = true;

  dialogueOpen = true;


  dialogue.style.display =
    "block";

  dialogueName.textContent =
    "Joël";

  dialogueText.textContent =
    "Le câble réseau est branché dans le mauvais port... évidemment.";


  questObjective.textContent =
    "☑ Imprimante reconnectée — Retourner voir Thiry";

}


// ========================================
// TERMINER QUÊTE IMPRIMANTE
// ========================================

function completePrinterQuest() {

  printerQuestCompleted = true;

  printerQuestActive = false;


  questTitle.textContent =
    "🖨️ Problème réseau";

  questObjective.textContent =
    "✅ Quête terminée !";


  addXP(60);

}


// ========================================
// XP
// ========================================

function addXP(amount) {

  joel.xp += amount;


  while (
    joel.xp >=
    joel.xpToNextLevel
  ) {

    joel.xp -=
      joel.xpToNextLevel;

    levelUp();

  }


  updateStats();

}


// ========================================
// LEVEL UP
// ========================================

function levelUp() {

  joel.level++;

  joel.xpToNextLevel += 50;

  joel.maxHealth += 10;

  joel.health =
    joel.maxHealth;


  showLevelUp();

}


// ========================================
// AFFICHER LEVEL UP
// ========================================

function showLevelUp() {

  levelUpText.textContent =
    "Joël passe niveau " +
    joel.level +
    " — ❤️ Vie max : " +
    joel.maxHealth;


  levelUpMessage.style.display =
    "block";


  setTimeout(
    function() {

      levelUpMessage.style.display =
        "none";

    },
    2500
  );

}


// ========================================
// METTRE À JOUR LES STATS
// ========================================

function updateStats() {

  levelDisplay.textContent =
    "Niv. " +
    joel.level;


  healthDisplay.textContent =
    joel.health +
    " / " +
    joel.maxHealth;


  xpText.textContent =
    joel.xp +
    " / " +
    joel.xpToNextLevel;


  const percentage =

    (
      joel.xp /
      joel.xpToNextLevel
    ) *
    100;


  xpFill.style.width =
    percentage +
    "%";

}


// ========================================
// CHANGEMENT DE MAP
// ========================================

function changeMap(mapName) {

  mapOutside.classList.remove(
    "active-map"
  );

  mapOffice.classList.remove(
    "active-map"
  );


  // ======================================
  // ENTRER DANS L'UNIVERSITÉ
  // ======================================

  if (
    mapName === "office"
  ) {

    currentMap = "office";


    mapOffice.classList.add(
      "active-map"
    );


    // Joël apparaît devant
    // la porte intérieure

    x = 325;
    y = 320;

  }


  // ======================================
  // SORTIR DE L'UNIVERSITÉ
  // ======================================

  if (
    mapName === "outside"
  ) {

    currentMap = "outside";


    mapOutside.classList.add(
      "active-map"
    );


    // Joël apparaît devant
    // l'université

    x = 515;
    y = 320;

  }


  player.style.left =
    x + "px";

  player.style.top =
    y + "px";


  // Toujours visible au-dessus
  // de la map intérieure

  player.style.zIndex =
    30;


  dialogueOpen = false;

  printerMessageOpen = false;


  dialogue.style.display =
    "none";

  interaction.style.display =
    "none";


  canTalk = false;

  canPickCoffee = false;

  canEnterOffice = false;

  canExitOffice = false;

  canExaminePrinter = false;

}


// ========================================
// JOYSTICK MOBILE
// ========================================

function updateJoystick(event) {

  const rect =
    joystick.getBoundingClientRect();


  const centerX =
    rect.left +
    rect.width / 2;

  const centerY =
    rect.top +
    rect.height / 2;


  let deltaX =
    event.clientX -
    centerX;

  let deltaY =
    event.clientY -
    centerY;


  const maxDistance = 35;


  const distance =
    Math.sqrt(

      deltaX * deltaX +

      deltaY * deltaY

    );


  if (
    distance >
    maxDistance
  ) {

    deltaX =
      (
        deltaX /
        distance
      ) *
      maxDistance;


    deltaY =
      (
        deltaY /
        distance
      ) *
      maxDistance;

  }


  joystickStick.style.transform =
    "translate(" +
    deltaX +
    "px, " +
    deltaY +
    "px)";


  joystickX =
    deltaX /
    maxDistance;

  joystickY =
    deltaY /
    maxDistance;

}


// ========================================
// JOYSTICK : APPUYER
// ========================================

joystick.addEventListener(
  "pointerdown",
  function(event) {

    joystickActive = true;


    joystick.setPointerCapture(
      event.pointerId
    );


    updateJoystick(event);

  }
);


// ========================================
// JOYSTICK : BOUGER
// ========================================

joystick.addEventListener(
  "pointermove",
  function(event) {

    if (!joystickActive) {
      return;
    }


    updateJoystick(event);

  }
);


// ========================================
// JOYSTICK : ARRÊTER
// ========================================

function stopJoystick() {

  joystickActive = false;

  joystickX = 0;
  joystickY = 0;


  joystickStick.style.transform =
    "translate(0px, 0px)";

}


joystick.addEventListener(
  "pointerup",
  stopJoystick
);


joystick.addEventListener(
  "pointercancel",
  stopJoystick
);


// ========================================
// MOUVEMENT MOBILE
// ========================================

let lastMobileMove = 0;


function mobileMovement(time) {

  if (
    joystickActive &&
    time - lastMobileMove > 60
  ) {


    if (
      joystickY < -0.35
    ) {

      document.dispatchEvent(

        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowUp"
          }
        )

      );

    }


    if (
      joystickY > 0.35
    ) {

      document.dispatchEvent(

        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowDown"
          }
        )

      );

    }


    if (
      joystickX < -0.35
    ) {

      document.dispatchEvent(

        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowLeft"
          }
        )

      );

    }


    if (
      joystickX > 0.35
    ) {

      document.dispatchEvent(

        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowRight"
          }
        )

      );

    }


    lastMobileMove =
      time;

  }


  requestAnimationFrame(
    mobileMovement
  );

}


requestAnimationFrame(
  mobileMovement
);


// ========================================
// BOUTON E MOBILE
// ========================================

mobileAction.addEventListener(
  "pointerdown",
  function(event) {

    event.preventDefault();


    document.dispatchEvent(

      new KeyboardEvent(
        "keydown",
        {
          key: "e"
        }
      )

    );

  }
);
