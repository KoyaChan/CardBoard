angular.module('cardsModule', [])
    .value('CARD_PICS', ["card1", "card2", "card3", "card4", "card5", "card6",
                        "card7", "card8", "card9", "card10", "card11", "card12"])
                        
    .value('CARD_BACK_PIC', "backsize")

    .factory('cardsConfig', function (CARD_PICS) {
        this.numCols = 3;
        this.numRaws = CARD_PICS.length / this.numCols;
        return this;
    })

    .factory('cards', function (CARD_PICS, CARD_BACK_PIC, cardsConfig) {
        var cardsArray = [],
            raw,
            column,
            idx = 0,
            CardObj = function (rawnum, colnum, picValue, picId, isForeside) {
                return {
                    raw: rawnum,
                    col: colnum,
                    pic: picValue,
                    picId: picId,
                    foreside: isForeside,
                    toggleSide: function () {
                        this.foreside = !this.foreside;
                    },
                    resource: function () {
                        if (this.foreside) {
                            return this.pic;
                        }
                        return CARD_BACK_PIC;
                    },
                    class: function () {
                        if (this.foreside) {
                            return "card-front";
                        }
                        return "card-back";
                    }
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
