/* The Squirrel Squad: fact machine and quiz */

var FACTS = [
  "A group of squirrels is called a scurry.",
  "Squirrels plant forests by accident. They bury thousands of nuts and forget where some of them are, and those grow into trees.",
  "A chipmunk can carry up to 9 nuts at once: 4 in each cheek pouch and one held in its teeth.",
  "The fox squirrel is the biggest tree squirrel in North America, weighing up to 3 pounds.",
  "Flying squirrels do not fly. They glide on furry skin flaps, soaring up to 150 feet between trees.",
  "Prairie dog towns can hold up to a million prairie dogs.",
  "Prairie dogs have different alarm barks for different predators: one call for hawks and another for coyotes.",
  "A groundhog is one of 14 marmot species. It is also called a woodchuck.",
  "Groundhog Day is February 2. Legend says if the groundhog sees its shadow, winter lasts six more weeks.",
  "A red squirrel can stash enough pine cones to fill a pile 15 to 18 feet wide.",
  "Red squirrels hang mushrooms on tree branches to dry, like a tiny pantry.",
  "Chipmunks do not truly hibernate. They nap through winter and wake up for snacks.",
  "A California ground squirrel waves its tail and pumps extra heat into it to warn rattlesnakes to stay away.",
  "A squirrel's front teeth never stop growing, so all that nut gnawing keeps them worn down.",
  "Baby squirrels are called kits or pups.",
  "The smallest squirrel in the squad, the chipmunk, can gather up to 165 acorns in a single day."
];

var QUIZ = [
  {
    q: "Pick your favorite place to hang out:",
    a: [
      ["High in the treetops", "tree"],
      ["A cozy underground burrow", "burrow"],
      ["Soaring through the night air", "glide"],
      ["A warm, sunny meadow", "nap"]
    ]
  },
  {
    q: "Pick the perfect snack:",
    a: [
      ["Crunchy acorns", "tree"],
      ["Fresh green grass", "burrow"],
      ["Mushrooms and truffles", "glide"],
      ["Sweet clover and flowers", "nap"]
    ]
  },
  {
    q: "On a cold day you would:",
    a: [
      ["Stay busy all winter long", "tree"],
      ["Chat with a million neighbors", "burrow"],
      ["Cuddle with friends to stay warm", "glide"],
      ["Sleep through the whole season", "nap"]
    ]
  },
  {
    q: "Your best skill is:",
    a: [
      ["Climbing anything", "tree"],
      ["Digging amazing tunnels", "burrow"],
      ["Gliding through the air", "glide"],
      ["Napping like a champion", "nap"]
    ]
  },
  {
    q: "Your perfect weekend is:",
    a: [
      ["Burying nuts for later", "tree"],
      ["Standing guard and barking warnings", "burrow"],
      ["Exploring the dark forest", "glide"],
      ["Eating until nice and round", "nap"]
    ]
  }
];

var RESULTS = {
  tree: {
    name: "Eastern Gray Squirrel",
    nick: "The Park Acrobat",
    img: "images/gray-squirrel.jpg",
    blurb: "You are clever, quick, and always planning ahead. Like the gray squirrel, you stash snacks for later and you are not afraid of a little climb. Just try to remember where you buried everything!"
  },
  burrow: {
    name: "Black-tailed Prairie Dog",
    nick: "The Town Crier",
    img: "images/prairie-dog.jpg",
    blurb: "You are social, chatty, and great at looking out for your friends. Like the prairie dog, you love your community and you always have a warning ready when trouble shows up."
  },
  glide: {
    name: "Northern Flying Squirrel",
    nick: "The Night Glider",
    img: "images/flying-squirrel.jpg",
    blurb: "You are a night owl with big dreams. Like the flying squirrel, you take the scenic route and you are not afraid to leap. You might even help a forest grow along the way."
  },
  nap: {
    name: "Groundhog",
    nick: "The Deep Sleeper",
    img: "images/groundhog.jpg",
    blurb: "You know the value of rest. Like the groundhog, you eat well, sleep deep, and wake up ready for spring. Nobody naps harder than you."
  }
};

var ORDER = ["tree", "burrow", "glide", "nap"];
var step = 0;
var scores = { tree: 0, burrow: 0, glide: 0, nap: 0 };

function showFact() {
  var el = document.getElementById("fact-text");
  var next;
  do {
    next = FACTS[Math.floor(Math.random() * FACTS.length)];
  } while (next === el.textContent && FACTS.length > 1);
  el.textContent = next;
}

function startQuiz() {
  step = 0;
  scores = { tree: 0, burrow: 0, glide: 0, nap: 0 };
  document.getElementById("quiz-start").hidden = true;
  document.getElementById("quiz-result").hidden = true;
  document.getElementById("quiz-play").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  var item = QUIZ[step];
  document.getElementById("quiz-progress").textContent =
    "Question " + (step + 1) + " of " + QUIZ.length;
  document.getElementById("quiz-q").textContent = item.q;
  var box = document.getElementById("quiz-answers");
  box.innerHTML = "";
  item.a.forEach(function (opt) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = opt[0];
    btn.addEventListener("click", function () {
      scores[opt[1]] += 1;
      step += 1;
      if (step < QUIZ.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });
    box.appendChild(btn);
  });
}

function showResult() {
  var best = ORDER[0];
  ORDER.forEach(function (key) {
    if (scores[key] > scores[best]) {
      best = key;
    }
  });
  var r = RESULTS[best];
  var img = document.getElementById("quiz-img");
  img.src = r.img;
  img.alt = "Cartoon illustration of a " + r.name.toLowerCase();
  document.getElementById("quiz-name").textContent = "You are a " + r.name + "!";
  document.getElementById("quiz-nick").textContent = r.nick;
  document.getElementById("quiz-blurb").textContent = r.blurb;
  document.getElementById("quiz-play").hidden = true;
  document.getElementById("quiz-result").hidden = false;
}

document.getElementById("fact-btn").addEventListener("click", showFact);
document.getElementById("quiz-start-btn").addEventListener("click", startQuiz);
document.getElementById("quiz-again").addEventListener("click", startQuiz);
