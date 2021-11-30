
var brand="";
var rat=0;
var feed=0;
var vol=0;
var kcalg=0;
var rdispg=0;
var gscoop=0;
var gtsp=0;


const dict = {'Elecare for Infants': [4.76, 0.74, 9.4, 2.4], 'Puramino': [5.0, 0.77, 4.5, 2.4],
'Pregestimil': [5.0, 0.78, 8.9, 2.7], 'Alfamino Infant': [4.94, 0.72, 4.7, 2.3], 
'Alfamino Jr': [4.60, 0.73, 5.2, 2.6], 'GentlePro': [5.12, 0.76, 8.7, 2.2], 
'Puramino Jr': [4.9, 0.75, 6.8, 2.3], 'NeuroPro Enfacare': [5.0, 0.78, 9.8, 2.2],
'Natura': [4.99, 0.74, 9, 2.3], 'Similac Neosure': [5.14, 0.76, 9.6, 2.1]}


function receiveBrand() {
    brand = document.querySelector("#brand").value;
    rat = document.querySelector("#rat").value;
    feed = document.querySelector("#feed").value;
    vol = document.querySelector("#vol").value;
    if (brand=="Select") {
        brandError()
    }
    else if (rat=="") {
        ratError()
    }
    else if (feed=="") {
        feedError()
    }
    else if (vol=="") {
        volError()
    }
    else {
        kcalg = dict[brand][0];
    rdispg = dict[brand][1];
    gscoop = dict[brand][2];
    gtsp = dict[brand][3];
    calculate(rat,feed,vol);
    }
}

function roundHalf(num) {
    return Math.round(num * 2) / 2;
}

function calculate(rat,feed,vol) {
    
    let tvol = vol*feed;
    let f_gpoz = rat / kcalg;
    
    let total_fg = (f_gpoz / 29.5735) * tvol;
    
    let dispg = 0.74 * total_fg;
    let total_water = tvol - dispg; //ml of water needed for total
    
    let oz_water = (tvol - dispg)/29.5735;
    
    let roz_water = roundHalf(oz_water); //rounded half ounce water needed
    let rtvol = roundHalf(tvol/29.5735); //rounded approximation of total ounces produced
    let uscoops = total_fg / gscoop;
    let scoops = 0;
    let tsp = 0;
    
    if (Math.floor(total_fg/gscoop) <= 0) {
        scoops = Math.round(uscoops);
    }
    
    if ((total_fg % gscoop) != 0) {
        scoops = Math.floor(total_fg / gscoop); //scoops needed
        tsp = Math.round((total_fg % gscoop) / gtsp); //teaspoons needed
    }

    meas = scoops + " scoops of formula";
    if (tsp>0) {
        meas = scoops + " scoops and " + tsp + " teaspoons of formula"
    }

    if (tsp==1) {
        meas = scoops + " scoops and " + tsp + " teaspoon of formula"
    }
    
    document.getElementById("outputinfo1").innerHTML = "For " + brand + " " + rat + " kcal/oz,";
    document.getElementById("outputinfo2").innerHTML = meas;
    document.getElementById("outputinfo3").innerHTML = "and";
    document.getElementById("outputinfo4").innerHTML = roz_water + " oz of water";
    document.getElementById("outputinfo5").innerHTML = "produce " + roundHalf(feed*vol/29.5735) + " oz of total formula mixture over a total of " + feed + " feedings";
}

function brandError() {
    alert("Please select a valid brand.")
}

function ratError() {
    alert("Please enter a valid ratio.")
}

function feedError() {
    alert("Please select a valid number of feedings.")
}

function volError() {
    alert("Please select a valid final volume.")
}

/* summary of the variables: 
 * "Total formula amount produced: ", tvol, "ml = ~" rtvol "oz"
 * brand, rat, "kcal/oz recipe for", feed, "feedings (vol "ml per feeding")"
 * "Amount of formula needed:" scoops, "scoops, " tsp "teaspoons"
 * "Amount of water needed:" roz_water "ounces"
 */