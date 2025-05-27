// Add this at the VERY TOP of script.js
document.addEventListener('DOMContentLoaded', function() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Enable full mobile view
    tg.expand();
    
    // Set up menu button
    tg.MainButton.setText("🍦 MENU");
    tg.MainButton.onClick(() => {
      tg.openLink("https://arzonbozor-muzqaymoq.vercel.app"); 
    });
    tg.MainButton.show();
    
    console.log("Telegram WebApp initialized!"); // Debug check
  } else {
    console.error("Telegram WebApp not detected!");
  }
});





const icBrands = {
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
          { name: "Doda <br>", gram: "140gr", price: "6 000 UZS", img: "img/doda.webp", viewImg: ["img/view/doda1.webp", "img/view/doda2.webp"], id: "doda", boxNum: "20", galleryName: "Tabiiy mevalar qiyomi bilan boyitilgan, qaymoqli va shirin rojokdagi mazali muzqaymoq. Turlari: <br>- Olcha <br>- Malina <br>- Qulupnay" },
          { name: "Grand <br>", gram: "120gr", price: "5 000 UZS", img: "img/grand.webp", viewImg: ["img/view/grand1.webp", "img/view/grand2.webp"], id: "grand", boxNum: "20", galleryName: "Usti shokoladli glazur bilan bezatilingan vafli stakanchadagi quyiltirilgan sutli muzqaymoq" },

      ]
  },
  xasanboy: {
      title: "Xasanboy",
      products: [
          { name: "Bomba xasanboy", gram: "100gr", price: "5 400 UZS", img: "img/xasanboy.jpg", viewImg: ["img/view/bombaXas1.jpg"], id: "bombaXas", boxNum: "30", galleryName: "Qayqomli plombir muzqaymoq" },
          { name: "Qora qum <br>", gram: "70gr", price: "3 600 UZS", img: "img/qoraqumXas.jpg", viewImg: ["img/view/qoraqumXas1.webp"], id: "qoraqumXas", boxNum: "50", galleryName: "Asl qahva ta'mli muzqaymoq" },
          { name: "Хоттабыч <br>", gram: "50gr", price: "45 000 UZS", img: "img/xottabichChoc.jpg", viewImg: ["img/view/xottabichPremium.webp", "img/view/xottabichEskimo.webp", "img/view/xottabichPlombir.webp", "img/view/xottabichBanan.webp", "img/view/xottabichPistachio.webp", "img/view/xottabichChoco.webp", "img/view/xottabichRamazon.webp"], id: "xottabich", boxNum: "6", galleryName: "\"Premium\" - premium shokolad <br>\"Eskimo\" - shokolad qoplamali plombir <br> \"Plombir\" - qaymoqli oq shokolad <br>\"Banan\" - banan ta'mli plombir <br>\"Fistashka\" - xandon pista ta'mli <br> \"Chocolate\" - oq va qora shokolad  <br> \"Ramazon\" - 6 xil ta'm birlashmasi" },
          { name: "Хоттабыч mevali", gram: "60gr", price: "35 000 UZS", img: "img/xottabichFruit.jpg", viewImg: ["img/view/xottabichOlma.webp", "img/view/xottabichOlxori.webp"], id: "xottabichFruit", boxNum: "6", galleryName: "Haqiqiy olma va olxo'riga o'xshash tabiiy ta'm va bularning barchasi shakarsiz" },
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
          { name: "Yarim kilogram <br>", gram: "500gr", price: "13 000 UZS", img: "img/500grSS.webp", viewImg: ["img/view/500grSS1.webp"], id: "500grSS", boxNum: "8", galleryName: "Vanil hamda Qahva ta'mli plombir muzqaymoqlar " },

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
          { name: "Пломбир-эскимо ", gram: "70gr", price: "", img: "img/mishkaBigPlombir.webp", viewImg: ["img/view/mishkaBigPlombir1.webp", "img/view/mishkaBigPlombir2.webp"], id: "mishkaBigPlombir", boxNum: "-", galleryName: " “Мишка на плюсе” seriyasiga mansub cho'pli eskimo plombir muzqaymoqlari - oq qaymoqli va iliq sut ta'mli navlari bilan, silliq tuzilma va tabiiy ta'mni birlashtirgan klassik sovuq shirinlik." },
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



const homepage = document.querySelector('.homepage');
const brandMenu = document.querySelector('.brand-menu');
const iceCreamMenu = document.querySelector('.iceCream-menu');
const backButton = document.querySelector(".title button");
const titleName = document.querySelector('.title-name');
const iceCreamContainer = document.querySelector(".ic-content");

brandMenu.addEventListener('click', event => {
  const clickedBrand = event.target.closest('.brands');
  
  if (!clickedBrand) return;
  const brandName = clickedBrand.getAttribute('data-brand');
  
  homepage.style.display = "none";
  iceCreamMenu.style.display = "block";
  titleName.textContent = icBrands[brandName]?.title || "Unknown Brand";

  iceCreamContainer.innerHTML = "";

  if (!icBrands[brandName]?.products) {
      const noProductMessage = document.createElement('div');
      noProductMessage.classList.add("no-message");
      iceCreamContainer.appendChild(noProductMessage);
      noProductMessage.textContent = "No products available for this brand.";
      return;
  }

  icBrands[brandName].products.forEach(product => {
      const icBox = document.createElement('div');
      icBox.classList.add("ic-box");
      icBox.setAttribute('data-ic', product.id);
  
      icBox.innerHTML = `
          <div class="ic-img">
              <img src="${product.img}" width="500" height="500" loading="lazy"  alt="${product.name}">
          </div>
          <div class="ic-details">
              <div class="ic-name">${product.name} <span class="ic-gram">${product.gram}</span></div>
              <span class="ic-price">${product.price}</span>
          </div>
      `;
  
      iceCreamContainer.appendChild(icBox);
  });
});


backButton.addEventListener('click', () => {
  iceCreamMenu.style.display = "none";
  homepage.style.display = "block";
});






const iceCreamInfo = document.querySelector('.iceCream-info');
const galleryBackBtn = document.querySelector('.gallery-back-btn');
const galleryTrack = document.querySelector('.gallery-track');
const galleryDots = document.querySelector('.gallery-dots');


galleryBackBtn.addEventListener('click', () => {
  iceCreamInfo.style.display = 'none';
  iceCreamMenu.style.display = 'block';
});


let currentImageIndex = 0;

// Event listener when a product is clicked
iceCreamContainer.addEventListener('click', event => {
  const clickedIc = event.target.closest('.ic-box');
  if (!clickedIc) return;

  galleryBackBtn.style.display = "flex";
  iceCreamMenu.style.display = 'none';
  iceCreamInfo.style.display = "block";

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
  // iceCreamMenu.style.display = 'none';

  // Reset current image index to 0 each time the gallery is opened
  currentImageIndex = 0;

  // Clear previous images and dots
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


// Swipe functionality
// function initSwipe() {
//   const images = document.querySelectorAll('.gallery-img');
  
//   if (images.length <= 1) return;
//   let startX, moveX;
  

//   galleryTrack.addEventListener('touchstart', (e) => {
//     if (images.length <= 1) return;
//     startX = e.touches[0].clientX;
//   });

//   galleryTrack.addEventListener('touchmove', (e) => {
//     if (!startX || images.length <= 1) return;
//     moveX = e.touches[0].clientX;
//     const diffX = moveX - startX;
    
//     galleryTrack.style.transition = 'none'
//     galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px))`;
//   });

//   galleryTrack.addEventListener('touchend', () => {
//     if (images.length <= 1 || !moveX) return;
//     const diffX = moveX - startX;
    

//     if (Math.abs(diffX) > 50) {
//       if (diffX > 0 && currentImageIndex > 0) {
//         currentImageIndex--;
//       } else if (diffX < 0 && currentImageIndex < images.length - 1) {
//         currentImageIndex++;
//       }
//     }

//     galleryTrack.style.transition = 'transform 0.4s ease-out';
//     galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
//     updateDots();
//     startX = null;
//     moveX = null;
//   });
// }



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




const productDetails = document.body.querySelector('.product-details');
const productPrice = document.body.querySelector('.product-price');
const productNames = document.body.querySelector('.product-names');
const productGram = document.body.querySelector('.product-gram');
const productBoxCount = document.body.querySelector('.product-box-count');
const boxNumber = document.body.querySelector('.box-number');


function showProductDetails(productIdObject){

  productPrice.textContent = productIdObject.price;
  // productNames.textContent = productIdObject.galleryName;
  productNames.innerHTML = productIdObject.galleryName.replace(/\n/g, "<br>");
  productGram.textContent = productIdObject.gram;
  boxNumber.textContent = productIdObject.boxNum;
  
}