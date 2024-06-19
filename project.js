// 1. Deposit some money
// 2. Determine the number of lines to be bet on
// 3. Collect the bet amount
// 4. Spin the machine
// 5. Check if the user won
// 6. Give the user money
// 7. Play again

const prompt = require("prompt-sync")();

//global Variables- 
const ROWS= 3;
const COLS= 3;

// no of symbols
const SYMBOLS_COUNT={
    A : 2,
    B : 3,
    C : 4,
    D : 5
}

// multiplier of symbols
const SYMBOL_VALUES={
    A :5,
    B :4,
    C :3,
    D :2
}

//1. Deposit some money
const deposit = () => {
  while (true) {
    const depositeAmount = prompt("Enter the deposit amount: ")
    const numberdepositeamount = parseFloat(depositeAmount);

    if(isNaN(numberdepositeamount) || numberdepositeamount <=0){
        console.log("Invalid amount, please try again");
    }
    else{
        return numberdepositeamount;
    }
}
} ;



// 2. Determine the number of lines to be bet on
const noOfLines = () => {
    while (true) {
      const lines = prompt("Enter the no of lines(1-3): ");
      const numberOfLines = parseFloat(lines);
  
      if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines >3){
          console.log("Invalid no of lines, please try again");
      }
      else{
          return numberOfLines;
      }
  }
  };
  
  // 3. Collect the bet amount
  const getBet = (balance, line) => {
    while (true) {
      const bet = prompt("Enter the amount per lines to be bet: ");
      const betAmount = parseFloat(bet);
  
      if(isNaN(betAmount) || betAmount <=0 || betAmount > (balance/line)){
          console.log("Invalid amount for bet, please try again");
      }
      else{
          return betAmount;
      }
  }
  };

  //4. Spin the machine
  const spin=() => {
    const symbols =[];
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i< count; i++){
            symbols.push(symbol);
        }
    }

  const reels= [];
  for(let i=0; i<COLS; i++){
    reels.push([]);
    const reelSymbols= [...symbols];
    for(let j=0; j<ROWS; j++){
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);


    }
  }
  return reels;
  
  };
  
  //transpose the columns
  const transpose = (reels) => {
    const rows =[];

    for(let i = 0; i<ROWS; i++ ){ 
        rows.push([]);
        for (let j=0;j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
   console.log(rows);
    return rows;
    
  }
  
  //Display slot machine
  const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of rows.entries()){
            rowString += symbol
            if(i != row.length -1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
    
  };

  //Check bet winnings 
  const getWinnings =(rows, bet, lines) => {
    let winnings=0;

    for (let row=0; row<lines ;row++){
        const symbols = rows [row];
        let allSame = true;

        for (const symbol of symbols ){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if ( allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
  }

  // To play again
  const game = () =>{
    let balance= deposit();
    while(true){
        console.log("You have a Balance of $"+ balance);
    const numberOfLines= noOfLines();
    const bet= getBet(balance, numberOfLines);
        balance -= bet*numberOfLines;
    const reels=spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
    console.log("you won, $" + winnings.toString());

    //to check if user have money left
    if(balance <= 0){
        console.log("You ran out of money");
        break;
    }

    const playAgain = prompt("Do you want to play again?(y/n)");

    if(playAgain != "y") break;
    }
  };

  game();



  