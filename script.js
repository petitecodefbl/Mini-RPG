// ========================================
// ÉLÉMENTS DU JEU
// ========================================

const player = document.getElementById("player");
const game = document.getElementById("game");

const npc = document.getElementById("npc");

const interaction =
  document.getElementById("interaction");

const dialogue =
  document.getElementById("dialogue");

const dialogueName =
  document.getElementById("dialogue-name");

const dialogueText =
  document.getElementById("dialogue-text");

const coffee =
  document.getElementById("coffee");

const questBox =
  document.getElementById("quest-box");

const questTitle =
  document.querySelector(".quest-title");

const questObjective =
  document.getElementById("quest-objective");


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


// ========================================
// INTERACTIONS
// ========================================

let canTalk = false;

let canPickCoffee = false;

let canEnterOffice = false;

let canExitOffice = false;

let canExaminePrinter = false;


// ========================================
// POSITION DE JOËL
// ========================================

let x = 330;
let y = 205;

const speed = 10;


// ========================================
// QUÊTE 1 : CAFÉ
// ========================================

let coffeeQuestActive = false;

let coffeeQuestCompleted = false;

let hasCoffee = false;


// ========================================
// QUÊTE 2 : IMPRIMANTE
// ========================================

let printerQuestAvailable = false;

let printerQuestActive = false;

let printerQuestCompleted = false;

let printerFixed = false;


// 0 = pas diagnostiquée
// 1 = problème réseau détecté
// 2 = mauvais port trouvé
// 3 = imprimante réparée

let printerStep = 0;

let printerMessageOpen = false;


// ========================================
// QUÊTE 3 : TRISTAN
// ========================================

let tristanQuestAvailable = false;

let tristanQuestActive = false;

let tristanQuestCompleted = false;


// ========================================
// DIALOGUE
// ========================================

let dialogueOpen = false;

let dialogueStep = 0;


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

const levelUpMessage =
  document.getElementById("level-up-message");

const levelUpText =
  document.getElementById("level-up-text");


// ========================================
// MOBILE
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
// DIALOGUE QUÊTE 1 : CAFÉ
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
// RETOUR CAFÉ
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
// RETOUR QUÊTE IMPRIMANTE
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
// QUÊTE 3 : TRISTAN
// ========================================

const tristanQuestDialogue = [

  {
    speaker: "Thiry",
    text: "Au fait Joël, Tristan te cherche."
  },

  {
    speaker: "Joël",
    text: "Tristan ? Il est où ?"
  },

  {
    speaker: "Thiry",
    text: "À l'université. Il avait l'air d'avoir besoin de toi."
  },

  {
    speaker: "Joël",
    text: "Bon... j'y retourne."
  }

];


// ========================================
// INITIALISATION
// ========================================

player.style.left =
  x + "px";

player.style.top =
  y + "px";


updateStats();

updateInteractions();


// ========================================
// CLAVIER
// ========================================

document.addEventListener(
  "keydown",
  function(event) {

    const key =
      event.key.toLowerCase();


    // ====================================
    // FERMER MESSAGE IMPRIMANTE
    // ====================================

    if (
      key === "e" &&
      printerMessageOpen
    ) {

      printerMessageOpen = false;

      dialogueOpen = false;

      dialogue.style.display =
        "none";


      updateInteractions();

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
    // INTERAGIR AVEC L'IMPRIMANTE
    // ====================================

    if (
      key === "e" &&
      canExaminePrinter &&
      printerQuestActive &&
      !printerFixed
    ) {

      examinePrinter();

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


      coffee.style.display =
        "none";


      questObjective.textContent =
        "☑ Café récupéré — Retourner voir Thiry";


      interaction.style.display =
        "none";


      return;

    }


    // ====================================
    // PARLER À THIRY
    // ====================================

    if (
      key === "e" &&
      canTalk
    ) {

      handleThiryDialogue();

      return;

    }


    // ====================================
    // POSITION AVANT DÉPLACEMENT
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
    // LIMITES DU TERRAIN
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
    // COLLISIONS
    // ====================================

    if (hasCollision()) {

      x = oldX;

      y = oldY;


      player.style.left =
        x + "px";

      player.style.top =
        y + "px";

    }


    updatePlayerDepth();

    updateInteractions();

  }
);


// ========================================
// COLLISIONS
// ========================================

function hasCollision() {

  const playerFullRect =
    player.getBoundingClientRect();


  const playerRect = {

    left:
      playerFullRect.left + 12,

    right:
      playerFullRect.right - 12,

    top:
      playerFullRect.bottom - 22,

    bottom:
      playerFullRect.bottom

  };


  let obstacles;


  if (
    currentMap === "outside"
  ) {

    obstacles =
      mapOutside.querySelectorAll(
        ".obstacle"
      );

  }

  else {

    obstacles =
      mapOffice.querySelectorAll(
        ".obstacle"
      );

  }


  let collision = false;


  obstacles.forEach(
    function(obstacle) {

      const fullRect =
        obstacle.getBoundingClientRect();


      let obstacleRect;


      // ==================================
      // ARBRE
      // ==================================

      if (
        obstacle.classList.contains(
          "tree"
        )
      ) {

        obstacleRect = {

          left:
            fullRect.left + 28,

          right:
            fullRect.right - 28,

          top:
            fullRect.bottom - 30,

          bottom:
            fullRect.bottom

        };

      }


      // ==================================
      // ROCHER
      // ==================================

      else if (
        obstacle.classList.contains(
          "rock"
        )
      ) {

        obstacleRect = {

          left:
            fullRect.left + 10,

          right:
            fullRect.right - 10,

          top:
            fullRect.top + 20,

          bottom:
            fullRect.bottom

        };

      }


      // ==================================
      // MEUBLES
      // ==================================

      else if (
        obstacle.classList.contains(
          "furniture"
        )
      ) {

        obstacleRect = {

          left:
            fullRect.left + 8,

          right:
            fullRect.right - 8,

          top:
            fullRect.top +
            fullRect.height * 0.55,

          bottom:
            fullRect.bottom

        };

      }


      // ==================================
      // AUTRES
      // ==================================

      else {

        obstacleRect =
          fullRect;

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


  return collision;

}


// ========================================
// PROFONDEUR DE JOËL
// ========================================

function updatePlayerDepth() {

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

        const playerRect =
          player.getBoundingClientRect();


        const centerX =
          playerRect.left +
          playerRect.width / 2;


        if (

          centerX >
          treeRect.left - 20 &&

          centerX <
          treeRect.right + 20 &&

          playerRect.bottom <
          treeRect.bottom - 10

        ) {

          playerZ = 5;

        }

      }
    );

  }


  player.style.zIndex =
    playerZ;

}


// ========================================
// INTERACTIONS
// ========================================

function updateInteractions() {

  canTalk = false;

  canPickCoffee = false;

  canEnterOffice = false;

  canExitOffice = false;

  canExaminePrinter = false;


  interaction.style.display =
    "none";


  // Aucun E pendant un dialogue

  if (dialogueOpen) {

    return;

  }


  const playerRect =
    player.getBoundingClientRect();


  // ======================================
  // EXTÉRIEUR
  // ======================================

  if (
    currentMap === "outside"
  ) {


    // ====================================
    // UNIVERSITÉ
    // ====================================

    const doorRect =
      officeDoor.getBoundingClientRect();


    const playerCenterX =
      playerRect.left +
      playerRect.width / 2;


    const playerFeetY =
      playerRect.bottom;


    const doorCenterX =
      doorRect.left +
      doorRect.width / 2;


    const doorCenterY =
      doorRect.top +
      doorRect.height / 2;


    const doorDistanceX =
      Math.abs(
        playerCenterX -
        doorCenterX
      );


    const doorDistanceY =
      Math.abs(
        playerFeetY -
        doorCenterY
      );


    if (
      doorDistanceX < 140 &&
      doorDistanceY < 160
    ) {

      canEnterOffice = true;


      interaction.textContent =
        "E — Entrer";


      interaction.style.left =
        "505px";


      interaction.style.top =
        "315px";


      interaction.style.display =
        "block";


      return;

    }


    // ====================================
    // CAFÉ
    // ====================================

    if (
      coffeeQuestActive &&
      !hasCoffee
    ) {

      const coffeeRect =
        coffee.getBoundingClientRect();


      if (
        rectanglesNear(
          playerRect,
          coffeeRect,
          25
        )
      ) {

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


        return;

      }

    }


    // ====================================
    // THIRY
    // ====================================

    const npcRect =
      npc.getBoundingClientRect();


    if (
      rectanglesNear(
        playerRect,
        npcRect,
        35
      )
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

  }


  // ======================================
  // INTÉRIEUR
  // ======================================

  if (
    currentMap === "office"
  ) {


    // ====================================
    // SORTIE
    // ====================================

    const exitRect =
      officeExit.getBoundingClientRect();


    if (
      rectanglesNear(
        playerRect,
        exitRect,
        55
      )
    ) {

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


      return;

    }


    // ====================================
    // IMPRIMANTE
    // ====================================

    if (
      printerQuestActive &&
      !printerFixed
    ) {

      const printerRect =
        printer.getBoundingClientRect();


      if (
        rectanglesNear(
          playerRect,
          printerRect,
          60
        )
      ) {

        canExaminePrinter = true;


        if (
          printerStep === 0
        ) {

          interaction.textContent =
            "E — Diagnostiquer";

        }


        else if (
          printerStep === 1
        ) {

          interaction.textContent =
            "E — Vérifier le câble";

        }


        else if (
          printerStep === 2
        ) {

          interaction.textContent =
            "E — Rebrancher";

        }


        interaction.style.left =
          printer.offsetLeft -
          5 +
          "px";


        interaction.style.top =
          printer.offsetTop -
          35 +
          "px";


        interaction.style.display =
          "block";

      }

    }

  }

}


// ========================================
// PROXIMITÉ
// ========================================

function rectanglesNear(
  rect1,
  rect2,
  margin
) {

  return (

    rect1.right >
    rect2.left - margin &&

    rect1.left <
    rect2.right + margin &&

    rect1.bottom >
    rect2.top - margin &&

    rect1.top <
    rect2.bottom + margin

  );

}


// ========================================
// DIALOGUE THIRY
// ========================================

function handleThiryDialogue() {

  let currentDialogue;


  // ======================================
  // QUÊTE 3 : TRISTAN
  // ======================================

  if (
    tristanQuestAvailable &&
    !tristanQuestActive &&
    !tristanQuestCompleted
  ) {

    currentDialogue =
      tristanQuestDialogue;

  }


  // ======================================
  // RETOUR APRÈS RÉPARATION
  // ======================================

  else if (
    printerFixed &&
    printerQuestActive &&
    !printerQuestCompleted
  ) {

    currentDialogue =
      printerQuestCompleteDialogue;

  }


  // ======================================
  // RETOUR CAFÉ
  // ======================================

  else if (
    hasCoffee
  ) {

    currentDialogue =
      thiryCoffeeDialogue;

  }


  // ======================================
  // DONNER QUÊTE IMPRIMANTE
  // ======================================

  else if (
    printerQuestAvailable &&
    !printerQuestActive &&
    !printerQuestCompleted
  ) {

    currentDialogue =
      printerQuestDialogue;

  }


  // ======================================
  // PREMIÈRE RENCONTRE
  // ======================================

  else {

    currentDialogue =
      thiryDialogue;

  }


  // ======================================
  // OUVRIR
  // ======================================

  if (
    !dialogueOpen
  ) {

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


    interaction.style.display =
      "none";


    return;

  }


  // ======================================
  // SUIVANT
  // ======================================

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


    return;

  }


  // ======================================
  // FIN
  // ======================================

  dialogueOpen = false;


  dialogue.style.display =
    "none";


  // ======================================
  // DÉMARRER QUÊTE 3
  // ======================================

  if (
    tristanQuestAvailable &&
    !tristanQuestActive &&
    !tristanQuestCompleted
  ) {

    startTristanQuest();

  }


  // ======================================
  // TERMINER QUÊTE IMPRIMANTE
  // ======================================

  else if (
    printerFixed &&
    printerQuestActive &&
    !printerQuestCompleted
  ) {

    completePrinterQuest();

  }


  // ======================================
  // TERMINER QUÊTE CAFÉ
  // ======================================

  else if (
    hasCoffee
  ) {

    completeCoffeeQuest();

  }


  // ======================================
  // DÉMARRER QUÊTE IMPRIMANTE
  // ======================================

  else if (
    printerQuestAvailable &&
    !printerQuestActive
  ) {

    startPrinterQuest();

  }


  // ======================================
  // DÉMARRER QUÊTE CAFÉ
  // ======================================

  else if (
    !coffeeQuestActive &&
    !coffeeQuestCompleted
  ) {

    startCoffeeQuest();

  }


  updateInteractions();

}


// ========================================
// QUÊTE 1 : CAFÉ
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


  updateInteractions();

}


// ========================================
// TERMINER QUÊTE CAFÉ
// ========================================

function completeCoffeeQuest() {

  coffeeQuestCompleted = true;

  coffeeQuestActive = false;

  hasCoffee = false;


  questTitle.textContent =
    "☕ La pause café";


  /*
    TRANSITION VERS LA QUÊTE 2
  */

  questObjective.textContent =
    "💬 Reparler à Thiry";


  addXP(40);


  printerQuestAvailable =
    true;


  updateInteractions();

}


// ========================================
// QUÊTE 2 : IMPRIMANTE
// ========================================

function startPrinterQuest() {

  printerQuestActive = true;

  printerQuestAvailable =
    false;

  printerStep = 0;

  printerFixed = false;


  printer.classList.remove(
    "fixed"
  );


  questBox.style.display =
    "block";


  questTitle.textContent =
    "🖨️ Problème réseau";


  questObjective.textContent =
    "□ Entrer dans l'université et trouver l'imprimante";


  updateInteractions();

}


// ========================================
// DIAGNOSTIC IMPRIMANTE
// ========================================

function examinePrinter() {

  interaction.style.display =
    "none";


  dialogueOpen = true;

  printerMessageOpen = true;


  dialogue.style.display =
    "block";


  dialogueName.textContent =
    "Joël";


  // ======================================
  // ÉTAPE 1
  // ======================================

  if (
    printerStep === 0
  ) {

    dialogueText.textContent =
      "Hmm... imprimante hors ligne. Elle récupère une adresse en 169.254.";


    questObjective.textContent =
      "□ Vérifier la connexion réseau de l'imprimante";


    printerStep = 1;


    return;

  }


  // ======================================
  // ÉTAPE 2
  // ======================================

  if (
    printerStep === 1
  ) {

    dialogueText.textContent =
      "Pas de DHCP... Voyons le câble. Ah. Il est branché sur le mauvais port.";


    questObjective.textContent =
      "□ Rebrancher correctement l'imprimante";


    printerStep = 2;


    return;

  }


  // ======================================
  // ÉTAPE 3
  // ======================================

  if (
    printerStep === 2
  ) {

    dialogueText.textContent =
      "Voilà. Nouvelle IP... et elle répond au ping.";


    printerStep = 3;

    printerFixed = true;


    printer.classList.add(
      "fixed"
    );


    questObjective.textContent =
      "☑ Imprimante reconnectée — Retourner voir Thiry";


    return;

  }

}


// ========================================
// TERMINER QUÊTE IMPRIMANTE
// ========================================

function completePrinterQuest() {

  printerQuestCompleted = true;

  printerQuestActive = false;


  questTitle.textContent =
    "🖨️ Problème réseau";


  /*
    TRANSITION VERS LA QUÊTE 3
  */

  questObjective.textContent =
    "💬 Reparler à Thiry";


  /*
    40 XP café
    + 60 XP imprimante
    = niveau 2
  */

  addXP(60);


  // Débloquer Tristan uniquement niveau 2

  if (
    joel.level >= 2
  ) {

    tristanQuestAvailable =
      true;

  }


  updateInteractions();

}


// ========================================
// QUÊTE 3 : TRISTAN
// ========================================

function startTristanQuest() {

  tristanQuestAvailable =
    false;

  tristanQuestActive =
    true;


  questBox.style.display =
    "block";


  questTitle.textContent =
    "👤 Tristan vous cherche";


  questObjective.textContent =
    "□ Retourner à l'université";


  updateInteractions();

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
  // ENTRER
  // ======================================

  if (
    mapName === "office"
  ) {

    currentMap =
      "office";


    mapOffice.classList.add(
      "active-map"
    );


    x = 325;

    y = 320;

  }


  // ======================================
  // SORTIR
  // ======================================

  else if (
    mapName === "outside"
  ) {

    currentMap =
      "outside";


    mapOutside.classList.add(
      "active-map"
    );


    x = 525;

    y = 330;

  }


  player.style.left =
    x + "px";


  player.style.top =
    y + "px";


  player.style.zIndex =
    30;


  dialogueOpen = false;

  printerMessageOpen = false;


  dialogue.style.display =
    "none";


  updateInteractions();

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


  setTimeout(
    function() {

      levelUpMessage.style.display =
        "none";

    },
    2500
  );

}


// ========================================
// HUD
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

    if (
      !joystickActive
    ) {

      return;

    }


    updateJoystick(event);

  }
);


// ========================================
// ARRÊTER JOYSTICK
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


// ========================================
// PREMIÈRE DÉTECTION
// ========================================

updateInteractions();
