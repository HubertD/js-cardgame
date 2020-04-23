class Game
{
    constructor(stage, resources)
    {
        this.stage = stage;
        this.resources = resources;
        this.players = [];
        this.pile = null;
    }

    init(players)
    {
        this.pile = new CardDeck(1920/2, 1080/2, 35, 20, 1.0);
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
    }

    give_round(own_cards)
    {
        let self = this;

        for (let i=0; i<own_cards.length; i++)
        {
            let name = own_cards[i];
            let card = this.create_card(name);
            card.set_click_handler(function() {
                console.log("play card " + name);
                self.play(card);
            });
            this.players[0].hand.add_card(card);

            for (let h=1; h<this.players.length; h++)
            {
                this.players[h].hand.add_card(
                    this.create_card("back")
                );
            }
        }
    }

    create_card(resource_name)
    {
        return new Card(
            this.resources[resource_name].texture,
            this.resources["mask"].texture
        );
    }

    play_card(player, card_index, card_name)
    {
        let card = this.players[player].hand.get_card(card_index);
        card.set_texture(this.resources[card_name].texture);
        this.play(card);
    }

    play(card)
    {
        card.set_click_handler(null);
        this.pile.add_card(card);
    }

    give_trick_to(player)
    {
        this.players[player].give_trick(this.pile);
    }

}
