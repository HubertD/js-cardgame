class Card
{
    constructor(name)
    {
        this.name = name;
        this.container = null;
        this.front = null;
        this.back = null;
        this.mask = null;
        this.visible = false;
        this.parent = null;
    }

    set_texture(front_texture, back_texture, mask)
    {
        let self = this;
        this.container = new PIXI.Container();
        this.container.on('mousedown', function() { self.onclick(); });
        this.container.on('touchstart', function() { self.onclick(); });

        this.mask = new PIXI.Sprite(mask);
        this.mask.anchor.x = 0.5;
        this.mask.anchor.y = 0.5;
        this.container.addChild(this.mask);

        this.front = new PIXI.Sprite(front_texture);
        this.front.x = 0;
        this.front.y = 0;
        this.front.anchor.y = 0.5;
        this.front.anchor.x = 0.5;
        this.front.mask = this.mask;

        this.back = new PIXI.Sprite(back_texture);
        this.back.x = 0;
        this.back.y = 0;
        this.back.anchor.y = 0.5;
        this.back.anchor.x = 0.5;
        this.back.mask = this.mask;

        this.container.addChild(this.front);
        this.container.addChild(this.back);

        this.set_visible(this.visible);
    }

    set_front_texture(front_texture)
    {
        this.front.texture = front_texture;
    }

    set_visible(visible)
    {
        this.visible = visible;
        this.front.visible = this.visible;
        this.back.visible = !this.visible;
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

    set_rotation(r)
    {
        this.container.rotation = r;
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