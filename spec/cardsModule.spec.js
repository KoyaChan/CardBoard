describe('cardsModule tests', function(){
    var cards,
    cardPics;
    
    beforeEach(module('cardsModule'));
    beforeEach(inject(function(_cards_){
        cards = _cards_;
    }));
    beforeEach(inject(function(_cardPics_){
        cardPics = _cardPics_;
    }));
    
    it('should contain same number of cards as cardPics', function(){
        expect(cards.length).toEqual(cardPics.length);
    });
});