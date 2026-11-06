const player = document.getElementById("player");
const game = document.getElementById("game");
const obstacles = document.querySelectorAll(".obstacle");
const trees = document.querySelectorAll(".tree");

const npc = document.getElementById("npc");
const interaction = document.getElementById("interaction");

const dialogue = document.getElementById("dialogue");
const dialogueText = document.getElementById("dialogue-text");
const dialogueName = document.getElementById("dialogue-name");

const coffee = document.getElementById("coffee");
const questObjective = document.getElementById("quest-objective");

let coffeeQuestActive = false;
let canPickCoffee = false;
let hasCoffee = false;
let coffeeQuestCompleted = false;

let canTalk = false;
let dialogueOpen = false;
let dialogueStep = 0;

let x = 330;
let y = 205;

const speed = 10;
// --------------------
// CONTRÔLES MOBILE
// --------------------

const joystick =
  document.getElementById("joystick");

const joystickStick =
  document.getElementById("joystick-stick");

const mobileAction =
  document.getElementById("mobile-action");


let joystickX = 0;
let joystickY = 0;

let joystickActive = false;

// --------------------
// STATS DE JOËL
// --------------------

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


// --------------------
// DIALOGUE DE THIRY
// --------------------

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



// --------------------
// POSITION DE DÉPART
// --------------------

player.style.left = x + "px";
player.style.top = y + "px";


// --------------------
// TOUCHES DU CLAVIER
// --------------------

document.addEventListener("keydown", function(event) {

  const key = event.key.toLowerCase();

// --------------------
// RAMASSER LE CAFÉ
// --------------------

if (key === "e" && canPickCoffee && !hasCoffee) {

  hasCoffee = true;
  canPickCoffee = false;

  // Le café disparaît de la carte
  coffee.style.display = "none";

  // Cache "E — Ramasser"
  interaction.style.display = "none";

  // Met à jour la quête
  questObjective.textContent =
    "☑ Café récupéré — Retourner voir Thiry";

  return;
}
  
  // --------------------
  // DIALOGUE
  // --------------------

 if (key === "e" && canTalk) {

  // --------------------
  // QUÊTE DÉJÀ TERMINÉE
  // --------------------

 if (coffeeQuestCompleted) {

  // Si la boîte est fermée → on l'ouvre
  if (!dialogueOpen) {

    dialogueOpen = true;

    dialogue.style.display = "block";

    dialogueName.textContent = "Thiry";
    dialogueText.textContent =
      "On parle après. Là, c'est pause café.";

  }

  // Si elle est déjà ouverte → on la ferme
  else {

    dialogueOpen = false;

    dialogue.style.display = "none";

  }

  return;
}


  // --------------------
  // CHOISIR LE DIALOGUE
  // --------------------

  let currentDialogue;

  // Joël possède le café
  if (hasCoffee) {

    currentDialogue = thiryCoffeeDialogue;

  }

  // Dialogue normal
  else {

    currentDialogue = thiryDialogue;

  }


  // --------------------
  // OUVERTURE
  // --------------------

  if (!dialogueOpen) {

    dialogueOpen = true;
    dialogueStep = 0;

    dialogue.style.display = "block";

    dialogueName.textContent =
      currentDialogue[dialogueStep].speaker;

    dialogueText.textContent =
      currentDialogue[dialogueStep].text;

  }


  // --------------------
  // PHRASE SUIVANTE
  // --------------------

  else {

    dialogueStep++;


    if (dialogueStep < currentDialogue.length) {

      dialogueName.textContent =
        currentDialogue[dialogueStep].speaker;

      dialogueText.textContent =
        currentDialogue[dialogueStep].text;

    }


    // --------------------
    // FIN DU DIALOGUE
    // --------------------

    else {

      dialogueOpen = false;

      dialogue.style.display = "none";


      // Joël avait le café
      if (hasCoffee) {

        completeCoffeeQuest();

      }

      // Première conversation
      else if (!coffeeQuestActive) {

        startCoffeeQuest();

      }

    }

  }

  return;
}


  // --------------------
  // POSITION PRÉCÉDENTE
  // --------------------

  const oldX = x;
  const oldY = y;


  // --------------------
  // DÉPLACEMENTS
  // --------------------

  if (key === "z" || event.key === "ArrowUp") {
    y -= speed;
  }

  if (key === "s" || event.key === "ArrowDown") {
    y += speed;
  }

  if (key === "q" || event.key === "ArrowLeft") {
    x -= speed;
  }

  if (key === "d" || event.key === "ArrowRight") {
    x += speed;
  }


  // --------------------
  // LIMITES DU TERRAIN
  // --------------------

  const gameWidth = game.clientWidth;
  const gameHeight = game.clientHeight;

  const playerWidth = player.offsetWidth;
  const playerHeight = player.offsetHeight;

  if (x < 0) {
    x = 0;
  }

  if (x > gameWidth - playerWidth) {
    x = gameWidth - playerWidth;
  }

  if (y < 0) {
    y = 0;
  }

  if (y > gameHeight - playerHeight) {
    y = gameHeight - playerHeight;
  }


  // Nouvelle position

  player.style.left = x + "px";
  player.style.top = y + "px";


  // --------------------
  // HITBOX DE JOËL
  // --------------------

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


  // --------------------
  // COLLISIONS
  // --------------------

  let collision = false;

  obstacles.forEach(function(obstacle) {

    const fullObstacleRect =
      obstacle.getBoundingClientRect();

    let obstacleRect;


    // Arbre
    if (obstacle.classList.contains("tree")) {

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


    // Rocher
    else if (obstacle.classList.contains("rock")) {

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

// Thiry
else if (obstacle.classList.contains("npc")) {

  obstacleRect = fullObstacleRect;

}
  
    // Autres obstacles
    else {

      obstacleRect = fullObstacleRect;

    }


    // Collision

    if (

      playerRect.left < obstacleRect.right &&

      playerRect.right > obstacleRect.left &&

      playerRect.top < obstacleRect.bottom &&

      playerRect.bottom > obstacleRect.top

    ) {

      collision = true;

    }

  });


  // Retour à l'ancienne position

  if (collision) {

    x = oldX;
    y = oldY;

    player.style.left = x + "px";
    player.style.top = y + "px";

  }


  // --------------------
  // PROFONDEUR DES ARBRES
  // --------------------

  let playerZ = 10;

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

  player.style.zIndex = playerZ;


  // --------------------
  // DISTANCE JOËL / THIRY
  // --------------------

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
    playerCenterX - npcCenterX;

  const distanceY =
    playerCenterY - npcCenterY;


  const distance = Math.sqrt(

    distanceX * distanceX +

    distanceY * distanceY

  );


  // --------------------
  // AFFICHER "E — PARLER"
  // --------------------

if (distance < 120) {

  canTalk = true;

  interaction.textContent = "E — Parler";
  
  interaction.style.left =
  npc.offsetLeft + 10 + "px";

interaction.style.top =
  npc.offsetTop - 35 + "px";
  
  interaction.style.display = "block";

}

  else {

    canTalk = false;

    interaction.style.display = "none";

    dialogueOpen = false;

    dialogue.style.display = "none";

  }

  // --------------------
// DISTANCE JOËL / CAFÉ
// --------------------

if (coffeeQuestActive && !hasCoffee) {

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
    playerCenterX - coffeeCenterX;

  const distanceY =
    playerCenterY - coffeeCenterY;

  const coffeeDistance =
    Math.sqrt(
      distanceX * distanceX +
      distanceY * distanceY
    );

  if (coffeeDistance < 80) {

  canPickCoffee = true;

  interaction.textContent = "E — Ramasser";

  // Place l'indication au-dessus du café
  interaction.style.left =
    coffee.offsetLeft - 20 + "px";

  interaction.style.top =
    coffee.offsetTop - 35 + "px";

  interaction.style.display = "block";

  } else {

    canPickCoffee = false;

    // On remet l'interaction avec Thiry
    if (!canTalk) {
      interaction.style.display = "none";
    }

  }

}
  
});


// --------------------
// DÉMARRER LA QUÊTE
// --------------------

function startCoffeeQuest() {

  const questBox =
    document.getElementById("quest-box");

  coffeeQuestActive = true;

  questBox.style.display = "block";

  coffee.style.display = "block";

}


// --------------------
// TERMINER LA QUÊTE
// --------------------

function completeCoffeeQuest() {

  coffeeQuestCompleted = true;
  coffeeQuestActive = false;

  hasCoffee = false;

  questObjective.textContent =
    "✅ Quête terminée !";

  addXP(40);
}

  // --------------------
// AJOUTER DE L'XP
// --------------------

function addXP(amount) {

  joel.xp += amount;

  // Vérifie si Joël monte de niveau
  while (joel.xp >= joel.xpToNextLevel) {

    joel.xp -= joel.xpToNextLevel;

    levelUp();

  }

  updateStats();

}


// --------------------
// MONTER DE NIVEAU
// --------------------

function levelUp() {

  joel.level++;

  // Il faudra 50 XP de plus
  // pour le niveau suivant
  joel.xpToNextLevel += 50;

  // +10 points de vie maximum
  joel.maxHealth += 10;

  // Joël récupère toute sa vie
  joel.health = joel.maxHealth;

}


// --------------------
// METTRE À JOUR LE HUD
// --------------------

function updateStats() {

  levelDisplay.textContent =
    "Niv. " + joel.level;

  healthDisplay.textContent =
    joel.health + " / " + joel.maxHealth;

  xpText.textContent =
    joel.xp + " / " + joel.xpToNextLevel;

  const percentage =
    (joel.xp / joel.xpToNextLevel) * 100;

  xpFill.style.width =
    percentage + "%";

}
updateStats();

// --------------------
// JOYSTICK MOBILE
// --------------------

function updateJoystick(event) {

  const rect =
    joystick.getBoundingClientRect();

  const centerX =
    rect.left + rect.width / 2;

  const centerY =
    rect.top + rect.height / 2;


  let deltaX =
    event.clientX - centerX;

  let deltaY =
    event.clientY - centerY;


  const maxDistance = 35;

  const distance =
    Math.sqrt(
      deltaX * deltaX +
      deltaY * deltaY
    );


  if (distance > maxDistance) {

    deltaX =
      (deltaX / distance) *
      maxDistance;

    deltaY =
      (deltaY / distance) *
      maxDistance;

  }


  joystickStick.style.transform =
    "translate(" +
    deltaX +
    "px, " +
    deltaY +
    "px)";


  joystickX =
    deltaX / maxDistance;

  joystickY =
    deltaY / maxDistance;

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

// --------------------
// MOUVEMENT MOBILE
// --------------------

let lastMobileMove = 0;


function mobileMovement(time) {

  if (
    joystickActive &&
    time - lastMobileMove > 60
  ) {

    /*
      On transforme la direction
      du joystick en touche clavier.
    */

    if (joystickY < -0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          { key: "ArrowUp" }
        )
      );

    }


    if (joystickY > 0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          { key: "ArrowDown" }
        )
      );

    }


    if (joystickX < -0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          { key: "ArrowLeft" }
        )
      );

    }


    if (joystickX > 0.35) {

      document.dispatchEvent(
        new KeyboardEvent(
          "keydown",
          { key: "ArrowRight" }
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

// --------------------
// BOUTON E MOBILE
// --------------------

mobileAction.addEventListener(
  "pointerdown",
  function(event) {

    event.preventDefault();

    document.dispatchEvent(
      new KeyboardEvent(
        "keydown",
        { key: "e" }
      )
    );

  }
);



