// By Oscar Bullen (March 2022)
// Made using p5.js (https://p5js.org)

function preload() {
  info_to_get = {
    test:
      "This is some sample text to make sure everything is working correctly. E.g. The quick brown fox jumps over the lazy dog.",
    test2:
      "This is yet some more sample text in order to make sure that information can be changed on the fly if it is needed. e.g. The answer to life, the universe, and everything is inexorably 42.",
    none: "",
  };
} //In-built function: Gets / defines model's metadata (runs before start of main program).

class colors {
  constructor() {
    this.blank = "#00000000"; //transparant
    this.black0 = "#000000"; //relay
    this.grey0 = "#808080"; //group
    this.red0 = "#EA0000"; //attack
    this.green0 = "#70AD47"; //activate
    this.blue0 = "#0070C0"; //communicate
    this.gold0 = "#FFC000"; //produce
    this.purple0 = "#7030A0"; //morph
    this.orange0 = "#ED7D31"; //inflame
    this.pink0 = "#D60093"; //protect
    this.red1 = "#CC0000"; //replicate
    this.brown1 = "#833C0C"; //accumulate resources
    this.gold1 = "#996600"; //evade destruction
  }
} //Defines all the commonly used colours in the program. Changes here are global.

class node {
  constructor(
    text_box = "Cell",
    diameter = 15,
    x = 100,
    y = 100,
    info = "none",
    fill_color = "#4ad970",
    line_color = "#35a653",
    core_color = "#06570A",
    render_core = true,
    group_ids = [],
    id = -1
  ) {
    this.text_box = text_box;
    this.fill_color = fill_color;
    this.line_color = line_color;
    this.core_color = core_color;
    this.diameter = diameter;
    this.x = x;
    this.y = y;
    this.group_ids = group_ids;
    this.radius = round(this.diameter / 2, 0);
    this.render_core = render_core;
    if (id == -1) {
      this.id = next_node_id;
      next_node_id += 1;
    } else {
      this.id = id;
      next_node_id = this.id + 1;
    }
    if (this.id > max_node_id) {
      max_node_id = this.id;
    }
    this.info = info_to_get[info];
  }

  render() {
    fill(this.fill_color);
    stroke(this.line_color);
    strokeWeight(round(this.diameter / 8, 0));
    circle(this.x, this.y, this.diameter);
    if (this.render_core) {
      noStroke();
      fill(this.core_color);
      circle(this.x, this.y, this.radius);
    }
    fill("#000000");
    stroke("#ffffff");
    strokeWeight(round(0.9 * this.diameter ** 0.25, 0));
    this.string = join([this.text_box, str(this.id)], "#");
    this.width = textWidth(this.string);
    textSize(12);
    text(
      this.string,
      this.x - round(this.width / 2, 0) - 1,
      this.y + this.radius + round(this.diameter / 8, 0),
      this.width * 2,
      this.diameter
    );
  }
} //Handels properties and rendering of nodes in model. (n.b. need to add transparency param)

class link {
  constructor(
    from_id = 0,
    to_id = 0,
    info = "none",
    line_color = "#000000",
    double_arrows = false,
    offset = 0,
    alpha_pct = 100,
    arrows = true,
    weight = 3,
    id = -1
  ) {
    this.from_id = from_id;
    this.to_id = to_id;
    this.weight = weight;
    this.arrows = arrows;
    this.line_color = line_color;
    this.offset = offset;
    this.double_arrows = double_arrows;
    this.alpha_pct = alpha_pct;
    if (id == -1) {
      this.id = next_link_id;
      next_link_id += 1;
    } else {
      this.id = id;
      next_link_id = this.id + 1;
    }
    if (this.id > max_link_id) {
      max_link_id = this.id;
    }
    this.info = info_to_get[info];
    this.swap_multi = 1;
  }

  render_sub_route() {
    this.x1 = nodes[this.from_id].x;
    this.y1 = nodes[this.from_id].y;
    this.x2 = nodes[this.to_id].x;
    this.y2 = nodes[this.to_id].y;
    if (this.x1 >= this.x2) {
      this.x_multi = -1;
    } else {
      this.x_multi = 1;
    }

    if (this.y1 >= this.y2) {
      this.y_multi = -1;
    } else {
      this.y_multi = 1;
    }

    if (this.offset != 0) {
      this.gradient = -1 / ((this.y1 - this.y2) / (this.x1 - this.x2));

      this.x_offset = this.offset * this.x_multi * this.swap_multi;
      this.y_offset = this.offset * this.y_multi * this.swap_multi;
      this.x1 = this.x1 + this.x_offset;
      this.x2 = this.x2 + this.x_offset;
      this.y1 = this.y1 + this.y_offset;
      this.y2 = this.y2 + this.y_offset;
    }

    line(this.x1, this.y1, this.x2, this.y2);
    if (this.arrows) {
      this.x_mid = round((this.x1 + this.x2) / 2, 0);
      this.y_mid = round((this.y1 + this.y2) / 2, 0);

      if (this.double_arrows) {
        circle(this.x_mid, this.y_mid, this.weight * 2);
        this.x_mid = 0.4 * this.x1 + 0.6 * this.x2;
        this.y_mid = 0.4 * this.y1 + 0.6 * this.y2;
      }

      if (this.x_multi == 0) {
        if (this.y2 >= this.y1) {
          this.a1 = 225;
        } else {
          this.a1 = 45;
        }
      } else {
        if (this.y_multi == 0) {
          if (this.x2 >= this.x1) {
            this.a1 = 135;
          } else {
            this.a1 = 315;
          }
        }
      }

      if (this.x_multi != 0 && this.y_multi != 0) {
        this.theta = atan(abs(this.y1 - this.y2) / abs(this.x1 - this.x2));
        if (this.x_multi == 1) {
          this.a1 = 135;
          if (this.y_multi == 1) {
            this.a1 += this.theta;
          } else {
            this.a1 -= this.theta;
          }
        } else {
          this.a1 = 45;
          if (this.y_multi == 1) {
            this.theta += 90;
            this.a1 -= this.theta;
          } else {
            this.theta -= 90;
            this.a1 += this.theta;
          }
        }
      }

      this.a2 = this.a1 + 90;

      if (this.a1 > 360) {
        this.a1 -= 360;
      }
      if (this.a1 < 0) {
        this.a1 += 360;
      }
      if (this.a2 > 360) {
        this.a2 -= 360;
      }
      if (this.a2 < 0) {
        this.a2 += 360;
      }

      this.i1 = 3 * this.weight * cos(this.a1);
      this.j1 = 3 * this.weight * sin(this.a1);
      this.i2 = 3 * this.weight * cos(this.a2);
      this.j2 = 3 * this.weight * sin(this.a2);

      this.x3 = this.x_mid + this.i1;
      this.y3 = this.y_mid + this.j1;
      this.x4 = this.x_mid + this.i2;
      this.y4 = this.y_mid + this.j2;

      line(this.x_mid, this.y_mid, this.x3, this.y3);
      line(this.x_mid, this.y_mid, this.x4, this.y4);

      if (this.double_arrows) {
        this.x_mid = round((this.x1 + this.x2) / 2, 0);
        this.y_mid = round((this.y1 + this.y2) / 2, 0);
      }
    }
  }

  swap_id() {
    this.original_from_id = this.from_id;
    this.original_to_id = this.to_id;
    this.from_id = this.original_to_id;
    this.to_id = this.original_from_id;
    this.swap_multi = this.swap_multi * -1;
  }

  int_to_hex(number = 0) {
    return number.toString(16);
  }

  render() {
    stroke(220, 220, 220, (this.alpha_pct / 100) * 255);
    strokeWeight(this.weight * 3);
    this.render_sub_route();
    if (this.double_arrows) {
      this.swap_id();
      this.render_sub_route();
      this.swap_id();
    }
    stroke("#000000" + this.int_to_hex(round((this.alpha_pct / 100) * 255, 0)));
    strokeWeight(this.weight * 1.5);
    this.render_sub_route();
    if (this.double_arrows) {
      this.swap_id();
      this.render_sub_route();
      this.swap_id();
    }
    stroke(
      this.line_color + this.int_to_hex(round((this.alpha_pct / 100) * 255, 0))
    );
    strokeWeight(this.weight);
    this.render_sub_route();
    if (this.double_arrows) {
      this.swap_id();
      this.render_sub_route();
      this.swap_id();
    }

    //circle(this.x_mid, this.y_mid, 6 * this.weight); // shows arrow hitboxes
  }
} //Handels all proporties and rendering of links in model. (n.b. need to fix offset calculations)

class walkthrough {
  constructor(
    opacity_steps = [],
    translucency_steps = [],
    transparency_steps = [],
    info_steps = []
  ) {
      this.opacity_steps = opacity_steps;
      this.translucency_steps = translucency_steps;
      this.transparency_steps = transparency_steps;
      this.info_steps = info_steps;
      mode = "walkthrough";
      
    }
} //to be made...

class key {} //to be made...

class selector {
  constructor(x = 0, y = 0, multi = false) {
    this.x = x;
    this.y = y;
    this.multi = multi;
    this.selection = [];
    this.selection_type = [];
    this.subsel = [];
    this.subtype = [];
    this.option = "none";
    for (let n = 0; n <= max_node_id; n++) {
      if (
        (this.x - nodes[n].x) ** 2 + (this.y - nodes[n].y) ** 2 <
        nodes[n].radius ** 2
      ) {
        append(this.subsel, nodes[n].id);
        append(this.subtype, "node");
      }
    }
    reverse(this.subsel);
    reverse(this.subtype);
    this.selection = concat(this.selection, this.subsel);
    this.selection_type = concat(this.selection_type, this.subtype);
    this.subsel = [];
    this.subtype = [];
    for (let l = 0; l < links.length; l++) {
      if (
        (this.x - links[l].x_mid) ** 2 + (this.y - links[l].y_mid) ** 2 <
        (6 * links[l].weight) ** 2
      ) {
        append(this.selection, links[l].id);
        append(this.selection_type, "link");
      }
    }
    reverse(this.subsel);
    reverse(this.subtype);
    this.selection = concat(this.selection, this.subsel);
    this.selection_type = concat(this.selection_type, this.subtype);
    if (this.selection.length > 0) {
      this.selected = this.selection[0];
      this.type = this.selection_type[0];
    } else {
      this.selected = null;
      this.type = null;
    }
  }

  render() {
    if (options) {
      fill("#FFFFFF");
      stroke("#999999");
      strokeWeight(2);
      rect(this.x, this.y, 40, 49);
      strokeWeight(1);
      line(this.x, this.y + 13, this.x + 40, this.y + 13);
      line(this.x, this.y + 25, this.x + 40, this.y + 25);
      line(this.x, this.y + 37, this.x + 40, this.y + 37);
      noStroke();
      if (this.type == "link") {
        fill("#C5C5C5");
      } else {
        fill("#000000");
      }
      textSize(12);
      text("Move", this.x + 2, this.y + 11);
      text("Focus", this.x + 2, this.y + 23);
      fill("#000000");
      noStroke();
      text("Info", this.x + 2, this.y + 35);
      text("Close", this.x + 2, this.y + 47);
    }
  }

  select_option() {
    this.inloop = true;
    if (mouseX > this.x + 1 && mouseX < this.x + 40) {
      while (this.inloop) {
        //loop is being used to tidy things up as there are not elif statements (method technically not necessary)
        this.inloop = false;
        if (mouseY > this.y + 1 && mouseY < this.y + 13) {
          this.option = "move";
          break;
        }
        if (mouseY > this.y + 13 && mouseY < this.y + 25) {
          this.option = "focus";
          break;
        }
        if (mouseY > this.y + 25 && mouseY < this.y + 37) {
          this.option = "info";
          break;
        }
        if (mouseY > this.y + 37 && mouseY < this.y + 49) {
          this.option = "close";
          break;
        }
        //this.option="none";
      }
    }
  }

  move() {
    if (this.type != "node") {
      mode = "default";
    } else {
      this.old_x = nodes[this.selected].x;
      this.old_y = nodes[this.selected].y;
      this.new_x = mouseX;
      this.new_y = mouseY;
      this.dif_x = this.old_x - this.new_x;
      this.dif_y = this.old_y - this.new_y;
      nodes[this.selected].x = this.new_x;
      nodes[this.selected].y = this.new_y;
      for (let l = 0; l < nodes[this.selected].group_ids.length; l++) {
        nodes[nodes[this.selected].group_ids[l]].x =
          nodes[nodes[this.selected].group_ids[l]].x - this.dif_x;
        nodes[nodes[this.selected].group_ids[l]].y =
          nodes[nodes[this.selected].group_ids[l]].y - this.dif_y;
      }
    }
  }

  render_info() {
    fill("#FFFFFF");
    stroke("#999999");
    strokeWeight(2);
    rect(width - 128, 0, 128, height);
    strokeWeight(1);
    line(width - 128, 13, width, 13);
    fill("#000000");
    noStroke();
    textSize(12);
    text("Close", width - 33, 11);
    textSize(9);
    if (this.type == "node") {
      this.t = nodes[this.selected].info;
    } else {
      this.t = links[this.selected].info;
    }
    text(this.t, width - 126, 14, 128, height);
  }
} //Handels selection of model components, menue rendering, and node movement.

function reset_model(){
  nodes = {};
  links = [];
  new_nodes=[new node(text_box="Pathogens",diameter=5.25*sm+cm,x=1.25*sx,y=4*sy,info="test",fill_color=c.grey0,line_color=c.grey0,core_color=c.blank,render_core=false,group_ids=[1,2,3]), //this is here due to a rendering bug that occours with the text of the first node created
            new node(text_box="Bacteria",diameter=2*sm+cm,x=0.9*sx+cx,y=4.35*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1,render_core=true,group_ids=[0,2,3]),
            new node(text_box="Virus",diameter=1*sm+cm,x=1.9*sx+cx,y=4.25*sy+cy,info="test",fill_color=c.red1,line_color=c.gold1,core_color=c.blank,render_core=false,group_ids=[0,1,3]),
            new node(text_box="Fungi",diameter=1.5*sm+cm,x=1.25*sx+cx,y=3.35*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1,render_core=true,group_ids=[0,1,2]),
            new node(text_box="Neutrophil",diameter=2.5*sm+cm,x=7.5*sx+cx,y=4.25*sy+cy,info="test",fill_color=c.blue0,line_color=c.orange0,core_color=c.red0),
            new node(text_box="Macrophage",diameter=4*sm+cm,x=4*sx+cx,y=5.25*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blue0),
            new node(text_box="Compliment",diameter=1*sm+cm,x=4.01*sx+cx,y=7.5*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Dendritic Cell",diameter=2.75*sm+cm,x=7.5*sx+cx,y=7*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Infected/Cancerous Cell",diameter=2.25*sm+cm,x=10.25*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold1,core_color=c.pink0),
            new node(text_box="Natural Killer Cell",diameter=2.25*sm+cm,x=7.25*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Monocyte",diameter=3*sm+cm,x=1*sx+cx,y=7.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Eosinophil",diameter=2*sm+cm,x=7.5*sx+cx,y=1*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.orange0),
            new node(text_box="Basophil",diameter=1.5*sm+cm,x=8.75*sx+cx,y=2.5*sy+cy,info="test",fill_color=c.green0,line_color=c.red0,core_color=c.orange0),
            new node(text_box="Mast Cell",diameter=2.25*sm+cm,x=9.25*sx+cx,y=3.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.orange0),
            new node(text_box="Parasites",diameter=6*sm+cm,x=1.25*sx+cx,y=1.25*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1),
            new node(text_box="Antibodies",diameter=1*sm+cm,x=11*sx+cx,y=1*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Plasma Cell",diameter=2.75*sm+cm,x=15*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.green0,line_color=c.purple0,core_color=c.gold0),
            new node(text_box="B Cell",diameter=1.5*sm+cm,x=13.25*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.green0,core_color=c.gold0),
            new node(text_box="Memory B Cell",diameter=1.5*sm+cm,x=11*sx+cx,y=2.25*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin B Cell",diameter=1.25*sm+cm,x=11*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Long Lived Plasma Cell",diameter=3*sm+cm,x=15*sx+cx,y=1*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold0,core_color=c.blank,render_core=false),
            new node(text_box="Killer T Cell",diameter=2*sm+cm,x=12*sx+cx,y=8.5*sy+cy,info="test",fill_color=c.red0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Memory Killer T Cell",diameter=2*sm+cm,x=15*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.red0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Helper T Cell",diameter=1.5*sm+cm,x=11.5*sx+cx,y=5.25*sy+cy,info="test",fill_color=c.green0,line_color=c.purple0,core_color=c.blue0,render_core=true),
            new node(text_box="Memory Helper T Cell",diameter=1.5*sm+cm,x=15*sx+cx,y=5.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin Helper T Cell",diameter=1.5*sm+cm,x=10.75*sx+cx,y=7*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin Killer T Cell",diameter=1.75*sm+cm,x=9.75*sx+cx,y=8.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            ];
  
  links=[new link(from_id=4,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=5,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=6,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=9,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=13,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=15,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=11,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=12,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=21,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=22,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=10,to_id=5,info="test",line_color=c.purple0),
        new link(from_id=5,to_id=6,info="test",line_color=c.blue0,double_arrows=false,offset=4.9),
        new link(from_id=6,to_id=13,info="test",line_color=c.green0),
        new link(from_id=6,to_id=5,info="test",line_color=c.green0,double_arrows=false,offset=6.5),
        new link(from_id=4,to_id=5,info="test",line_color=c.blue0,double_arrows=false,offset=10),
        new link(from_id=4,to_id=5,info="test",line_color=c.green0,double_arrows=true,offset=-10),
        new link(from_id=9,to_id=5,info="test",line_color=c.blue0,double_arrows=true),
        new link(from_id=11,to_id=4,info="test",line_color=c.green0),
        new link(from_id=12,to_id=4,info="test",line_color=c.green0),
        new link(from_id=12,to_id=13,info="test",line_color=c.green0),
        new link(from_id=15,to_id=13,info="test",line_color=c.green0),
        new link(from_id=15,to_id=12,info="test",line_color=c.green0),
        new link(from_id=15,to_id=11,info="test",line_color=c.green0),
        new link(from_id=6,to_id=17,info="test",line_color=c.green0),
        new link(from_id=24,to_id=17,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=23,to_id=17,info="test",line_color=c.blue0),
        new link(from_id=16,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=17,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=18,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=17,to_id=18,info="test",line_color=c.purple0),
        new link(from_id=17,to_id=16,info="test",line_color=c.purple0),
        new link(from_id=19,to_id=17,info="test",line_color=c.purple0),
        new link(from_id=20,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=16,to_id=20,info="test",line_color=c.purple0),
        new link(from_id=21,to_id=22,info="test",line_color=c.purple0),
        new link(from_id=24,to_id=16,info="test",line_color=c.blue0,double_arrows=true,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=21,info="test",line_color=c.green0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=22,info="test",line_color=c.green0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=9,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=7,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=5,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=4,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=23,to_id=9,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=7,info="test",line_color=c.blue0,double_arrows=false,offset=8),
        new link(from_id=4,to_id=7,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=5,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=4,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=16,info="test",line_color=c.blue0,double_arrows=true),
        new link(from_id=23,to_id=21,info="test",line_color=c.green0),
        new link(from_id=23,to_id=22,info="test",line_color=c.green0),
        new link(from_id=23,to_id=24,info="test",line_color=c.purple0),
        new link(from_id=25,to_id=23,info="test",line_color=c.purple0),
        new link(from_id=26,to_id=21,info="test",line_color=c.purple0),
        new link(from_id=7,to_id=25,info="test",line_color=c.blue0,double_arrows=false,offset=8),
        new link(from_id=7,to_id=25,info="test",line_color=c.green0,double_arrows=false,offset=-8),
        new link(from_id=7,to_id=23,info="test",line_color=c.green0,double_arrows=false,offset=8),
        new link(from_id=7,to_id=26,info="test",line_color=c.green0),
        ];
  
  for (let n = 0; n < new_nodes.length; n++) {
    nodes[new_nodes[n].id] = new_nodes[n];
  }
  return nodes,links
} //Defines the default baked parameters of the model.

function reset_variables() {
  options = false;
  display_info = false;
  mode = "default";
  next_node_id = 0;
  max_node_id = 0;
  next_link_id = 0;
  max_link_id = 0;
  sx = 50;
  sy = 50;
  sm = 16;
  cx = 0 * sx;
  cy = 0 * sy;
  cm = 0 * sm;
} //Defines the default state of constants and state variables.

function setup() {
  reset_variables();
  c = new colors();
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  reset_model();
  s = new selector((x = -1), (y = -1));
  frameRate(90);
} //In-built function: Sets and defines variables for main loop (runs before draw function).

function draw() {
  background(220);

  if (mode == "move") {
    s.move();
  }

  for (let l = 0; l < links.length; l++) {
    links[l].render();
  }
  for (let n = 0; n <= max_node_id; n++) {
    nodes[n].render();
  }

  s.render();

  if (mode == "info") {
    s.render_info();
  }
} //In-built function: Updates the canvas that the user sees (is called once every frame).

function mouseClicked() {
  if (mode == "move") {
    s.move();
  }
  if (!options && s.option == mode) {
    mode = "default";
  }
  if (options) {
    s.select_option();
    if (s.option == "close" || s.option == "none") {
      mode = "default";
    } else {
      mode = s.option;
    }
    options = false;
  }
  if (mode == "default") {
    s = new selector((x = mouseX), (y = mouseY));
    if (s.type == "node" || s.type == "link") {
      options = true;
      mode = "options";
    }
  }
} //In-built function: Handels what happens when the user clicks on the canvas (is called when the user tries to click).
