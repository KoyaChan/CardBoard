angular.module('cardsModule', [])
    .value('cardPics', ["card1", "card2", "card3", "card4", "card5", "card6",
                        "card7", "card8", "card9", "card10", "card11", "card12"])

    .factory('cardsConfig', ['cardPics', function (cardPics) {
        this.numCols = 3;
        this.numRaws = cardPics.length / this.numCols;
        return this;
    }])

    .factory('cards', ['cardPics', 'cardsConfig', function (cardPics, cardsConfig) {
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
                    text: function () {
                        if (this.foreside) {
                            return this.picId + " " + this.pic;
                        }
                        return "backSide";
                    },
                    view: function () {
                        if (this.foreside) {
                            return "card-front";
                        }
                        return "card-back";
                    }
                };
            };

        for (raw = 0; raw < cardsConfig.numRaws; raw++) {
            for (column = 0; column < cardsConfig.numCols; column++) {
                cardsArray.push(new CardObj(raw, column, cardPics[idx], idx, true));
                idx++;
            }
        }

        return cardsArray;
    }])

    .controller('cardsController', ['$scope', 'cards', 'cardsConfig', function ($scope, cards, cardsConfig) {
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
    }]);
