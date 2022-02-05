import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Dish } from './dish';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dishes = [
      { 
        id: 1, 
        name: 'Moussaka',
        cuisine: ["grecka", "międzynarodowa"],
        category: ["danie główne", "danie mięsne", "kolacja"],
        ingredients: ["bakłażan", "pomidor", "ser feta", "sos beszamelowy", "cukinia", "mięso", "ser żółty"],
        maxDailyAmount: 10,
        price: 32.90,
        description: "Musaka – zapiekanka przygotowywana na bazie bakłażana, pomidorów oraz mielonego mięsa; danie popularne w kuchni greckiej. Górną warstwę dania stanowi sos beszamelowy posypany żółtym serem.",
        photos: [
          "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/E1B3D92D-2117-4C0F-A306-0BA4CD84E95D/Derivates/90fcefef-4b29-4cf7-b1ad-7aa4faf9b5e8.jpg",
          "https://static.gotujmy.pl/ZDJECIE_GALERIA_B/moussaka-wersja-kretenska-33846.jpg",
          "https://www.196flavors.com/wp-content/uploads/2016/01/moussaka-4.jpg"
        ]
      },
      { 
        id: 2, 
        name: 'Pierogi ruskie',
        cuisine: ["polska", "tradycyjna", "regionalna"],
        category: ["danie główne", "danie wegetariańskie", "kolacja"],
        ingredients: ["mąka", "gluten", "ser twaróg", "ziemniaki", "cebula"],
        maxDailyAmount: 15,
        price: 24.90,
        description: "popularny w Polsce i na Ukrainie rodzaj pierogów, których nazwa wywodzi się od Rusi Czerwonej. Nie należy jej mylić, jak to często jest robione, z Rosją, gdzie ten typ pierogów nie jest zbyt dobrze znany, ponieważ były bardzo popularne wśród Polaków mieszkających na terenach Rusi",
        photos: [
          "https://static.smaker.pl/photos/3/c/0/3c0a896d87c9bfb62984235bcdfdf685_350177_618fbfaa19d26_wm.jpg",
          "https://www.przyslijprzepis.pl/media/cache/gallery_view/uploads/media/recipe/0008/16/pierogi-ruskie.jpeg"
        ]
      },
      { 
        id: 3, 
        name: 'Pizza Quattro Formaggi',
        cuisine: ["włoska", "międzynarodowa"],
        category: ["danie główne", "pizza", "kolacja"],
        ingredients: ["mąka", "gluten", "ser parmezan", "ser peccorino", "ser grane padane", "ser ricotta", "pomidory", "cebula"],
        maxDailyAmount: 20,
        price: 34.90,
        description: "Pizza włoska na cieńkim cieście",
        photos: [
          "https://www.stonerchef.pl/wp-content/uploads/2018/03/wykonczona-pizza-cztery-sery.jpg",
          "https://www.stonerchef.pl/wp-content/uploads/2018/03/pizza-buffalo-cztery-sery.jpg",
          "https://prostepesto.pl/wp-content/uploads/2021/09/pizza-quattro-formaggi.jpg"
        ]
      },
      { 
        id: 4, 
        name: 'Curry z soczewicy',
        cuisine: ["indyjska"],
        category: ["danie główne", "danie wegetariańskie", "danie ostre"],
        ingredients: ["Soczewica czerwona", "mleko kokosowe", "imbir", "czosnek", "bulion warzywny"],
        maxDailyAmount: 30,
        price: 36.90,
        description: "Curry z soczewicy to wspaniała opcja dla wszystkich miłośników roślinnych przepisów. Całość jest niezwykle smaczna, łatwa w przygotowaniu a przy tym pożywna.",
        photos: [
          "https://static.fajnegotowanie.pl/media/uploads/media_image/auto/recipe-content/3580/desktop/curry-z-soczewicy.jpg.webp"
        ]
      },
      { 
        id: 5, 
        name: 'Samosy',
        cuisine: ["indyjska", "grab & go"],
        category: ["danie główne", "danie wegetariańskie", "danie ostre"],
        ingredients: ["Mąka pszenna", "cebula", "imbir korzeń", "czosnek", "papryczka chilli", "sok z cytryny", "groszek zielony"],
        maxDailyAmount: 30,
        price: 36.90,
        description: "Samosy to indyjskie, smażone pierożki z wyśmienitym aromatycznym farszem. Mogą być przygotowane z farszem wegetariańskim lub mięsnym.",
        photos: [
          "https://static.fajnegotowanie.pl/media/uploads/media_image/auto/recipe-content/2396/desktop/samosy.jpg.webp"        ]
      },
      { 
        id: 6, 
        name: 'Wegańskie Curry',
        cuisine: ["indyjska", "wegańska"],
        category: ["danie główne", "danie wegańskie", "danie ostre"],
        ingredients: ["Cukinia", "cebula", "Olej rzepakowy", "czosnek", "papryczka chilli", "sok z cytryny", "soczewica czerwona"],
        maxDailyAmount: 30,
        price: 38.90,
        description: "Takie curry to wspaniałe, jednogarnkowe danie wegańskie, w którym pierwsze skrzypce grają soczewica i cukinia",
        photos: [
          "https://static.fajnegotowanie.pl/media/uploads/media_image/auto/recipe-content/3408/desktop/AdobeStock_242743136.jpeg.webp"
        ]
      },
      { 
        id: 7, 
        name: 'Creme brulee',
        cuisine: ["francuska"],
        category: ["deser", "na słodko"],
        ingredients: ["Śmietanka", "żółtka z jaj", "cukier skarmelizowany", "laska wanilii", "mleko"],
        maxDailyAmount: 50,
        price: 18.90,
        description: "Podstawą cremu brulee stanowi śmietanka, żółtka i cukier. Charakteru dodają mu różnorodne dodatki – najczęściej jest to laska wanilii, choć niekiedy także czekolada lub owoce. Podawany w kokilkach smakuje najwyborniej, gdy krem ze śmietanki i jajek jest mocno schłodzony, a skarmelizowany na wierzchu cukier jeszcze ciepły.",
        photos: [
          "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/creme-brulee.jpg"
        ]
      },
      { 
        id: 8, 
        name: 'Quiche lorraine',
        cuisine: ["francuska"],
        category: ["danie główne", "kolacja"],
        ingredients: ["boczek", "cebula", "śmietana"],
        maxDailyAmount: 30,
        price: 36.90,
        description: "Quiche lorraine – placek lotaryński – to słynna na całym świecie francuska tarta ze słonego ciasta kruchego z wytrawnym nadzieniem, które stanowi połączenie śmietany, boczku i cebuli. Quiche lorraine podaje się jako zimną przystawkę, jednak najlepiej smakuje na ciepło jako danie główne.",
        photos: [
          "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/quiche-lorraine.jpg"
        ]
      },
      { 
        id: 9, 
        name: 'Małże (mule)',
        cuisine: ["francuska", "międzynarodowa"],
        category: ["danie główne", "kolacja", "owoce morza"],
        ingredients: ["małże (mule)", "czosnek", "wino białe", "natka pietruszki", "pieprz"],
        maxDailyAmount: 20,
        price: 42.95,
        description: "Małże to kolejne popularne danie kuchni francuskiej. We Francji mule hodowane są głównie na wybrzeżach Bretanii jak i na terenie francuskiego Kraju Basków. Tradycyjne mules a la mariniere gotuje się w białym winie z drobno posiekaną cebulką i pieprzem nazywane.",
        photos: [
          "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/malze-mule.jpg",
          "https://static.smaker.pl/photos/f/f/5/ff53b006419947b350cef2064004e036_377731_5f4d49ca9188a_wm.jpg",
          "https://www.servingdumplings.com/wp-content/uploads/2020/09/mussels-w-spicy-miso-hero-9ee0861a.jpg",
          "https://rybyswiata.pl/wp-content/uploads/2014/02/mule-po-tajsku-1024x768.jpg"
        ]
      },
      { 
        id: 10, 
        name: 'Deska serów francuskich',
        cuisine: ["francuska", "wegetariańska"],
        category: ["przystawka", "śniadanie", "sery"],
        ingredients: ["ser camembert", "ser brie", "ser pleśniowy"],
        maxDailyAmount: 60,
        price: 40.99,
        description: "Francja słynie z doskonałej jakości sera. Oficjalnie wyróżnia się ponad 400 różnych gatunków sera. Każdy region ma przy tym swoje specjały. Najsłynniejsze francuskie sery to camembert, brie i roquefort (ser z niebieską pleśnią z mleka owczego). Podawane są na półmiskach z dodatkiem orzechów, fig, winogron, bagietek i wina.",
        photos: [
          "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/sery-francuskie.jpg",
          "https://blog.placfrancuski.pl/wp-content/uploads/2021/04/francuskie-sery-sklep.png",
          "https://i0.wp.com/madameberet.com/wp-content/uploads/2019/10/Francuskie-sery-na-talerzu.jpg?w=700&ssl=1"

        ]
      },
      { 
        id: 11, 
        name: 'Eklerki',
        cuisine: ["francuska"],
        category: ["deser", "na słodko"],
        ingredients: ["krem bezowy", "krem budyniowy", "krem śmietankowy", "czekolada deserowa", "czekolada biała", "czekolada gorzka", "bita śmietana"],
        maxDailyAmount: 40,
        price: 10.90,
        description: "Te podłużne ciastka, wykonane z parzonego ciasta i wypełnione smacznym kremem, pochodzą właśnie z Francji. Ich nazwa wywodzi się od słowa „eclair” – błyskawica. Nic dziwnego – są one tak smakowite, że błyskawicznie znikają ze stołów.",
        photos: [
          "https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/eklerki.jpg",
          "https://ciastkozercy.pl/wp-content/uploads/2016/10/eklerki-16.jpg",
          "https://static.mojewypieki.com/wp-content/uploads/2020/03/Eklerki_tiramisu_1.jpg"

        ]
      },
      { 
        id: 12, 
        name: 'Stek wołowy z antrykotu',
        cuisine: ["międzynarodowa", "amerykańska"],
        category: ["danie główne", "danie mięsne"],
        ingredients: ["stek wołowy z antrykotu", "masło klarowane", "tymianek", "rozmaryn"],
        maxDailyAmount: 10,
        price: 52.00,
        description: "Najwyższej jakości mięso wołowe z antrykotu podane w asyście ziołowej. Delikatny smak wydobyty dzięki dodatkowi masła klarowanego. Wyjątkowo pożywne.",
        photos: [
          "https://media.kaufland.com/images/PPIM/AP_Content_1010/std.lang.all/71/16/Asset_9007116.jpg",
          "https://ocdn.eu/pulscms-transforms/1/pGBk9kqTURBXy9kMTA5YTdiMjgyMmY4MzEzYzQyMTAxNzgwNjU3N2JkMC5qcGVnk5UDAMzCzQPozQIzkwXNAxTNAbyTCaY0ZTY4MzAGgaEwBQ/jak-przygotowac-perfekcyjny-stek-z-kratka-oto-przepis.webp",
          "https://cdn.galleries.smcloud.net/t/galleries/gf-33d7-byRj-XLaB_steki-664x442-nocrop.jpg"
        ]
      },
      { 
        id: 13, 
        name: 'Śniadanie angielskie',
        cuisine: ["międzynarodowa", "angielskie"],
        category: ["śniadanie"],
        ingredients: ["jajka sadzone", "fasolka biała", "pieczywo pszenne", "pieczywo w formie tostowej", "szalotka", "ketchup", "frankfuterki", "kiełbasa z szynki", "pomidor", "przecier pomidorowy"],
        maxDailyAmount: 100,
        price: 25.90,
        description: "Śniadanie angielskie to tradycyjnie kiełbaski, bekon, kaszanka, grzyby, połówka pomidora, fasolka w sosie pomidorowym i jajka sadzone lub jajecznica. Do tego tosty z masłem.",
        photos: [
          "https://cdn.aniagotuje.com/pictures/articles/2021/08/18112286-v-1080x1080.jpg",
          "https://praktykulinarni.com/wp-content/uploads/2018/11/sniadanie-angielskie.jpg",
          "https://akademiasmaku.pl/upload/vademecums/764/big/desktop/jak-zrobic-angielskie-sniadanie-764.webp"
        ]
      },
      { 
        id: 14, 
        name: 'Rosół z kury',
        cuisine: ["polska"],
        category: ["zupa"],
        ingredients: ["mięso z kury", "marchewki", "ziemniaki", "seler", "włoszczyzna", "przypalona cebula", "natka pietruszki", "liść laurowy", "ziele angielskie", "por"],
        maxDailyAmount: 15,
        price: 9.90,
        description: "Rosół! Temat rzeka! W naszym kraju to danie traktowane jest jako dobro narodowe! Leczy smutki, niestrawność, grypę i przeziębienie. Polecana jest w każdym wieku.",
        photos: [
          "https://ocdn.eu/pulscms-transforms/1/Ofqk9kpTURBXy85MDI1NjNmMTljNzFmYTI2ZGE4Y2E4MzA1YjZjZThkNS5qcGeTlQMAJ80E5s0CwZMFzQMUzQG8kwmmNjEwYjEzBoGhMAU/rosol.webp",
          "https://kuron.com.pl/wp-content/uploads/2017/11/PA311594-ma%C5%82e-1.jpg.webp"
        ]
      }
    ];
    return {dishes};
  }

  constructor() { }

  genId(dishes: Dish[]): number {
    return dishes.length > 0 ? Math.max(...dishes.map(dish => dish.id)) + 1 : 1;
  }
}
