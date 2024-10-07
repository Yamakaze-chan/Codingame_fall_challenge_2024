/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

//Alternative functions
function compare2Arrs(a1,a2) {
    return a1.every((v,i)=> v === a2[i]);
}

function includesArr(arr, search) {
    return arr.some(row => compare2Arrs(row,search));
}

function getFrequencies(arr) {

    let obj = {}; 
  
    for (let i=0; i<arr.length; i++){
      let element = arr[i]; 
  
      // check if key exists in object already
  
      // if it exists, add 1 to the value
      if (obj[element] !== undefined){
        obj[element] += 1;
      }
  
      // if it does not exist, add 1 to setup future elements
      else {
        obj[element] = 1; 
      }
    }
    return obj
}

function getMaxDistribution(obj) {
    return Math.max(...Object.values(obj))
}

function distance2Points(p1, p2) {
    return Math.sqrt((parseInt(p2.x)-parseInt(p1.x))**2 + (parseInt(p2.y) - parseInt(p1.y))**2)
}

function distancePointLine(point, from_point, to_point) {
    var x = point.x
    var y = point.y
    var x1 = from_point.x
    var y1 = from_point.y
    var x2 = to_point.x
    var y2 = to_point.y
        
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq != 0) //in case of 0 length line
        param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

function pointOnSegment(A, B, C) {
    epsilon = 0.0000001
    return (-epsilon < distance2Points(B, A) + distance2Points(A, C) - distance2Points(B, C) < epsilon)
}

function orientation(p1, p2, p3) {
    prod = (parseInt(p3.y)-parseInt(p1.y)) * (parseInt(p2.x)-parseInt(p1.x)) 
    - (parseInt(p2.y)-parseInt(p1.y)) * (parseInt(p3.x)-parseInt(p1.x))
    return Math.sign(prod)
}

function segmentsIntersect(A, B, C, D) {
    return orientation(A, B, C) * orientation(A, B, D) < 0 && orientation(C, D, A) * orientation(C, D, B) < 0
}

function middleBuildings(buildings, from, to){
    return [...buildings.values()].filter((a) => +from.x <= +a.x && +a.x <= +to.x && +from.y <= +a.y && +a.y <= +to.y)
}

function splitTube(A, B, MiddlePointsList){
    MiddlePointsList.sort((a, b) => distancePointLine(a, A, B) - distancePointLine(a, A, B))
    console.error("MiddlePointsList2",MiddlePointsList)
    for(let point of MiddlePointsList){
        
    }
}
//end of alternative functions

let astronaults = [] 
let landing_pads = []
let buildings = new Map()
let building_locations = new Map()
let pod_index = 0
let existed_tube = []




// game loop
while (true) {
    result = ""
    let resources = parseInt(readline());
    console.error("resources:", resources)
    const numTravelRoutes = parseInt(readline());
    let travel_routes = [];
    for (let i = 0; i < numTravelRoutes; i++) {
        var inputs = readline().split(' ');
        const buildingId1 = inputs[0];
        const buildingId2 = inputs[1];
        const capacity = parseInt(inputs[2]);
        console.error("TravelRoutes",i,":", inputs)
        travel_routes.push([buildingId1, buildingId2])
    }
    const numPods = parseInt(readline());
    for (let i = 0; i < numPods; i++) {
        const podProperties = readline();
        console.error("podProperties:", podProperties)
    }
    const numNewBuildings = parseInt(readline());
    for (let i = 0; i < numNewBuildings; i++) {
        const buildingProperties = readline().split(' ');
        //save building location
        building_locations.set(
            buildingProperties[1], {
                "x":buildingProperties[2], 
                "y":buildingProperties[3],
                "connected_tube" : 0}
            )
        // Save landing pads information
        if(buildingProperties[0] == '0') {
            landing_pads.push({
                "id" : buildingProperties[1],
                "type" : buildingProperties[0],
                "x" : buildingProperties[2],
                "y" : buildingProperties[3],
                "astronaults" : buildingProperties.slice(5)
            })
        }
        else {
            // save buildings location
            if(buildings.has(buildingProperties[0])){
                let temp_building_data = buildings.get(buildingProperties[0])
                temp_building_data.push({
                    "id" : buildingProperties[1],
                    "x" : buildingProperties[2],
                    "y" : buildingProperties[3]
                })
                buildings.set(buildingProperties[0], temp_building_data)
            }
            else {
                buildings.set(buildingProperties[0], [{
                    "id" : buildingProperties[1],
                    "x" : buildingProperties[2],
                    "y" : buildingProperties[3]
                }])
            }
        }
    }
    //Sort landing pads based on type of astronaults 
    landing_pads.sort((a,b)=> [...new Set(a.astronaults)].length - [...new Set(b.astronaults)].length ||
        getMaxDistribution(getFrequencies(b.astronaults)) - getMaxDistribution(getFrequencies(a.astronaults)))
    // console.error("buildings", landing_pads)

    // Get most frequencies type of each pad
    sorted_on_dis_types = []
    for(let landing_zone of landing_pads){
        for(let key_type of Object.keys(getFrequencies(landing_zone.astronaults))) {
        sorted_on_dis_types.push([{
            'id': landing_zone.id,
            'type': key_type
        }, getFrequencies(landing_zone.astronaults)[key_type] ])
        }
    }
    sorted_on_dis_types.sort((a, b)=> b[1] - a[1])
    // console.error(sorted_on_dis_types)
    for (let info of sorted_on_dis_types) {
        pad = landing_pads.filter(a => a.id === info[0].id)[0]
        let temp_distance2Points = Infinity
        let to_building;
            // console.error(buildings, astronault_type)
            temp_distance2Points = Infinity
            for(let building of buildings.get(info[0].type)){
                // console.error("aaaa",temp_distance2Points,info[0].type, distance2Points(pad, building), building)
                if(temp_distance2Points > distance2Points(pad, building)) {
                    temp_distance2Points = distance2Points(pad, building)
                    to_building = building
                }
            }
            // console.error(middleBuildings(building_locations, pad, to_building))
            splitTube(pad, to_building, middleBuildings(building_locations, pad, to_building))
            let no_building = true;
            let no_tube = true;
            if(to_building) {
                for (let b of middleBuildings(building_locations, pad, to_building)) {
                    if(pointOnSegment({"x": b[0], "y": b[1]}, pad, to_building)) 
                        no_building = false
                }
                for (let tube of travel_routes) {
                    console.error("inside",Object.values(building_locations.get(tube[0])))
                    if(segmentsIntersect(pad, to_building, Object.values(building_locations.get(tube[0])), Object.values(building_locations.get(tube[1]) ))) 
                        no_tube=false
                }
                if(temp_distance2Points != Infinity && no_building && no_tube && !includesArr(travel_routes, [pad.id.toString(), to_building.id.toString()]) ) {
                    console.error(to_building)
                    existed_tube.push([pad.id, to_building.id])
                    // console.error(resources, temp_distance2Points , 1000)
                    if(resources >= (temp_distance2Points*10) + 1000) {
                        resources = resources - (temp_distance2Points*10) - 1000
                        result+= "TUBE "+ pad.id + " " + to_building.id + ";" + "POD " + pod_index + " " + pad.id + " " + to_building.id +" "+ pad.id +"; "
                        pod_index++;
                    }
                }
            }
    }

    console.log(result!=""?result:"WAIT");
                // "TUBE 0 28; TUBE 0 27;TUBE 0 26;TUBE 0 25;TUBE 0 24;TUBE 0 23"
     // TUBE | UPGRADE | TELEPORT | POD | DESTROY | WAIT
//     console.log("TUBE "+ '121' + " " + '11' + ";" + "POD " + '0' + " " + '121' + " " + '11' +" "+ '121' +"; " +
// "TUBE "+ '122' + " " + '11' + ";" + "POD " + '1' + " " + '122' + " " + '11' +" "+ '122' +"; " +
// "TUBE "+ '11' + " " + '113' + ";" + "POD " + '2' + " " + '11' + " " + '113' +" "+ '11' +"; "

//     )
    result = ""

}
