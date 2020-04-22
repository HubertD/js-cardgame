class Game
{
    constructor(stage, resources)
    {
        this.stage = stage;
        this.resources = resources;
        this.players = [];
        this.tricks = [];
        this.pile = null;
    }

    init(players, cards_per_player)
    {
        this.pile = new CardDeck("", 1920/2, 1080/2, 35, 20);
        this.pile.add_to_container(this.stage);

        if (players.length == 4)
        {
            this.players = [
                new Player(players[0], 1920/2, 1080 - 230/2 - 20, 0, 60),
                new Player(players[1], 230/2 + 20, 1080/2, Math.PI/2, 30),
                new Player(players[2], 1920/2, 230/2 + 20, Math.PI, 30),
                new Player(players[3], 1920-230/2 - 20, 1080/2, 3*Math.PI/2, 30)
            ];
        }

        for (let i=0; i<this.players.length; i++)
        {
            this.players[i].add_to_container(this.stage);
        }

        for (let i=0; i<cards_per_player; i++)
        {
            for (let h=0; h<this.players.length; h++)
            {
                this.players[h].hand.add_card(this.create_card());
            }
        }
    }

    create_card()
    {
        let self = this;
        let card = new Card(this.resources["back"].texture, this.resources["mask"].texture);
        card.set_click_handler(function() {
            this.set_click_handler(null);
            self.pile.add_card(this);
        });
        return card;
    }

    show_cards(player, cards)
    {
        for (let i=0; i<cards.length; i++)
        {
            this.players[player].hand.get_card(i).set_texture(this.resources[cards[i]].texture);
        }
    }

    play_card(player, card_index, card_name)
    {
        let card = this.players[player].hand.get_card(card_index);
        card.set_texture(this.resources[card_name].texture);
        this.pile.add_card(card);
    }

    give_trick_to(player)
    {
        //while (this.pile.cards.length > 0)
        {
            //this.tricks[player].add_card(this.pile.get_card(0));
        }
    }

}
