const fs = require('fs');



// const graph = [
//     [
//         {
//             to: 1,
//             weight: 2
//         },
//         {
//             to: 4,
//             weight: 1
//         },
//         {
//             to: 3,
//             weight: 7
//         }
//     ],
//     [
//         {
//             to: 0,
//             weight: 2
//         },
//         {
//             to: 3,
//             weight: 5
//         },
//         {
//             to: 2,
//             weight: 7
//         }
//     ],
//     [
//         {
//             to: 3,
//             weight: 1
//         },
//         {
//             to: 1,
//             weight: 7
//         }
//     ],
//     [
//         {
//             to: 2,
//             weight: 1
//         },
//         {
//             to: 1,
//             weight: 5
//         },
//         {
//             to: 0,
//             weight: 7
//         }
//     ],
//     [
//         {
//             to: 3,
//             weight: 3
//         },
//         {
//             to: 0,
//             weight: 1
//         }
//     ]
// ];


function calculateShortestPath(path, startNode) {
    fs.readFile(path, "utf-8", (error, data) => {
        let fileData = data.split('\n');
        const graphLenght = parseInt(fileData[0]);
        fileData.splice(0, 1);

        var graph = new Array(graphLenght);
        // graph.fill(new Array(), 0);
        for(let i=0 ; i<graphLenght; ++i)
        {
            graph[i]=[];
        }


        fileData.forEach(vertex => {
            let [from, to, weight] = vertex.split(' ');
            graph[parseInt(from)].push(
                {
                    to: parseInt(to),
                    weight: parseInt(weight)
                }
            );
        });

        let distance=dijsktra(graph,startNode);
        graph.forEach( (vertex,index) => {
        console.log(`The shortest path from vertex ${startNode} to ${index} is ${distance[index]}`);
    });
    })

    
}



function dijsktra(graph, s) {

    let adj = JSON.parse(JSON.stringify(graph))
    let numberOfVertices = adj.length;


    let distance = new Array(numberOfVertices);
    distance.fill(Infinity, 0);
    distance[s] = 0;

    let visited = new Array(numberOfVertices);
    visited.fill(false, 0);


    let res = [];

    for (let i = 0; i < numberOfVertices; ++i) {

        let u = -1;
        for (let j = 0; j < numberOfVertices; ++j) {
            if ((u === -1 || distance[u] > distance[j]) && !visited[j]) {
                u = i;
            }
        }

        graph[u].forEach(edge => {
            if (distance[edge.to] > distance[u] + edge.weight) {
                distance[edge.to] = distance[u] + edge.weight;
            }
        });
        visited[u] = true;
    }

    return distance;
}


calculateShortestPath('graph.txt', 0);


