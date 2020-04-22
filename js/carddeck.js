class CardDeck
{
    constructor(x, y, offsetX, offsetY, scale)
    {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.cards = [];

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.x = scale;
        this.container.scale.y = scale;
    }

    add_to_container(to_container)
    {
        to_container.addChild(this.container);
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

        for (let i=0; i<this.cards.length; i++)
        {
            this.cards[i].set_position((i*this.offsetX) - (width/2), (i*this.offsetY) - (height/2));
        }
    }
}
