document.addEventListener('DOMContentLoaded', function() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    tg.expand();
    tg.MainButton.setText("🍦 MENU");
    tg.MainButton.onClick(() => {
      tg.openLink("https://arzonbozor-muzqaymoq.vercel.app"); 
    });

    tg.MainButton.show();
    console.log("Telegram WebApp initialized!"); 
  } else {
    console.error("Telegram WebApp not detected!");
  }

  loadIceCreamData();
});





// ============ SUPABASE CONFIGURATION ============

const SUPABASE_URL = 'https://duhauvyhekixzaxvbgze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aGF1dnloZWtpeHpheHZiZ3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg2NjksImV4cCI6MjA4NDQ3NDY2OX0.ytteNJ0FFjA_2pl-1bguTBASJVtkyRa8zPQdLb4eX38';


let icBrands = {};

 async function loadIceCreamData() {
  console.log('🔄 Loading ice cream data from Supabase...');

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`,  {  
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    console.log('📡 Supabase response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const products = await response.json();
    console.log('📊 Products fetched:', products.length);

    if (!products || products.length == 0) {
      console.warn('⚠️ No products returned from Supabase');
      showEmptyState();
      return;
    }



    // Transform Supabase data to match your structure
    const transformedProducts = products.map(product => ({
      name: product.name,
      gram: product.gram,
      price: product.price,
      img: product.img,
      viewImg: product.viewimg,      
      id: product.id,
      boxNum: product.boxnum,       
      galleryName: product.galleryname, 
      brand: product.brand          
    }));

    console.log('Transformed products:', transformedProducts.length);
    
    
    icBrands = groupProductsByBrand(transformedProducts);
    console.log('🏷️ Brands with data:', Object.keys(icBrands).filter(brand => icBrands[brand].products.length > 0));
    initApp();

  } catch (error) {
    console.error('❌ Error loading data:', error);
    showErrorMessage(error.message);
  }
}


// ============ GROUP PRODUCTS BY BRAND ============
function groupProductsByBrand(products) {
  console.log('📦 Grouping', products.length, 'products by brand...');

  const brandStructure = {
    dairy: { title: "DAIRY CLASSIC", products: [] },
    icegold: { title: "Ice & GolD", products: [] },
    muzqaymoqlar: { title: "Muzqaymoqlar", products: [] },
    naturel: { title: "Naturel", products: [] },
    sodiqSavdo: { title: "Sodiq Savdo", products: [] },
    zarli: { title: "Zarli", products: [] },
    korovka: { title: "Коровка из Кореновки", products: [] },
    bahroma: { title: "Bahroma", products: [] },
    svitlogore: { title: "Свитлогорье", products: [] }
  };
  
  let groupedCount = 0;
  let unknownBrands = 0;

  // Group products into their brands
  products.forEach(product => {
    if (brandStructure[product.brand]) {
      brandStructure[product.brand].products.push(product);
      groupedCount++;
    } else {
      console.warn(`❓ Product "${product.name}" (ID: ${product.id}) has unknown brand: "${product.brand}"`);
      unknownBrands++;
    }
  });

  console.log(`📊 Grouped ${groupedCount} products, ${unknownBrands} with unknown brands`);

   // Log each brand's product count
  Object.entries(brandStructure).forEach(([brandKey, brandData]) => {
    if (brandData.products.length > 0) {
      console.log(`${brandData.title}: ${brandData.products.length} products`);
    }
  });
  
  return brandStructure;
}


function showEmptyState() {
  console.log('🔄 Showing empty state to user');

}

function showErrorMessage(errorMsg) {
  console.log('🔄 Showing error message to user:', errorMsg);
}



/*
function loadFallbackData() {
  console.log('Loading fallback data...');

 icBrands = {
  dairy: {
      title: "DAIRY CLASSIC",
      products: [  
          { name: "Vega <br>", gram: "102gr", price: "6 300 UZS", img: "img/vega.jpg", viewImg: ["img/view/vega1.webp", "img/view/vega2.webp"], id: "vega", boxNum: "40", galleryName: "Yong'oqlar bilan bezalgan shokolad qoplamali vega plombir"},
          { name: "SuperChoc <br>", gram: "102gr", price: "6 130 UZS", img: "img/superChock.jpg", viewImg: ["img/view/superchock1.webp", "img/view/superchock2.webp"], id: "superChock", boxNum: "40", galleryName: "Yong'oqlar bilan bezalgan shokolad qoplamali, ichi ham kofeyniy shokoladli muzqaymoq" },
          { name: "Sandwich <br>", gram: "106gr", price: "9 200 UZS", img: "img/sandwich.jpg", viewImg: ["img/view/sandwich1.webp", "img/view/sandwich2.webp"], id: "sandwich", boxNum: "40", galleryName: "Classic Sandwich" },
          { name: "Bricket <br>", gram: "140gr", price: "14 500 UZS", img: "img/bricket.jpg", viewImg: ["img/view/bricket1.webp", "img/view/bricket2.webp"], id: "bricket", boxNum: "40", galleryName: "Super Bricket" },
          { name: "Konus Super Twist", gram: "70gr", price: "5 000 UZS", img: "img/konusTwist.jpg", viewImg: ["img/view/konusTwist1.webp", "img/view/konusTwist2.webp"], id: "konusTwist", boxNum: "45", galleryName: "Super Twist" },
          { name: "Konus Shokoladli", gram: "70gr", price: "5 000 UZS", img: "img/konusChock.jpg", viewImg: ["img/view/konusChoco1.webp", "img/view/konusChoco2.webp"], id: "konusChock", boxNum: "45", galleryName: "Choco Boom"  },
          { name: "New Classic <br>", gram: "102gr", price: "5 950 UZS", img: "img/classic.jpg", viewImg: ["img/view/classic1.webp", "img/view/classic2.webp"], id: "classic", boxNum: "40", galleryName: "New Classic Plombir Muzqaymoq"  },
          { name: "Кофе Мокко <br>", gram: "69gr", price: "3 600 UZS", img: "img/kofeMokko.jpg", viewImg: ["img/view/kofeMokko1.webp"], id: "kofeMokko", boxNum: "60", galleryName: "Кофе Мокко"  },
          { name: "Звездочет <br>", gram: "69gr", price: "3 280 UZS", img: "img/zvezdachet.jpg", viewImg: ["img/view/zvezdachet1.webp"], id: "zvezdachet", boxNum: "60", galleryName: "Звездочет- shokoladli eskimo plombir" },
          { name: "Tiger King <br>", gram: "90gr", price: "3 500 UZS", img: "img/tigerKing.jpg", viewImg: ["img/view/tigerKing1.webp"], id: "tigerKing", boxNum: "60", galleryName: "Kivi va nok ta'mli muz" },
          { name: "Royal Fruits <br>", gram: "90gr", price: "3 500 UZS", img: "img/royalFruits.jpg", viewImg: ["img/view/royalFruits1.jpg"], id: "royalFruits", boxNum: "60", galleryName: "Ananas va Apelsin ta'mli muz" },
          { name: "Creamica <br>", gram: "80gr", price: "5 500 UZS", img: "img/creamica.jpg", viewImg: ["img/view/creamica1.webp", "img/view/creamica2.webp"], id: "creamica", boxNum: "36", galleryName: "Shokolad qoplamali va yong'oqli plombir" },
      ]
  },
  icegold: {
      title: "Ice & GolD",
      products: [
          { name: "Настоящий Пломбир", gram: "100gr", price: "4 380 UZS", img: "img/nastPlombir.jpg", viewImg: ["img/view/nastPlombir1.webp", "img/view/nastPlombir2.jpg"], id: "nastPlombir", boxNum: "40", galleryName: "Настоящий Пломбир - bolalikdagi haqiqiy plombir lazzatini hadya etadi."},
          { name: "Настоящий shokoladli", gram: "100gr", price: "5 400 UZS", img: "img/nastShok.jpg", viewImg: ["img/view/nastShok1.webp"], id: "nastShok", boxNum: "40", galleryName: "Shokolad qoplamali haqiqiy plombir."},
          { name: "Как раньше <br>", gram: "100gr", price: "4 380 UZS", img: "img/kakRanshe.jpg", viewImg: ["img/view/kakRanshe1.jpg"], id: "kakRanshe", boxNum: "40", galleryName: "Kofe ta'mli plombir muzqaymoq."},
          { name: "Ленинградское", gram: "70gr", price: "4 380 UZS", img: "img/leningrad.jpg", viewImg: ["img/view/leningrad1.webp", "img/view/leningrad2.jpg"], id: "leningrad", boxNum: "40", galleryName: "Shokolad qoplamali plombir eskimo."},
          { name: "Газета <br>", gram: "130gr", price: "5 940 UZS", img: "img/gazeta.jpg", viewImg: ["img/view/gazeta1.jpg", "img/view/gazeta2.jpg"], id: "gazeta", boxNum: "20", galleryName: "Original Gazeta. Shirin vafelli rojok."},
          { name: "Black Star <br>", gram: "120gr", price: "5 950 UZS", img: "img/blackStar.jpg", viewImg: ["img/view/blackStar1.webp"], id: "blackStar", boxNum: "20", galleryName: "Qora vafelli o'zgacha vanil muzqaymoq."},
          { name: "Atlas <br>", gram: "85gr", price: "8 400 UZS", img: "img/atlas.jpg", viewImg: ["img/view/atlas1.webp", "img/view/atlas2.webp"], id: "atlas", boxNum: "30", galleryName: "Pechenya bo'laklari hamda Malinali jem bilan qoplangan oq shokoladli plombir muzqaymoq"},
          { name: "Батончик <br>", gram: "85gr", price: "10 500 UZS", img: "img/batonchik.jpg", viewImg: ["img/view/batonchik1.webp", "img/view/batonchik2.webp"], id: "batonchik", boxNum: "24", galleryName: "Vanil va Kofe ta'mli shokolad qoplamali batonchiklar"},
          { name: "Конус Настоящий", gram: "70gr", price: "5 000 UZS", img: "img/konusIcegold.jpg", viewImg: ["img/view/konusIcegold1.webp"], id: "konusIcegold", boxNum: "14", galleryName: "Shokolad va Yong'oqlar bilan qoplangan plombir konus muzqaymoq"},
          { name: "Pancake <br>", gram: "80gr", price: "", img: "img/pancake.jpg", viewImg: ["img/view/pancake1.jpg", "img/view/pancake2.webp"], id: "pancake", boxNum: "32", galleryName: "Kakaoli yumshoqqina pankeyk va Italiyan pechenyesi aralashtirilgan qaymoqli muzqaymoq"},
          { name: "Gold chocolate", gram: "85gr", price: "48 000 UZS", img: "img/goldChoco.jpg", viewImg: ["img/view/goldChoco1.webp", "img/view/goldChoco2.jpg"], id: "goldChoco", boxNum: "5", galleryName: "Qaymoqli va shokolad mazali, sutli shokolad bilan qoplangan muzqaymoq"},
          { name: "Gold pistachio <br>", gram: "85gr", price: "", img: "img/goldPistachio.jpg", viewImg: ["img/view/goldPistachio1.webp", "img/view/goldPistachio2.webp"], id: "goldPistachio", boxNum: "5", galleryName: "Qaymoqli va xandon pista mazali, sutli shokolad bilan qoplangan muzqaymoq"},
          { name: "Gold mini <br>", gram: "50gr", price: "30 000 UZS", img: "img/goldMini.webp", viewImg: ["img/view/goldMini1.webp", "img/view/goldMini2.webp"], id: "goldMini", boxNum: "6", galleryName: "Tabiiy malina qiyomi qo'shilgan, qaymoqli plombir, usti oq sutli shokoladga qurutilgan malina donachalari bilan qoplangan. O'zgacha dizayn, o'zgacha ta'm"},
          { name: "Gold oreo <br>", gram: "85gr", price: "", img: "img/goldOreo.webp", viewImg: ["img/view/goldOreo1.webp", "img/view/goldOreo2.webp"], id: "goldOreo", boxNum: "5", galleryName: "Oq shokolad qoplamasi ichidagi mazali plombir hamda italiyan pechenyasi bo'laklari aralashmali ajoyib muzqaymoq"},
          { name: "Kilogramlik <br>", gram: "1000gr", price: "30 000 UZS", img: "img/1000grIcegold.webp", viewImg: ["img/view/icegoldKakranshe.webp", "img/view/icegoldRoyal.webp", "img/view/icegoldGelato.webp", "img/view/icegoldSevendays.webp", "img/view/icegoldSweets.webp", "img/view/icegoldOreo.webp", "img/view/icegoldExco.webp", "img/view/icegoldExotic.webp", ], id: "paketIcegold", boxNum: "6", galleryName: "\"Как раньше\" - oq plombir <br>\"Royal\" - qahva ta'mli <br> \"Gelato\" - shokoladli qahvali plombir <br>\"Seven days\" - shokoladli oq plombir <br>\"Sweets\" - karamel va yer yong'oqli <br> \"Oreo\" - pechenyeli plombir <br> \"Эkzo\" - qulupnay jemli plombir <br> \"Exotic\" - qulupnay va apelsin ta'mli" },
          { name: "Yarim kilogram", gram: "500gr", price: "16 000 UZS", img: "img/500grIcegold.webp", viewImg: ["img/view/500grIcegold1.webp"], id: "icegold500gr", boxNum: "8", galleryName: "Ice & Gold dan yarim kilogramlik haqiqiy plombir muzqaymoqlar. Turlari: <br>- Как раньше <br>- Royal <br>- Seven days <br>- Эkzo"},
          { name: "Xitoy muzqaymoqlari", gram: "80gr", price: "", img: "img/china.webp", viewImg: ["img/view/chinaMango.webp", "img/view/chinaPeach.webp", "img/view/chinaLemon.webp", "img/view/chinaLogo.webp" ], id: "china", boxNum: "12", galleryName: "Halol va Original Xitoy muzqaymoqlari. Turlari: <br>- Mango <br>- Shaftoli <br>- Limon"}
      ]
  },
  muzqaymoqlar: {
      title: "Muzqaymoqlar",
      products: [
          { name: "Чуда <br>", gram: "80gr", price: "2 500 UZS", img: "img/chuda.webp", viewImg: ["img/view/chudaQora.webp", "img/view/chudaYashil.webp", "img/view/chudaQizil.webp"], id: "chuda", boxNum: "45", galleryName: "\"Чуда\" - usti muz, ichi qaymoq muzqaymoq. Yozgi issiqlikda haqiqiy zavq baxsh etuvchi tanlov. Turlari: <br>- Черника + Ежевика <br>- Kivi <br>- Qulupnay" },
          { name: "Kreasy max <br>", gram: "80gr", price: "3 000 UZS", img: "img/kreasy.webp", viewImg: ["img/view/kreasyKivi.webp", "img/view/kreasyOlcha.webp", "img/view/kreasyYagoda.webp"], id: "kreasyMax", boxNum: "40", galleryName: "\"Kreasy max\" - Ichidan mayin qaymoqli muzqaymoq, ustida esa tabiiy mevali muz qoplami. Turlari: <br>- Kivi <br>- Olcha <br>- O'rmon mevalari" },
          { name: "Doda <br>", gram: "140gr", price: "6 000 UZS", img: "img/doda.webp", viewImg: ["img/view/doda1.webp", "img/view/doda2.webp"], id: "doda", boxNum: "20", galleryName: "Tabiiy mevalar qiyomi bilan boyitilgan, qaymoqli va shirin rojokdagi mazali muzqaymoq. Turlari: <br>- Gilos <br>- Malina <br>- Qulupnay" },
          { name: "Grand <br>", gram: "120gr", price: "5 000 UZS", img: "img/grand.webp", viewImg: ["img/view/grand1.webp", "img/view/grand2.webp"], id: "grand", boxNum: "20", galleryName: "Usti shokoladli glazur bilan bezatilingan vafli stakanchadagi quyiltirilgan sutli muzqaymoq" },
          { name: "Bomba xasanboy", gram: "100gr", price: "5 400 UZS", img: "img/xasanboy.jpg", viewImg: ["img/view/bombaXas1.jpg"], id: "bombaXas", boxNum: "30", galleryName: "Qayqomli plombir muzqaymoq" },
          { name: "Qora qum <br>", gram: "70gr", price: "3 600 UZS", img: "img/qoraqumXas.jpg", viewImg: ["img/view/qoraqumXas1.webp"], id: "qoraqumXas", boxNum: "50", galleryName: "Asl qahva ta'mli muzqaymoq" },
          { name: "Magnum/Viova <br>", gram: "80gr", price: "3 000 UZS", img: "img/viva_magnum.webp", viewImg: ["img/view/viva_magnum1.webp"], id: "viva_magnum", boxNum: "32", galleryName: "Maestro firmasidan hamyonbob shokoladli muzqaymoqlar. <br>Magnum - shokoladli plombir <br>Viova - shokoladli plombir hamda apelsin qiyomi" },
          { name: "Magnit <br>", gram: "100gr", price: "5 000 UZS", img: "img/magnit.webp", viewImg: ["img/view/magnit1.webp", "img/view/magnit2.webp"], id: "magnit", boxNum: "30", galleryName: "Qalin shokolad bilan qoplangan plombir va karamelli muzqaymoq " },
          { name: "Хоттабыч <br>", gram: "50gr", price: "45 000 UZS", img: "img/xottabichChoc.jpg", viewImg: ["img/view/xottabichPremium.webp", "img/view/xottabichEskimo.webp", "img/view/xottabichPlombir.webp", "img/view/xottabichBanan.webp", "img/view/xottabichPistachio.webp", "img/view/xottabichChoco.webp", "img/view/xottabichRamazon.webp"], id: "xottabich", boxNum: "6", galleryName: "\"Premium\" - premium shokolad <br>\"Eskimo\" - shokolad qoplamali plombir <br> \"Plombir\" - qaymoqli oq shokolad <br>\"Banan\" - banan ta'mli plombir <br>\"Fistashka\" - xandon pista ta'mli <br> \"Chocolate\" - oq va qora shokolad  <br> \"Ramazon\" - 6 xil ta'm birlashmasi" },
          { name: "Saber <br>", gram: "85gr", price: "60 000 UZS", img: "img/saber.webp", viewImg: ["img/view/saber1.webp", "img/view/saber2.jpg", "img/view/saber3.webp"], id: "saber", boxNum: "5", galleryName: "Saber Gold - sutli shokolad bilan qoplangan qaymoqli plombir, yoqimli ta'm, o'ziga yarasha shohona tanlov! <br>Saber Choco - asl shokolad bilan qoplangan kakao va vanilning boy ta'm uyg'unligi. Shokoladli desertni sevuvchilar uchun mukammal tanlov! " },
          { name: "Хоттабыч mevali", gram: "60gr", price: "35 000 UZS", img: "img/xottabichFruit.jpg", viewImg: ["img/view/xottabichOlma.webp", "img/view/xottabichOlxori.webp"], id: "xottabichFruit", boxNum: "6", galleryName: "Haqiqiy olma va olxo'riga o'xshash tabiiy ta'm va bularning barchasi shakarsiz" },
          { name: "Morella eskimo <br>", gram: "38gr", price: "7 000 UZS", img: "img/morella.webp", viewImg: ["img/view/morella1.webp", "img/view/morellaChoc.webp", "img/view/morellaQulupnay.webp", "img/view/morellaBanan.webp", "img/view/morellaKokos.webp", "img/view/morellaVanil.webp",], id: "morella", boxNum: "30", galleryName: "Barchaning sevimmli muzqaymog'iga aylanib ulgurgan Morella eskimolari. Turlari: <br>- Shokoladli <br>- Qulupnayli <br>- Bananli <br>- Kokosli <br>- Vanilli" },
          { name: "Pankie <br>", gram: "80gr", price: "6 930 UZS", img: "img/pankie.webp", viewImg: ["img/view/pankie1.webp"], id: "pankie", boxNum: "24", galleryName: "Pankie - yumshoq va mazali biskvit orasidagi plombir muzqaymoq" },
          { name: "O'zbegim anorlari", gram: "75gr", price: "1 950 UZS", img: "img/anorlari.webp", viewImg: ["img/view/anorlari2.webp"], id: "anorlari", boxNum: "50", galleryName: "Maestro firmasidan haqiqiy anor ta'mini ulashuvchi \"O'zbegim anorlari\" muzqaymog'i" },
          { name: "Alfetto <br>", gram: "100gr", price: "7 000 UZS", img: "img/alfetto.webp", viewImg: ["img/view/alfetto1.webp", "img/view/alfetto2.webp", "img/view/alfetto3.webp"], id: "alfetto", boxNum: "24", galleryName: "Musa dan qaymoqli-mevali Alfetto muzqaymoqlari. Turlari: <br>- O'rmon mevalari <br>- Qovun va Tarvuzli " },
          { name: "My Love <br>", gram: "100gr", price: "7 000 UZS", img: "img/myLove.webp", viewImg: ["img/view/myLove1.webp"], id: "myLove", boxNum: "27", galleryName: "Musa dan jelato, sutli va xandon pista ta'mli muzqaymoq. Qulay qadoqdagi mazali dessert " },


      ]
  },
  naturel: {
      title: "Naturel",
      products: [
          { name: "Naturel rojok Mevali ", gram: "120gr", price: "5 000 UZS", img: "img/rojokMeva.webp", viewImg: ["img/view/rojokMeva1.webp", "img/view/rojokMeva2.webp"], id: "rojokMeva", boxNum: "20", galleryName: "Naturel - qarsildoq konusdagi mevali plombir. Turlari: <br>- Gilosli <br>- Malinali" },
          { name: "Naturel rojok Shokoladli &nbsp", gram: "120gr", price: "6 000 UZS", img: "img/rojokChoc.webp", viewImg: ["img/view/rojokChoc1.webp", "img/view/rojokChoc2.webp"], id: "rojokChoc", boxNum: "20", galleryName: "\Naturel Plombiridan qora vafli stakanchada shokoladli konuslar. Turlari: <br> - Shokoladli plombir, yeryong'oq, karamel <br>- Vanil plombir va Oreo bo'lakchalari" },
          { name: "Naturel Stakan <br>", gram: "90gr", price: "5 000 UZS", img: "img/stakanNaturel.webp", viewImg: ["img/view/stakanNaturel1.webp"], id: "stakanNaturel", boxNum: "-", galleryName: "Naturel Plombiridan klassik stakanchada mazali va qaymoqli muzqaymoqlar. Turlari: <br> - Qaymoqli <br>- Qahva ta'mli <br>- Qulupnay qiyomi aralashgan plombir" },
          { name: "Naturel Gazeta <br>", gram: "120gr", price: "5 000 UZS", img: "img/gazetaNaturel.webp", viewImg: ["img/view/gazetaNaturelOq.webp", "img/view/gazetaNaturelQora.webp", "img/view/gazetaNaturelQizil.webp", "img/view/gazetaNaturelSariq.webp"], id: "gazetaNaturel", boxNum: "20", galleryName: "Klassik plombirdan tortib tropik mevalar ta'mlar uyushmasini o'z ichiga olgan Naturel gazetalari. Turlari: <br> - Klassik plombir (Haqiqiy ta'm) <br>- Oreo ta'mi (Sevimli pechenye bilan) <br>- Qulupnayli murabbo (Shirin va yoqimli) <br>- Bananli murabbo (Tropik lazzat)" },
          { name: "Naturel Plombir <br>", gram: "90gr", price: "4 000 UZS", img: "img/eskimoNaturel.webp", viewImg: ["img/view/eskimoNaturel1.webp"], id: "eskimoNaturel", boxNum: "40", galleryName: "Natuel Plombr - uch xil ta'm, bitta zavq. Klassik, xushbo'y qahvali yoki tabiiy qulupnayli" },
          { name: "Maxinut/Maximum", gram: "100gr", price: "5 000 UZS", img: "img/natMax.webp", viewImg: ["img/view/natMax1.webp", "img/view/natMax2.webp"], id: "maxNaturel", boxNum: "40", galleryName: "Shokoladli glazurdagi plombir muzqaymoqlar. Turlari: <br>- Yong'oqli va yumshoq kremli <br>- Karamel va plombir" },
          { name: "Kilogramlik briket qadoq &nbsp;", gram: "1000gr", price: "36 000 UZS", img: "img/36kNaturel.webp", viewImg: ["img/view/nat36k1.webp", "img/view/nat36k2.webp", "img/view/nat36k3.webp", "img/view/nat36k4.webp", "img/view/nat36k5.webp", "img/view/nat36k6.webp", "img/view/nat36k7.webp", "img/view/nat36k8.webp"], id: "36kNaturel", boxNum: "6", galleryName: "\'Naturel Plombir\' kilogrammli, o'zgacha dizayndagi tanish va tabiiy ta'm uyg'unligi <br>- Klassik plombir <br>- Qaymoqli <br>- Quyultirilgan sutli <br>- Qahvali <br>- Shokoladli <br>- Karamel va yer yong'oqli <br>- Qulupnayli <br>- Malinali"},
          { name: "Kilogramlik klassik qadoq &nbsp;", gram: "1000gr", price: "30 000 UZS", img: "img/30kNaturel.webp", viewImg: ["img/view/nat30k1.webp", "img/view/nat30k2.webp", "img/view/nat30k3.webp", "img/view/nat30k4.webp", "img/view/nat30k5.webp", "img/view/nat30k6.webp", "img/view/nat30k7.webp", "img/view/nat30k8.webp"], id: "30kNaturel", boxNum: "6", galleryName: "\'Naturel Plombir\' kilogrammli, klassik dizayndagi tanish va tabiiy ta'm uyg'unligi. <br>- Gold plombir <br>- Vanilli <br>- Quyultirilgan sutli <br>- Shokoladli <br>- Karamel va yer yong'oqli <br>- Qulupnayli <br>- Bananli <br>- Tropik mevali"},
      ]
  },
  sodiqSavdo: {
      title: "Sodiq Savdo",
      products: [
          { name: "Qora qum <br>", gram: "70gr", price: "2 400 UZS", img: "img/qoraqumSS.jpg", viewImg: ["img/view/qoraqumSS1.webp"], id: "qoraqumSS", boxNum: "50", galleryName: "Asl qahva ta'mli muzqaymoq" },
          { name: "Bubble Gum <br>", gram: "70gr", price: "1 800 UZS", img: "img/bubblegumSS.jpg", viewImg: ["img/view/bubblegumSS1.webp"], id: "bubblegumSS", boxNum: "50", galleryName: "Shirin saqich ta'mli plombir muzqaymoq" },
          { name: "Bomba <br>", gram: "70gr", price: "3 360 UZS", img: "img/bombaSS.jpg", viewImg: ["img/view/bombaSS1.png", "img/view/bombaSS2.png"], id: "bombaSS", boxNum: "24", galleryName: "Asl qahva ta'mli hamda qayqomli plombir bomba muzqaymoqlari" },
          { name: "Plombir-Melon-Mango", gram: "70gr", price: "1 800 UZS", img: "img/pmmSS.jpg", viewImg: ["img/view/pmmSS1.webp", "img/view/pmmSS2.webp", "img/view/pmmSS3.webp"], id: "pmmSS", boxNum: "50", galleryName: "Vanil-Qovun-Mango ta'mli muzqaymoqlar" },
          { name: "Choco Stars <br>", gram: "70gr", price: "2 880 UZS", img: "img/chocoStars.jpg", viewImg: ["img/view/chocoStars.webp"], id: "chocoStars", boxNum: "50", galleryName: "Asl shokolad qoplamasi ostida yashiringan oq plombir" },
          { name: "Майя лёд <br>", gram: "50gr", price: "650 UZS", img: "img/maya.jpg", viewImg: ["img/view/maya1.webp"], id: "maya", boxNum: "60", galleryName: "3 xil rangli muz muzqaymoq" },
          { name: "Star Milk <br>", gram: "100gr", price: "4 500 UZS", img: "img/5star.jpg", viewImg: ["img/view/5star1.webp"], id: "5star", boxNum: "18", galleryName: "6 ta sutli va qaymoqli, bo'lishishga oson mazali muzqaymoqchalar" },
          { name: "Star Ice <br>", gram: "100gr", price: "4 000 UZS", img: "img/5starIce.jpg", viewImg: ["img/view/5starIce1.webp"], id: "5starIce", boxNum: "18", galleryName: "6 ta muzdek shirinlik - sovitadi, tetiklantiradi, xursand qiladi!" },
          { name: "Kilogramlik <br>", gram: "1000gr", price: "25 000 UZS", img: "img/kgSS.jpg", viewImg: ["img/view/ssPlombir.webp", "img/view/ssCofe.webp", "img/view/ssYagoda.webp", "img/view/ssBanan.webp", "img/view/ssMelon.webp", ], id: "kgSS", boxNum: "6", galleryName: " \"Plombir\" - vanil ta'mli plombir <br> \"Cofe\" - xushbo'y qahva ta'mli plombir <br> \"Yagoda\" - o'rmon mevalari ta'mli plombir<br> \"Banan\" - banan ta'mli plombir <br> \"Qovun\" - qovun ta'mli plombir <br> " },
          { name: "Yarim kilogram <br>", gram: "500gr", price: "13 000 UZS", img: "img/500grSS.webp", viewImg: ["img/view/500grSS1.webp"], id: "500grSS", boxNum: "8", galleryName: "Vanil hamda Qahva ta'mli plombir muzqaymoqlar " }
      ]
  },
  zarli: {
      title: "Zarli",
      products: [
          { name: "Sariq zar <br>", gram: "80gr", price: "4 380 UZS", img: "img/zarliYellow.jpg", viewImg: ["img/view/zarYellow1.webp"], id: "zarliYellow", boxNum: "30", galleryName: "Zar qog'ozdagi klassika - shokoladli qoplama, oq qaymoqli eskimo" },
          { name: "Oq zar <br>", gram: "60gr", price: "3 600 UZS", img: "img/zarliWhite.jpg", viewImg: ["img/view/zarWhite1.webp"], id: "zarliWhite", boxNum: "40", galleryName: "Zar qog'ozdagi klassika - shokoladli qoplama, oq qaymoqli eskimo" },
          { name: "Zarli idish <br>", gram: "180gr", price: "6 240 UZS", img: "img/zarliIdish.jpg", viewImg: ["img/view/zarliIdish.webp"], id: "zarliIdish", boxNum: "-", galleryName: "Yer yong'oq va shokolad aralashmasi bilan boyitilgan vanil muzqaymoq" },
          { name: "Лакомка <br>", gram: "80gr", price: "8 400 UZS", img: "img/zarliLakomka.jpg", viewImg: ["img/view/zarliLakomka1.webp"], id: "zarliLakomka", boxNum: "-", galleryName: "Vafli orasidagi shirin shokoladli hamda qaymoqli briket" },
          { name: "Белое золото", gram: "200gr", price: "6 360 UZS", img: "img/zarliBeloyzoloto.jpg", viewImg: ["img/view/zarliBeloyzoloto1.webp"], id: "zarliBeloyzoloto", boxNum: "-", galleryName: "Toza sutdan tayyorlangan, 200 grammli oq plombir. Kattaligi bilan to'ydiradi, ta'mi bilan rom qiladi" },
          { name: "Kilogramlik <br>", gram: "1000gr", price: "28 000 UZS", img: "img/zarliKG.webp", viewImg: ["img/view/zarliKG.webp"], id: "zarliKG", boxNum: "6", galleryName: "Qaymoqli hamda kofeyniy shokoladli muzqaymoq. Qora va oq xohlovchilar uchun ajoyib tanlov" },

      ]
  },
  korovka: {
      title: "Коровка из Кореновки",
      products: [
          { name: "Стаканчики пломбир", gram: "100gr", price: "12 000 UZS", img: "img/stkKorovka.jpg", viewImg: ["img/view/korovkaStkPlombir.webp", "img/view/korovkaStkChoc.webp", "img/view/korovkaStkCrem.webp", "img/view/korovkaStkFistashka.webp"], id: "korovkaStk", boxNum: "30", galleryName: "15% li vafli stakanchada plombir muzqaymoq. Turlari: <br> - Qaymoqli <br> - Shokoladli <br> - Krem-bryule <br> - Xandon pistali" },
          { name: "Лакомка пломбир", gram: "90gr", price: "14 000 UZS", img: "img/lakomkaKorovka.jpg", viewImg: ["img/view/lakomkaKorovkaPlombir.webp", "img/view/lakomkaKorovkaCrem.webp", "img/view/lakomkaKorovkaMalina.webp"], id: "korovkaLakomka", boxNum: "20", galleryName: "Shokolad-qaymoqli glazuradagi plombir muzqaymoq. Turlari: <br> - Qaymoqli <br> - Krem-bryule <br> - Malinali" },
          { name: "Эскимо пломбир", gram: "70gr", price: "11 000 UZS", img: "img/korovkaEskimoPlombir.jpg", viewImg: ["img/view/korovkaEskimoPlombir1.webp", "img/view/korovkaEskimoPlombir2.webp"], id: "korovkaEskimoPlombir", boxNum: "-", galleryName: "15% li shokolad glazuridagi vanilli plombir eskimo muzqaymoq" },
          { name: "Эскимо фундук", gram: "70gr", price: "14 000 UZS", img: "img/korovkaEskimoFunduk.jpg", viewImg: ["img/view/korovkaEskimoFunduk1.webp"], id: "korovkaEskimoFunduk", boxNum: "-", galleryName: "15% li vanilli plombir eskimo — sutsimon shokolad glazurida, funduk bo'lakchalari bilan" },
          { name: "Plombir vafli <br>", gram: "70gr", price: "10 000 UZS", img: "img/korovkaVafli.jpg", viewImg: ["img/view/korovkaVafli1.webp"], id: "korovkaVafli", boxNum: "-", galleryName: "Vafli orasida 15% li vanilli plombir muzqaymoq" },
          { name: "Сырок <br>", gram: "40gr", price: "5 000 UZS", img: "img/korovkaSirok.jpg", viewImg: ["img/view/korovkaSirok1.webp", "img/view/korovkaSirok2.webp"], id: "korovkaSirok", boxNum: "-", galleryName: "Quyultirilgan sut bilan sirlangan, yumshoq 18% yog'li tvorogli sirok" },
          { name: "Семейный <br>", gram: "400gr", price: "55 000 UZS", img: "img/korovkaFamily.jpg", viewImg: ["img/view/korovkaFamily1.webp"], id: "korovkaFamily", boxNum: "-", galleryName: "15% yog'li vanilli plombir muzqaymoq — oila davrasida baham ko'rish uchun ajoyib tanlov" },
          { name: "48 Копеек Брикет ", gram: "210gr", price: "", img: "img/48briketMango.jpg", viewImg: ["img/view/48briketMango1.webp"], id: "48briketMango", boxNum: "-", galleryName: "Mango va qaymoq - tetiklashtiruvchi mango sorbeti va mango sousining ajoyib uyg'unligi" },
          { name: "48 Копеек Пломбир <br>", gram: "420gr", price: "", img: "img/48vannaPlombir.jpg", viewImg: ["img/view/48vannaPlombir1.webp"], id: "48vannaPlombir", boxNum: "-", galleryName: "Tabiiy sut, yangi qaymoq va xushbo'y vanil uyg'unligi. Hammaga birdek yoqadigan klassik muzqaymoq" },
          { name: "48 Копеек <br> Прага <br> ", gram: "432gr", price: "", img: "img/48vannaChoc.jpg", viewImg: ["img/view/48vannaChoc1.webp"], id: "48vannaChoc", boxNum: "-", galleryName: "Shokoladli Praga. Haqiqiy shokolad ishqibozlari uchun. Qora shokolad bo'lakchalari, shokoladli biskvit va ustidan quyilgan shokoladli sous" },
          { name: "48 Копеек Стаканчики <br>", gram: "88gr", price: "", img: "img/48stk.jpg", viewImg: ["img/view/48stkVanil.png", "img/view/48stkChoc.png", "img/view/48stkMango.png", "img/view/48stkMalina.png", ], id: "48stk", boxNum: "-", galleryName: "12% yog'li, vaflili plombir — tabiiy sut, qaymoq va shirin ta'm uyg'unligi bilan <br> “48 kopeyk” klassikasi. Turlari: <br> - Vanil <br> - Shokolad <br> - Mango <br> - Malina" },
          { name: "Nestle <br>", gram: "59gr", price: "16 000 UZS", img: "img/nestle.jpg", viewImg: ["img/view/nestle1.webp" ], id: "nestle", boxNum: "-", galleryName: " O'simlik yog'isiz, bodomli va shokoladli qoplamada tayyorlangan haqiqiy Nestle muzqaymog'i" },
          { name: "Alpen Gold <br>", gram: "58gr", price: "15 000 UZS", img: "img/alpengold.jpg", viewImg: ["img/view/alpengold1.webp", "img/view/alpengold2.webp" ], id: "alpengold", boxNum: "-", galleryName: "Alpen Gold muzqaymoqi — kakao bilan ikki qatlamli yumshoq qaymoqli muzqaymoq, sutli shokolad qoplamasida, qarsildoq guruch va yengil sho‘r sharchalar bilan boyitilgan" },
          { name: "Oreo <br>", gram: "56gr", price: "16 000 UZS", img: "img/oreo.jpg", viewImg: ["img/view/oreo1.webp" ], id: "oreo", boxNum: "-", galleryName: " Oreo muzqaymog'i — tabiiy tarkib, o'ziga xos Oreo pechenyesi va shokolad glazurasi bilan. O'simlik yog'larisiz" },
          { name: "Milka shokolad <br>", gram: "62gr", price: "18 000 UZS", img: "img/milkaChoc.webp", viewImg: ["img/view/milkaChoc1.webp" ], id: "milkaChoc", boxNum: "-", galleryName: "Milka sutli shokoladi bilan qoplangan yumshoq vanilli muzqaymoq" },
          { name: "Milka yagoda <br>", gram: "64gr", price: "19 000 UZS", img: "img/milkaYagoda.webp", viewImg: ["img/view/milkaYagoda1.webp" ], id: "milkaYagoda", boxNum: "-", galleryName: "Tabiiy o'rmon mevalari bilan boyitilgan, Milka shokolad qoplamasida qaymoqli muzqaymoq" },
      ]
  },
  bahroma: {
      title: "Bahroma",
      products: [
          { name: "Double shokolad", gram: "75gr", price: "15 000 UZS", img: "img/15k.webp", viewImg: ["img/view/15k1.webp", "img/view/15k2.webp", "img/view/15k3.webp",], id: "15k", boxNum: "20", galleryName: "Bahroma Eskimo muzqaymoqlari - ikki qavatli shokoladli glazurada, 10% yog'li, ajoyib ta'mlar uyg'unligi bilan! Turlari: <br> - Quritilgan olxo'ri <br> - Quritilgan o'rik <br> - Xalva" },
          { name: "Mevali lokum <br>", gram: "75gr", price: "10 500 UZS", img: "img/11k.webp", viewImg: ["img/view/11k1.webp", "img/view/11k2.webp",  "img/view/11k3.webp"], id: "11k", boxNum: "20", galleryName: "Mevali, fruktozali glazur bilan qoplangan, tabiiy sharbatlar va xushbo'y lazzatlar bilan boyitilgan Bahroma muzqaymoqlari. Turlari: <br> - Anor va gilos <br> - Shaftoli va marakuyya <br> - Qulupnayli moxito" },
          { name: "Funduk va Maffin <br>", gram: "75gr", price: "11 600 UZS", img: "img/12k.jpg", viewImg: ["img/view/maffinvishnya.webp", "img/view/funduknuga.webp" ], id: "12k", boxNum: "-", galleryName: "Yong'oqli, mevali va shokoladli lazzatlarning o'zaro uyg'unligidan tayyorlangan muzqaymoqlar. Har bir turi o'ziga xos ta'm va tarkibga ega. Turlari: <br> - Olcha shokoladli maffin <br> - Funduk shokoladli nuga" },
          { name: "Trio Bahroma<br>", gram: "65gr", price: "13 000 UZS", img: "img/trio.jpg", viewImg: ["img/view/trio1.webp"], id: "trio", boxNum: "-", galleryName: "Ikki xil turdagi Bahroma Trio muzqaymoqlari - mazali yong'oqlar, nuga va shokoladli glazur bilan boyitilgan, shuningdek, o'ziga xos pista va funduk bo'lakchalari bilan ta'mlangan" },
          { name: "Чизкейк <br>", gram: "75gr", price: "13 500 UZS", img: "img/chizkeyk.webp", viewImg: ["img/view/chizkeyk.webp"], id: "chizkeyk", boxNum: "-", galleryName: "Nafis chizkeyk va yangi anor hamda malina bilan boyitilgan, sharqona ta'mlarga olib boradigan mazali muzqaymoq" },
          { name: "Trufel qizil apelsin ", gram: "75gr", price: "11 600 UZS", img: "img/redapelsin.webp", viewImg: ["img/view/redapelsin.webp", "img/view/redapelsin2.webp"], id: "redApelsin", boxNum: "-", galleryName: "Ikki qavatli fondant va tryufel bilan to'ldirilgan, qizil apelsin lazzati bilan boyitilgan mazali muzqaymoq" },
          { name: "Bahroma лёд <br>", gram: "68gr", price: "5 500 UZS", img: "img/bahromaLed.webp", viewImg: ["img/view/bahromaLed.webp"], id: "bahromaLed", boxNum: "36", galleryName: "Silliq va yoqimli tuzilishga ega, tabiiy meva pyuresidan tayyorlangan muzqaymoqlar. <br>Qovun, Banan, Qulupnay - qaymoq, sariyog' va sut kukuni asosida, tabiiy mevalar bilan uyg'unlashtirilgan<br>Mango - sutsiz mango pyuresi, olma sharbat kontsentrati va tabiiy meva sharbati asosida tayyorlangan" },
          { name: "Мишка стаканчики ", gram: "100gr", price: "9 300 UZS", img: "img/mishkaStk.webp", viewImg: ["img/view/mishkaStk1.webp", "img/view/mishkaStk2.webp", "img/view/mishkaStk3.webp", "img/view/mishkaStk4.webp"], id: "mishkaStk", boxNum: "-", galleryName: " \"Мишка на полюсе\" dan 15% qaymoq miqdoridagi plombir, qalin krem tuzilishi va boy sut ta'mi bilan ajralib turadi. Turlari: <br> - Qaymoqli <br> - Shokoladli <br> - Xandon pistali <br> - Iliq sut ta'mli" },
          { name: "Мишка эскимо-зефир ", gram: "70/75gr", price: "9 600 UZS", img: "img/mishkaEskimo.webp", viewImg: ["img/view/mishkaEskimo1.webp", "img/view/mishkaEskimo2.webp"], id: "mishkaEskimo", boxNum: "-", galleryName: " Mishka Eskimo 15% qaymoqli plombir: issiq shokolad ta'mi bilan to'ldirilgan, shokoladli qoplama ostida <br><br>Mishka Zefirli Eskimo: zefir va marshmellou ta'mi bilan to'ldirilgan, shokoladli muzqaymoq" },
          { name: "Пломбир-эскимо ", gram: "70gr", price: "", img: "img/mishkaBigPlombir.webp", viewImg: ["img/view/mishkaBigPlombir1.webp", "img/view/easterEggBug.jpg"], id: "mishkaBigPlombir", boxNum: "-", galleryName: " “Мишка на плюсе” seriyasiga mansub cho'pli eskimo plombir muzqaymoqlari - oq qaymoqli va iliq sut ta'mli navlari bilan, silliq tuzilma va tabiiy ta'mni birlashtirgan klassik sovuq shirinlik." },
          { name: "Белочка <br>", gram: "70gr", price: "5 300 UZS", img: "img/belochka.webp", viewImg: ["img/view/belochka1.webp"], id: "belochka", boxNum: "26", galleryName: " Белочка” - qaymoqli plombir asosidagi eskimo muzqaymoq. Usti yong'oq bo'lakchalari bilan boyitilgan shokoladli qoplama bilan qoplangan. Har bir luqmasida qaymoqning yumshoqligi va yong'oq-shokolad uyg'unligi mavjud" },
          { name: "Караван <br>", gram: "70gr", price: "5 300 UZS", img: "img/karavan.webp", viewImg: ["img/view/karavan1.webp"], id: "karavan", boxNum: "26", galleryName: " Karavan - tabiiy kakao ta'miga ega shokoladli plombir muzqaymoq, usti shokoladli glazur bilan qoplangan va maydalangan vafli bo'lakchalari bilan bezatilgan. Yumshoq tuzilma va qarsildoq tashqi qatlam uyg'unligi bilan ajralib turadi" },
          { name: "Каровка <br>", gram: "75gr", price: "6 000 UZS", img: "img/korovkaBahroma.webp", viewImg: ["img/view/korovkaBahroma1.webp"], id: "karovkaBahroma", boxNum: "26", galleryName: " Ustida karamel glazur, ostida esa karamel sousli krem-brule eskimo" },
          { name: "Бомба XXL konus", gram: "145gr", price: "", img: "img/bombaKonus.webp", viewImg: ["img/view/bombaKonus1.webp", "img/view/bombaKonus2.webp"], id: "bombaKonus", boxNum: "20", galleryName: " Vanil plombir asosida tayyorlangan \"Bomba Konus XXL\" muzqaymoqlari: qulupnay va shokolad ta'mlari bilan" },
          { name: "Черное печенье", gram: "90gr", price: "6 000 UZS", img: "img/bombaBlack.webp", viewImg: ["img/view/bombaBlack1.webp"], id: "bombaBlack", boxNum: "30", galleryName: "Bomba eskimo \"Qora pechenye\" - shokoladli glazur ostidagi qaymoqli muzqaymoq va shokoladli qarsildoq" },
          { name: "Вафельный mix", gram: "90gr", price: "5 300 UZS", img: "img/bombaWafel.webp", viewImg: ["img/view/bombaWafel1.webp"], id: "bombWafel", boxNum: "30", galleryName: "\"Bomba Vafli Mix\" - haqiqiy sut, shokoladli vafli bo'lakchalari va yumshoq qaymoqli muzqaymoq" },
          { name: "Djussi <br>", gram: "70gr", price: "2 000 UZS", img: "img/djussi.webp", viewImg: ["img/view/djussi.webp"], id: "djussi", boxNum: "-", galleryName: "Tabiiy mevalarning shirinligi va sharbatini o'zida jamlagan ta'mlari bilan jonlantiruvchi muz. Turlari: <br>- Ananas <br>- Apelsin <br>- Tarvuz" },
          { name: "Shin-Line Rozochka", gram: "120gr", price: "10 000 UZS", img: "img/shinlineRozochka.jpg", viewImg: ["img/view/shinlineRozochka1.webp", "img/view/shinlineRozochka2.webp"], id: "shinlineRozochka", boxNum: "-", galleryName: "SHIN LINE Rozochka - nafis shakl va mayin yogurt asosidagi ta'm uyg'unligi! Yengil va shirin lazzat. Turlari: <br>- Qulupnayli-yogurt <br>- Shokoladli-yogurtli (Biskottino aromali)" },
          { name: "Миша <br>", gram: "80gr", price: "4 800 UZS", img: "img/mishala.webp", viewImg: ["img/view/mishaPlombir.webp", "img/view/mishaShokolad.webp", "img/view/mishaTrio.webp", "img/view/mishaKlubnika.webp", "img/view/mishaChernika.webp"], id: "mishala", boxNum: "26", galleryName: "Tabiiy qaymoqli muzqaymoq turli xil mazalarda, hammasi shirin, yumshoq va og'izda eriydigan. Turlari: <br>- Oq plombir <br>- Shokolad-kofeyniy <br>- Trio (qulupnay, plombir, shokolad) <br>- Qulupnayli yogurt <br>- Chernika yogurt" },
          { name: "Super Семейки", gram: "400/800gr", price: "16 000/32 000", img: "img/superSemeyki.webp", viewImg: ["img/view/superSemeyki1.webp", "img/view/superSemeyki2.webp"], id: "superSemeyki", boxNum: "-", galleryName: "\"Миша\" plombir muzqaymog'i - tabiiy butun sut va haqiqiy sariyog'dan tayyorlangan, yumshoq va to'yingan ta'mga ega, oila davrasiga mos klassik muzqaymoq" },
          { name: "Ванна Пломбир-Шоколад", gram: "450gr", price: "35 000", img: "img/misha450.webp", viewImg: ["img/view/misha450plombir.webp", "img/view/misha450shokolad.webp"], id: "misha450", boxNum: "-", galleryName: "12% li qaymoq asosida tayyorlangan, yumshoq va shirador muzqaymoq - oila davrasida yoki shirinliklar tayyorlashda ajoyib tanlov. Turlari: <br>- Oq plombirli <br>- Shokolad kofeyniy" },
          { name: "Ванна Клубника-Карамель", gram: "490gr", price: "40 000", img: "img/misha490.webp", viewImg: ["img/view/misha490klubnika.webp", "img/view/misha490karamel.webp"], id: "misha490", boxNum: "-", galleryName: "12% li qaymoq asosida tayyorlangan, yumshoq va shirador muzqaymoq - oila davrasida yoki shirinliklar tayyorlashda ajoyib tanlov. Turlari: <br>- Qulupnay yogurtli <br>- Karamel sgushonkali" },
      ]
  },
  svitlogore: {
      title: "Свитлогорье",
      products: [
          { name: "Бабл Гам <br>", gram: "65gr", price: "12 000 UZS", img: "img/bablGum.webp", viewImg: ["img/view/bablGum1.webp", "img/view/bablGum2.webp"], id: "bablGum", boxNum: "-", galleryName: "Babl Gam, qovun, tarvuz va malina ta'mli muzqaymoq - Babl Gam ta'mli glazur bilan qoplangan" },
          { name: "Фрумелье <br>", gram: "65gr", price: "12 000 UZS", img: "img/frumele.webp", viewImg: ["img/view/frumele1.webp", "img/view/frumele2.webp"], id: "frumele", boxNum: "-", galleryName: "Vanil ta'mli eskimo, ichida o'rmon mevalaridan tayyorlangan shirasi, usti shirin shokolad bilan qoplangan  Frumelye!" },
          { name: "Эскимо Черника", gram: "80gr", price: "13 000 UZS", img: "img/eskChernika.webp", viewImg: ["img/view/eskChernika1.webp", "img/view/eskChernika2.webp"], id: "EskChernika", boxNum: "-", galleryName: "Vanil ta'mli eskimo, usti oppoq sutli shokalad bilan qoplangan, ichi esa chernika va boshqa rezavor mevalar bilan boyitilgan yogurtli muzqaymoq" },
          { name: "Salwadore <br>", gram: "80gr", price: "12 000 UZS", img: "img/salwadoreMalina.webp", viewImg: ["img/view/salwadoreMalina1.webp", "img/view/salwadoreMalina2.webp"], id: "salwadore", boxNum: "26", galleryName: "SALWADORE - malina bilan anorning o'zgacha ta'm uyg'unligi, ustiga pushti biskvit bo'lakchalari bilan boyitilgan. Barchasi oq shokolad qobig'ida - silliq, lazzatli, o'zgacha! " },
          { name: "Свитлогорье эскимо", gram: "80gr", price: "12 300 UZS", img: "img/svgEskimos.webp", viewImg: ["img/view/svgEskimos1.webp", "img/view/svgEskimos2.webp", "img/view/svgEskimos3.webp", "img/view/svgEskimos4.webp"], id: "svgEskimos", boxNum: "30", galleryName: "Tabiiy sut va qaymoqdan tayyorlangan, usti kakaoli qalin shokolad bilan qoplangan \"Свитлогорье\" eskimolari. Turlari: <br>- Plombirli <br>- Shokoladli <br>- Iriskali <br>- Dvuxsloyniy (plombir va shokolad)  " },
          { name: "Лакомство <br>", gram: "90gr", price: "8 000 UZS", img: "img/lakomstvo.webp", viewImg: ["img/view/lakomstvo1.webp", "img/view/lakomstvo2.webp"], id: "lakomstvo", boxNum: "20", galleryName: "Qalin quyma shokoladli qobiq ostida yashiringan silliq plombir va karamelga o'xshash krem-brule ta'mlari bilan haqiqiy lazzatni his eting " },
          { name: "ГОСТ эскимо <br>", gram: "70gr", price: "10 000 UZS", img: "img/gostEskimo.webp", viewImg: ["img/view/gostEskimo1.webp"], id: "gostEskimo", boxNum: "30", galleryName: "Sutli shokolad qobig'ida qoplangan eskimo plombir" },
          { name: "Простоквашино  <br>", gram: "90gr", price: "10 000 UZS", img: "img/prostakvashino.webp", viewImg: ["img/view/prostokvashino1.webp"], id: "prostokvashino", boxNum: "24", galleryName: "Mazasi tabiiy, sifati ishonchli! O'simlik yog'lari yo'q - faqat haqiqiy qaymoqdan tayyorlangan! 15% yog' miqdori bilan to'liq lazzat" },
    ]
  }
 };


 initApp();
}  
*/








function initApp() {



                          // Home page menu 
const homepage = document.querySelector('.homepage');
const brandMenu = document.querySelector('.brand-menu');
const iceCreamMenu = document.querySelector('.iceCream-menu');
const backButton = document.querySelector(".title button");
const titleName = document.querySelector('.title-name');
const iceCreamContainer = document.querySelector(".ic-content");

                          // Specific brand menu
const iceCreamInfo = document.querySelector('.iceCream-info');
const galleryBackBtn = document.querySelector('.gallery-back-btn');
const galleryTrack = document.querySelector('.gallery-track');
const galleryDots = document.querySelector('.gallery-dots');

                          // Each product info
const productDetails = document.body.querySelector('.product-details');
const productPrice = document.body.querySelector('.product-price');
const productNames = document.body.querySelector('.product-names');
const productGram = document.body.querySelector('.product-gram');
const productBoxCount = document.body.querySelector('.product-box-count');
const boxNumber = document.body.querySelector('.box-number');

                          // Footer buttons / Contacts
const footerHomeBtn = document.querySelector('.footer-btn.home');
const footerCartBtn = document.querySelector('.footer-btn.cart');
const footerContactsBtn = document.querySelector('.footer-btn.contacts');
const cdBackBtn = document.body.querySelector('.cd-back-btn');
const contactInfo = document.body.querySelector('.contact-info');

                          // Search products form
const searchInput = document.getElementById("searchInput");
const overlay = document.getElementById("overlay");

//  CART SYSTEM 
const cartView = document.querySelector('.cart-view');
const cartBackBtn = document.querySelector('.cart-back-btn');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const sendToTelegramBtn = document.querySelector('.send-to-telegram-btn');

//  PRODUCT QUANTITY SELECTOR 
const qtyInput = document.querySelector('.qty-input');
const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

// Modal alert messages
const modal = document.getElementById('clear-modal');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');
const emptyModal = document.getElementById('empty-modal');
const emptyModalClose = document.getElementById('empty-modal-close');  


  //  Track which view we came from
  let previousView = 'homepage';

  // ============ HELPER FUNCTION: view toggling ============
  // Unified view toggling: show one view, hide all others
  function setActiveView(viewName) {
    const views = {
      'homepage': homepage,
      'iceCreamMenu': iceCreamMenu,
      'iceCreamInfo': iceCreamInfo,
      'cartView': cartView,
      'contactInfo': contactInfo
    };
    
    // Hide all views
    Object.values(views).forEach(view => {
      if (view) view.style.display = 'none';
    });
    
    // Show requested view + overlays
    if (viewName === 'iceCreamInfo') {
      galleryBackBtn.style.display = 'flex';
      views.iceCreamInfo.style.display = 'block';
    } else if (viewName === 'contactInfo') {
      views.contactInfo.style.display = 'flex';
      galleryBackBtn.style.display = 'none';
    } else if (viewName === 'cartView') {
      views.cartView.style.display = 'flex';
    } else if (views[viewName]) {
      views[viewName].style.display = 'block';
    }
  }

  // 1. Homepage
brandMenu.addEventListener('click', event => {
  const clickedBrand = event.target.closest('.brands');
  
  if (!clickedBrand) return;

  const brandName = clickedBrand.getAttribute('data-brand');
  homepage.style.display = "none";
  iceCreamMenu.style.display = "block";
  titleName.innerHTML = `<h3>${icBrands[brandName]?.title || "Unknown Brand"}</h2>`;

  iceCreamContainer.innerHTML = "";

  if (!icBrands[brandName]?.products) {
      const noProductMessage = document.createElement('div');
      noProductMessage.classList.add("no-message");
      iceCreamContainer.appendChild(noProductMessage);
      noProductMessage.textContent = "Ushbu brend uchun mahsulotlar mavjud emas.";
      return;
  }

  icBrands[brandName].products.forEach (product => {
      const icBox = document.createElement('div');
      icBox.classList.add("ic-box");
      icBox.setAttribute('data-ic', product.id);
  
      icBox.innerHTML = `
          <div class="ic-img">
              <img src="${product.img}" width="500" height="500" loading="lazy"  alt="${product.name}">
          </div>
          <div class="ic-details">
              <div class="ic-name">${product.name} <div class="ic-gram">${product.gram}</div></div>
              <span class="ic-price">${product.price}</span>
          </div>
      `;
  
      iceCreamContainer.appendChild(icBox);
  });
});


backButton.addEventListener('click', () => {   
  setActiveView('homepage');
});





//2. Specific brand menu 
galleryBackBtn.addEventListener('click', () => {     
  setActiveView('iceCreamMenu');
});


let currentImageIndex = 0;

// Event listener when a product is clicked
iceCreamContainer.addEventListener('click', event => {   
  const clickedIc = event.target.closest('.ic-box');
  if (!clickedIc) return;

  setActiveView('iceCreamInfo');

  const productId = clickedIc.getAttribute('data-ic');
  const productView = getProductById(productId);

  if (productView) {
    showProductGallery(productView);
    showProductDetails(productView);
  }
});

// Function to get product by ID
function getProductById(idPar) {
  for (const brand in icBrands) {
    const product = icBrands[brand].products?.find(p => p.id === idPar);
    if (product) return product;
  }
  return null;
}

// Function to show the product gallery
function showProductGallery(product) {

  currentImageIndex = 0;

  galleryTrack.innerHTML = '';
  galleryDots.innerHTML = '';

  // Load images from the product's viewImg array
  product.viewImg.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'gallery-img';
    img.loading = 'lazy';
    galleryTrack.appendChild(img);

    // Create a dot for each image
    const dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    galleryDots.appendChild(dot);
  });


  // Reset gallery position immediately
  galleryTrack.style.transition = 'none';
  galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
  setTimeout(() => {
    galleryTrack.style.transition = '';
  }, 50);
  
  initSwipe();
}




// Store references to the listeners for cleanup
let currentTouchStart, currentTouchMove, currentTouchEnd;

function initSwipe() {
  const images = document.querySelectorAll('.gallery-img');
  
  // ===== 1. CLEAN UP OLD LISTENERS =====
  if (currentTouchStart) {
    galleryTrack.removeEventListener('touchstart', currentTouchStart);
    galleryTrack.removeEventListener('touchmove', currentTouchMove);
    galleryTrack.removeEventListener('touchend', currentTouchEnd);
  }

  // ===== 2. DISABLE SWIPE FOR SINGLE IMAGE =====
  if (images.length <= 1) {
    // Reset position (prevent drift)
    galleryTrack.style.transform = 'translateX(0)';
    galleryTrack.style.transition = 'none';
  }

  // ===== 3. ENABLE SWIPE FOR MULTIPLE IMAGES =====
  let startX, moveX;
  
  // Define listeners (for later cleanup)
  currentTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  
  currentTouchMove = (e) => {
    if (!startX) return;
    moveX = e.touches[0].clientX;
    const diffX = moveX - startX;
    galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px)`;
  };
  
  currentTouchEnd = () => {
    if (!moveX) return;
    const diffX = moveX - startX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentImageIndex > 0) {
        currentImageIndex--;
      } else if (diffX < 0 && currentImageIndex < images.length - 1) {
        currentImageIndex++;
      }
    }
    
    galleryTrack.style.transition = 'transform 0.4s ease-out';
    galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    updateDots();
    startX = null;
    moveX = null;
  };

  galleryTrack.addEventListener('touchstart', currentTouchStart);
  galleryTrack.addEventListener('touchmove', currentTouchMove);
  galleryTrack.addEventListener('touchend', currentTouchEnd);
}



function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentImageIndex);
  });
}




// 3. Each product info
function showProductDetails(productIdObject){
  productPrice.textContent = productIdObject.price;
  productNames.innerHTML = productIdObject.galleryName.replace(/\n/g, "<br>");
  productGram.textContent = productIdObject.gram;
  boxNumber.textContent = productIdObject.boxNum;
  qtyInput.value = 1;
  // Store current product id on the Add button for reliable lookup
  if (addToCartBtn) addToCartBtn.dataset.productId = productIdObject.id;
}




// 4. Contacts button (footer)
if (footerContactsBtn) {
  footerContactsBtn.addEventListener('click', () => {
    // Save current view before opening contact
    if (homepage.style.display === 'block') {
      previousView = 'homepage';
    } else if (iceCreamMenu.style.display === 'block') {
      previousView = 'iceCreamMenu';
    } else if (iceCreamInfo.style.display === 'block') {
      previousView = 'iceCreamInfo';
    }
    
    setActiveView('contactInfo');
  });

  footerContactsBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      footerContactsBtn.click();
    }
  });
}


if (cdBackBtn) {
  cdBackBtn.addEventListener('click', () => {
    if (contactInfo && contactInfo.style.display !== 'none') {
      if (previousView === 'homepage') {
        setActiveView('homepage');
      } else if (previousView === 'iceCreamMenu') {
        setActiveView('iceCreamMenu');
      } else if (previousView === 'iceCreamInfo') {
        setActiveView('iceCreamInfo');
      } else {
        setActiveView('homepage');
      }
    } else {
      setActiveView('iceCreamInfo');
    }
  });
}









//5. Search products form

// Store original brand display states
let originalBrandStates = null;
let isInSearchView = false;

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm.length >= 3) {
    // Save original states if not already saved
    if (originalBrandStates === null) {
      originalBrandStates = {};
      document.querySelectorAll(".brands").forEach(brand => {
        const brandName = brand.getAttribute("data-brand");
        originalBrandStates[brandName] = brand.style.display;
      });
    }
    
    // Switch to search view if not already there
    if (!isInSearchView) {
      showSearchView();
      isInSearchView = true;
    }
    
    // Filter products based on search term
    filterProducts(searchTerm);
  } else {
    // Clear search and restore original view
    clearSearch();
    isInSearchView = false;
  }
});

function showSearchView() {
  homepage.style.display = "none";
  iceCreamMenu.style.display = "block";
  titleName.textContent = "Qidiruv Natijalari";
  
  // Clear previous content
  iceCreamContainer.innerHTML = "";
  
  // Add all products from all brands
  for (const brand in icBrands) {
    if (icBrands[brand]?.products) {
      icBrands[brand].products.forEach(product => {
        const productElement = createProductElement(product, brand);
        iceCreamContainer.appendChild(productElement);
      });
    }
  }
}

function createProductElement(product, brand) {
  const icBox = document.createElement('div');
  icBox.classList.add("ic-box");
  icBox.setAttribute('data-ic', product.id);
  icBox.setAttribute('data-brand', brand);

  icBox.innerHTML = `
    <div class="ic-img">
      <img src="${product.img}" width="500" height="500" loading="lazy" alt="${product.name}">
    </div>
    <div class="ic-details">
      <div class="ic-name">${product.name} <span class="ic-gram">${product.gram}</span></div>
      <span class="ic-price">${product.price}</span>
    </div>
  `;
  
  return icBox;
}

function filterProducts(searchTerm) {
  const products = document.querySelectorAll(".ic-box");
  let hasMatches = false;

  products.forEach(product => {
    const productName = product.querySelector(".ic-name").textContent.toLowerCase();
    const isMatch = productName.includes(searchTerm);
    
    product.style.display = isMatch ? "block" : "none";
    if (isMatch) hasMatches = true;
  });

  
  console.log("Filtering products. Has matches:", hasMatches);
  
  // Show overlay if no matches found
  overlay.style.display = hasMatches ? "none" : "flex";
  
  // DEBUG: Check overlay state
  console.log("Overlay display:", overlay.style.display);
}

function clearSearch() {
  // Only reset if we're in search view
  if (titleName.textContent === "Qidiruv Natijalari") {
    setActiveView('homepage');
    
    // Restore original brand states
    if (originalBrandStates !== null) {
      Object.entries(originalBrandStates).forEach(([brandName, displayValue]) => {
        const brandElement = document.querySelector(`.brands[data-brand="${brandName}"]`);
        if (brandElement) {
          brandElement.style.display = displayValue;
        }
      });
    }
  }
  
  // Always hide overlay when clearing search
  overlay.style.display = "none";
}

// Enhanced back button functionality
backButton.addEventListener('click', function() {
  if (titleName.textContent === "Qidiruv Natijalari") {
    searchInput.value = "";
    clearSearch();
    isInSearchView = false;
  } else {
    setActiveView('homepage');
  }
});

  // 6. CART SYSTEM (footer cart)
  if (footerCartBtn) {
    footerCartBtn.addEventListener('click', () => {
      // If cart is already open, close it and return to previous view
      if (cartView.style.display === 'flex') {
        cartView.style.display = 'none';
        if (previousView === 'homepage') {
          setActiveView('homepage');
        } else if (previousView === 'iceCreamMenu') {
          setActiveView('iceCreamMenu');
        } else if (previousView === 'iceCreamInfo') {
          setActiveView('iceCreamInfo');
        }
        return;
      }

      // Save current view before opening cart
      if (homepage.style.display === 'block') {
        previousView = 'homepage';
      } else if (iceCreamMenu.style.display === 'block') {
        previousView = 'iceCreamMenu';
      } else if (iceCreamInfo.style.display === 'block') {
        previousView = 'iceCreamInfo';
      }

      setActiveView('cartView');
      updateCartDisplay();
    });

    footerCartBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        footerCartBtn.click();
      }
    });
  }

  // Footer Home button
  if (footerHomeBtn) {
    footerHomeBtn.addEventListener('click', () => {
      setActiveView('homepage');
    });

    footerHomeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        footerHomeBtn.click();
      }
    });
  }

  // Cart back button - FIXED to return to previous view
  cartBackBtn.addEventListener('click', () => {
    cartView.style.display = 'none';
    
    // Return to the view we came from
    if (previousView === 'homepage') {
      setActiveView('homepage');
    } else if (previousView === 'iceCreamMenu') {
      setActiveView('iceCreamMenu');
    } else if (previousView === 'iceCreamInfo') {
      setActiveView('iceCreamInfo');
    }
  });



  emptyModalClose.addEventListener('click', () => {
    emptyModal.style.display = 'none';
  });
    
    
  clearCartBtn.addEventListener('click', () => {
      if (cart.items.length === 0) {
      emptyModal.style.display = 'flex';
      return;
      }
      modal.style.display = 'flex';
    });

  modalCancel.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  modalConfirm.addEventListener('click', () => {
      cart.clearCart();
      updateCartDisplay();
      modal.style.display = 'none';
  });




  // FIXED: Send to Telegram with prefilled cart message
  sendToTelegramBtn.addEventListener('click', () => {
    if (cart.items.length === 0) {
      emptyModal.style.display = "flex";
      return;
    }

    // Build prefilled message with cart items
    let message = '🛒 Buyurtma:\n\n';
    let grandTotal = 0;

    cart.items.forEach((item) => {
      const hasPrice = item.price && !isNaN(item.price) && item.price > 0;
      const hasBoxNum = item.boxNum && item.boxNum !== '-' && !isNaN(parseInt(item.boxNum));
      
      message += `🍦 ${item.name}\n`;
      message += `Soni: ${item.quantity}`;
      
      if (hasBoxNum) {
        const boxNum = parseInt(item.boxNum);
        message += ` x ${boxNum} = ${item.quantity * boxNum}\n`;
      } else {
        message += ` dona\n`;
      }
      
      if (hasPrice && hasBoxNum) {
        const boxNum = parseInt(item.boxNum) || 1;
        const subtotal = item.price * item.quantity * boxNum;
        message += `Narxi: ${cart.s(subtotal)}\n`;
        grandTotal += subtotal;
      } else if (hasPrice) {
        const subtotal = item.price * item.quantity;
        message += `Narxi: ${cart.formatPrice(subtotal)}\n`;
        grandTotal += subtotal;
      } else {
        message += `Narxi: Narxi kelishiladi\n`;
      }
      
      message += '\n';
    });

    message += '─────────────────\n';
    message += `💰 Jami: ${cart.formatPrice(grandTotal)}`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Open Telegram with prefilled message
    window.open(`https://t.me/faz_25?text=${encodedMessage}`, '_blank');
  });

  minusBtn.addEventListener('click', () => {
    const currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) qtyInput.value = currentQty - 1;
  });

  plusBtn.addEventListener('click', () => {
    const currentQty = parseInt(qtyInput.value);
    qtyInput.value = currentQty + 1;
  });

  qtyInput.addEventListener('change', () => {
    let value = parseInt(qtyInput.value);
    if (isNaN(value) || value < 1) qtyInput.value = 1;
    if (value > 100) qtyInput.value = 100;
  });

 
  addToCartBtn.addEventListener('click', () => {
    // Get product by stored ID (unique, reliable)
    const pid = addToCartBtn.dataset.productId;
    let currentProduct = pid ? getProductById(pid) : null;
    
    // Fallback: match by price/gram if ID is missing (legacy)
    if (!currentProduct) {
      const productPrice = document.querySelector('.product-price');
      const productGram = document.querySelector('.product-gram');
      for (const brand in icBrands) {
        const found = icBrands[brand].products?.find(p => {
          return p.price === (productPrice ? productPrice.textContent : '') &&
                 p.gram === (productGram ? productGram.textContent : '');
        });
        if (found) { currentProduct = found; break; }
      }
    }
    
    if (!currentProduct) {
      alert('Mahsulot topilmadi!');
      return;
    }
    
    const quantity = parseInt(qtyInput.value);
    cart.addToCart(currentProduct, quantity);
    
    
    qtyInput.value = 1;
    addToCartBtn.textContent = 'Savatga qo\'shildi!';
    setTimeout(() => {
      addToCartBtn.textContent = 'Savatga qo\'shish';
    }, 1500);
  });

  

  // Ensure badge reflects stored cart on app init
  if (typeof cart !== 'undefined' && cart && typeof cart.updateCartBadge === 'function') {
    cart.updateCartBadge();
  }

  // Set default view to homepage
  setActiveView('homepage');



function updateCartDisplay() {
  const container = document.querySelector('.cart-items-container');
  const totalPrice = document.querySelector('.total-price');
  const totalItems = document.querySelector('.total-items');

  container.innerHTML = '';

    if (cart.items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-message">Savat bo'sh</div>
        <div class="empty_cart_logo">
          <img src="img/logo/empty_cart.png" width="110" height="110" alt="">
        </div>
      `;
    totalPrice.textContent = '0 UZS';
    totalItems.textContent = '0';
    return;
  }
  

  cart.items.forEach((item) => {
    const hasPrice = item.price && !isNaN(item.price) && item.price > 0;
    const hasBoxNum = item.boxNum && item.boxNum !== '-' && !isNaN(parseInt(item.boxNum));
    
    let priceDisplay = '';
    
    if (hasPrice && hasBoxNum) {
      const boxNum = parseInt(item.boxNum) || 1;
      const itemTotal = item.price * item.quantity * boxNum;
      priceDisplay = cart.formatPrice(itemTotal);
    } else {
      // Missing price or box count - show placeholder message
      priceDisplay = '<span style="color: #999; font-style: italic;">Narxi kelishiladi</span>';
    }
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-gram">${item.gram} ${item.boxNum && item.boxNum !== '-' ? `(Qutida ${item.boxNum} )` : '(Soni kelishiladi)'}</div>
        <div class="cart-item-price">${priceDisplay}</div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control">
          <button onclick="cart.updateQuantity('${item.productId}', ${item.quantity - 1}); updateCartDisplay();">−</button>
          <input type="number" value="${item.quantity}" disabled>
          <button onclick="cart.updateQuantity('${item.productId}', ${item.quantity + 1}); updateCartDisplay();">+</button>
        </div>
        <button class="remove-item-btn" onclick="cart.removeFromCart('${item.productId}'); updateCartDisplay();">✕</button>
      </div>
    `;
    container.appendChild(cartItem);
  });


  const grandTotal = cart.items.reduce((sum, item) => {
    const hasPrice = item.price && !isNaN(item.price) && item.price > 0;
    const hasBoxNum = item.boxNum && item.boxNum !== '-' && !isNaN(parseInt(item.boxNum));
    
    if (hasPrice && hasBoxNum) {
      const boxNum = parseInt(item.boxNum) || 1;
      return sum + (item.price * item.quantity * boxNum);
    }
    // Skip items with missing price/boxNum
    return sum;
  }, 0);

  totalPrice.textContent = cart.formatPrice(grandTotal);
  totalItems.textContent = cart.getItemCount();
}

// Expose globally for inline onclick handlers (declared after function def)
window.updateCartDisplay = updateCartDisplay;
}