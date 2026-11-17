// ========================================
// ELEMENTS DU JEU
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


// ========================================
// TRISTANT + PC DU PROF
// ========================================

const tristanT =
  document.getElementById("tristant");

const professorPC =
  document.getElementById("professor-pc");

const professorPCStatus =
  document.getElementById("professor-pc-status");


let currentMap = "outside";


// ========================================
// INTERACTIONS
// ========================================

let canTalk = false;

let canPickCoffee = false;

let canEnterOffice = false;

let canExitOffice = false;

let canExaminePrinter = false;

let canTalkTristanT = false;

let canExamineProfessorPC = false;


// ========================================
// POSITION DE JOEL
// ========================================

let x = 330;
let y = 205;

const speed = 10;


// ========================================
// QUETE 1 : CAFE
// ========================================

let coffeeQuestActive = false;

let coffeeQuestCompleted = false;

let hasCoffee = false;


// ========================================
// QUETE 2 : IMPRIMANTE
// ========================================

let printerQuestAvailable = false;

let printerQuestActive = false;

let printerQuestCompleted = false;

let printerFixed = false;


// 0 = pas diagnostiquee
// 1 = probleme reseau detecte
// 2 = mauvais port trouve
// 3 = imprimante reparee

let printerStep = 0;

let printerMessageOpen = false;


// ========================================
// QUETE 3 : TRISTANT
// ========================================

let tristanTQuestAvailable = false;

let tristanTQuestActive = false;

let tristanTQuestCompleted = false;


// 0 = parler a TristanT
// 1 = examiner le PC du prof
// 2 = aider TristanT
// 3 = reparler a TristanT

let tristanTStep = 0;

let professorPCMessageOpen = false;


// ========================================
// DIALOGUE
// ========================================

let dialogueOpen = false;

let dialogueStep = 0;


// ========================================
// STATS DE JOEL
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
// DIALOGUE QUETE 1 : CAFE
// ========================================

const thiryDialogue = [

  {
    speaker: "Thiry",
    text: "Joel ! Cafe ?"
  },

  {
    speaker: "Joel",
    text: "Deja ??"
  },

  {
    speaker: "Thiry",
    text: "Je me disais qu'une petite pause cafe ferait pas de mal..."
  },

  {
    speaker: "Joel",
    text: "Il est 8h..."
  },

  {
    speaker: "Thiry",
    text: "J'ai envie d'un cafe."
  },

  {
    speaker: "Joel",
    text: "Bon, attends. Je vais voir si je peux t'en trouver un."
  },

  {
    speaker: "Thiry",
    text: "Ah ! Je savais que je pouvais compter sur toi."
  }

];


// ========================================
// RETOUR CAFE
// ========================================

const thiryCoffeeDialogue = [

  {
    speaker: "Joel",
    text: "Tiens, ton cafe."
  },

  {
    speaker: "Thiry",
    text: "Ah ! Enfin une bonne nouvelle."
  },

  {
    speaker: "Joel",
    text: "Ca fait meme pas cinq minutes..."
  },

  {
    speaker: "Thiry",
    text: "Parfait. Pause cafe !"
  }

];


// ========================================
// QUETE 2 : IMPRIMANTE
// ========================================

const printerQuestDialogue = [

  {
    speaker: "Joel",
    text: "Bon, maintenant je vais peut-etre pouvoir bosser."
  },

  {
    speaker: "Thiry",
    text: "Oh putain !"
  },

  {
    speaker: "Joel",
    text: "Quoi encore ?"
  },

  {
    speaker: "Thiry",
    text: "J'ai une imprimante qui repond plus sur le reseau, fait chier..."
  },

  {
    speaker: "Joel",
    text: "T'as verifie le cable ?"
  },

  {
    speaker: "Thiry",
    text: "C'est toi l'admin reseau..."
  },

  {
    speaker: "Joel",
    text: "Bon. Je vais voir."
  }

];


// ========================================
// RETOUR QUETE IMPRIMANTE
// ========================================

const printerQuestCompleteDialogue = [

  {
    speaker: "Joel",
    text: "C'est bon, ton imprimante est reconnectee."
  },

  {
    speaker: "Thiry",
    text: "Ah ! C'etait quoi ?"
  },

  {
    speaker: "Joel",
    text: "Le cable reseau etait branche dans le mauvais port."
  },

  {
    speaker: "Thiry",
    text: "Donc c'etait bien un probleme reseau."
  },

  {
    speaker: "Joel",
    text: "Si tu veux..."
  }

];


// ========================================
// THIRY -> TRISTANT
// ========================================

const tristanTQuestDialogue = [

  {
    speaker: "Thiry",
    text: "Au fait Joel, TristanT te cherche."
  },

  {
    speaker: "Joel",
    text: "TristanT ? Il est ou ?"
  },

  {
    speaker: "Thiry",
    text: "A l'universite. Il avait l'air d'avoir besoin de toi."
  },

  {
    speaker: "Joel",
    text: "Bon... j'y retourne."
  }

];


// ========================================
// PREMIER DIALOGUE AVEC TRISTANT
// ========================================

const tristanTDialogue = [

  {
    speaker: "TristanT",
    text: "Ah Joel ! J'ai fini avec le PC d'un prof mais apparemment ca bug toujours."
  },

  {
    speaker: "Joel",
    text: "Donc t'as pas fini."
  },

  {
    speaker: "TristanT",
    text: "J'ai tout fait ! Mises a jour, nettoyage, redemarrage..."
  },

  {
    speaker: "TristanT",
    text: "Faut aller se faire foutre a un moment, les utilisateurs sont chiants aussi !"
  },

  {
    speaker: "Joel",
    text: "Vas-y, je regarde avec toi."
  }

];


// ========================================
// DIALOGUE FINAL TRISTANT
// ========================================

const tristanTCompleteDialogue = [

  {
    speaker: "TristanT",
    text: "Voila ! La c'est fini."
  },

  {
    speaker: "Joel",
    text: "La, oui."
  },

  {
    speaker: "TristanT",
    text: "Donc j'avais presque fini."
  },

  {
    speaker: "Joel",
    text: "Non."
  },

  {
    speaker: "TristanT",
    text: "AHAHAHAHA !"
  }

];


// ========================================
// INITIALISATION
// ========================================

player.style.left =
  x + "px";

player.style.top =
  y + "px";


hideTristanT();

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
    // FERMER MESSAGE PC DU PROF
    // ====================================

    if (
      key === "e" &&
      professorPCMessageOpen
    ) {

      professorPCMessageOpen = false;

      dialogueOpen = false;

      dialogue.style.display =
        "none";


      updateInteractions();

      return;

    }


    // ====================================
    // ENTRER DANS L'UNIVERSITE
    // ====================================

    if (
      key === "e" &&
      canEnterOffice
    ) {

      changeMap("office");

      return;

    }


    // ====================================
    // SORTIR DE L'UNIVERSITE
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
    // INTERAGIR AVEC LE PC DU PROF
    // ====================================

    if (
      key === "e" &&
      canExamineProfessorPC &&
      tristanTQuestActive
    ) {

      examineProfessorPC();

      return;

    }


    // ====================================
    // PARLER A TRISTANT
    // ====================================

    if (
      key === "e" &&
      canTalkTristanT
    ) {

      handleTristanTDialogue();

      return;

    }


    // ====================================
    // RAMASSER LE CAFE
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
        "☑ Cafe recupere - Retourner voir Thiry";


      interaction.style.display =
        "none";


      return;

    }


    // ====================================
    // PARLER A THIRY
    // ====================================

    if (
      key === "e" &&
      canTalk
    ) {

      handleThiryDialogue();

      return;

    }


    // ====================================
    // POSITION AVANT DEPLACEMENT
    // ====================================

    const oldX = x;
    const oldY = y;


    // ====================================
    // DEPLACEMENT
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


      // Element cache = aucune collision

      if (
        window.getComputedStyle(
          obstacle
        ).display === "none"
      ) {

        return;

      }


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
      // TRISTANT
      // ==================================

      else if (
        obstacle.id === "tristant"
      ) {

        obstacleRect = {

          left:
            fullRect.left + 10,

          right:
            fullRect.right - 10,

          top:
            fullRect.bottom - 25,

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
// PROFONDEUR DE JOEL
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

  canTalkTristanT = false;

  canExamineProfessorPC = false;


  interaction.style.display =
    "none";


  // Aucun E pendant un dialogue

  if (dialogueOpen) {

    return;

  }


  const playerRect =
    player.getBoundingClientRect();


  // ======================================
  // EXTERIEUR
  // ======================================

  if (
    currentMap === "outside"
  ) {


    // ====================================
    // UNIVERSITE
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
        "E - Entrer";


      interaction.style.left =
        "505px";


      interaction.style.top =
        "315px";


      interaction.style.display =
        "block";


      return;

    }


    // ====================================
    // CAFE
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
          "E - Ramasser";


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
        "E - Parler";


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
  // INTERIEUR
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
        "E - Sortir";


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
    // TRISTANT
    // ====================================

    if (
      tristanTQuestActive &&
      !tristanTQuestCompleted &&
      tristanT &&
      window.getComputedStyle(
        tristanT
      ).display !== "none"
    ) {

      const tristanTRect =
        tristanT.getBoundingClientRect();


      if (
        rectanglesNear(
          playerRect,
          tristanTRect,
          35
        )
      ) {

        // On parle a TristanT seulement
        // au debut ou a la fin

        if (
          tristanTStep === 0 ||
          tristanTStep === 3
        ) {

          canTalkTristanT = true;


          interaction.textContent =
            "E - Parler";


          interaction.style.left =
            tristanT.offsetLeft -
            5 +
            "px";


          interaction.style.top =
            tristanT.offsetTop -
            20 +
            "px";


          interaction.style.display =
            "block";


          return;

        }

      }

    }


    // ====================================
    // PC DU PROFESSEUR
    // ====================================

    if (
      tristanTQuestActive &&
      !tristanTQuestCompleted &&
      professorPC &&
      (
        tristanTStep === 1 ||
        tristanTStep === 2
      )
    ) {

      const pcRect =
        professorPC.getBoundingClientRect();


      if (
        rectanglesNear(
          playerRect,
          pcRect,
          40
        )
      ) {

        canExamineProfessorPC = true;


        if (
          tristanTStep === 1
        ) {

          interaction.textContent =
            "E - Examiner";

        }


        else if (
          tristanTStep === 2
        ) {

          interaction.textContent =
            "E - Aider TristanT";

        }


        interaction.style.left =
          professorPC.offsetLeft -
          5 +
          "px";


        interaction.style.top =
          professorPC.offsetTop -
          35 +
          "px";


        interaction.style.display =
          "block";


        return;

      }

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
            "E - Diagnostiquer";

        }


        else if (
          printerStep === 1
        ) {

          interaction.textContent =
            "E - Verifier le cable";

        }


        else if (
          printerStep === 2
        ) {

          interaction.textContent =
            "E - Rebrancher";

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
// PROXIMITE
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
  // QUETE 3 : TRISTANT
  // ======================================

  if (
    tristanTQuestAvailable &&
    !tristanTQuestActive &&
    !tristanTQuestCompleted
  ) {

    currentDialogue =
      tristanTQuestDialogue;

  }


  // ======================================
  // RETOUR APRES REPARATION
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
  // RETOUR CAFE
  // ======================================

  else if (
    hasCoffee
  ) {

    currentDialogue =
      thiryCoffeeDialogue;

  }


  // ======================================
  // DONNER QUETE IMPRIMANTE
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
  // PREMIERE RENCONTRE
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
  // DEMARRER QUETE 3
  // ======================================

  if (
    tristanTQuestAvailable &&
    !tristanTQuestActive &&
    !tristanTQuestCompleted
  ) {

    startTristanTQuest();

  }


  // ======================================
  // TERMINER QUETE IMPRIMANTE
  // ======================================

  else if (
    printerFixed &&
    printerQuestActive &&
    !printerQuestCompleted
  ) {

    completePrinterQuest();

  }


  // ======================================
  // TERMINER QUETE CAFE
  // ======================================

  else if (
    hasCoffee
  ) {

    completeCoffeeQuest();

  }


  // ======================================
  // DEMARRER QUETE IMPRIMANTE
  // ======================================

  else if (
    printerQuestAvailable &&
    !printerQuestActive
  ) {

    startPrinterQuest();

  }


  // ======================================
  // DEMARRER QUETE CAFE
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
// DIALOGUE TRISTANT
// ========================================

function handleTristanTDialogue() {

  let currentDialogue;


  // ======================================
  // PREMIERE DISCUSSION
  // ======================================

  if (
    tristanTStep === 0
  ) {

    currentDialogue =
      tristanTDialogue;

  }


  // ======================================
  // DISCUSSION FINALE
  // ======================================

  else if (
    tristanTStep === 3 &&
    !tristanTQuestCompleted
  ) {

    currentDialogue =
      tristanTCompleteDialogue;

  }


  else {

    return;

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
  // FIN DU DIALOGUE
  // ======================================

  dialogueOpen = false;


  dialogue.style.display =
    "none";


  // Apres la premiere discussion

  if (
    tristanTStep === 0
  ) {

    tristanTStep = 1;


    questTitle.textContent =
      "💻 Pourtant, j'ai fini";


    questObjective.textContent =
      "□ Examiner le PC du professeur";

  }


  // Fin de la quete

  else if (
    tristanTStep === 3 &&
    !tristanTQuestCompleted
  ) {

    completeTristanTQuest();

  }


  updateInteractions();

}


// ========================================
// QUETE 1 : CAFE
// ========================================

function startCoffeeQuest() {

  coffeeQuestActive = true;


  questBox.style.display =
    "block";


  questTitle.textContent =
    "☕ La pause cafe";


  questObjective.textContent =
    "□ Trouver un cafe pour Thiry";


  coffee.style.display =
    "block";


  updateInteractions();

}


// ========================================
// TERMINER QUETE CAFE
// ========================================

function completeCoffeeQuest() {

  coffeeQuestCompleted = true;

  coffeeQuestActive = false;

  hasCoffee = false;


  questTitle.textContent =
    "☕ La pause cafe";


  questObjective.textContent =
    "💬 Reparler a Thiry";


  addXP(40);


  printerQuestAvailable =
    true;


  updateInteractions();

}


// ========================================
// QUETE 2 : IMPRIMANTE
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
    "🖨️ Probleme reseau";


  questObjective.textContent =
    "□ Entrer dans l'universite et trouver l'imprimante";


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
    "Joel";


  // ======================================
  // ETAPE 1
  // ======================================

  if (
    printerStep === 0
  ) {

    dialogueText.textContent =
      "Hmm... imprimante hors ligne. Elle recupere une adresse en 169.254.";


    questObjective.textContent =
      "□ Verifier la connexion reseau de l'imprimante";


    printerStep = 1;


    return;

  }


  // ======================================
  // ETAPE 2
  // ======================================

  if (
    printerStep === 1
  ) {

    dialogueText.textContent =
      "Pas de DHCP... Voyons le cable. Ah. Il est branche sur le mauvais port.";


    questObjective.textContent =
      "□ Rebrancher correctement l'imprimante";


    printerStep = 2;


    return;

  }


  // ======================================
  // ETAPE 3
  // ======================================

  if (
    printerStep === 2
  ) {

    dialogueText.textContent =
      "Voila. Nouvelle IP... et elle repond au ping.";


    printerStep = 3;

    printerFixed = true;


    printer.classList.add(
      "fixed"
    );


    questObjective.textContent =
      "☑ Imprimante reconnectee - Retourner voir Thiry";


    return;

  }

}


// ========================================
// TERMINER QUETE IMPRIMANTE
// ========================================

function completePrinterQuest() {

  printerQuestCompleted = true;

  printerQuestActive = false;


  questTitle.textContent =
    "🖨️ Probleme reseau";


  questObjective.textContent =
    "💬 Reparler a Thiry";


  // 40 XP cafe + 60 XP imprimante = niveau 2

  addXP(60);


  // Debloquer TristanT au niveau 2

  if (
    joel.level >= 2
  ) {

    tristanTQuestAvailable =
      true;

  }


  updateInteractions();

}


// ========================================
// QUETE 3 : TRISTANT
// ========================================

function startTristanTQuest() {

  tristanTQuestAvailable =
    false;

  tristanTQuestActive =
    true;

  tristanTQuestCompleted =
    false;

  tristanTStep = 0;


  showTristanT();


  questBox.style.display =
    "block";


  questTitle.textContent =
    "👤 TristanT vous cherche";


  questObjective.textContent =
    "□ Retourner a l'universite et parler a TristanT";


  updateInteractions();

}


// ========================================
// AFFICHER TRISTANT + PC
// ========================================

function showTristanT() {

  if (tristanT) {

    tristanT.style.display =
      "block";

  }


  if (professorPC) {

    professorPC.style.display =
      "block";

  }


  if (professorPCStatus) {

    professorPCStatus.style.display =
      "flex";

    professorPCStatus.textContent =
      "!";

  }

}


// ========================================
// CACHER TRISTANT + PC AU DEBUT
// ========================================

function hideTristanT() {

  if (tristanT) {

    tristanT.style.display =
      "none";

  }


  if (professorPC) {

    professorPC.style.display =
      "none";

  }


  if (professorPCStatus) {

    professorPCStatus.style.display =
      "none";

  }

}


// ========================================
// EXAMINER LE PC DU PROF
// ========================================

function examineProfessorPC() {

  interaction.style.display =
    "none";


  dialogueOpen = true;

  professorPCMessageOpen = true;


  dialogue.style.display =
    "block";


  // ======================================
  // ETAPE 1 : EXAMINER
  // ======================================

  if (
    tristanTStep === 1
  ) {

    dialogueName.textContent =
      "Joel";


    dialogueText.textContent =
      "Ca plante sur PowerPoint ? ...Son fichier fait 3,8 Go.";


    questObjective.textContent =
      "□ Aider TristanT a regler le probleme";


    tristanTStep = 2;


    return;

  }


  // ======================================
  // ETAPE 2 : AIDER TRISTANT
  // ======================================

  if (
    tristanTStep === 2
  ) {

    dialogueName.textContent =
      "Joel";


    dialogueText.textContent =
      "247 photos et six videos dans le meme PowerPoint... On a trouve le probleme.";


    tristanTStep = 3;


    professorPC.classList.add(
      "fixed"
    );


    if (professorPCStatus) {

      professorPCStatus.textContent =
        "✓";

    }


    questObjective.textContent =
      "💬 Reparler a TristanT";


    return;

  }

}


// ========================================
// TERMINER QUETE TRISTANT
// ========================================

function completeTristanTQuest() {

  tristanTQuestCompleted =
    true;

  tristanTQuestActive =
    false;


  questTitle.textContent =
    "💻 Pourtant, j'ai fini";


  questObjective.textContent =
    "✅ Quete terminee !";


  addXP(75);


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

  professorPCMessageOpen = false;


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
    "Joel passe niveau " +
    joel.level +
    " - ❤️ Vie max : " +
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
// ARRETER JOYSTICK
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
// PREMIERE DETECTION
// ========================================

updateInteractions();
