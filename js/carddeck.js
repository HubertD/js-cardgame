class CardDeck
{
    constructor(name, x, y, offsetX, offsetY)
    {
        this.name = name;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.cards = [];
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.text = new PIXI.Text(name, { fontFamily : 'Wizzta', fontSize: 50, fill : 0xE01010, align : 'center'});
        this.text.y = -150;
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.container.addChild(this.text);

        this.bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        //this.container.addChild(this.bg);
    }

    add_to_container(to_container)
    {
        to_container.addChild(this.container);
    }

    set_rotation(r)
    {
        this.container.rotation = r;
    }

    add_card(card)
    {
        if (card.parent)
        {
            let parent = card.parent;
            parent.remove_card(card);
            parent.update_positions();
        }
        card.parent = this;
        card.add_to_container(this.container);
        this.cards.push(card);
        this.update_positions();
    }

    get_card(index)
    {
        return this.cards[index];
    }

    remove_card(card)
    {
        this.cards = this.cards.filter(function(c) { return c != card; });
        card.parent = null;
    }

    update_positions()
    {
        if (this.cards.length == 0)
        {
            return;
        }

        let width = this.offsetX*(this.cards.length-1) + this.cards[0].get_width();
        let height = this.offsetY*(this.cards.length-1) + this.cards[0].get_height();
        this.bg.x = -width/2;
        this.bg.y = -height/2;
        this.bg.width = width;
        this.bg.height = height;

        for (let i=0; i<this.cards.length; i++)
        {
            this.cards[i].set_position((i*this.offsetX) - (width/2), (i*this.offsetY) - (height/2));
        }
    }
}
