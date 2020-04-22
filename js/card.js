class Card
{
    constructor(texture, mask)
    {
        let self = this;

        this.container = null;
        this.image = null;
        this.mask = null;
        this.parent = null;

        this.container = new PIXI.Container();
        this.container.on('mousedown', function() { self.onclick(); });
        this.container.on('touchstart', function() { self.onclick(); });

        this.mask = new PIXI.Sprite(mask);
        this.mask.anchor.x = 0.5;
        this.mask.anchor.y = 0.5;
        this.container.addChild(this.mask);

        this.image = new PIXI.Sprite(texture);
        this.image.x = 0;
        this.image.y = 0;
        this.image.anchor.y = 0.5;
        this.image.anchor.x = 0.5;
        this.image.mask = this.mask;

        this.container.addChild(this.image);
    }

    set_texture(texture)
    {
        this.image.texture = texture;
    }

    add_to_container(to_container)
    {
        to_container.addChild(this.container);
    }

    set_position(x, y)
    {
        this.container.x = x;
        this.container.y = y;
    }

    set_click_handler(handler)
    {
        if (handler)
        {
            this.onclick = handler;
            this.container.interactive = true;
            this.container.buttonMode = true;
        }
        else
        {
            this.onclick = function() {};
            this.container.interactive = false;
            this.container.buttonMode = false;
        }
    }

    onclick()
    {
    }
}