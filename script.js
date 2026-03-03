/* script.js*/

/* ---------------------------
   Data
---------------------------- */

var QUESTIONS = [
  {
    id: 1,
    question: "You spot an enemy team down the hallway. What is your first instinct?",
    options: [
      { id: "fighter", label: "Draw my weapon and stand in the front to protect my team." },
      { id: "rogue", label: "Turn off the torches and hide in the shadows for an ambush." },
      { id: "ranger", label: "Find the high ground and start shooting from a safe distance." },
      { id: "cleric", label: "Start casting buffs on my teammates and prepare to heal them." },
      { id: "wizard", label: "Start charging a massive Fireball to nuke the room, hoping I don't hit my team." }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to handle your attacks and mechanics?",
    options: [
      { id: "fighter", label: "Simple and reliable: Give me a sword and a shield. I hate overthinking." },
      { id: "rogue", label: "High risk, high reward: Fast strikes, but I might die in one hit." },
      { id: "ranger", label: "Ammo management: I don't mind counting arrows and setting up traps." },
      { id: "cleric", label: "Complex casting: I am willing to memorize spell patterns to keep everyone alive." },
      { id: "wizard", label: "Explosive magic: I want to delete enemies from existence, even if it means sitting down to meditate for spells later." }
    ]
  },
  {
    id: 3,
    question: "What excites you the most about the dungeon?",
    options: [
      { id: "fighter", label: "Standing toe-to-toe with heavy skeleton champions." },
      { id: "rogue", label: "\"Ratting\": Avoiding fights, unlocking chests faster, and escaping rich." },
      { id: "ranger", label: "Kiting monsters around the room without taking any damage." },
      { id: "cleric", label: "Purifying the undead easily with holy magic." },
      { id: "wizard", label: "Clearing entire rooms of monsters in seconds with Area of Effect (AoE) spells." }
    ]
  },
  {
    id: 4,
    question: "Every party needs a specific role. Which one are you?",
    options: [
      { id: "fighter", label: "The Vanguard (Tank)." },
      { id: "rogue", label: "The Scout (Lockpicker / Trap Disarmer)." },
      { id: "ranger", label: "The Artillery (Cover Fire)." },
      { id: "cleric", label: "The Lifeline (Healer)." },
      { id: "wizard", label: "The Glass Cannon (Burst Damage)." }
    ]
  },
  {
    id: 5,
    question: "You are cornered and heavily damaged. What is your panic button?",
    options: [
      { id: "fighter", label: "Pop my \"Second Wind\" to heal mid-fight and swing for the head!" },
      { id: "rogue", label: "Pop \"Hide\", turn completely invisible, and pray they walk past me." },
      { id: "ranger", label: "Throw a hunting trap in the doorway and run away." },
      { id: "cleric", label: "Cast \"Sanctuary\" or a protective shield and hold the line." },
      { id: "wizard", label: "Cast \"Invisibility\" and \"Haste\" on myself to run at lightning speed away from danger." }
    ]
  }
];

var CLASSES = {
  fighter: {
    name: "Fighter",
    iconText: "🛡",
    color: "#60a5fa",
    description: "The jack-of-all-trades. You excel at close combat and can use almost any weapon.",
    difficulty: 1,
    teamSynergy: "Cleric, Ranger",
    reasons: [
      "Versatile weapon mastery allows adaptability.",
      "Sprint ability helps close gaps or escape.",
      "Second Wind provides essential self-healing."
    ]
  },
  rogue: {
    name: "Rogue",
    iconText: "☠",
    color: "#34d399",
    description: "A master of stealth and ambush. You strike from the shadows and pick locks with ease.",
    difficulty: 2,
    teamSynergy: "Any (Solo Viable)",
    reasons: [
      "Hide allows for perfect ambushes.",
      "Interaction speed is unmatched for looting.",
      "Poisoned weapons drain enemy health."
    ]
  },
  ranger: {
    name: "Ranger",
    iconText: "👻",
    color: "#22c55e",
    description: "An expert marksman. You track enemies and eliminate them before they get close.",
    difficulty: 2,
    teamSynergy: "Fighter, Cleric",
    reasons: [
      "Field Ration keeps you healthy without potions.",
      "Tracking perks reveal enemy footsteps.",
      "Triple Shot bursts down targets instantly."
    ]
  },
  cleric: {
    name: "Cleric",
    iconText: "★",
    color: "#fbbf24",
    description: "A holy warrior who heals allies and smites the undead with divine magic.",
    difficulty: 2,
    teamSynergy: "Fighter, Ranger",
    reasons: [
      "Powerful healing spells keep the party alive.",
      "Holy Purification instantly destroys undead.",
      "Protection spell provides damage reduction buffs."
    ]
  },
  wizard: {
    name: "Wizard",
    iconText: "⚡",
    color: "#c084fc",
    description: "Master of arcane arts. You control the battlefield with powerful spells but are physically fragile.",
    difficulty: 3,
    teamSynergy: "Fighter, Cleric",
    reasons: [
      "High burst damage with Fireball and Magic Missile.",
      "Utility spells like Invisibility and Haste.",
      "Meditation allows spell recovery mid-dungeon."
    ]
  }
};

var CHECKLIST_ITEMS = [
  { id: 1, text: "Bring at least 2 Bandages & 1 Health Potion" },
  { id: 2, text: "Equip your perks in the Class tab" },
  { id: 3, text: "Check your pockets (remove unnecessary gold)" },
  { id: 4, text: "Ensure your weapon is reloaded/ready" },
  { id: 5, text: "Listen! Sound is everything in the dungeon" }
];

var MONSTERS = [
  {
    name: "Skeleton",
    iconText: "☠",
    difficulty: 1,
    tips: [
      "Dodge their overhead swing by moving sideways",
      "Attack immediately after they miss their strike",
      "Listen for bone rattling sounds to detect them early"
    ]
  },
  {
    name: "Mummy",
    iconText: "👁",
    difficulty: 2,
    tips: [
      "Keep your distance - they move slowly but hit hard",
      "Use ranged attacks or quick hit-and-run tactics",
      "Their grab attack is telegraphed - watch their arms"
    ]
  },
  {
    name: "Zombie",
    iconText: "🛡",
    difficulty: 1,
    tips: [
      "Easy to kite due to their slow movement speed",
      "Group up zombies and use AoE attacks",
      "Beware of zombie packs in narrow corridors"
    ]
  }
];

var GOLD_SECTIONS = [
  {
    title: "Best Loot to Grab",
    iconText: "⛁",
    colorClass: "block__ico--yellow",
    items: [
      "Golden Chalices & Ornate Cups (high value, small space)",
      "Jewelry (rings, necklaces) - excellent gold-to-weight ratio",
      "Rare weapons & armor (even if you can't use them)",
      "Treasure chests in hidden rooms",
      "Golden candle holders & decorative items"
    ]
  },
  {
    title: "Ratting Strategy",
    iconText: "📈",
    colorClass: "block__ico--yellow",
    description: "A safe, beginner-friendly approach focused on avoiding PvP combat.",
    tips: [
      "Stay on the edge of the map and avoid high-traffic areas",
      "Loot quietly - don't break every container",
      "If you hear footsteps, hide and let them pass",
      "Prioritize escape portals over risky fights",
      "Play as Rogue for faster looting and stealth abilities"
    ]
  },
  {
    title: "Extraction Tips",
    iconText: "🗺",
    colorClass: "block__ico--blue",
    tips: [
      "Blue portals appear after a certain time - listen for the opening sound",
      "Down-only portals appear in the center - very dangerous",
      "Red portals take you deeper (higher risk, higher reward)",
      "Check for portal campers before entering extraction zones",
      "Always save stamina for a final sprint to the portal"
    ]
  }
];

var ALL_CLASSES = [
  {
    id: "fighter",
    name: "Fighter",
    iconText: "🛡",
    color: "#60a5fa",
    role: "Frontline DPS",
    description: "The jack-of-all-trades. You excel at close combat and can use almost any weapon.",
    difficulty: 1,
    teamSynergy: "Cleric, Ranger",
    strengths: ["Versatile", "Balanced", "Beginner-friendly"]
  },
  {
    id: "rogue",
    name: "Rogue",
    iconText: "☠",
    color: "#34d399",
    role: "Assassin",
    description: "A master of stealth and ambush. You strike from the shadows and pick locks with ease.",
    difficulty: 2,
    teamSynergy: "Any (Solo Viable)",
    strengths: ["Stealth", "Fast looting", "High mobility"]
  },
  {
    id: "ranger",
    name: "Ranger",
    iconText: "👻",
    color: "#22c55e",
    role: "Ranged DPS",
    description: "An expert marksman. You track enemies and eliminate them before they get close.",
    difficulty: 2,
    teamSynergy: "Fighter, Cleric",
    strengths: ["Ranged damage", "Tracking", "Sustain"]
  },
  {
    id: "cleric",
    name: "Cleric",
    iconText: "★",
    color: "#fbbf24",
    role: "Support/Healer",
    description: "A holy warrior who heals allies and smites the undead with divine magic.",
    difficulty: 2,
    teamSynergy: "Fighter, Ranger",
    strengths: ["Healing", "Buffs", "Anti-undead"]
  },
  {
    id: "wizard",
    name: "Wizard",
    iconText: "⚡",
    color: "#c084fc",
    role: "Magic DPS",
    description: "Master of arcane arts. You control the battlefield with powerful spells but are physically fragile.",
    difficulty: 3,
    teamSynergy: "Fighter, Cleric",
    strengths: ["High damage", "Utility spells", "Area control"]
  }
];

var MECHANICS = [
  {
    title: "Sound & Awareness",
    iconText: "🔊",
    colorClass: "block__ico--purple",
    description: "Sound is your most important tool for survival in the dungeon.",
    details: [
      "Footsteps reveal nearby enemies and players",
      "Opening doors and chests creates noise",
      "Spellcasting and attacks alert others to your position",
      "Crouching reduces footstep volume significantly",
      "Listen for portal opening sounds to time your extraction"
    ]
  },
  {
    title: "Portal System",
    iconText: "↓",
    colorClass: "block__ico--blue",
    description: "Understanding portals is key to successful dungeon runs.",
    types: [
      { name: "Blue Portal (Escape)", desc: "Spawns after time - takes you to safety with your loot" },
      { name: "Red Portal (Down)", desc: "Takes you to harder floors with better loot" },
      { name: "Down-Only Portal", desc: "Center spawn - high risk, forces descent" }
    ],
    tips: [
      "Blue portals spawn at set intervals - memorize the timing",
      "Check for campers before entering portals",
      "Portals stay open for a limited time"
    ]
  },
  {
    title: "Health & Healing",
    iconText: "❤",
    colorClass: "block__ico--red",
    description: "Managing your health pool is critical for survival.",
    details: [
      "Bandages restore health over time (3 seconds)",
      "Health potions provide instant healing",
      "Some classes have self-healing abilities (Fighter's Second Wind)",
      "Campfires can be used to rest and heal slowly",
      "Death means losing all your equipped gear and loot"
    ]
  },
  {
    title: "Traps",
    iconText: "🔥",
    colorClass: "block__ico--amber",
    description: "Deadly hazards hidden throughout the dungeon.",
    details: [
      "Spike traps trigger from pressure plates - watch the floor",
      "Poison gas clouds deal damage over time",
      "Arrow traps activate in narrow corridors",
      "Swing blade traps have predictable patterns",
      "Use traps to your advantage in PvP combat"
    ]
  },
  {
    title: "Lock Picking",
    iconText: "🔒",
    colorClass: "block__ico--yellow",
    description: "Access valuable loot behind locked doors and chests.",
    details: [
      "Rogues have the fastest interaction speed for lockpicking",
      "Lockpicks are consumable items - bring spares",
      "Listen for clicks to know when you're picking correctly",
      "Some high-value chests require multiple lockpicks",
      "Failed attempts can break your lockpick"
    ]
  },
  {
    title: "Darkness & Vision",
    iconText: "👣",
    colorClass: "block__ico--blue",
    description: "Navigating low-light environments safely.",
    details: [
      "Torches provide light but reveal your position",
      "Some areas are pitch black - bring light sources",
      "Rangers have tracking perks to see footsteps",
      "Darkness gives Rogues an advantage for ambushes",
      "Wizard's Light spell provides mobile illumination"
    ]
  },
  {
    title: "Time & Extraction",
    iconText: "⏱",
    colorClass: "block__ico--blue",
    description: "Every second in the dungeon increases risk.",
    details: [
      "Longer runs increase PvP encounter chances",
      "Portal spawn times force players to converge",
      "Monsters respawn in cleared areas over time",
      "The circle closes, forcing players together (HR mode)",
      "Plan your route and extraction timing carefully"
    ]
  }
];

var ARTIFACTS = [
  {
    id: 1,
    name: "Viola",
    type: "Rapier",
    rarity: "Unique",
    rarityColor: "#ef4444",
    iconText: "⚔",
    stats: {
      "Physical Base Weapon Damage": "29",
      "Move Speed": "-15",
      "Enchantments": "Up to 6 extra"
    },
    effect: "❄️ Ice Magical Base Damage (100% Scaling), and frostbites the target for 2 seconds, causing -20% Move Speed Bonus and -20% Action Speed.",
    story: "The chill of winter flows in the wake of this icy blade freed from the Winter Fae who wanted to prove there is nothing stronger than the cold that is their domain.",
    droppedBy: "High-Roller Bosses",
    location: "Inferno / Ice Cavern",
    weaponClass: "All Classes",
    handType: "One Handed (Main-Hand)"
  },
  {
    id: 2,
    name: "Catice",
    type: "Crystal Sword",
    rarity: "Unique",
    rarityColor: "#06b6d4",
    iconText: "⚔",
    stats: {
      "Physical Base Weapon Damage": "13",
      "Magical Base Weapon Damage": "21",
      "Move Speed": "-25",
      "Enchantments": "Up to 6 extra"
    },
    effect: "Upon hitting a target or object, the blade breaks and shatters. If the blade hits a target, shatter will deal 50 ❄️ Ice Magical Base Damage (100% Scaling). The broken blade regenerates to its original state over 4 seconds, reducing damage to 5 Ice Magical until the blade is fully reformed.",
    story: "A sword forged from the shards of the Ice Queen's tears. Though fragile and prone to break, its fierce icy blade summons delicate whirlwinds of snowflakes, reforming itself to its original form.",
    droppedBy: "High-Roller Bosses",
    location: "Ice Cavern",
    weaponClass: "Wizard, Warlock, Sorcerer",
    handType: "Two Handed (Main-Hand)"
  },
  {
    id: 3,
    name: "Life after Death",
    type: "Barbarian Axe",
    rarity: "Unique",
    rarityColor: "#f97316",
    iconText: "🪓",
    stats: {
      "Physical Base Weapon Damage": "57-58",
      "Move Speed": "-35",
      "Enchantments": "Up to 6 extra",
      "Gear Score": "130"
    },
    effect: "When receiving a lethal attack, HP is set to 1 and become invincible for 3 seconds. This effect can only be triggered once during an adventure. Can be healed after Death. Any Life after Death can only be used once every 3 seconds.",
    story: "A legendary axe imbued with the power to cheat death itself. Warriors who wield this weapon are granted a second chance when facing mortal danger.",
    droppedBy: "High-Roller Bosses",
    location: "Goblin Caves / Inferno",
    weaponClass: "Barbarian",
    handType: "Main-Hand"
  },
  {
    id: 4,
    name: "Deathbloom",
    type: "Dagger",
    rarity: "Unique",
    rarityColor: "#a855f7",
    iconText: "🗡",
    stats: {
      "Physical Base Weapon Damage": "24",
      "Armor Penetration": "5%",
      "Move Speed": "-15",
      "Enchantments": "Up to 6 extra",
      "Gear Score": "100"
    },
    effect: "Successful weapon attacks apply death flower debuff to build on the target. The death flower explodes dealing 30 🌑 Dark Base Damage (0% Scaling).",
    story: "They love me. How cruel me not. They love me. Those over the fold.",
    droppedBy: "High-Roller Bosses",
    location: "Crypts / Ruins",
    weaponClass: "Rogue",
    handType: "Main-Hand"
  },
  {
    id: 5,
    name: "Pulverizing Prayer",
    type: "Mace",
    rarity: "Unique",
    rarityColor: "#fbbf24",
    iconText: "🔨",
    stats: {
      "Physical Base Weapon Damage": "39",
      "Armor Penetration": "5%",
      "Move Speed": "-25",
      "Enchantments": "Up to 10",
      "Gear Score": "100"
    },
    effect: "Crushes the enemy's armor with each weapon hit, causing the target to suffer -12% Physical Damage Reduction for 10 seconds, stacking up to 3 times and can stack new stack.",
    story: "Gifted to a holy fighter long ago by a war-torn god, proving faith is also a weapon. A divine weapon, crushing all non-believers through the light.",
    droppedBy: "High-Roller Bosses",
    location: "Forgotten Castle / Crypts",
    weaponClass: "Cleric",
    handType: "One Handed (Main-Hand)"
  },
  {
    id: 6,
    name: "Cinder",
    type: "Polearm",
    rarity: "Unique",
    rarityColor: "#dc2626",
    iconText: "🪓",
    stats: {
      "Physical Base Weapon Damage": "60-61",
      "Move Speed": "-45",
      "Enchantments": "Up to 6 extra",
      "Gear Score": "130"
    },
    effect: "Successful weapon attacks burn the target for 10 🔥 Fire Magical Base Damage (100% Scaling) over 3 seconds and deal an additional 5 Fire Magical Base Damage (50% Scaling) over 9 seconds.",
    story: "It will be difficult to keep track of your enemies when they are all ablaze because of a pile of ash.",
    droppedBy: "High-Roller Bosses",
    location: "Inferno",
    weaponClass: "Fighter, Warlock",
    handType: "Two Handed (Main-Hand)"
  }
];

/* ---------------------------
   State
---------------------------- */
var appStarted = false;
var currentMainScreen = "landing";
var quizIndex = 0;
var quizAnswers = {};
var checkedItems = {};
var routeStack = [];

/* ---------------------------
   Helpers
---------------------------- */
function $(id) { return document.getElementById(id); }

function setHidden(el, hidden) {
  if (!el) { return; }
  if (hidden) { el.className = el.className + " hidden"; }
  else { el.className = el.className.replace(/\bhidden\b/g, "").replace(/\s+/g, " ").replace(/^\s|\s$/g, ""); }
}

function hasClass(el, cls) {
  if (!el) { return false; }
  return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}

function addClass(el, cls) {
  if (!el) { return; }
  if (!hasClass(el, cls)) { el.className = (el.className + " " + cls).replace(/\s+/g, " ").replace(/^\s|\s$/g, ""); }
}

function removeClass(el, cls) {
  if (!el) { return; }
  el.className = (" " + el.className + " ").replace(" " + cls + " ", " ").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
}

function setActiveDrawer(route) {
  var items = document.querySelectorAll(".drawer__item");
  var i;
  for (i = 0; i < items.length; i++) {
    removeClass(items[i], "isActive");
    if (items[i].getAttribute("data-route") === route) {
      addClass(items[i], "isActive");
    }
  }
}

/* ---------------------------
   Presentation Start
---------------------------- */
function startPrototype() {
  appStarted = true;
  setHidden($("presentation"), true);
  setHidden($("app"), false);

  if (!window.location.hash) {
    window.location.hash = "#home";
  } else {
    handleRouteChange();
  }
}

/* ---------------------------
   Menu Drawer
---------------------------- */
function openMenu() {
  setHidden($("menuOverlay"), false);
  setHidden($("menuDrawer"), false);
}
function closeMenu() {
  setHidden($("menuOverlay"), true);
  setHidden($("menuDrawer"), true);
}

/* ---------------------------
   Routing
---------------------------- */
function normalizeHash() {
  var h = window.location.hash || "#home";
  h = h.replace("#", "");
  if (h === "") { h = "home"; }
  return h;
}

function showOnlyRoute(routeName) {
  var routes = [
    { name: "home", el: $("route_home") },
    { name: "monsters", el: $("route_monsters") },
    { name: "gold", el: $("route_gold") },
    { name: "class-selection", el: $("route_classselection") },
    { name: "mechanics", el: $("route_mechanics") },
    { name: "artifacts", el: $("route_artifacts") }
  ];

  var i;
  for (i = 0; i < routes.length; i++) {
    setHidden(routes[i].el, routes[i].name !== routeName);
  }

  if (routeName === "home") setActiveDrawer("home");
  if (routeName === "quiz") setActiveDrawer("quiz");
  if (routeName === "monsters") setActiveDrawer("monsters");
  if (routeName === "gold") setActiveDrawer("gold");

  setHidden($("btnBack"), false);
}

function pushRoute(routeName) {
  var last = routeStack.length ? routeStack[routeStack.length - 1] : null;
  if (last !== routeName) {
    routeStack.push(routeName);
  }
}

function goBack() {
  var routeName = normalizeHash();

  if (routeName === "home" || routeName === "quiz") {
    if (currentMainScreen === "quiz") {
      setMainScreen("landing");
      return;
    }
    if (currentMainScreen === "result") {
      setMainScreen("quiz");
      return;
    }
    return;
  }

  if (routeStack.length > 1) {
    routeStack.pop();
    var prev = routeStack[routeStack.length - 1];
    window.location.hash = "#" + prev;
  } else {
    window.location.hash = "#home";
  }
}

function handleRouteChange() {
  if (!appStarted) { return; }

  closeMenu();
  var routeName = normalizeHash();

  if (routeName === "quiz") {
    routeName = "home";
    showOnlyRoute("home");
    pushRoute("home");
    setMainScreen("quiz");
    updateFlow("quiz");
    return;
  }

  if (routeName === "home") {
    showOnlyRoute("home");
    pushRoute("home");
    setMainScreen("landing");
    updateFlow("landing");
    return;
  }

  showOnlyRoute(routeName);
  pushRoute(routeName);
  updateFlow(null);
}

/* ---------------------------
   Main Screens
---------------------------- */
function setMainScreen(name) {
  currentMainScreen = name;

  setHidden($("landingScreen"), name !== "landing");
  setHidden($("quizScreen"), name !== "quiz");
  setHidden($("resultScreen"), name !== "result");

  if (name === "landing") updateFlow("landing");
  if (name === "quiz") { updateFlow("quiz"); renderQuiz(); }
  if (name === "result") { updateFlow("result"); renderResult(); }
}

function updateFlow(step) {
  var a = $("flow_landing");
  var b = $("flow_quiz");
  var c = $("flow_result");

  removeClass(a, "isActive");
  removeClass(b, "isActive");
  removeClass(c, "isActive");

  if (step === "landing") addClass(a, "isActive");
  if (step === "quiz") addClass(b, "isActive");
  if (step === "result") addClass(c, "isActive");
}

/* ---------------------------
   Quiz
---------------------------- */
function resetQuiz() {
  quizIndex = 0;
  quizAnswers = {};
}

function renderQuiz() {
  var total = QUESTIONS.length;
  var q = QUESTIONS[quizIndex];

  $("quizQuestion").innerHTML = q.question;

  $("quizMetaLeft").innerHTML = "Question " + (quizIndex + 1) + " of " + total;
  var progress = Math.round(((quizIndex + 1) / total) * 100);
  $("quizMetaRight").innerHTML = progress + "%";
  $("progressBar").style.width = progress + "%";

  if (quizIndex === total - 1) $("btnQuizNextText").innerHTML = "Finish";
  else $("btnQuizNextText").innerHTML = "Next Question";

  var wrap = $("quizOptions");
  wrap.innerHTML = "";

  var i;
  for (i = 0; i < q.options.length; i++) {
    var opt = q.options[i];
    var btn = document.createElement("button");
    btn.className = "option";
    btn.setAttribute("data-opt", opt.id);

    var row = document.createElement("div");
    row.className = "option__row";

    var label = document.createElement("div");
    label.className = "option__label";
    label.innerHTML = opt.label;

    var check = document.createElement("div");
    check.className = "option__check";
    check.innerHTML = "✓";

    var glow = document.createElement("div");
    glow.className = "option__glow";

    row.appendChild(label);
    row.appendChild(check);
    btn.appendChild(row);
    btn.appendChild(glow);

    btn.onclick = (function(optId) {
      return function() {
        quizAnswers[quizIndex] = optId;
        setHidden($("quizError"), true);
        renderQuiz();
        updateQuizNextEnabled();
      };
    })(opt.id);

    if (quizAnswers[quizIndex] === opt.id) addClass(btn, "isSelected");
    wrap.appendChild(btn);
  }

  updateQuizNextEnabled();
}

function updateQuizNextEnabled() {
  var canProceed = !!quizAnswers[quizIndex];
  $("btnQuizNext").disabled = !canProceed;
}

function quizNext() {
  if (!quizAnswers[quizIndex]) {
    setHidden($("quizError"), false);
    return;
  }
  setHidden($("quizError"), true);

  if (quizIndex < QUESTIONS.length - 1) {
    quizIndex += 1;
    renderQuiz();
  } else {
    setMainScreen("result");
  }
}

function quizPrev() {
  setHidden($("quizError"), true);
  if (quizIndex > 0) {
    quizIndex -= 1;
    renderQuiz();
  } else {
    setMainScreen("landing");
  }
}

/* ---------------------------
   Result
---------------------------- */
function determineClassFromAnswers(ans) {
  var scores = { fighter: 0, rogue: 0, ranger: 0, cleric: 0, wizard: 0 };
  var k;

  for (k in ans) {
    if (ans.hasOwnProperty(k)) {
      var a = ans[k];
      if (scores.hasOwnProperty(a)) scores[a] += 1;
    }
  }

  var maxScore = 0;
  var recommended = "fighter";
  for (k in scores) {
    if (scores.hasOwnProperty(k)) {
      if (scores[k] > maxScore) {
        maxScore = scores[k];
        recommended = k;
      }
    }
  }
  return recommended;
}

function renderResult() {
  checkedItems = {};

  var key = determineClassFromAnswers(quizAnswers);
  var data = CLASSES[key] || CLASSES.fighter;

  $("resultName").innerHTML = data.name;
  $("resultDesc").innerHTML = data.description;

  $("resultIcon").innerHTML = data.iconText;
  $("resultIcon").style.color = data.color;
  $("resultName").style.color = data.color;

  var stars = "";
  var i;
  for (i = 0; i < 3; i++) {
    if (i < data.difficulty) stars += "★";
    else stars += "☆";
  }
  $("resultDifficulty").innerHTML = stars;
  $("resultSynergy").innerHTML = data.teamSynergy;

  var list = $("resultReasons");
  list.innerHTML = "";
  for (i = 0; i < data.reasons.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = data.reasons[i];
    list.appendChild(li);
  }

  var wrap = $("checklistItems");
  wrap.innerHTML = "";
  for (i = 0; i < CHECKLIST_ITEMS.length; i++) {
    (function(item) {
      var row = document.createElement("div");
      row.className = "checkItem";
      row.setAttribute("data-check", String(item.id));

      var box = document.createElement("div");
      box.className = "checkItem__box";
      box.innerHTML = "✓";

      var text = document.createElement("div");
      text.className = "checkItem__text";
      text.innerHTML = item.text;

      row.appendChild(box);
      row.appendChild(text);

      row.onclick = function() {
        toggleChecklist(item.id, row);
      };

      wrap.appendChild(row);
    })(CHECKLIST_ITEMS[i]);
  }

  setHidden($("checklistSuccess"), true);
}

function toggleChecklist(id, rowEl) {
  if (checkedItems[id]) {
    checkedItems[id] = false;
    removeClass(rowEl, "isChecked");
  } else {
    checkedItems[id] = true;
    addClass(rowEl, "isChecked");
  }

  var count = 0;
  var i;
  for (i = 0; i < CHECKLIST_ITEMS.length; i++) {
    if (checkedItems[CHECKLIST_ITEMS[i].id]) count += 1;
  }
  if (count === CHECKLIST_ITEMS.length) setHidden($("checklistSuccess"), false);
  else setHidden($("checklistSuccess"), true);
}

/* ---------------------------
   Extra Pages Rendering
---------------------------- */
function renderMonsters() {
  var wrap = $("monsterList");
  if (!wrap) return;

  wrap.innerHTML = "";

  var i, j;
  for (i = 0; i < MONSTERS.length; i++) {
    var m = MONSTERS[i];

    var block = document.createElement("div");
    block.className = "block";

    var pad = document.createElement("div");
    pad.className = "block__pad";

    var head = document.createElement("div");
    head.className = "block__head";

    var left = document.createElement("div");
    left.className = "block__left";

    var ico = document.createElement("div");
    ico.className = "block__ico block__ico--red";
    ico.innerHTML = m.iconText;

    var titleWrap = document.createElement("div");
    var title = document.createElement("h3");
    title.className = "block__title";
    title.innerHTML = m.name;

    var sub = document.createElement("div");
    sub.className = "block__sub";
    sub.innerHTML = "Difficulty: " + skullDifficulty(m.difficulty);

    titleWrap.appendChild(title);
    titleWrap.appendChild(sub);

    left.appendChild(ico);
    left.appendChild(titleWrap);

    head.appendChild(left);
    pad.appendChild(head);

    /* ✅ Deleted Video Placeholder block (per your request) */

    var tipsTitle = document.createElement("div");
    tipsTitle.style.marginTop = "12px";
    tipsTitle.style.color = "#f59e0b";
    tipsTitle.style.fontSize = "12px";
    tipsTitle.style.fontWeight = "900";
    tipsTitle.style.letterSpacing = "0.14em";
    tipsTitle.style.textTransform = "uppercase";
    tipsTitle.innerHTML = "Combat Tips";
    pad.appendChild(tipsTitle);

    var ul = document.createElement("ul");
    ul.className = "bullets";
    for (j = 0; j < m.tips.length; j++) {
      var li = document.createElement("li");
      li.innerHTML = m.tips[j];
      ul.appendChild(li);
    }
    pad.appendChild(ul);

    block.appendChild(pad);
    wrap.appendChild(block);
  }
}

function skullDifficulty(n) {
  var s = "";
  var i;
  for (i = 0; i < 3; i++) {
    if (i < n) s += "☠";
    else s += "·";
  }
  return s;
}

function renderGold() {
  var wrap = $("goldSections");
  if (!wrap) return;

  wrap.innerHTML = "";

  var i, j;
  for (i = 0; i < GOLD_SECTIONS.length; i++) {
    var s = GOLD_SECTIONS[i];

    var block = document.createElement("div");
    block.className = "block";

    var pad = document.createElement("div");
    pad.className = "block__pad";

    var head = document.createElement("div");
    head.className = "block__head";

    var left = document.createElement("div");
    left.className = "block__left";

    var ico = document.createElement("div");
    ico.className = "block__ico " + (s.colorClass || "block__ico--yellow");
    ico.innerHTML = s.iconText;

    var titleWrap = document.createElement("div");
    var title = document.createElement("h3");
    title.className = "block__title";
    title.innerHTML = s.title;

    titleWrap.appendChild(title);
    if (s.description) {
      var desc = document.createElement("div");
      desc.className = "block__sub";
      desc.innerHTML = s.description;
      titleWrap.appendChild(desc);
    }

    left.appendChild(ico);
    left.appendChild(titleWrap);

    head.appendChild(left);
    pad.appendChild(head);

    if (s.items) {
      var grid = document.createElement("div");
      grid.className = "kv";
      for (j = 0; j < s.items.length; j++) {
        var row = document.createElement("div");
        row.className = "kv__row";
        var v = document.createElement("div");
        v.className = "kv__v";
        v.innerHTML = "• " + s.items[j];
        row.appendChild(v);
        grid.appendChild(row);
      }
      pad.appendChild(grid);
    } else if (s.tips) {
      var ul = document.createElement("ul");
      ul.className = "bullets";
      for (j = 0; j < s.tips.length; j++) {
        var li = document.createElement("li");
        li.innerHTML = s.tips[j];
        ul.appendChild(li);
      }
      pad.appendChild(ul);
    }

    block.appendChild(pad);
    wrap.appendChild(block);
  }
}

function renderClassSelection() {
  var wrap = $("classGrid");
  if (!wrap) return;

  wrap.innerHTML = "";

  var i, j;
  for (i = 0; i < ALL_CLASSES.length; i++) {
    var c = ALL_CLASSES[i];

    var btn = document.createElement("button");
    btn.className = "classCard";
    btn.onclick = (function(id) {
      return function() {
        alert("Preview only. Selected class: " + id);
      };
    })(c.id);

    var topLine = document.createElement("div");
    topLine.className = "classCard__topLine";
    btn.appendChild(topLine);

    var row = document.createElement("div");
    row.className = "classCard__row";

    var ico = document.createElement("div");
    ico.className = "classCard__ico";
    ico.innerHTML = c.iconText;
    ico.style.color = c.color;

    var body = document.createElement("div");

    var name = document.createElement("h2");
    name.className = "classCard__name";
    name.innerHTML = c.name;
    name.style.color = c.color;

    var role = document.createElement("div");
    role.className = "classCard__role";
    role.innerHTML = c.role;

    body.appendChild(name);
    body.appendChild(role);

    row.appendChild(ico);
    row.appendChild(body);

    btn.appendChild(row);

    var desc = document.createElement("div");
    desc.className = "classCard__desc";
    desc.innerHTML = c.description;
    btn.appendChild(desc);

    var badges = document.createElement("div");
    badges.className = "resultCard__badges";
    badges.style.marginTop = "6px";

    var b1 = document.createElement("div");
    b1.className = "miniBadge";
    var k1 = document.createElement("span");
    k1.className = "miniBadge__k";
    k1.innerHTML = "Difficulty:";
    var v1 = document.createElement("span");
    v1.className = "miniBadge__stars";
    v1.innerHTML = difficultyStars(c.difficulty);
    b1.appendChild(k1);
    b1.appendChild(v1);

    var b2 = document.createElement("div");
    b2.className = "miniBadge";
    var k2 = document.createElement("span");
    k2.className = "miniBadge__k";
    k2.innerHTML = "Team:";
    var v2 = document.createElement("span");
    v2.className = "miniBadge__v";
    v2.innerHTML = c.teamSynergy;
    b2.appendChild(k2);
    b2.appendChild(v2);

    badges.appendChild(b1);
    badges.appendChild(b2);
    btn.appendChild(badges);

    var pills = document.createElement("div");
    pills.className = "pills";
    for (j = 0; j < c.strengths.length; j++) {
      var pill = document.createElement("span");
      pill.className = "pill";
      pill.innerHTML = c.strengths[j];
      pills.appendChild(pill);
    }
    btn.appendChild(pills);

    var preview = document.createElement("div");
    preview.className = "previewTag";
    preview.innerHTML = "Preview";
    btn.appendChild(preview);

    wrap.appendChild(btn);
  }
}

function difficultyStars(n) {
  var s = "";
  var i;
  for (i = 0; i < 3; i++) {
    if (i < n) s += "★";
    else s += "☆";
  }
  return s;
}

function renderMechanics() {
  var wrap = $("mechanicsGrid");
  if (!wrap) return;

  wrap.innerHTML = "";

  var i, j;
  for (i = 0; i < MECHANICS.length; i++) {
    var m = MECHANICS[i];

    var card = document.createElement("div");
    card.className = "block";
    var pad = document.createElement("div");
    pad.className = "block__pad";

    var head = document.createElement("div");
    head.className = "block__head";

    var left = document.createElement("div");
    left.className = "block__left";

    var ico = document.createElement("div");
    ico.className = "block__ico " + (m.colorClass || "block__ico--amber");
    ico.innerHTML = m.iconText;

    var titleWrap = document.createElement("div");
    var title = document.createElement("h3");
    title.className = "block__title";
    title.innerHTML = m.title;

    var desc = document.createElement("div");
    desc.className = "block__sub";
    desc.innerHTML = m.description;

    titleWrap.appendChild(title);
    titleWrap.appendChild(desc);

    left.appendChild(ico);
    left.appendChild(titleWrap);

    head.appendChild(left);
    pad.appendChild(head);

    if (m.types) {
      var typesWrap = document.createElement("div");
      typesWrap.className = "kv";
      for (j = 0; j < m.types.length; j++) {
        var t = m.types[j];
        var row = document.createElement("div");
        row.className = "kv__row";

        var k = document.createElement("div");
        k.className = "kv__k";
        k.innerHTML = t.name;

        var v = document.createElement("div");
        v.className = "kv__v";
        v.innerHTML = t.desc;

        row.appendChild(k);
        row.appendChild(v);
        typesWrap.appendChild(row);
      }
      pad.appendChild(typesWrap);
    }

    if (m.details) {
      var ul = document.createElement("ul");
      ul.className = "bullets";
      for (j = 0; j < m.details.length; j++) {
        var li = document.createElement("li");
        li.innerHTML = m.details[j];
        ul.appendChild(li);
      }
      pad.appendChild(ul);
    }

    if (m.tips) {
      var hr = document.createElement("hr");
      hr.className = "sep";
      pad.appendChild(hr);

      var lab = document.createElement("div");
      lab.style.color = "#f59e0b";
      lab.style.fontSize = "12px";
      lab.style.fontWeight = "900";
      lab.style.letterSpacing = "0.14em";
      lab.style.textTransform = "uppercase";
      lab.innerHTML = "Pro Tips";
      pad.appendChild(lab);

      var ul2 = document.createElement("ul");
      ul2.className = "bullets";
      ul2.style.fontSize = "13px";
      for (j = 0; j < m.tips.length; j++) {
        var li2 = document.createElement("li");
        li2.innerHTML = "→ " + m.tips[j];
        ul2.appendChild(li2);
      }
      pad.appendChild(ul2);
    }

    card.appendChild(pad);
    wrap.appendChild(card);
  }
}

function renderArtifacts() {
  var wrap = $("artifactGrid");
  if (!wrap) return;

  wrap.innerHTML = "";

  var i, k;
  for (i = 0; i < ARTIFACTS.length; i++) {
    var a = ARTIFACTS[i];

    var card = document.createElement("div");
    card.className = "artifactCard";

    var badge = document.createElement("div");
    badge.className = "artifactCard__badge";
    badge.style.color = a.rarityColor;
    badge.innerHTML = a.rarity;
    card.appendChild(badge);

    var row = document.createElement("div");
    row.className = "artifactCard__row";

    var ico = document.createElement("div");
    ico.className = "artifactCard__ico";
    ico.style.color = a.rarityColor;
    ico.innerHTML = a.iconText;

    var body = document.createElement("div");
    var name = document.createElement("div");
    name.className = "artifactCard__name";
    name.style.color = a.rarityColor;
    name.innerHTML = a.name;

    var type = document.createElement("div");
    type.className = "artifactCard__type";
    type.innerHTML = a.type;

    body.appendChild(name);
    body.appendChild(type);

    row.appendChild(ico);
    row.appendChild(body);
    card.appendChild(row);

    var eff = document.createElement("div");
    eff.className = "artifactBox";
    var ek = document.createElement("div");
    ek.className = "artifactBox__k";
    ek.innerHTML = "Effect";
    var ev = document.createElement("div");
    ev.className = "artifactBox__v";
    ev.style.color = "#34d399";
    ev.style.fontWeight = "800";
    ev.innerHTML = a.effect;
    eff.appendChild(ek);
    eff.appendChild(ev);
    card.appendChild(eff);

    var st = document.createElement("div");
    st.className = "artifactBox";
    var sk = document.createElement("div");
    sk.className = "artifactBox__k";
    sk.innerHTML = "Stats";
    st.appendChild(sk);

    for (k in a.stats) {
      if (a.stats.hasOwnProperty(k)) {
        var line = document.createElement("div");
        line.className = "artifactBox__v";
        line.innerHTML = "<span style='color:#a3a3a3;'>" + k + "</span> " +
          "<span style='color:#34d399; font-weight:800;'>" + a.stats[k] + "</span>";
        st.appendChild(line);
      }
    }
    card.appendChild(st);

    var loreLab = document.createElement("div");
    loreLab.style.marginTop = "10px";
    loreLab.style.color = "#f59e0b";
    loreLab.style.fontSize = "12px";
    loreLab.style.fontWeight = "900";
    loreLab.style.letterSpacing = "0.14em";
    loreLab.style.textTransform = "uppercase";
    loreLab.innerHTML = "Lore";
    card.appendChild(loreLab);

    var lore = document.createElement("div");
    lore.className = "artifactLore";
    lore.innerHTML = a.story;
    card.appendChild(lore);

    var hr = document.createElement("hr");
    hr.className = "sep";
    card.appendChild(hr);

    var info = document.createElement("div");
    info.className = "kv";
    info.appendChild(makeInfoRow("Class", a.weaponClass));
    info.appendChild(makeInfoRow("Hand Type", a.handType));
    info.appendChild(makeInfoRow("Dropped By", a.droppedBy));
    info.appendChild(makeInfoRow("Location", a.location));
    card.appendChild(info);

    wrap.appendChild(card);
  }
}

function makeInfoRow(k, v) {
  var row = document.createElement("div");
  row.className = "kv__row";
  var kk = document.createElement("div");
  kk.className = "kv__k";
  kk.innerHTML = k;
  var vv = document.createElement("div");
  vv.className = "kv__v";
  vv.innerHTML = v;
  row.appendChild(kk);
  row.appendChild(vv);
  return row;
}

/* ---------------------------
   Bindings
---------------------------- */
function bindGlobalClicks() {
  $("btnStartPrototype").onclick = startPrototype;

  $("btnMenu").onclick = function() {
    if (hasClass($("menuDrawer"), "hidden")) openMenu();
    else closeMenu();
  };
  $("menuOverlay").onclick = closeMenu;

  $("btnBack").onclick = goBack;

  $("btnFindClass").onclick = function() {
    setMainScreen("quiz");
  };
  $("btnSkipQuiz").onclick = function() {
    setMainScreen("result");
  };

  $("btnQuizBack").onclick = quizPrev;
  $("btnQuizNext").onclick = quizNext;

  $("btnRetake").onclick = function() {
    resetQuiz();
    setMainScreen("quiz");
  };

  document.body.onclick = function(e) {
    var t = e.target;
    var steps = 0;
    while (t && steps < 6) {
      if (t.getAttribute && t.getAttribute("data-nav")) {
        window.location.hash = t.getAttribute("data-nav");
        return;
      }
      if (t.getAttribute && t.getAttribute("data-back") === "1") {
        goBack();
        return;
      }
      t = t.parentNode;
      steps += 1;
    }
  };
}

function bindDrawerLinks() {
  var items = document.querySelectorAll(".drawer__item");
  var i;
  for (i = 0; i < items.length; i++) {
    items[i].onclick = function() {
      closeMenu();
    };
  }
}

/* ---------------------------
   Init
---------------------------- */
function init() {
  setHidden($("btnBack"), true);

  bindGlobalClicks();
  bindDrawerLinks();

  renderMonsters();
  renderGold();
  renderClassSelection();
  renderMechanics();
  renderArtifacts();

  window.onhashchange = handleRouteChange;
}

init();