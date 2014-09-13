angular.module('cardsModule', [])
    .value('CARD_PICS', 
    ["images/c01.gif", "images/c02.gif", "images/c03.gif", "images/c04.gif", "images/c05.gif", "images/c06.gif", "images/c07.gif",
    "images/c08.gif",  "images/c09.gif", "images/c10.gif", "images/c11.gif", "images/c12.gif", "images/c13.gif", "images/d01.gif",
    "images/d02.gif",  "images/d03.gif", "images/d04.gif", "images/d05.gif", "images/d06.gif", "images/d07.gif", "images/d08.gif",
    "images/d09.gif",  "images/d10.gif", "images/d11.gif", "images/d12.gif", "images/d13.gif", "images/h01.gif", "images/h02.gif",
    "images/h03.gif",  "images/h04.gif", "images/h05.gif", "images/h06.gif", "images/h07.gif", "images/h08.gif", "images/h09.gif",
    "images/h10.gif",  "images/h11.gif", "images/h12.gif", "images/h13.gif", "images/s01.gif", "images/s02.gif", "images/s03.gif",
    "images/s04.gif",  "images/s05.gif", "images/s06.gif", "images/s07.gif", "images/s08.gif", "images/s09.gif", "images/s10.gif",
    "images/s11.gif",  "images/s12.gif", "images/s13.gif"])
                        
    .value('CARD_BACK_PIC', "images/z02.gif")

    .factory('cardsConfig', function (CARD_PICS) {
        this.numCols = 13;
        this.numRaws = CARD_PICS.length / this.numCols;
        return this;
    })
    
    .factory('cards', function (CARD_PICS, CARD_BACK_PIC, cardsConfig) {
        var cardsArray = [],
            raw,
            column,
            idx = 0,
            
            CardObj = function (rawnum, colnum, picValue, picId, isForeside) {
                this.raw = rawnum;
                this.col = colnum;
                this.pic = picValue;
                this.picId = picId;
                this.foreside = isForeside;
                this.toggleSide = function () {
                    this.foreside = !this.foreside;
                };
                
                this.resource = function () {
                    if (this.foreside) {
                        return this.pic;
                    }
                    return CARD_BACK_PIC;
                };
                
                this.class = function () {
                    if (this.foreside) {
                        return "card-front";
                    }
                    return "card-back";
                };
            };

        for (raw = 0; raw < cardsConfig.numRaws; raw++) {
            for (column = 0; column < cardsConfig.numCols; column++) {
                cardsArray.push(new CardObj(raw, column, CARD_PICS[idx], idx, true));
                idx++;
            }
        }

        return cardsArray;
    })

    .controller('cardsController', function ($scope, cards, cardsConfig) {
        $scope.testString = "xxxxxx";
        var raws = new Array(cardsConfig.numRaws),
            i,
            Raw = function () {
                this.data = [];
            },
            sortFunc = function (a, b) {
                var col1 = a.col,
                    col2 = b.col;
                if (col1 > col2) {
                    return 1;
                }
                if (col1 < col2) {
                    return -1;
                }
                return 0;
            };

        for (i = 0; i < cardsConfig.numRaws; i++) {
            raws[i] = new Raw(i);
        }

        for (i = 0; i < cards.length; i++) {
            raws[cards[i].raw].data.push(cards[i]);
        }

        for (i = 0; i < cardsConfig.numRaws; i++) {
            raws[i].data.sort(sortFunc);
        }

        $scope.raws = raws;

        $scope.onClick = function () {
            this.card.toggleSide();
        };
    });
