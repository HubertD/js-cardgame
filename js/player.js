class Player
{
    constructor(name, x, y, rotation, cardOffsetX)
    {
        this.name = name;
        this.tricks_won = 0;

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.rotation = rotation;

        this.text = new PIXI.Text("", { fontFamily : 'Wizzta', fontSize: 50, fill : 0xE01010, align : 'center'});
        this.text.y = -175;
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.container.addChild(this.text);

        this.hand = new CardDeck(0, 0, cardOffsetX, 0, 1.0);
        this.hand.add_to_container(this.container);

        this.tricks = [];
        for (let i=0; i<6; i++)
        {
            this.add_trick(-150 - i*50);
            this.add_trick(150 + i*50);
        }

        this.update();
    }

    add_trick(x)
    {
        let trick = new CardDeck(x, -175, 30, 30, 0.25);
        trick.add_to_container(this.container);
        this.tricks.push(trick);
    }

    add_to_container(to_container)
    {
        to_container.addChild(this.container);
    }

    give_trick(deck)
    {
        while (deck.cards.length > 0)
        {
            this.tricks[this.tricks_won].add_card(deck.get_card(0));
        }
        this.tricks_won++;
        this.update();
    }

    update()
    {
        this.text.text = this.name;
        this.hand.update_positions();
    }

}