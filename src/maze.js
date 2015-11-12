var Maze = function(doc, elemId) {

  this.canvas                       = doc.getElementById(elemId);
  this.width                        = this.canvas.width;
  this.height                       = this.canvas.height;
  this.ctx                          = this.canvas.getContext('2d');
  this.horizCells                   = 30;
  this.vertCells                    = 30;
  this.generator                    = new MazeGenerator(this.horizCells, this.vertCells);
  this.cellWidth                    = this.width / this.horizCells;
  this.cellHeight                   = this.height / this.vertCells;
  this.knownParams                  = {};
  this.cardNames                    = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
  this.cardSuits                    = ["H", "S", "C", "D"];
  this.cardValues                   = allPossibleCases([this.cardNames, this.cardSuits]);
  this.remainingCardValues          = [];
  this.encryptedNames               = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  this.encryptedSuits               = ["1", "2", "3", "4"];
  this.encryptedValues              = allPossibleCases([this.encryptedNames, this.encryptedSuits]);
  this.remainingEncryptedCardValues = [];

  function allPossibleCases(arr) {
    if (arr.length == 1) {
      return arr[0];
    } else {
      var result = [];
      var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
      for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
          result.push(arr[0][j] + allCasesOfRest[i]);
        }
      }
      return result;
    }
  }
  
  var self = this;

  self.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";

  return {
    width: function() {
      return self.width;
    },

    height: function() {
      return self.height;
    },

    generate: function () {
      self.generator.generate();
    },

    draw: function() {
      this.drawBorders();
      this.drawMaze();
    },

    solve: function() {
      self.generator.solve();
      this.drawSolution();
    },

    drawBorders: function() {
      this.drawLine(self.cellWidth, 0, self.width, 0);
      this.drawLine(self.width, 0, self.width, self.height);
      this.drawLine(self.width - self.cellWidth, self.height, 0, self.height);
      this.drawLine(0, self.height, 0, 0);
    },

    drawSolution: function() {
      var path = self.generator.path;
      
      for(var i = 0; i < path.length; i++) {
        (function () {
          var cell = path[i];
          var x = cell.x * self.cellWidth;
          var y = cell.y * self.cellHeight;
          setTimeout(function() {
            self.ctx.fillRect(x, y, self.cellWidth, self.cellHeight);
          }, 80 * i);
        })();
      }
    },

    drawMaze: function() {
      var graph = self.generator.graph;
      var drawnEdges = [];

      var edgeAlreadyDrawn = function(cell1, cell2) {
        return _.detect(drawnEdges, function(edge) {
          return _.include(edge, cell1) && _.include(edge, cell2);
        }) != undefined;
      };

      for(var i = 0; i < graph.width; i++) {
        for(var j = 0; j < graph.height; j++) {
          var cell = graph.cells[i][j];
          var topCell = graph.getCellAt(cell.x, cell.y - 1);
          var leftCell = graph.getCellAt(cell.x - 1, cell.y);
          var rightCell = graph.getCellAt(cell.x + 1, cell.y);
          var bottomCell = graph.getCellAt(cell.x, cell.y + 1);
          var textX, textY;
          var xBoost = 3;
          var yBoost = 14;

          if (cell.x == 0) {
            textX = xBoost;
          } else {
            textX = cell.x * self.cellWidth + xBoost;
          }

          if (cell.y == 0) {
            textY = yBoost;
          } else {
            textY = cell.y * self.cellHeight + yBoost;
          }

          this.nameSquare(cell, textX, textY, false);

          if(!edgeAlreadyDrawn(cell, topCell) && graph.areConnected(cell, topCell)) {
            var x1 = cell.x * self.cellWidth;
            var y1 = cell.y * self.cellHeight;
            var x2 = x1 + self.cellWidth;
            var y2 = y1;
            
            this.drawLine(x1, y1, x2, y2);
            drawnEdges.push([cell, topCell]);
          }

          if(!edgeAlreadyDrawn(cell, leftCell) && graph.areConnected(cell, leftCell)) {
            var x2 = x1;
            var y2 = y1 + self.cellHeight;

            this.drawLine(x1, y1, x2, y2);
            drawnEdges.push([cell, leftCell]);
          }

          if(!edgeAlreadyDrawn(cell, rightCell) && graph.areConnected(cell, rightCell)) {
            var x1 = (cell.x * self.cellWidth) + self.cellWidth;
            var y1 = cell.y * self.cellHeight;
            var x2 = x1;
            var y2 = y1 + self.cellHeight;

            this.drawLine(x1, y1, x2, y2);
            drawnEdges.push([cell, rightCell]);
          }

          if(!edgeAlreadyDrawn(cell, bottomCell) && graph.areConnected(cell, bottomCell)) {
            var x1 = cell.x * self.cellWidth;
            var y1 = (cell.y * self.cellHeight) + self.cellHeight;
            var x2 = x1 + self.cellWidth;
            var y2 = y1;
            
            this.drawLine(x1, y1, x2, y2);
            drawnEdges.push([cell, bottomCell]);
          }          
        }
      }
    },

    drawLine: function(x1, y1, x2, y2) {
      self.ctx.lineWidth = 3;
      self.ctx.beginPath();
      self.ctx.moveTo(x1, y1);
      self.ctx.lineTo(x2, y2);
      self.ctx.stroke();
    },

    remainingCards: function() {
      if (_.isEmpty(self.remainingCardValues)) {
        self.remainingCardValues = _.clone(self.cardValues);
      }

      return self.remainingCardValues;
    },

    remainingEncryptedCards: function() {
      if (_.isEmpty(self.remainingEncryptedCardValues)) {
        self.remainingEncryptedCardValues = _.clone(self.encryptedValues);
      }

      return self.remainingEncryptedCardValues;
    },

    nameSquare: function(cell, x, y, definitelyRename) {
      var difficulty = parseFloat(this.getQueryStringParam("difficulty") || 1);

      self.ctx.lineWidth = 1;
      self.ctx.strokeStyle = "rgb(0, 0, 0)";

      if (difficulty < 3) {
        self.ctx.strokeText(this.remainingCards().pop(), x, y);
      } else {
        self.ctx.strokeText(this.remainingEncryptedCards().pop(), x, y);
      }
    },

    getQueryStringParam: function(name) {
       if (self.knownParams[name] === undefined) {
         var result = null;
         var regexS = "[\\?&#]" + name + "=([^&#]*)";
         var regex = new RegExp(regexS);
         var results = regex.exec('?' + window.location.href.split('?')[1]);
         if (results != null) {
           result = decodeURIComponent(results[1].replace(/\+/g, " "));
         }
         self.knownParams[name] = result;
         return result;
       } else {
         return self.knownParams[name];
       }
     }
  };
};
