const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {
    
    test('Normal case 4x5', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['E', 'St', 'O', 'C'],
                    ['I', 'J', 'K', 'L'],
                    ['D', 'N', 'E', 'P'],
                    ['A','T','R','Z']];
      let dictionary = ['Cajin','Stock','Stack','Quack','Kelp','Date','Help', 'Ate'];
      let expected = ['Stock','Stack','Quack','Kelp','Date','Ate'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    test('No Solutions', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['E', 'St', 'O', 'C'],
                    ['I', 'J', 'K', 'L'],
                    ['', 'N', 'E', 'P']];
      let dictionary = ['I','Am','Testing','Qu','Pens'];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  
  describe('Problem contraints', () => {
    
    test('No duplicates', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['Qu', 'A', 'C', 'k'],
                    ['I', 'J', 'K', 'L'],
                    ['T', 'N', 'E', 'P']];
      let dictionary = ['Cajin','Stock','Stack','Quack','Kelp','Quit','help'];
      let expected = ['Quit','Quack','Kelp','Cajin',];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
     
    test('Only Words 3+', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['E', 'St', 'O', 'C'],
                    ['I', 'J', 'K', 'L'],
                    ['T', 'N', 'E', 'P']];
      let dictionary = ['Je','Stock','Stack','Quack','Kel','K','help'];
      let expected = ['Stock','Stack','Quack', 'Kel'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    
     test('Qu test cases', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['E', 'A', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['T', 'N', 'O', 'P']];
      let dictionary = ['Cajin','random','Quac','Quack','Kolp','hasnt','help'];
      let expected = ['Quack','Quac','Cajin','Kolp'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    test('St test cases', () => {
      let grid = [['H', 'A', 'C', 'K'],
                    ['E', 'St', 'O', 'C'],
                    ['I', 'J', 'K', 'L'],
                    ['T', 'N', 'E', 'P']];
      let dictionary = ['Hack','Stock','Stack','Quack','Kelp','hasnt','help'];
      let expected = ['Stock','Stack','Hack','Kelp'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      console.log(solutions);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    test('St & Qu test cases', () => {
      let grid = [['Qu', 'A', 'C', 'K'],
                    ['E', 'St', 'O', 'C'],
                    ['I', 'J', 'K', 'L'],
                    ['', 'N', 'E', 'P']];
      let dictionary = ['Cajin','Stock','Stack','Quack','Kelp','hasnt','help'];
      let expected = ['Stock','Stack','Quack','Kelp'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
 
  });

  
  
  
  describe('Input edge cases', () => {
    
     test('Grid is 1x1', () => {
      //(Edge case) Since there are no possible solutions 
      let grid = [['a']];
      let dictionary = "Apple,Bananas,Oranges";
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    
    
    test('Grid is 0x0', () => {
      //(Edge case) Since there are no possible solutions 
      let grid = [[]];
      let dictionary = ["Apple","Bananas","Oranges"];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
    
    // Example Test using Jess
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
