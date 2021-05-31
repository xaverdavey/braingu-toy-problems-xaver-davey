// Have the function ShortestPath(strArr) take strArr which will be an array of strings which models a non-looping Graph.
// The structure of the array will be as follows: The first element in the array will be the number of nodes N (points) in the array as a string. The next N elements will be the nodes which can be anything (A, B, C .. Brick Street, Main Street .. etc.). Then after the Nth element, the rest of the elements in the array will be the connections between all of the nodes. They will look like this: (A-B, B-C .. Brick Street-Main Street .. etc.). Although, there may exist no connections at all.
// An example of strArr may be: ["4","A","B","C","D","A-B","B-D","B-C","C-D"]. Your program should return the shortest path from the first Node to the last Node in the array separated by dashes. So in the example above the output should be A-B-D. Here is another example with strArr being ["7","A","B","C","D","E","F","G","A-B","A-E","B-C","C-D","D-F","E-D","F-G"]. The output for this array should be A-E-D-F-G.
// There will only ever be one shortest path for the array. If no path between the first and last node exists, return -1. The array will at minimum have two nodes. Also, the connection A-B for example, means that A can get to B and B can get to A.

function shortestPath(strArr) {
  const keyNum = 1 + parseInt(strArr[0]);
  var map = strArr.slice(1, keyNum);
  var paths = strArr.slice(keyNum, strArr.length);
  const pathLength = paths.length;
  for (let i = 0; i < pathLength; ++i) {
    paths.push(getTo(paths[i]) + "-" + getFrom(paths[i]));
  }
  var routes = recurse(map, paths, map[0]);
  //console.log(routes);
  if (routes.length > 0) {
    return routes[getMinPath(routes)];
  }
  return -1;
}


function recurse(map, paths, current) {
  var routes = [];

  // base case
  if (current === map[map.length - 1]) {
    return [current];
  } else if (paths.length === 0) {
    return -1;
  }

  for (let i = 0; i < paths.length; ++i) {
    if (getFrom(paths[i]) === current) {
      let newPaths = [...paths];
      newPaths.splice(i, 1);
      const furtherRoutes = recurse(map, newPaths, getTo(paths[i]));
      //console.log(furtherRoutes);
      for (let j = 0; j < furtherRoutes.length; ++j) {
        if (furtherRoutes[j] !== -1) {
          //console.log(furtherRoutes[j]);
          routes.push(getFrom(paths[i]) + "-" + furtherRoutes[j]);
        }
      }
    }
  }

  if (routes.length > 0) {
    return routes;
  }
  return -1;
}

function getFrom(path) {
  return path.split("-")[0];
}

function getTo(path) {
  return path.split("-")[1];
}

function getMinPath(routes) {
  let i;
  let minLength = Number.POSITIVE_INFINITY;
  let minIndex = -1;
  for (i = 0; i < routes.length; ++i) {
    const routeLength = routes[i].split("-").length;
    if (routeLength < minLength) {
      minLength = routeLength;
      minIndex = i;
    }
  }
  return minIndex;
}

//console.log(shortestPath(["3", "A", "B", "C", "B-C", "A-B"]));

module.exports = shortestPath;
