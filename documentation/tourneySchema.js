{
  "name": "",  //tourneyName given in bracket create
  "depth": "", //depth of tournament bracket given in tourney create(4 players=2, 8 players=3, 16 players=4)
  "champion": "", //winner of game0
  //example from 8 team bracket. game# will be cell# of array
  "game#": [
    { //game#[0]
      "1": "",    //winnerUID from game#[1].winner in layer0
      "2": "",    //winnerUID from game#[2].winner in layer0
      "winner": "" //UID assigned to winner of game#[0] & to champion
    },
    { //game#[1]
      "3": "",     //winnerUID from game#[3].winner in layer1
      "4": "",     //winnerUID from game#[4].winner in layer1	 
      "winner": "" //UID assigned to winner of game#[1]
    },
    { //game#[2]
      "5": "",     //winnerUID from game#[5].winner in layer1
      "6": "",     //winnerUID from game#[6].winner in layer1	 
      "winner": "" //UID assigned to winner of game#[2]
    },
    { //game#[3]
      "7": "",     //userUID seeded in to place7 in layer2
      "8": "",     //userUID seeded in to place8 in layer2
      "winner": "" //UID assigned to winner of game#[3]		 
    },
    { //game#[4]
      "9": "",     //userUID seeded in to place9 in layer2
      "10": "",    //userUID seeded in to place10 in layer2
      "winner": "" //UID assigned to winner of game#[4]		 
    },
    { //game#[5]	
      "11": "",    //userUID seeded in to place11 in layer2
      "12": "",    //userUID seeded in to place12 in layer2
      "winner": "" //UID assigned to winner of game#[5]		 
    },
    { //game#[6]	
      "13": "",    //userUID seeded in to place13 in layer2
      "14": "",    //userUID seeded in to place14 in layer2
      "winner": "" //UID assigned to winner of game#[6]
    }
  ]
}