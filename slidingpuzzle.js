//Objective is, given a 2 x 3 matrix of values from 0 to 5, to find the 
//minimum number of swaps required to get the matrix to be '123450' from 
//top left to bottom right. Only 0 can be swapped.

let board = 
[[3,2,4],
 [1,5,0]]


//O(RC * (RC)!) where R and C are the number of rows and columns respectively
//There are (RC)! number of board states
//We use a BFS solution where we check every puzzle after performing a step

let target = '123450'

//These represent the swaps that 0 can take, index wise
let directions = [[1,3], [0,2,4], [1,5], [0,4], [1,3,5], [2,4]]
let steps = 0

//Fill up the start string
let start = ''
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
        start += board[i][j]
    }
}

let queue = []
queue.push(start)
let visited = new Set()
visited.add(start)

while (queue.length > 0) {
    
    //Inner loop for each step
    let length = queue.length
    for (let i = 0; i < length; i++) {
        let curr = queue.shift()
        if (curr == target) {
            return steps
        }
        
        let index = curr.indexOf('0')
        for (let dir of directions[index]) {
            let nextPuzzle = swap(curr, index, dir)
            
            if (!visited.has(nextPuzzle)) {
                visited.add(nextPuzzle)
                queue.push(nextPuzzle)
            }
        }
    }
    
    steps++
}

function swap(string, i, j) {
    let tempArr = string.split('')
    let temp = tempArr[i]
    tempArr[i] = tempArr[j]
    tempArr[j] = temp
    
    return tempArr.join('')
}

return -1