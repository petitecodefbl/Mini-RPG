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
let printerFixed = false;


// ========================================
// QUÊTE CAFÉ
// ========================================

let coffeeQuestActive = false;
let canPickCoffee = false;
let hasCoffee = false;
let coffeeQuestCompleted = false;


// ========================================
// QUÊTE IMPRIMANTE
// ========================================

let printerQuestAvailable = false;
let printerQuestActive = false;
let printerQuestCompleted = false;


// ========================================
// DIALOGUE
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
// DIALOGUE QUÊTE CAFÉ
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
// DIALOGUE RETOUR CAFÉ
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
// DIALOGUE QUÊTE IMPRIMANTE
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
    text: "Donc c'était bien un problème réseau ! "
  },

  {
    speaker: "Joël",
    text: "Si tu veux..."
  }

];

// ========================================
// POSITION DE DÉPART
// ========================================

player.style.left = x + "px";
player.style.top = y + "px";


// ========================================
// CLAVIER
// ========================================

document.addEventListener("keydown", function(event) {

  const key = event.key.toLowerCase();


  // ======================================
  // FERMER LE MESSAGE DE L'IMPRIMANTE
  // ======================================

  if (
    key === "e" &&
    printerMessageOpen
  ) {

    printerMessageOpen = false;
    dialogueOpen = false;

    dialogue.style.display = "none";

    return;
  }


  // ======================================
  // EXAMINER L'IMPRIMANTE
  // ======================================

  if (
    key === "e" &&
    canExaminePrinter &&
    printerQuestActive &&
    !printerFixed
  ) {

    fixPrinter();

    // ========================================
// TERMINER LA QUÊTE IMPRIMANTE
// ========================================

function completePrinterQuest() {

  printerQuestCompleted = true;
  printerQuestActive = false;

  const questTitle =
    document.querySelector(
      ".quest-title"
    );

  questTitle.textContent =
    "🖨️ Problème réseau";

  questObjective.textContent =
    "✅ Quête terminée !";

  addXP(60);

}
    
    return;
  }


  // ======================================
  // ENTRER DANS L'UNIVERSITÉ
  // ======================================

  if (
    key === "e" &&
    canEnterOffice
  ) {

    changeMap("office");

    return;
  }


  // ======================================
  // SORTIR DE L'UNIVERSITÉ
  // ======================================

  if (
    key === "e" &&
    canExitOffice
  ) {

    changeMap("outside");

    return;
  }


  // ======================================
  // RAMASSER LE CAFÉ
  // ======================================

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


  // ======================================
  // PARLER À THIRY
  // ======================================

  if (
    key === "e" &&
    canTalk
  ) {

    let currentDialogue;

    if (
  printerFixed &&
  printerQuestActive &&
  !printerQuestCompleted
) {

  currentDialogue =
    printerQuestCompleteDialogue;

}


    // Joël rapporte le café

   else if (hasCoffee) {

      currentDialogue =
        thiryCoffeeDialogue;

    }


    // Quête imprimante disponible

    else if (
      printerQuestAvailable &&
      !printerQuestActive &&
      !printerQuestCompleted
    ) {

      currentDialogue =
        printerQuestDialogue;

    }


    // Dialogue de départ

    else {

      currentDialogue =
        thiryDialogue;

    }


    // OUVERTURE

    if (!dialogueOpen) {

      dialogueOpen = true;
      dialogueStep = 0;

      dialogue.style.display =
        "block";

      dialogueName.textContent =
        currentDialogue[dialogueStep].speaker;

      dialogueText.textContent =
        currentDialogue[dialogueStep].text;

    }


    // PHRASE SUIVANTE

    else {

      dialogueStep++;


      if (
        dialogueStep <
        currentDialogue.length
      ) {

        dialogueName.textContent =
          currentDialogue[dialogueStep].speaker;

        dialogueText.textContent =
          currentDialogue[dialogueStep].text;

      }


      // FIN DU DIALOGUE

      else {

        dialogueOpen = false;

        dialogue.style.display =
          "none";

if (
  printerFixed &&
  printerQuestActive &&
  !printerQuestCompleted
) {

  completePrinterQuest();

}
        // Retour avec le café

       else if (hasCoffee) {

          completeCoffeeQuest();

        }


        // Début quête imprimante

        else if (
          printerQuestAvailable &&
          !printerQuestActive
        ) {

          startPrinterQuest();

        }


        // Première quête

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


  // ======================================
  // ANCIENNE POSITION
  // ======================================

  const oldX = x;
  const oldY = y;


  // ======================================
  // DÉPLACEMENT
  // ======================================

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


  // ======================================
  // LIMITES DU TERRAIN
  // ======================================

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


  // ======================================
  // HITBOX DE JOËL
  // ======================================

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


  // ======================================
  // COLLISIONS DE LA MAP ACTUELLE
  // ======================================

  let currentObstacles;


  if (currentMap === "outside") {

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


      // ARBRE

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


      // ROCHER

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


      // THIRY

      else if (
        obstacle.classList.contains(
          "npc"
        )
      ) {

        obstacleRect =
          fullObstacleRect;

      }


      // AUTRES

      else {

        obstacleRect =
          fullObstacleRect;

      }


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


  // ======================================
  // ANNULER SI COLLISION
  // ======================================

  if (collision) {

    x = oldX;
    y = oldY;

    player.style.left =
      x + "px";

    player.style.top =
      y + "px";

  }


  // ======================================
  // PROFONDEUR DES ARBRES
  // ======================================

  let playerZ = 30;


  if (currentMap === "outside") {

    const trees =
      mapOutside.querySelectorAll(
        ".tree"
      );


    trees.forEach(function(tree) {

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

        playerZ = 1;

      }

    });

  }


  player.style.zIndex =
    playerZ;


  // ======================================
  // THIRY
  // ======================================

  if (currentMap === "outside") {

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


    if (distance < 120) {

      canTalk = true;

      interaction.textContent =
        "E — Parler";

      interaction.style.left =
        npc.offsetLeft + 10 + "px";

      interaction.style.top =
        npc.offsetTop - 35 + "px";

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


  // ======================================
  // CAFÉ
  // ======================================

  if (
    currentMap === "outside" &&
    coffeeQuestActive &&
    !hasCoffee
  ) {

    const playerPosition =
      player.getBoundingClientRect();

    const coffeePosition =
      coffee.getBoundingClientRect();


    const playerCenterX =
      playerPosition.left +
      playerPosition.width / 2;

    const playerCenterY =
      playerPosition.top +
      playerPosition.height / 2;


    const coffeeCenterX =
      coffeePosition.left +
      coffeePosition.width / 2;

    const coffeeCenterY =
      coffeePosition.top +
      coffeePosition.height / 2;


    const distanceX =
      playerCenterX -
      coffeeCenterX;

    const distanceY =
      playerCenterY -
      coffeeCenterY;


    const coffeeDistance =
      Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
      );


    if (coffeeDistance < 80) {

      canPickCoffee = true;

      interaction.textContent =
        "E — Ramasser";

      interaction.style.left =
        coffee.offsetLeft - 20 + "px";

      interaction.style.top =
        coffee.offsetTop - 35 + "px";

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


  // ======================================
  // PORTE DE L'UNIVERSITÉ
  // ======================================

  if (currentMap === "outside") {

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
        officeDoor.offsetLeft + 5 + "px";

      interaction.style.top =
        officeDoor.offsetTop - 35 + "px";

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


  // ======================================
  // SORTIE DE L'UNIVERSITÉ
  // ======================================

  if (currentMap === "office") {

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
        officeExit.offsetLeft - 5 + "px";

      interaction.style.top =
        officeExit.offsetTop - 35 + "px";

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


  // ======================================
  // IMPRIMANTE
  // ======================================

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
        printer.offsetLeft - 10 + "px";

      interaction.style.top =
        printer.offsetTop - 35 + "px";

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


  // ======================================
  // RIEN À INTERAGIR
  // ======================================

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

});


// ========================================
// QUÊTE CAFÉ
// ========================================

function startCoffeeQuest() {

  const questBox =
    document.getElementById(
      "quest-box"
    );

  coffeeQuestActive = true;

  questBox.style.display =
    "block";

  coffee.style.display =
    "block";

}


function completeCoffeeQuest() {

  coffeeQuestCompleted = true;
  coffeeQuestActive = false;

  hasCoffee = false;

  questObjective.textContent =
    "✅ Quête terminée !";

  addXP(40);

  printerQuestAvailable = true;

}


// ========================================
// QUÊTE IMPRIMANTE
// ========================================

function startPrinterQuest() {

  printerQuestActive = true;
  printerQuestAvailable = false;


  const questBox =
    document.getElementById(
      "quest-box"
    );

  const questTitle =
    document.querySelector(
      ".quest-title"
    );


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
// NOTIFICATION LEVEL UP
// ========================================

function showLevelUp() {

  levelUpText.textContent =
    "Joël passe niveau " +
    joel.level +
    " — ❤️ Vie max : " +
    joel.maxHealth;


  levelUpMessage.style.display =
    "block";


  setTimeout(function() {

    levelUpMessage.style.display =
      "none";

  }, 2500);

}


// ========================================
// HUD
// ========================================

function updateStats() {

  levelDisplay.textContent =
    "Niv. " + joel.level;


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
    ) * 100;


  xpFill.style.width =
    percentage + "%";

}


updateStats();


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


  // ENTRER

  if (mapName === "office") {

    currentMap = "office";

    mapOffice.classList.add(
      "active-map"
    );

    x = 325;
    y = 330;

  }


  // SORTIR

  if (mapName === "outside") {

    currentMap = "outside";

    mapOutside.classList.add(
      "active-map"
    );

    x = 515;
    y = 320;

  }


  player.style.left =
    x + "px";

  player.style.top =
    y + "px";


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


joystick.addEventListener(
  "pointermove",
  function(event) {

    if (!joystickActive) {
      return;
    }

    updateJoystick(event);

  }
);


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


    if (joystickY < -0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowUp"
          }
        )
      );

    }


    if (joystickY > 0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowDown"
          }
        )
      );

    }


    if (joystickX < -0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowLeft"
          }
        )
      );

    }


    if (joystickX > 0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          {
            key: "ArrowRight"
          }
        )
      );

    }


    lastMobileMove = time;

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
