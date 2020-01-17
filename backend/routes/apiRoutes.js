

console.log("inside apiRoutes.js");
var express = require("express");

var router = express.Router();

// Import the model (model.js) to use its database functions.
var model = require("../models/model.js");


 // GET  Tournaments with state=open (optional query)
 //                       state = active
 //                       state = closed
        // Constrained by a query, if provided
router.get("/tournQry: state", function(req, res) {
  tournament.select(function(data) {
    var hbsObject = {
      tournData: data
    };
    console.log(hbsObject);
    console.log( "inside apiRoutes.js   get/tournQry: state ",
      hbsObject.tournament
    );
    // Return a list of all tournaments waiting for more players
    res.render("index", hbsObject);
  });

  


  // GET single Tournament (id)
  router.get("/tournID/: id", function(req, res) {
    var hbsObject = {
      tournData: data
    };
    console.log(hbsObject);
    console.log( "inside apiRoutes.js   get/tournID: id  hbsObject: ",
      hbsObject.tournament
    );
      // Return the tournament for a given id
    res.render("index", hbsObject);
  });





    // GET all stats for all players  (player query, stat query)
    router.get("/statsQry", function(req, res) {
        stats.select(function(data) {
          var hbsObject = {
            statsData: data
          };
          console.log(hbsObject);
          console.log( "inside apiRoutes.js   get/statsQry  hbsObject: ",
            hbsObject.tournament
          );
         // Return a list of all stats for all player constrained by a query
          res.render("index", hbsObject);
        });
      });

  
        
        // GET all stats for one player  (player query, stat query)
        router.get("/stats/:id", function(req, res) {
            stats.select(function(data) {
              var hbsObject = {
                statsData: data
              };
              console.log(hbsObject);
              console.log( "inside apiRoutes.js   get/stats/:id  hbsObject: ",
                hbsObject.tournament
              );
             // Return a list of all stats for one player constrained by a query
              res.render("index", hbsObject);
            });
          });


    
// PROGRAMMER NOTE - the errors below are because of the instructions for DB
   

// POST Routes

    // POST New Player Game Category (id)
    router.post("newPlayerGameCat", function(req, res) {
        // logic and computations here
        
        // check that parameters match to the ORM
        tournament.insert("TABLE NAME HERE", [req's COLUMN NAMES HERE, functionNAME(
          result
        ) {
          // Send back the ID of the new burger order
          res.json({ id: result.??????????? });
        });
      });
    
         

    // POST New Tournament
    router.post("/newTournament", function(req, res) {
        // logic and computations here , i.e.  req.body.devoured = false;
        tournament.insert("TABLE NAME HERE", [req's COLUMN NAMES HERE], functionNAME(
          result
        ) {
          // Send back the ID of the new burger order
          res.json({ id: result.insertTournId });
        });
      });
    



    // POST New Player
    router.post("/newPlayer", function(req, res) {
        // logic and computations here , i.e.  req.body.devoured = false;
        tournament.insert("TABLE NAME HERE", [req's COLUMN NAMES HERE], functionNAME(
          result
        ) {
          // Send back the ID of the new player
          res.json({ id: result.insertId });
        });
      });
    


// PATCH Routes

    // PATCH Open Tournament (id)
    router.patch("/tourn/: Id", function(req, res) {

        // code logic/computations here
       
        tournament.update(
          { 
              //update row names here
            },
        function(result) {
            // this if statement is a sequielize/mySQL status and  may  not work with Mongoose?
            if (result.changedRows === 0) {
              // If no rows were changed, then the ID must not exist, so 404
              return res.status(404).end();
            }


            res.status(200).end();
          }
        );
      });


    // PATCH Player Stats (id)
    router.patch("/player/: id", function(req, res) {

        // code logic/computations here
       
        tournament.update(
          { 
              //update row names here
            },
        function(result) {
            // this if statement is a sequielize/mySQL status and  may  not work with Mongoose?
            if (result.changedRows === 0) {
              // If no rows were changed, then the ID must not exist, so 404
              return res.status(404).end();
            }


            res.status(200).end();
          }
        );
      });
    

// DELETE Routes

    // DELETE Player
    router.delete("/deletePlayer/: id", function(req, res) {

        // locgic and computations here
        
        console.log("inside  DeletePlayer  route ", condition);
        tournament.delete(condition, function(result) {
          console.log("result = ", result);
          
           // this if statement is a sequielize/mySQL status and  may  not work with Mongoose?
          if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          }
          res.status(200).end();
        });
      });










