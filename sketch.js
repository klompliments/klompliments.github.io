let komplimenteImg, funfactsImg, retryImg, kategorieImg;
let ladenGif, hg;

let komplimente1, komplimente2, funfacts1, funfacts2, retry1, retry2, kategorieGif;
let komplimenteImages = [];
let funfactsImages = [];

let komplimentePool = [];
let funfactsPool = [];

let currentScreen = "menu";
let selectedCategory = "";
let showImage;
let timerStart = 0;
let lastKomplimentIndex = -1;
let lastFunfactIndex = -1;

function preload() {
  komplimente1 = loadImage("komplimente1.gif");
  komplimente2 = loadImage("komplimente2.gif");
  funfacts1 = loadImage("funfacts1.gif");
  funfacts2 = loadImage("funfacts2.gif");
  retry1 = loadImage("retry1.gif");
  retry2 = loadImage("retry2.gif");
  kategorieGif = loadImage("kategorie.gif");

  ladenGif = loadImage("laden.gif");
  hg = loadImage("hg.png");

  komplimenteImages = [
    loadImage("kompliment_1.png"),
    loadImage("kompliment_2.png"),
    loadImage("kompliment_3.png"),
    loadImage("kompliment_4.png"),
    loadImage("kompliment_5.png"),
    loadImage("kompliment_6.png"),
    loadImage("kompliment_7.png"),
    loadImage("kompliment_8.png"),
    loadImage("kompliment_9.png"),
    loadImage("kompliment_10.png"),
    loadImage("kompliment_11.png"),
    loadImage("kompliment_12.png")
  ];

  funfactsImages = [
    loadImage("funfact_1.png"),
    loadImage("funfact_2.png"),
    loadImage("funfact_3.png"),
    loadImage("funfact_4.png"),
    loadImage("funfact_5.png"),
    loadImage("funfact_6.png"),
    loadImage("funfact_7.png"),
    loadImage("funfact_8.png"),
    loadImage("funfact_9.png"),
    loadImage("funfact_10.png"),
    loadImage("funfact_11.png"),
    loadImage("funfact_12.png")
  ];
}

function setup() {
  createCanvas(720, 1420);
  imageMode(CENTER);

  komplimentePool = createShuffledPool(komplimenteImages);
  funfactsPool = createShuffledPool(funfactsImages);

  kategorieImg = createImg("kategorie.gif", "kategorie");
  kategorieImg.position(width / 2 - 200, 180);

  komplimenteImg = createImg("komplimente1.gif", "komplimente");
  komplimenteImg.position(width / 2 - 200, 500);
  komplimenteImg.size(400, 150);
  komplimenteImg.mousePressed(() => {
    komplimenteImg.attribute("src", "komplimente2.gif");
    setTimeout(() => {
      selectedCategory = "komplimente";
      startLoading();
    }, 1000);
  });

  funfactsImg = createImg("funfacts1.gif", "funfacts");
  funfactsImg.position(width / 2 - 200, 700);
  funfactsImg.size(400, 150);
  funfactsImg.mousePressed(() => {
    funfactsImg.attribute("src", "funfacts2.gif");
    setTimeout(() => {
      selectedCategory = "funfacts";
      startLoading();
    }, 1000);
  });

  retryImg = createImg("retry1.gif", "retry");
  retryImg.position(width / 2 - 200, 1280);
  retryImg.size(400, 100);
  retryImg.hide();
  retryImg.mousePressed(() => {
    retryImg.attribute("src", "retry2.gif");
    setTimeout(() => {
      resetToMenu();
    }, 1000);
  });
}

function createShuffledPool(imagesArray) {
  let indices = [];
  for (let i = 0; i < imagesArray.length; i++) {
    indices.push(i);
  }
  return shuffle(indices);
}

function getNextFromPool(pool, imagesArray, lastIndexRef) {
  if (pool.length === 0) {
    // Neu mischen, aber aktuelles letztes Bild nicht an erster Stelle
    let newPool;
    do {
      newPool = createShuffledPool(imagesArray);
    } while (newPool[0] === lastIndexRef.value);
    pool.push(...newPool);
  }
  const index = pool.shift();
  lastIndexRef.value = index;
  return imagesArray[index];
}

function startLoading() {
  currentScreen = "loading";
  timerStart = millis();
  showImage = null;

  komplimenteImg.hide();
  funfactsImg.hide();
  kategorieImg.hide();
  retryImg.hide();
}

function showResult() {
  currentScreen = "result";

  if (selectedCategory === "komplimente") {
    showImage = getNextFromPool(komplimentePool, komplimenteImages, { value: lastKomplimentIndex });
    lastKomplimentIndex = komplimenteImages.indexOf(showImage);
  } else {
    showImage = getNextFromPool(funfactsPool, funfactsImages, { value: lastFunfactIndex });
    lastFunfactIndex = funfactsImages.indexOf(showImage);
  }

  retryImg.attribute("src", "retry1.gif");
  retryImg.show();
}

function resetToMenu() {
  currentScreen = "menu";
  selectedCategory = "";
  showImage = null;

  komplimenteImg.attribute("src", "komplimente1.gif");
  funfactsImg.attribute("src", "funfacts1.gif");
  komplimenteImg.show();
  funfactsImg.show();
  kategorieImg.show();
  retryImg.hide();
}

function draw() {
  background(255);
  image(hg, width / 2, height / 2, width, height);

  if (currentScreen === "loading") {
    image(ladenGif, width / 2, height / 2);
    if (millis() - timerStart > 3000) {
      showResult();
    }
  } else if (currentScreen === "result") {
    if (showImage) {
      image(showImage, width / 2, height / 2, width, height);
    }
  }
}
