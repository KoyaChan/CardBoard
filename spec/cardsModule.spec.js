module('cardsModule');
describe('cardsModule tests', function(){
    var cards,
    cardPics;
    
    beforeEach(module('cardsModule'));
    beforeEach(inject(function(_cards_){
        cards = _cards_;
    }));
    
    beforeEach(inject(function(_CARD_PICS_){
        cardPics = _CARD_PICS_;
    }));
    
    beforeEach(inject(function(_cardsConfig_){
        cardsConfig = _cardsConfig_;
    }));

    it('should contain same number of cards as cardPics', function(){
        expect(cards.length).toEqual(cardPics.length);
    });
    
    it('should same number for cardPics and (raws * cols)', function(){
        expect(cardPics.length).toEqual(cardsConfig.numRaws * cardsConfig.numCols);
    })
    
    it('should card-front class is selected when foreside value is true for a card', function(){
        var i;
        for(i = 0; i < cards.length; i++)
        {
            cards[i].foreside = true;
            expect(cards[i].class()).toEqual("card-front");
            cards[i].foreside = false;
            expect(cards[i].class()).toEqual("card-back");
        }
    });
    
    it('should each card view shows its correspondent index in cardPics', function(){
        var i;
        for(i = 0; i < cards.length; i++)
        {
            cards[i].forside = true;
            expect(cards[i].resource()).toEqual(cardPics[i]);
        }
    });
});