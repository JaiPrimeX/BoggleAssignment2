/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  
  //     CHECK CONDITIONS FOR NO NULLS
  if (!grid || !dictionary || grid.length < 1) return [];
   
  //    FIRST REMOVES ALL WORDS LESS THAN 3 CHARACTERS LONG FROM DICT
  let okWords = [];
  for(let i = 0; i < dictionary.length; i++){
    if (dictionary[i].length >= 3) {okWords.push(dictionary[i].toLowerCase()) }}
   
  //    CHECK TO MAKE SURE THERE ARE WORDS IN OKWORDS
  if (okWords.length < 1) return [];
   
  //    BUILD TRIE TO BEGIN 
  const root = buildTrie(okWords);
  
  // LOOP THROUGH MATRIX/ GRID
  for (let i = 0; i < grid.length; i++){
     for (let j = 0; j < grid[0].length; j++){
       dfs(grid,i,j,root,solutions);
     }
  }
   
   return solutions;
}

function dfs(grid,i,j,trie,solutions){
  const x = grid[i][j].toLowerCase();
  if (!trie.children.has(x)) return;
  
  trie = trie.children.get(x);
  
  if (trie.word){
    solutions.push(trie.word);
    trie.word = null;
  }
  
  grid[i][j] = " ";
  //CHECKS UP, DOWN, LEFT, RIGHT
  if (i > 0) dfs(grid,i-1,j,trie,solutions);
  if (j > 0) dfs(grid,i,j-1,trie,solutions);
  if (i < grid.length - 1) dfs(grid,i+1,j,trie,solutions);
  if (j < grid[0].length - 1) dfs(grid,i,j+1,trie,solutions);
  //CHECKS DIAGANOLS
  if (i > 0 && j > 0) dfs(grid,i-1,j-1,trie,solutions);
  if (i > 0 && j < grid[0].length - 1) dfs(grid,i-1,j+1,trie,solutions);
  if (i < grid.length - 1 && j > 0) dfs(grid,i+1,j-1,trie,solutions);
  if (i < grid.length - 1 && j < grid[0].length - 1) dfs(grid,i+1,j+1,trie,solutions);
  
  grid[i][j]=x;
  
  
}

  //    TRIE NODE WILL BE USED TO BUILD TRIE
class trieNode{
    constructor(){
      this.word = null; //Keeps track of word
      this.children = new Map() //Maps out characters 
    }
}
  
  //    BUILD TRIE WITH OKWORDS FUNCTION
function buildTrie(words) {
    const root = new trieNode();
    
    words.forEach(word =>{
      let node = root;
      
      for (let i=0; i < word.length; i++){
        let c = word[i];
        // CHECK FOR QU AND ST TILES, COMBINE FOR TRIE
        if (c == "q"){i++;c = "qu";}
        if (c == "s"){i++;c = "st";}
        
        if(!node.children.has(c)) {node.children.set(c, new trieNode())};
        node = node.children.get(c);
      }
      
      node.word = word;
    })
    
     return root;
}


/*var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];*/

//console.log(exports.findAllSolutions(grid, dictionary));

// ** SOURCES CITED ** //
//“Boggle: Set 2 (Using Trie).” GeeksforGeeks, 18 Aug. 2021, www.geeksforgeeks.org/boggle-set-2-using-trie/. 
//“Data Structures 101: Advanced Data Structures in JavaScript.” Educative, www.educative.io/blog/data-structures-tutorial-advanced. 
//“Trie: (Insert and Search).” GeeksforGeeks, 11 Aug. 2021, www.geeksforgeeks.org/trie-insert-and-search/. 

