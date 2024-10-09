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
    return Math.sqrt((+(p2.x)-+(p1.x))**2 + (+(p2.y) - +(p1.y))**2)
}

function distancePointLine(point, from_point, to_point) {
    var x = +point.x
    var y = +point.y
    var x1 = +from_point.x
    var y1 = +from_point.y
    var x2 = +to_point.x
    var y2 = +to_point.y
        
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
    if (distance2Points(A, B) + distance2Points(A, C) == distance2Points(C, B))
        return true;
    return false;
}

function segmentsIntersect(A, B, C, D) {
    let a = +A.x
    let b = +A.y
    let c = +B.x
    let d = +B.y
    let p = +C.x
    let q = +C.y
    let r = +D.x
    let s = +D.y
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

function middleBuildings(buildings, from, to){
    return buildings.filter((a) => Math.min(+from.x, +to.x) < +a.x && +a.x < Math.max(+from.x, +to.x)
        && Math.min(+from.y, +to.y) < +a.y && +a.y < Math.max(+from.y, +to.y))
}

function getMonomial(A, B) {
    var slope = (+B.y - +A.y) / (+B.x - +A.x);
    return slope===Infinity || slope===-Infinity?("(y - "+ A.y+")"): (slope + "*(x - "+A.x+") - (y - "+ A.y+")")
}

function getSide(point, line){
    return eval(line.replaceAll('x', point.x).replaceAll('y', point.y))>0?1:(eval(line.replaceAll('x', point.x).replaceAll('y', point.y))<0?-1:0)
}

function totalDistance(path) {
    let dis = 0
    for(let i = 0; i< path.length-1; i++){
        dis+= distance2Points(path[i], path[i+1])
    }
    return dis
}

function splitTube(A, B, MiddlePointsList, resources, existed_tubes){
    MiddlePointsList.sort((a, b) => distancePointLine(a, A, B) - distancePointLine(b, A, B) || +a.x - +b.x || +a.y - +b.y)
    // let split_to = 2
    // if(MiddlePointsList.length !=0){
    //     let monomial_line = getMonomial(A, B)
    //     let first_ele = MiddlePointsList.shift()
    //     let get_side = getSide(first_ele, monomial_line)
    //     MiddlePointsList = MiddlePointsList.filter(a => getSide(a, monomial_line) == get_side)
    // }
    let dir = [1, 1]
    if(+A.x > +B.x) dir[0] = -1
    if(+A.y > +B.y) dir[1] = -1
    console.error("existed_tube:", existed_tube)
    let alternativeMiddlePoint = [MiddlePointsList.at(0), MiddlePointsList.at(1)].sort((a,b)=> (+a.x - +b.x)*dir[0] || (+a.y - +b.y)*dir[1])
    let path = [A].concat(alternativeMiddlePoint).concat([B])
    for(let i = 0; i< path.length-1; i++){
        for(let tube of existed_tubes) {
            if(segmentsIntersect(tube[0],tube[1],path[i],path[i+1])) {
                // console.error("existed_tube:", tube[0].id,tube[1].id,path[i].id,path[i+1].id)
                // console.error("tube0:", tube[0].id,"tube1:", tube[1].id)
                alternativeMiddlePoint.splice(alternativeMiddlePoint.indexOf(path[i])+1, 0, tube[0])
                path = [A].concat(alternativeMiddlePoint).concat([B])
                // for(j=0; j<path.length; j++){
                //     console.error(path[j].id)
                // }
                // console.error("******")
                // console.error(tube[0].id,tube[1].id,path.at(-2).id,path.at(-1).id)
            }
        }
    }
    for(z=0; z<path.length; z++){
        console.error(path[z].id)
    }
    console.error("WWWWWWW")
    for(let j = 0; j< path.length-1; j++){
        console.error(path[j].id, path[j+1].id, MiddlePointsList)
        let temp_MiddlePointsList = middleBuildings(MiddlePointsList, path[j], path[j+1])
        console.error(temp_MiddlePointsList, path[j].id, path[j+1].id)
        for (let b of temp_MiddlePointsList){
            if(pointOnSegment(b, path[j], path[j+1])) {
                console.error(b.id, path[j].id, path[j+1].id)
                alternativeMiddlePoint.splice(alternativeMiddlePoint.indexOf(path[j])+1, 0, b)
                path = [A].concat(alternativeMiddlePoint).concat([B])
            }
        }
    }
    for(z=0; z<path.length; z++){
        console.error(path[z].id)
    }
    console.error("_________")
    return path
}

function generateTubeAndPod(path, pod_index) {
    let return_path = ""
    let pod_path = [path[0].id]
    for(let i = 0; i < path.length-1; i++){
        if(path[i].id != path[i+1].id){
            return_path += "TUBE "+ path[i].id + " " + path[i+1].id + ";";
            pod_path.push(path[i+1].id)
        }
    
    }
    let reverse_pod_path = [].concat(pod_path).reverse();
    reverse_pod_path.shift()
    return_path += "POD " + pod_index + " " + pod_path.concat(reverse_pod_path).join(' ') +"; "
    // console.error(return_path)
    return return_path
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
    landing_pads = []
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
                "id" : buildingProperties[1],
                "x":buildingProperties[2], 
                "y":buildingProperties[3], 
                "connected_tube": 0}
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
    landing_pads = [...new Set(landing_pads)]
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
        let to_building =  undefined;
        // console.error(buildings, astronault_type)
        for(let building of buildings.get(info[0].type)){
            // console.error("aaaa",temp_distance2Points,info[0].type, distance2Points(pad, building), building)
            if(temp_distance2Points > distance2Points(pad, building)) {
                temp_distance2Points = distance2Points(pad, building)
                to_building = building
            }
        }
            // console.error("existed_tube:",existed_tube)
            // console.error(middleBuildings([...building_locations.values()], pad, to_building))
            path = splitTube(pad, to_building, [...building_locations.values()], resources, existed_tube)
            for(let z = 0; z<path.length-1; z++){
                if(path[z].id != path[z+1].id) {
                    existed_tube.push([path[z], path[z+1]])
                }
            }
            existed_tube = [...new Set(existed_tube)]
            if(path && resources >= (totalDistance(path)*10) + 1000) {
                resources = resources - (totalDistance(path)*10) - 1000
                // result+= "TUBE "+ pad.id + " " + to_building.id + ";" + "POD " + pod_index + " " + pad.id + " " + to_building.id +" "+ pad.id +"; "
                result += generateTubeAndPod(path, pod_index)
                pod_index++;
            }
            else break
                // }
    }

    console.log(result!=""?result:"WAIT");
    path = []
                // "TUBE 0 28; TUBE 0 27;TUBE 0 26;TUBE 0 25;TUBE 0 24;TUBE 0 23"
     // TUBE | UPGRADE | TELEPORT | POD | DESTROY | WAIT
//     console.log("TUBE "+ '121' + " " + '11' + ";" + "POD " + '0' + " " + '121' + " " + '11' +" "+ '121' +"; " +
// "TUBE "+ '122' + " " + '11' + ";" + "POD " + '1' + " " + '122' + " " + '11' +" "+ '122' +"; " +
// "TUBE "+ '11' + " " + '113' + ";" + "POD " + '2' + " " + '11' + " " + '113' +" "+ '11' +"; "

//     )
    result = ""

}
