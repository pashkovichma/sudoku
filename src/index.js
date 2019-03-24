module.exports = function solveSudoku(matrix) {
  let i;
  let j;
  let ii;
  let jj;
  let candidatsequense;
  let index;
  let squarei;
  let squarej;
  let flag = 1;
  let flag1 = 1;
  let l;
  let k;
  let temprorycandidate;
  let count;
  let count1;
  for (i = 0; i < 9; i++){
      for (j = 0; j < 9; j++){
          candidatsequense = [1,2,3,4,5,6,7,8,9];
          if (!matrix[i][j]){
              for (ii = 0; ii < 9; ii++){
                  index =  candidatsequense.indexOf(matrix[ii][j]);
                  if (index != -1){
                      candidatsequense.splice(index,1);
                  }
              }
              if (candidatsequense.length > 1){
                  for (jj = 0; jj < 9; jj++){
                      index = candidatsequense.indexOf(matrix[i][jj])
                      if (index != -1){
                          candidatsequense.splice(index,1);
                      }
                  }
                  if (candidatsequense.length > 1){
                      squarei = Math.floor(i/3);
                      squarej = Math.floor(j/3);
                      for (ii = squarei * 3; ii < squarei * 3 + 3; ii++){
                          for (jj = squarej * 3; jj < squarej * 3 + 3;jj++){
                              index = candidatsequense.indexOf(matrix[ii][jj])
                              if (index != -1){
                                  candidatsequense.splice(index,1);
                              }
                          }
                      }
                  }   
              }  
              if (candidatsequense.length > 1){
                matrix[i][j] = candidatsequense;  
              } else {
                  matrix[i][j] = candidatsequense[0];
              }
              
          }
      }
  }
  while(flag1){
      flag1 = 0;
      while (flag){
          flag = 0;
          for (i = 0; i < 9; i++){
              for (j = 0; j < 9; j++){
                if (matrix[i][j].length){
                      for (ii = 0; ii < 9; ii++){
                          index =  matrix[i][j].indexOf(matrix[ii][j]);
                          if (index != -1){
                              matrix[i][j].splice(index,1);
                              flag = 1;
                              flag1 = 1;
                          }
                   }
                      if (matrix[i][j].length > 1){
                          for (jj = 0; jj < 9; jj++){
                              index = matrix[i][j].indexOf(matrix[i][jj])
                              if (index != -1){
                                  matrix[i][j].splice(index,1);
                                  flag = 1;
                                  flag1 = 1;
                              }
                          }
                          if (matrix[i][j].length > 1){
                              squarei = Math.floor(i/3);
                              squarej = Math.floor(j/3);
                              for (ii = squarei * 3; ii < squarei * 3 + 3; ii++){
                                  for (jj = squarej * 3; jj < squarej * 3 + 3;jj++){
                                      index = matrix[i][j].indexOf(matrix[ii][jj])
                                      if (index != -1){
                                          matrix[i][j].splice(index,1);
                                          flag = 1;
                                          flag1 = 1;
                                      }
                                  }
                              }
                          }   
                      }  
                      if (matrix[i][j].length == 1){
                      matrix[i][j] = matrix[i][j][0];  
                      }        
                  }
              }
          }
      }

      flag = 1;
      while (flag){
          flag = 0;
          for (i = 0; i < 9; i ++){
           for (j = 0; j < 9; j ++){
              temprorycandidate = [];
              if (matrix[i][j].length){
                  for (ii = 0; ii < 9; ii++){
                      if (i != ii && matrix[ii][j].length){
                          temprorycandidate = temprorycandidate.concat(matrix[ii][j]);
                      }
                  }
                  for (jj = 0; jj < 9; jj++){
                      if (j != jj && matrix[i][jj].length){
                          temprorycandidate = temprorycandidate.concat(matrix[i][jj]);
                      }
                  }
                  squarei = Math.floor(i/3);
                  squarej = Math.floor(j/3);
                  for (ii = squarei*3; ii < squarei*3 + 3; ii++){
                      for (jj = squarej*3; jj < squarej*3 + 3; jj++){
                          if (i != ii && j != jj && matrix[ii][jj].length){
                              temprorycandidate = temprorycandidate.concat(matrix[ii][jj]);
                          }
                      }
                  }
                  for (k = 0; k < matrix[i][j].length; k++){
                      if (temprorycandidate.indexOf(matrix[i][j][k]) == -1){
                          matrix[i][j]= matrix[i][j][k];
                          flag = 1;
                          flag1 = 1;
                      } 
                  } 
              }
          }
      }
      flag = 1;
      //open pairs
      while (flag){ 
          for (i = 0; i < 9; i++){
              for (j = 0; j < 9; j++){      
                  flag = 0; 
                  if (matrix[i][j].length){
                      console.log("column step", i,j,matrix[i][j]);
                      //column
                      for (ii = 0; ii < 9; ii ++){
                          console.log(ii,j,matrix[ii][j]);
                          if (matrix[ii][j].length == matrix[i][j].length && ii != i && matrix[ii][j]){
                              console.log("count", ii, j, 
                              matrix[ii][j].filter(x => matrix[i][j].indexOf(x) == -1),
                              matrix[ii][j].filter(x => matrix[i][j].indexOf(x) == -1).length);
                          }
                         if (matrix[ii][j].length == matrix[i][j].length 
                             && matrix[ii][j].filter(x => matrix[i][j].indexOf(x) == -1).length == 0){
                              count ++;
                          }
                      }
                      if (count  == matrix[i][j].length){
                          for (ii = 0; ii < 9; ii ++){
                              if (i != ii && matrix[ii][j].length && matrix[ii][j].filter(x => matrix[i][j].indexOf(x) == -1).length != 0){
                                  matrix[ii][j]= matrix[ii][j].filter(x=>matrix[i][j].indexOf(x) == -1);
                                  if (matrix[ii][j].length == 1){
                                      matrix[ii][j] = matrix[ii][j][0];
                                  }
                                  flag = 0;
                                  flag1 = 0;
                              }
                          }
                      }
                      count = 0;
                      //column
                      /*for (jj = 0; jj < 9; jj ++){
                          if (j != jj 
                              && matrix[i][j].length == matrix[i][jj].length 
                              && matrix[i][j].filter(x => matrix[i][jj].indexOf(x) == -1).length == 0){
                              count ++;
                          }
                      }
                      if (count + 1 == matrix[i][j].length){
                          for (jj = 0; jj < 9; jj ++){
                              if (matrix[i][jj].length 
                                  && j != jj
                                  && matrix[i][jj].filter(x => matrix[i][j].indexOf(x) == -1).length){
                                  matrix[i][jj] = matrix[i][jj].filter(x => matrix[i][j].indexOf(x) == -1)
                                  flag = 1;
                                  flag1 = 1;
                              }
                          }                           
                      }
                      count = 0;*/
                  }
              }
          }
      }
  }
 }
  console.log(matrix);
  return(matrix);
}
