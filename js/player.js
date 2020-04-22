class Player
{
    constructor(name, x, y, rotation, cardOffsetX)
    {
        this.name = name;
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.rotation = rotation;

        this.text = new PIXI.Text("", { fontFamily : 'Wizzta', fontSize: 50, fill : 0xE01010, align : 'center'});
        this.text.y = -150;
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.container.addChild(this.text);

        this.hand = new CardDeck("", 0, 0, cardOffsetX, 0);
        this.hand.add_to_container(this.container);

        this.update();
    }

    add_to_container(to_container)
    {
        to_container.addChild(this.container);
    }

    update()
    {
        this.text.text = this.name;
        this.hand.update_positions();
    }

}