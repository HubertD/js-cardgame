class Game
{
    constructor(stage, resources)
    {
        this.stage = stage;
        this.resources = resources;
        this.hands = [];
        this.tricks = [];
        this.pile = null;
    }

    init(players, cards_per_player)
    {
        this.pile = new CardDeck("", 1920/2, 1080/2, 40);
        this.pile.add_to_container(this.stage);

        if (players.length == 4)
        {
            this.hands = [];

            this.hands[0] = new CardDeck(players[0], 1920/2, 950, 60);
            this.hands[0].set_rotation(0);

            this.hands[1] = new CardDeck(players[1], 200, 1080/2, 30);
            this.hands[1].set_rotation(Math.PI / 2);

            this.hands[2] = new CardDeck(players[2], 1920/2, 140, 30);
            this.hands[2].set_rotation(Math.PI);

            this.hands[3] = new CardDeck(players[3], 1720, 1080/2, 30);
            this.hands[3].set_rotation(3*Math.PI / 2);

            this.hands[0].add_to_container(this.stage);
            this.hands[1].add_to_container(this.stage);
            this.hands[2].add_to_container(this.stage);
            this.hands[3].add_to_container(this.stage);

            this.tricks = [
                new CardDeck("", 0, 0, 0),
                new CardDeck("", 0, 0, 0),
                new CardDeck("", 0, 0, 0),
                new CardDeck("", 0, 0, 0)
            ];

        }

        for (let i=0; i<cards_per_player; i++)
        {
            for (let h=0; h<this.hands.length; h++)
            {
                this.hands[h].add_card(this.create_card());
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
            this.hands[player].get_card(i).set_texture(this.resources[cards[i]].texture);
        }
    }

    play_card(player, card_index, card_name)
    {
        let card = this.hands[player].get_card(card_index);
        card.set_texture(this.resources[card_name].texture);
        this.pile.add_card(card);
    }

    give_trick_to(player)
    {
        while (this.pile.cards.length > 0)
        {
            this.tricks[player].add_card(this.pile.get_card(0));
        }
    }

}
