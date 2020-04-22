class CardDeck
{
    constructor(name, x, y, distance)
    {
        this.name = name;
        this.distance = distance;
        this.cards = [];
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.visible = false;
        this.text = new PIXI.Text(name, { fontFamily : 'Wizzta', fontSize: 50, fill : 0xE01010, align : 'center'});
        this.text.y = -150;
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.container.addChild(this.text);
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
        card.set_visible(this.visible);
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
        this.cards = this.cards.filter(function(c) { return c!=card; });
        card.parent = null;
    }

    set_visible(visible)
    {
        this.visible = visible;
        for (let i in this.cards) {
            this.cards[i].set_visible(visible);
        }
    }

    update_positions()
    {
        let width = this.distance*(this.cards.length-1);
        for (let i=0; i<this.cards.length; i++)
        {
            this.cards[i].set_position((i*this.distance) - (width/2), 0);
        }
    }
}
