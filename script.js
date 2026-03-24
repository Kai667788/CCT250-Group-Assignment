/* =========================================
   Dark and Darker Beginner Companion
   Final Script
   Updated for final demo polish
   ========================================= */

/* -----------------------------------------
   Quiz Data
----------------------------------------- */
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

/* -----------------------------------------
   Class Data
----------------------------------------- */
var CLASSES = {
  fighter: {
    name: "Fighter",
    iconText: "🛡",
    color: "#60a5fa",
    image: "fighter.png",
    tagline: "Safe, balanced, and reliable for first-time dungeon runs.",
    summary: "Based on your answers, Fighter is the safest starting point if you want a balanced class that can survive mistakes.",
    starterTip: "Stay close to your team, trade carefully, and save Second Wind for the moment you really need it.",
    caution: "You are sturdy, but you still need to respect positioning and ranged pressure.",
    description: "The jack-of-all-trades. You excel at close combat, can equip most weapons, and recover from mistakes better than fragile classes.",
    difficulty: 1,
    teamSynergy: "Cleric, Ranger",
    reasons: [
      "Versatile weapon mastery makes the class easy to learn.",
      "Sprint helps you escape, chase, or fix bad positioning.",
      "Second Wind gives strong self-healing when a fight goes wrong."
    ]
  },
  rogue: {
    name: "Rogue",
    iconText: "☠",
    color: "#34d399",
    image: "rogue.png",
    tagline: "Fast, sneaky, and great for players who like ambushes and solo value.",
    summary: "Based on your answers, Rogue fits you best if you like stealth, speed, and avoiding fair fights.",
    starterTip: "Play patiently, use darkness, and focus on looting and escaping instead of forcing every fight.",
    caution: "Rogue is rewarding, but mistakes get punished fast because your health pool is low.",
    description: "A master of stealth and ambush. You strike from the shadows, move quietly, and loot quickly.",
    difficulty: 2,
    teamSynergy: "Any (Solo Viable)",
    reasons: [
      "Hide gives you strong ambush and escape potential.",
      "Fast interaction speed makes looting efficient.",
      "Stealth and mobility reward smart, low-risk play."
    ]
  },
  ranger: {
    name: "Ranger",
    iconText: "🏹",
    color: "#22c55e",
    image: "ranger.png",
    tagline: "Best for players who want distance, control, and safe damage.",
    summary: "Based on your answers, Ranger is a strong fit if you want to stay safe, control space, and punish enemies before they reach you.",
    starterTip: "Use doorways, corners, and high ground so your bow does the work before enemies can reach you.",
    caution: "If enemies close the gap, your mistakes are much harder to recover from.",
    description: "An expert marksman. You track enemies, kite monsters, and deal steady ranged pressure from safer positions.",
    difficulty: 2,
    teamSynergy: "Fighter, Cleric",
    reasons: [
      "Ranged damage lets you learn fights from safer positions.",
      "Tracking perks reveal information before enemies commit.",
      "Traps and positioning reward cautious players."
    ]
  },
  cleric: {
    name: "Cleric",
    iconText: "✦",
    color: "#fbbf24",
    image: "cleric.png",
    tagline: "A supportive class for players who like helping the team stay alive.",
    summary: "Based on your answers, Cleric is the best match if you enjoy support, healing, and slowing the pace of a dangerous fight.",
    starterTip: "Stay near teammates, pre-buff before fights, and do not panic-cast all your spells too early.",
    caution: "Your value is high, but your pace is slower and your positioning matters a lot.",
    description: "A holy warrior who heals allies, buffs teammates, and punishes undead enemies with divine magic.",
    difficulty: 2,
    teamSynergy: "Fighter, Ranger",
    reasons: [
      "Healing and protection make every team more forgiving.",
      "Holy spells are especially useful against undead enemies.",
      "Support tools help beginners contribute even without top damage."
    ]
  },
  wizard: {
    name: "Wizard",
    iconText: "⚡",
    color: "#c084fc",
    image: "wizard.png",
    tagline: "High-risk, high-reward magic for players who want burst and utility.",
    summary: "Based on your answers, Wizard suits you best if you enjoy planning, spell management, and explosive burst damage.",
    starterTip: "Fight from range, protect your spacing, and treat your spells like limited resources.",
    caution: "Wizard has huge upside, but the low health and spell management make it the hardest beginner class here.",
    description: "Master of arcane arts. You control the battlefield with powerful spells, utility, and burst damage, but you are physically fragile.",
    difficulty: 3,
    teamSynergy: "Fighter, Cleric",
    reasons: [
      "Fireball and Magic Missile offer huge burst damage.",
      "Invisibility and Haste provide strong utility and escape value.",
      "The class rewards players who like planning and resource management."
    ]
  }
};

/* -----------------------------------------
   Checklist Data
----------------------------------------- */
var CHECKLIST_ITEMS = [
  { id: 1, text: "Bring at least 2 Bandages & 1 Health Potion" },
  { id: 2, text: "Equip your perks in the Class tab" },
  { id: 3, text: "Check your pockets (remove unnecessary gold)" },
  { id: 4, text: "Ensure your weapon is reloaded/ready" },
  { id: 5, text: "Listen! Sound is everything in the dungeon" }
];

/* -----------------------------------------
   Monster Data
----------------------------------------- */
var MONSTERS = [
  {
    name: "Skeleton",
    iconText: "☠",
    difficulty: 1,
    video: "Skeleton.mp4",
    tips: [
      "Dodge their overhead swing by moving sideways instead of backwards.",
      "Attack right after they miss so you stay safe while trading.",
      "Listen for bone-rattling sounds so you can prepare before they reach you."
    ]
  },
  {
    name: "Mummy",
    iconText: "👁",
    difficulty: 2,
    video: "Mummy.mp4",
    tips: [
      "Keep your distance because they move slowly but hit hard when they connect.",
      "Use ranged pressure or quick hit-and-run timing instead of standing still.",
      "Watch their arms and body language so you can read the grab before it lands."
    ]
  },
  {
    name: "Goblin",
    iconText: "🗡",
    difficulty: 1,
    video: "Goblin.mp4",
    tips: [
      "Pull one goblin at a time when possible instead of rushing the whole room.",
      "Strafe after each swing and reset before committing again.",
      "Use doors and corners to reduce how many enemies can hit you at once."
    ]
  }
];

var BOSSES = [
  {
    name: "Skeleton Warlord",
    iconText: "♛",
    difficulty: 3,
    video: "Skeleton warlord (Boss).mp4",
    tips: [
      "Do not rush in. Learn the attack rhythm first and only punish after a full swing ends.",
      "Keep enough distance to read the weapon animation clearly before committing.",
      "Boss rooms reward patience more than greed. One safe hit is better than getting comboed.",
      "If you are unsure, reset your spacing and wait for the next clean opening."
    ]
  }
];

/* -----------------------------------------
   Gold Guide Data
----------------------------------------- */
var GOLD_GUIDE = [
  {
    title: "Get Gold from Chests",
    image: "chest.png",
    text: "One easy way to start making money is by opening chests during your run. Treasure items and valuables can be taken out and sold later.",
    bullets: [
      "Chests are a safe and common source of treasure.",
      "Great for new players who want consistent gold.",
      "Loot fast and leave before taking unnecessary risks."
    ]
  },
  {
    title: "Gold Piles in Boss Rooms",
    image: "pile.png",
    text: "After killing a boss, you may find a room with large piles of gold and treasure. This is one of the best ways to make a lot of money in a single run.",
    bullets: [
      "High reward, but much riskier than basic looting.",
      "Usually comes after a difficult boss fight.",
      "Best once you are more comfortable with PvE."
    ]
  },
  {
    title: "Sell Treasure to the Collector",
    image: "merchant.png",
    text: "Treasures and valuables can be sold to the Collector merchant for direct gold. This is the easiest way to turn dungeon loot into spending money.",
    bullets: [
      "Best for cups, jewelry, and other treasure items.",
      "Quick and reliable way to cash out.",
      "Useful after ratting or low-risk loot runs."
    ]
  },
  {
    title: "Sell Gear on the Marketplace",
    image: "Market place.png",
    text: "Good equipment can be listed on the Marketplace so other players can buy it. This is often better than vendor-selling valuable gear.",
    bullets: [
      "List useful gear and wait for another player to buy it.",
      "Strong rolls and meta items usually sell better.",
      "A good Marketplace sale can fund multiple future kits."
    ]
  }
];

/* -----------------------------------------
   Class Selection Data
----------------------------------------- */
var ALL_CLASSES = [
  {
    id: "fighter",
    name: "Fighter",
    iconText: "🛡",
    color: "#60a5fa",
    image: "fighter.png",
    role: "Frontline DPS",
    description: "A safe and balanced pick for beginners who want to learn melee combat without too much complexity.",
    difficulty: 1,
    teamSynergy: "Cleric, Ranger",
    strengths: ["Versatile", "Balanced", "Beginner-friendly"]
  },
  {
    id: "rogue",
    name: "Rogue",
    iconText: "☠",
    color: "#34d399",
    image: "rogue.png",
    role: "Assassin / Scout",
    description: "A stealthy class built around ambushes, quick looting, and high-risk, high-reward decisions.",
    difficulty: 2,
    teamSynergy: "Any (Solo Viable)",
    strengths: ["Stealth", "Fast looting", "High mobility"]
  },
  {
    id: "ranger",
    name: "Ranger",
    iconText: "🏹",
    color: "#22c55e",
    image: "ranger.png",
    role: "Ranged DPS",
    description: "A ranged class for players who want to control fights from a safer distance and rely on positioning.",
    difficulty: 2,
    teamSynergy: "Fighter, Cleric",
    strengths: ["Ranged damage", "Tracking", "Sustain"]
  },
  {
    id: "cleric",
    name: "Cleric",
    iconText: "✦",
    color: "#fbbf24",
    image: "cleric.png",
    role: "Support / Healer",
    description: "A strong support class that protects the team through healing, buffs, and anti-undead tools.",
    difficulty: 2,
    teamSynergy: "Fighter, Ranger",
    strengths: ["Healing", "Buffs", "Anti-undead"]
  },
  {
    id: "wizard",
    name: "Wizard",
    iconText: "⚡",
    color: "#c084fc",
    image: "wizard.png",
    role: "Magic DPS",
    description: "A powerful but fragile spellcaster that rewards careful resource management and strong positioning.",
    difficulty: 3,
    teamSynergy: "Fighter, Cleric",
    strengths: ["High damage", "Utility spells", "Area control"]
  }
];

/* -----------------------------------------
   Mechanics Data
----------------------------------------- */
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

/* -----------------------------------------
   Artifact Data
   The page only shows image + name first.
   Clicking a card opens detailed info.
----------------------------------------- */
var ARTIFACTS = [
  {
    id: 1,
    name: "Viola",
    image: "Viola_7.png",
    type: "Rapier",
    rarity: "Unique",
    rarityColor: "#ef4444",
    iconText: "⚔",
    stats: {
      "Physical Base Weapon Damage": "29",
      "Move Speed": "-15",
      "Enchantments": "Up to 6 extra"
    },
    effect: "Ice magical base damage that frostbites the target and slows movement and action speed.",
    story: "The chill of winter flows in the wake of this icy blade. Gifted from the Winter Fae who wanted to prove there is nothing stronger than the cold bite of their domain.",
    droppedBy: "High-Roller Bosses",
    location: "Inferno / Ice Cavern",
    weaponClass: "All Classes",
    handType: "One Handed (Main-Hand)"
  },
  {
    id: 2,
    name: "Catice",
    image: "Catice.png",
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
    effect: "The blade shatters on hit and deals bonus ice damage before reforming.",
    story: "A sword forged from the shards of the Ice Queen's tears. Though fragile and prone to breaking, its fierce icy blade summons delicate whirlwinds of snowflakes, reforming itself to its original form.",
    droppedBy: "High-Roller Bosses",
    location: "Ice Cavern",
    weaponClass: "Wizard, Warlock, Sorcerer",
    handType: "Two Handed (Main-Hand)"
  },
  {
    id: 3,
    name: "Life after Death",
    image: "Life_after_Death.png",
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
    effect: "When receiving a lethal attack, HP is set to 1 and you become invincible for 3 seconds once per adventure.",
    story: "Death comes for us all one day...\nIs today that day?",
    droppedBy: "High-Roller Bosses",
    location: "Goblin Caves / Inferno",
    weaponClass: "Barbarian",
    handType: "Main-Hand"
  },
  {
    id: 4,
    name: "Deathbloom",
    image: "Deathbloom.png",
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
    effect: "Successful weapon attacks apply a death flower debuff that eventually explodes for dark damage.",
    story: "Thou love me, thou love me not... Thou love me, thou love me not…",
    droppedBy: "High-Roller Bosses",
    location: "Crypts / Ruins",
    weaponClass: "Rogue",
    handType: "Main-Hand"
  },
  {
    id: 5,
    name: "Pulverizing Prayer",
    image: "Pulverizing_Prayer.png",
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
    effect: "Crushes enemy armor on hit and reduces physical damage reduction in stacks.",
    story: "Gifted to a holy fighter long ago by a demi-god, proving faith is also a powerful weapon, crushing all non-believers.",
    droppedBy: "High-Roller Bosses",
    location: "Forgotten Castle / Crypts",
    weaponClass: "Cleric",
    handType: "One Handed (Main-Hand)"
  },
  {
    id: 6,
    name: "Cinder",
    image: "Cinder.png",
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
    effect: "Successful weapon attacks burn the target and apply additional fire magical damage over time.",
    story: "It will be difficult to keep track of your kill count for they have all been reduced to a pile of ash.",
    droppedBy: "High-Roller Bosses",
    location: "Inferno",
    weaponClass: "Fighter, Warlock",
    handType: "Two Handed (Main-Hand)"
  }
];

/* -----------------------------------------
   App State
----------------------------------------- */
var appStarted = false;
var currentMainScreen = "landing";
var quizIndex = 0;
var quizAnswers = {};
var checkedItems = {};
var routeStack = [];

/* -----------------------------------------
   Basic Helpers
----------------------------------------- */
function $(id) {
  return document.getElementById(id);
}

function setHidden(el, hidden) {
  if (!el) { return; }

  if (hidden) {
    if (el.className.indexOf("hidden") === -1) {
      el.className = (el.className + " hidden").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
    }
  } else {
    el.className = el.className.replace(/\bhidden\b/g, "").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
  }
}

function hasClass(el, cls) {
  if (!el) { return false; }
  return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}

function addClass(el, cls) {
  if (!el) { return; }
  if (!hasClass(el, cls)) {
    el.className = (el.className + " " + cls).replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
  }
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

function difficultyStars(n) {
  var s = "";
  var i;

  for (i = 0; i < 3; i++) {
    if (i < n) {
      s += "★";
    } else {
      s += "☆";
    }
  }

  return s;
}

/* -----------------------------------------
   Presentation Start
----------------------------------------- */
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

/* -----------------------------------------
   Menu Drawer
----------------------------------------- */
function openMenu() {
  setHidden($("menuOverlay"), false);
  setHidden($("menuDrawer"), false);
}

function closeMenu() {
  setHidden($("menuOverlay"), true);
  setHidden($("menuDrawer"), true);
}

/* -----------------------------------------
   Routing
----------------------------------------- */
function normalizeHash() {
  var h = window.location.hash || "#home";
  h = h.replace("#", "");

  if (h === "") {
    h = "home";
  }

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

  if (routeName === "home") { setActiveDrawer("home"); }
  if (routeName === "quiz") { setActiveDrawer("quiz"); }
  if (routeName === "monsters") { setActiveDrawer("monsters"); }
  if (routeName === "gold") { setActiveDrawer("gold"); }

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
    return;
  }

  if (routeName === "home") {
    showOnlyRoute("home");
    pushRoute("home");
    setMainScreen("landing");
    return;
  }

  showOnlyRoute(routeName);
  pushRoute(routeName);
}

/* -----------------------------------------
   Main Screen Switching
----------------------------------------- */
function setMainScreen(name) {
  currentMainScreen = name;

  setHidden($("landingScreen"), name !== "landing");
  setHidden($("quizScreen"), name !== "quiz");
  setHidden($("resultScreen"), name !== "result");

  if (name === "quiz") {
    renderQuiz();
  }

  if (name === "result") {
    renderResult();
  }
}

/* -----------------------------------------
   Quiz Logic
----------------------------------------- */
function resetQuiz() {
  quizIndex = 0;
  quizAnswers = {};
  checkedItems = {};
}

function renderQuiz() {
  var total = QUESTIONS.length;
  var q = QUESTIONS[quizIndex];
  var wrap = $("quizOptions");
  var i;

  if (!q || !wrap) { return; }

  $("quizQuestion").innerHTML = q.question;
  $("quizMetaLeft").innerHTML = "Question " + (quizIndex + 1) + " of " + total;

  var progress = Math.round(((quizIndex + 1) / total) * 100);
  $("quizMetaRight").innerHTML = progress + "%";
  $("progressBar").style.width = progress + "%";

  if (quizIndex === total - 1) {
    $("btnQuizNextText").innerHTML = "Finish";
  } else {
    $("btnQuizNextText").innerHTML = "Next Question";
  }

  wrap.innerHTML = "";

  for (i = 0; i < q.options.length; i++) {
    var opt = q.options[i];

    var btn = document.createElement("button");
    btn.className = "option";
    btn.setAttribute("type", "button");
    btn.setAttribute("data-id", opt.id);

    if (quizAnswers[q.id] === opt.id) {
      addClass(btn, "isSelected");
    }

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

    btn.appendChild(glow);
    btn.appendChild(row);

    btn.onclick = function() {
      selectOption(q.id, this.getAttribute("data-id"));
    };

    wrap.appendChild(btn);
  }

  setHidden($("quizError"), true);
}

function selectOption(questionId, answerId) {
  quizAnswers[questionId] = answerId;
  renderQuiz();
}

function quizNext() {
  var q = QUESTIONS[quizIndex];

  if (!quizAnswers[q.id]) {
    setHidden($("quizError"), false);
    return;
  }

  if (quizIndex < QUESTIONS.length - 1) {
    quizIndex += 1;
    renderQuiz();
  } else {
    setMainScreen("result");
  }
}

function quizPrev() {
  if (quizIndex > 0) {
    quizIndex -= 1;
    renderQuiz();
  } else {
    setMainScreen("landing");
  }
}

function getRecommendedClass() {
  var scores = {
    fighter: 0,
    rogue: 0,
    ranger: 0,
    cleric: 0,
    wizard: 0
  };

  var i;
  for (i = 0; i < QUESTIONS.length; i++) {
    var qid = QUESTIONS[i].id;
    var ans = quizAnswers[qid];
    if (ans && scores.hasOwnProperty(ans)) {
      scores[ans] += 1;
    }
  }

  var winner = "fighter";
  var best = -1;
  var key;

  for (key in scores) {
    if (scores.hasOwnProperty(key)) {
      if (scores[key] > best) {
        best = scores[key];
        winner = key;
      }
    }
  }

  return winner;
}

/* -----------------------------------------
   Result Page
----------------------------------------- */
function renderResult() {
  var id = getRecommendedClass();
  var data = CLASSES[id];
  var reasonList;
  var i;

  if (!data) { return; }

  $("resultIcon").innerHTML = data.iconText;
  $("resultIcon").style.color = data.color;

  $("resultName").innerHTML = data.name;
  $("resultName").style.color = data.color;

  $("resultDifficulty").innerHTML = difficultyStars(data.difficulty);
  $("resultSynergy").innerHTML = data.teamSynergy;
  $("resultDesc").innerHTML = data.description;

  if ($("resultSummary")) {
    $("resultSummary").innerHTML = data.summary;
  }

  if ($("resultTagline")) {
    $("resultTagline").innerHTML = data.tagline;
  }

  if ($("resultStarterTip")) {
    $("resultStarterTip").innerHTML = data.starterTip;
  }

  if ($("resultImage")) {
    $("resultImage").src = data.image;
    $("resultImage").alt = data.name + " class image";
  }

  reasonList = $("resultReasons");
  if (reasonList) {
    reasonList.innerHTML = "";

    for (i = 0; i < data.reasons.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = data.reasons[i];
      reasonList.appendChild(li);
    }
  }

  renderChecklist();
}

function renderChecklist() {
  var wrap = $("checklistItems");
  var doneCount = 0;
  var i;

  if (!wrap) { return; }

  wrap.innerHTML = "";

  for (i = 0; i < CHECKLIST_ITEMS.length; i++) {
    var item = CHECKLIST_ITEMS[i];

    var row = document.createElement("label");
    row.className = "check";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!checkedItems[item.id];
    input.setAttribute("data-id", item.id);

    input.onchange = function() {
      var id = this.getAttribute("data-id");
      checkedItems[id] = this.checked;
      renderChecklist();
    };

    var box = document.createElement("span");
    box.className = "check__box";
    box.innerHTML = input.checked ? "✓" : "";

    var text = document.createElement("span");
    text.className = "check__text";
    text.innerHTML = item.text;

    if (input.checked) {
      doneCount += 1;
    }

    row.appendChild(input);
    row.appendChild(box);
    row.appendChild(text);
    wrap.appendChild(row);
  }

  if ($("checklistSuccess")) {
    setHidden($("checklistSuccess"), doneCount !== CHECKLIST_ITEMS.length);
  }
}

/* -----------------------------------------
   Monster Page
   Videos are now smaller by using a class.
----------------------------------------- */
function renderMonsters() {
  renderCombatGroup("monsterList", MONSTERS, false);
  renderCombatGroup("bossList", BOSSES, true);
}

function renderCombatGroup(containerId, dataList, isBoss) {
  var wrap = $(containerId);
  var i, j;

  if (!wrap) { return; }

  wrap.innerHTML = "";

  for (i = 0; i < dataList.length; i++) {
    var m = dataList[i];

    var card = document.createElement("div");
    card.className = isBoss ? "monsterCard monsterCard--boss" : "monsterCard";

    var media = document.createElement("div");
    media.className = "monsterCard__media";

    var video = document.createElement("video");
    video.className = isBoss ? "monsterCard__video monsterCard__video--boss" : "monsterCard__video monsterCard__video--small";
    video.controls = true;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    var source = document.createElement("source");
    source.src = m.video;
    source.type = "video/mp4";
    video.appendChild(source);

    media.appendChild(video);

    var body = document.createElement("div");
    body.className = "monsterCard__body";

    var title = document.createElement("h3");
    title.className = "monsterCard__title";
    title.innerHTML = m.iconText + " " + m.name;

    var diff = document.createElement("div");
    diff.className = "monsterCard__difficulty";
    diff.innerHTML = "Difficulty " + difficultyStars(m.difficulty);

    var label = document.createElement("div");
    label.className = "monsterCard__label";
    label.innerHTML = isBoss ? "Boss strategy" : "How to handle it";

    var ul = document.createElement("ul");
    ul.className = "monsterCard__tips";

    for (j = 0; j < m.tips.length; j++) {
      var li = document.createElement("li");
      li.innerHTML = m.tips[j];
      ul.appendChild(li);
    }

    body.appendChild(title);
    body.appendChild(diff);
    body.appendChild(label);
    body.appendChild(ul);

    card.appendChild(media);
    card.appendChild(body);
    wrap.appendChild(card);
  }
}

/* -----------------------------------------
   Gold Guide Page
----------------------------------------- */
function renderGold() {
  var wrap = $("goldGuideGrid");
  var i, j;

  if (!wrap) { return; }

  wrap.innerHTML = "";

  for (i = 0; i < GOLD_GUIDE.length; i++) {
    var g = GOLD_GUIDE[i];

    var card = document.createElement("div");
    card.className = "goldCard";

    var media = document.createElement("div");
    media.className = "goldCard__media";

    var img = document.createElement("img");
    img.className = "goldCard__img";
    img.src = g.image;
    img.alt = g.title;

    media.appendChild(img);

    var body = document.createElement("div");
    body.className = "goldCard__body";

    var title = document.createElement("h3");
    title.className = "goldCard__title";
    title.innerHTML = g.title;

    var text = document.createElement("p");
    text.className = "goldCard__text";
    text.innerHTML = g.text;

    var ul = document.createElement("ul");
    ul.className = "goldCard__list";

    for (j = 0; j < g.bullets.length; j++) {
      var li = document.createElement("li");
      li.innerHTML = g.bullets[j];
      ul.appendChild(li);
    }

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(ul);

    card.appendChild(media);
    card.appendChild(body);
    wrap.appendChild(card);
  }

  renderGoldUseSection();
}

function renderGoldUseSection() {
  var wrap = $("goldGuideGrid");
  if (!wrap) { return; }

  var card = document.createElement("div");
  card.className = "goldCard goldCard--wide";

  var body = document.createElement("div");
  body.className = "goldCard__body";

  var title = document.createElement("h3");
  title.className = "goldCard__title";
  title.innerHTML = "Use Gold to Upgrade Your Kit";

  var text = document.createElement("p");
  text.className = "goldCard__text";
  text.innerHTML = "Once you have enough gold, you can go back to the Marketplace and buy better gear for your next run. This helps you enter the dungeon with a stronger kit instead of relying only on random drops.";

  var ul = document.createElement("ul");
  ul.className = "goldCard__list";

  var points = [
    "Buy stronger armor and weapons before harder runs.",
    "Use early gold to fix weak parts of your kit.",
    "A better kit increases your survival chance and lets you snowball future runs."
  ];

  var i;
  for (i = 0; i < points.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = points[i];
    ul.appendChild(li);
  }

  body.appendChild(title);
  body.appendChild(text);
  body.appendChild(ul);

  card.appendChild(body);
  wrap.appendChild(card);
}

/* -----------------------------------------
   Class Selection Page
----------------------------------------- */
function renderClassSelection() {
  var wrap = $("classGrid");
  var i, j;

  if (!wrap) { return; }

  wrap.innerHTML = "";

  for (i = 0; i < ALL_CLASSES.length; i++) {
    var c = ALL_CLASSES[i];

    var btn = document.createElement("button");
    btn.className = "classCard";
    btn.setAttribute("type", "button");
    btn.setAttribute("data-class", c.id);

    btn.onclick = function() {
      openClassModal(this.getAttribute("data-class"));
    };

    var img = document.createElement("img");
    img.className = "classCard__img";
    img.src = c.image;
    img.alt = c.name + " class art";

    var body = document.createElement("div");
    body.className = "classCard__body";

    var top = document.createElement("div");
    top.className = "classCard__top";

    var name = document.createElement("div");
    name.className = "classCard__name";
    name.style.color = c.color;
    name.innerHTML = c.name;

    var role = document.createElement("div");
    role.className = "classCard__role";
    role.innerHTML = c.role;

    top.appendChild(name);
    top.appendChild(role);

    var desc = document.createElement("div");
    desc.className = "classCard__desc";
    desc.innerHTML = c.description;

    var meta = document.createElement("div");
    meta.className = "classCard__meta";

    var diff = document.createElement("span");
    diff.className = "pill";
    diff.innerHTML = "Difficulty " + difficultyStars(c.difficulty);

    var syn = document.createElement("span");
    syn.className = "pill";
    syn.innerHTML = "Works well with " + c.teamSynergy;

    meta.appendChild(diff);
    meta.appendChild(syn);

    var strengths = document.createElement("div");
    strengths.className = "classCard__strengths";

    for (j = 0; j < c.strengths.length; j++) {
      var tag = document.createElement("span");
      tag.className = "miniTag";
      tag.innerHTML = c.strengths[j];
      strengths.appendChild(tag);
    }

    var preview = document.createElement("div");
    preview.className = "classCard__preview";
    preview.innerHTML = "Click for more details";

    body.appendChild(top);
    body.appendChild(desc);
    body.appendChild(meta);
    body.appendChild(strengths);
    body.appendChild(preview);

    btn.appendChild(img);
    btn.appendChild(body);
    wrap.appendChild(btn);
  }
}

/* -----------------------------------------
   Class Modal
----------------------------------------- */
function getClassById(id) {
  if (CLASSES[id]) {
    return CLASSES[id];
  }
  return CLASSES.fighter;
}

function openClassModal(id) {
  var data = getClassById(id);
  var list = $("classModalReasons");
  var strengths = $("classModalStrengths");
  var classData = null;
  var i;

  if (!data) { return; }

  if ($("classModalImage")) {
    $("classModalImage").src = data.image;
    $("classModalImage").alt = data.name + " class preview";
  }

  if ($("classModalRole")) {
    $("classModalRole").innerHTML = data.name + " • " + data.teamSynergy;
  }

  if ($("classModalName")) {
    $("classModalName").innerHTML = data.name;
    $("classModalName").style.color = data.color;
  }

  if ($("classModalDesc")) {
    $("classModalDesc").innerHTML = data.description;
  }

  if ($("classModalCaution")) {
    $("classModalCaution").innerHTML = data.caution;
  }

  if (list) {
    list.innerHTML = "";
    for (i = 0; i < data.reasons.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = data.reasons[i];
      list.appendChild(li);
    }
  }

  for (i = 0; i < ALL_CLASSES.length; i++) {
    if (ALL_CLASSES[i].id === id) {
      classData = ALL_CLASSES[i];
    }
  }

  if (strengths) {
    strengths.innerHTML = "";
    if (classData && classData.strengths) {
      for (i = 0; i < classData.strengths.length; i++) {
        var pill = document.createElement("span");
        pill.className = "pill";
        pill.innerHTML = classData.strengths[i];
        strengths.appendChild(pill);
      }
    }
  }

  setHidden($("classModal"), false);
  if ($("classModal")) {
    $("classModal").setAttribute("aria-hidden", "false");
  }
  addClass(document.body, "body--locked");
}

function closeClassModal() {
  setHidden($("classModal"), true);
  if ($("classModal")) {
    $("classModal").setAttribute("aria-hidden", "true");
  }
  removeClass(document.body, "body--locked");
}

/* -----------------------------------------
   Artifact Page
   Only show image + name first.
   Clicking a card opens detailed info modal.
----------------------------------------- */
function renderArtifacts() {
  var wrap = $("artifactGrid");
  var i;

  if (!wrap) { return; }

  wrap.innerHTML = "";

  for (i = 0; i < ARTIFACTS.length; i++) {
    var a = ARTIFACTS[i];

    var card = document.createElement("button");
    card.className = "artifactThumb";
    card.setAttribute("type", "button");
    card.setAttribute("data-artifact-id", a.id);

    card.onclick = function() {
      openArtifactModal(parseInt(this.getAttribute("data-artifact-id"), 10));
    };

    var imgWrap = document.createElement("div");
    imgWrap.className = "artifactThumb__media";

    var img = document.createElement("img");
    img.className = "artifactThumb__img";
    img.src = a.image;
    img.alt = a.name + " image";

    var name = document.createElement("div");
    name.className = "artifactThumb__name";
    name.innerHTML = a.name;

    imgWrap.appendChild(img);
    card.appendChild(imgWrap);
    card.appendChild(name);

    wrap.appendChild(card);
  }
}

function getArtifactById(id) {
  var i;
  for (i = 0; i < ARTIFACTS.length; i++) {
    if (ARTIFACTS[i].id === id) {
      return ARTIFACTS[i];
    }
  }
  return null;
}

function openArtifactModal(id) {
  var data = getArtifactById(id);
  var statsWrap;
  var k;

  if (!data) { return; }

  if ($("artifactModalImage")) {
    $("artifactModalImage").src = data.image;
    $("artifactModalImage").alt = data.name + " image";
  }

  if ($("artifactModalName")) {
    $("artifactModalName").innerHTML = data.name;
    $("artifactModalName").style.color = "#ef4444";
  }

  if ($("artifactModalType")) {
    $("artifactModalType").innerHTML = data.type + " • " + data.rarity;
  }

  if ($("artifactModalEffect")) {
    $("artifactModalEffect").innerHTML = data.effect;
  }

  if ($("artifactModalLore")) {
    $("artifactModalLore").innerHTML = data.story;
  }

  if ($("artifactModalClass")) {
    $("artifactModalClass").innerHTML = data.weaponClass;
  }

  if ($("artifactModalHand")) {
    $("artifactModalHand").innerHTML = data.handType;
  }

  if ($("artifactModalDroppedBy")) {
    $("artifactModalDroppedBy").innerHTML = data.droppedBy;
  }

  if ($("artifactModalLocation")) {
    $("artifactModalLocation").innerHTML = data.location;
  }

  statsWrap = $("artifactModalStats");
  if (statsWrap) {
    statsWrap.innerHTML = "";

    for (k in data.stats) {
      if (data.stats.hasOwnProperty(k)) {
        var row = document.createElement("div");
        row.className = "kv__row";

        var kk = document.createElement("div");
        kk.className = "kv__k";
        kk.innerHTML = k;

        var vv = document.createElement("div");
        vv.className = "kv__v";
        vv.innerHTML = data.stats[k];

        row.appendChild(kk);
        row.appendChild(vv);
        statsWrap.appendChild(row);
      }
    }
  }

  setHidden($("artifactModal"), false);
  if ($("artifactModal")) {
    $("artifactModal").setAttribute("aria-hidden", "false");
  }
  addClass(document.body, "body--locked");
}

function closeArtifactModal() {
  setHidden($("artifactModal"), true);
  if ($("artifactModal")) {
    $("artifactModal").setAttribute("aria-hidden", "true");
  }
  removeClass(document.body, "body--locked");
}

/* -----------------------------------------
   Mechanics Page
----------------------------------------- */
function renderMechanics() {
  var wrap = $("mechanicsGrid");
  var i, j;

  if (!wrap) { return; }

  wrap.innerHTML = "";

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
        var row1 = document.createElement("div");
        row1.className = "kv__row";

        var k1 = document.createElement("div");
        k1.className = "kv__k";
        k1.innerHTML = t.name;

        var v1 = document.createElement("div");
        v1.className = "kv__v";
        v1.innerHTML = t.desc;

        row1.appendChild(k1);
        row1.appendChild(v1);
        typesWrap.appendChild(row1);
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

/* -----------------------------------------
   Global Click Bindings
----------------------------------------- */
function bindGlobalClicks() {
  if ($("btnStartPrototype")) {
    $("btnStartPrototype").onclick = startPrototype;
  }

  if ($("btnMenu")) {
    $("btnMenu").onclick = function() {
      if (hasClass($("menuDrawer"), "hidden")) {
        openMenu();
      } else {
        closeMenu();
      }
    };
  }

  if ($("menuOverlay")) {
    $("menuOverlay").onclick = closeMenu;
  }

  if ($("btnBack")) {
    $("btnBack").onclick = goBack;
  }

  if ($("btnFindClass")) {
    $("btnFindClass").onclick = function() {
      setMainScreen("quiz");
    };
  }

  if ($("btnSkipQuiz")) {
    $("btnSkipQuiz").onclick = function() {
      setMainScreen("result");
    };
  }

  if ($("btnQuizBack")) {
    $("btnQuizBack").onclick = quizPrev;
  }

  if ($("btnQuizNext")) {
    $("btnQuizNext").onclick = quizNext;
  }

  if ($("btnRetake")) {
    $("btnRetake").onclick = function() {
      resetQuiz();
      setMainScreen("quiz");
    };
  }

  if ($("btnHome")) {
    $("btnHome").onclick = function() {
      setMainScreen("landing");
    };
  }

  if ($("btnCloseClassModal")) {
    $("btnCloseClassModal").onclick = closeClassModal;
  }

  if ($("classModalOverlay")) {
    $("classModalOverlay").onclick = closeClassModal;
  }

  if ($("btnCloseArtifactModal")) {
    $("btnCloseArtifactModal").onclick = closeArtifactModal;
  }

  if ($("artifactModalOverlay")) {
    $("artifactModalOverlay").onclick = closeArtifactModal;
  }

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

/* -----------------------------------------
   Initialize App
----------------------------------------- */
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

  document.onkeydown = function(e) {
    if (e.key === "Escape") {
      closeClassModal();
      closeArtifactModal();
    }
  };
}

init();