// By Oscar Bullen (March 2022)
// Made using p5.js (https://p5js.org)

function preload() {
  
  nodes_x_scale = [2.8,2.55,3.15,2.8,7.5,4,4.01,7.5,10.25,7.25,0.75,7.5,8.75,9.25,2.75,11,14.5,13.25,1.5,1.25,14.5,12,14.5,11.5,14.5,10.75,9.75];
  nodes_y_scale = [3.8,4.1,4,3.2,4,5.25,7.5,7,9.75,9.75,5.25,1,2.5,3.75,1.25,1,3.5,3.5,2.25,3.5,1,8.5,9.75,5.25,5.75,7,8.5];
  nodes_m_scale = [5.25,2,1,1.5,2.5,4,1,2.75,2.25,2.25,3,2,1.5,2.25,6,1,2.75,1.5,1.5,1.25,3,2,2,1.5,1.5,1.5,1.75];
  
  info_to_get = {
    test:
      "This is some sample text to make sure everything is working correctly. E.g. The quick brown fox jumps over the lazy dog.",
    test2:
      "This is yet some more sample text in order to make sure that information can be changed on the fly if it is needed. e.g. The answer to life, the universe, and everything is inexorably 42.",
    none: "",
  };
  
  node_default_opacity = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  node_default_translucency = [];
  node_default_transparency = [];
  
  link_default_opacity = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56];
  link_default_translucency = [0,1,2,3,4,5,6,7,8,9,24,35,36,37,38,39,40,41];
  link_default_transparency = [];
  
  walkthrough_info = {
    test:
      ["This is the innate immune system. It is immunity that one is born with. This type of immunity is written in one’s genes, offering lifelong protection. The innate immune response is fast acting and non-specific, meaning it does not respond differently based on the specific virus or bacteria that it detects. The innate immune system encompasses physical barriers and chemical and cellular defenses.","Adaptive immunity is an organism’s acquired immunity to a specific pathogen. As such, it’s also referred to as acquired immunity. Adaptive immunity is not immediate, nor does it always last throughout an organism’s entire lifespan, although it can. The adaptive immune response is marked by clonal expansion of T and B lymphocytes, releasing many antibody copies to neutralize or destroy their target antigen.","Pathogens in the oldest and broadest sense, are any organism or agent that can produce disease. A pathogen may also be referred to as an infectious agent, or simply a germ."],
  };
  
  node_opacity = {
    test:
      [[4,5,6,7,9,10,11,12,13],[15,16,17,18,19,20,21,22,23,24,25,26],[0,1,2,3,8,14]],
  };
  
  node_translucency = {
    test:
      [[0,1,2,3,8,14,15,16,17,18,19,20,21,22,23,24,25,26],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[4,5,6,7,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26]],
  };
  
  node_transparency = {
    test:
      [[],[],[]],
  };
  
  link_opacity = {
    test:
      [[10,11,12,13,14,15,16,17,18,19,44],[24,25,26,27,28,29,30,31,32,33,34,35,36,37,47,48,49,50,51,52],[]],
  };
  
  link_translucency = {
    test:
      [[0,1,2,3,4,5,6,7,8,9,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,55,56],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,38,39,40,41,42,43,44,45,46,53,54,55,56],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56]],
  };
  
  link_transparency = {
    test:
      [[],[],[]],
  };
  
} //In-built function: Gets / defines model"s metadata (runs before start of main program). (n.b. delete test values as info is not mine and only placeholders for debugging)

class colors {
  constructor() {
    this.blank = "#00000000"; //transparant
    this.background = "#DCDCDC" //background
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
    this.black3 = "#000000"; //menu text
    this.white3 = "#FFFFFF"; //menu background
    this.gray3 = "#999999" //menu boarder
    this.silver3 = "#C5C5C5" //menu disabled text
    this.blue3 = "#0047C0" //menu link
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
    alpha_pct = 100,
    id = -1
  ) {
    this.text_box = text_box;
    this.fill_color = fill_color;
    this.line_color = line_color;
    this.core_color = core_color;
    this.diameter = diameter;
    this.x = x;
    this.y = y;
    this.scale_x = this.x;
    this.scale_y = this.y;
    this.group_ids = group_ids;
    this.radius = round(this.diameter / 2, 0);
    this.render_core = render_core;
    this.alpha_pct = alpha_pct;
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

  int_to_hex(number = 0) {
    if (number.toString(16).length > 1){
      return number.toString(16);
    } else {
      return "0"+number.toString(16);
    }
  }
  
  render() {
    this.color_val=this.int_to_hex(round(((100-this.alpha_pct) / 100)*255, 0));
    this.text_val=this.int_to_hex(round(((this.alpha_pct) / 100)*255, 0));
    fill(this.fill_color);
    stroke(this.line_color);
    strokeWeight(round(this.diameter / 8, 0));
    circle(this.x, this.y, this.diameter);
    if (this.render_core) {
      noStroke();
      fill(this.core_color);
      circle(this.x, this.y, this.radius);
    }
    if (this.alpha_pct < 100) {
      fill(c.black3+this.text_val);
      stroke(c.white3+this.text_val);
    } else {
      fill(c.black3);
      stroke(c.white3);
    }
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
    if (this.alpha_pct < 100){
      fill(c.background+this.color_val);
      stroke(c.background+this.color_val);
      strokeWeight((this.diameter / 8)+1);
      circle(this.x,this.y,this.diameter);
    }
  }
} //Handels properties and rendering of nodes in model.

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

      this.x_offset = (this.offset * this.x_multi * this.swap_multi) ^ 0.5;
      this.y_offset = (this.offset * this.y_multi * this.swap_multi) ^ 0.5;
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
        fill(c.black3 + this.int_to_hex(round((this.alpha_pct / 100) * 255, 0)));
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
    stroke(c.background + this.int_to_hex(round((this.alpha_pct / 100) * 255, 0)));
    strokeWeight(this.weight * 3);
    this.render_sub_route();
    if (this.double_arrows) {
      this.swap_id();
      this.render_sub_route();
      this.swap_id();
    }
    stroke(c.black3 + this.int_to_hex(round((this.alpha_pct / 100) * 255, 0)));
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
} //Handels all proporties and rendering of links in model. (n.b. need to fix offset calculations and improve transparency)

class menu {
  constructor() {
    this.visible = true;
    this.page = 0;
  }
  
  render() {
    if (this.visible) {
      fill(c.white3);
      stroke(c.gray3);
      strokeWeight(3);
      rect(0,windowHeight-128,400,128);
      fill(c.silver3);
      stroke(c.gray3);
      rect(0,windowHeight-128,400,16);
      stroke(c.gray3);
      strokeWeight(1.5);
      fill(c.white3);
      rect(3,windowHeight-72,50,10)
      noStroke();
      textSize(12);
      fill(c.black3);
      text("-------------------------------------------- Menu: --------------------------------------------",2,windowHeight-116);
      textSize(10);
      text("Click on a cell / arrow for info and more options for . Or alternatively, select one of the walkthroughs bellow to learn more on how your immune system protects your body from pathogens:",2,windowHeight-110,398);
      textSize(9);
      fill(c.blue3);
      text("Introduction",4,windowHeight-64);
      
    }
  }
  
} //to be made...

class walkthrough {
  constructor(
    node_opacity_steps = [[]],
    node_translucency_steps = [[]],
    node_transparency_steps = [[]],
    link_opacity_steps = [[]],
    link_translucency_steps = [[]],
    link_transparency_steps = [[]],
    info_steps = ["This is some sample text in order to demonstrate the text wrapping capabilities of the info part of the walkthrough module. For example: the quick brown fox jumps over the lazy dog in order to avoid the end of the text box."]
  ) {
      this.node_opacity_steps = node_opacity_steps;
      this.node_translucency_steps = node_translucency_steps;
      this.node_transparency_steps = node_transparency_steps;
      this.link_opacity_steps = link_opacity_steps;
      this.link_translucency_steps = link_translucency_steps;
      this.link_transparency_steps = link_transparency_steps;
      this.info_steps = info_steps;
      this.step=0;
      this.visible=true;
      this.update_model();
      display_walkthrough=true;
    }
  
  
  default_model() {
    for (let l = 0; l < node_default_opacity.length; l++) {
      nodes[node_default_opacity[l]].alpha_pct = 100;
    }
    for (let l = 0; l < node_default_translucency.length; l++) {
      nodes[node_default_translucency[l]].alpha_pct = 15;
    }
    for (let l = 0; l < node_default_transparency.length; l++) {
      nodes[node_default_transparency[l]].alpha_pct = 0;
    }
    for (let l = 0; l < link_default_opacity.length; l++) {
      links[link_default_opacity[l]].alpha_pct = 100;
    }
    for (let l = 0; l < link_default_translucency.length; l++) {
      links[link_default_translucency[l]].alpha_pct = 15;
    }
    for (let l = 0; l < link_default_transparency.length; l++) {
      links[link_default_transparency[l]].alpha_pct = 0;
    }
  }
  
  step_forward() {
    if (this.step < this.info_steps.length - 1){
      this.step = this.step + 1;
      this.update_model();
    }
  }
  
  step_backward() {
    if (this.step > 0){
      this.step = this.step - 1;
      this.update_model();
    }
  }
  
  toggle_visibility() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
  
  update_model() {
    for (let l = 0; l < this.node_opacity_steps[this.step].length; l++) {
      nodes[this.node_opacity_steps[this.step][l]].alpha_pct = 100;
    }
    for (let l = 0; l < this.node_translucency_steps[this.step].length; l++) {
      nodes[this.node_translucency_steps[this.step][l]].alpha_pct = 15;
    }
    for (let l = 0; l < this.node_transparency_steps[this.step].length; l++) {
      nodes[this.node_transparency_steps[this.step][l]].alpha_pct = 0;
    }
    for (let l = 0; l < this.link_opacity_steps[this.step].length; l++) {
      links[this.link_opacity_steps[this.step][l]].alpha_pct = 100;
    }
    for (let l = 0; l < this.link_translucency_steps[this.step].length; l++) {
      links[this.link_translucency_steps[this.step][l]].alpha_pct = 15;
    }
    for (let l = 0; l < this.link_transparency_steps[this.step].length; l++) {
      links[this.link_transparency_steps[this.step][l]].alpha_pct = 0;
    }
    return nodes,links
  }
  
  render() {
    if (this.visible) {
      fill(c.white3);
      stroke(c.gray3);
      strokeWeight(3);
      rect(0,windowHeight-128,400,128);
      fill(c.silver3);
      stroke(c.gray3);
      rect(0,windowHeight-128,400,16);
      noStroke();
      textSize(12);
      fill(c.black3);
      this.title_text = "    Back  --------------------------------- Step " + str(this.step + 1) + ": ---------------------------------";
      text(this.title_text,2,windowHeight-116);
      fill(c.black3);
      noStroke();
      triangle(397,windowHeight-120,385,windowHeight-126,385,windowHeight-114);
      triangle(369,windowHeight-120,381,windowHeight-126,381,windowHeight-114);
      triangle(2,windowHeight-120,14,windowHeight-126,14,windowHeight-114);
      stroke(c.gray3);
      strokeWeight(3);
      line(44,windowHeight-128,44,windowHeight-112);
      line(366,windowHeight-128,366,windowHeight-112);
      noStroke();
      textSize(10);
      fill(c.black3);
      text(this.info_steps[this.step],2,windowHeight-110,398);
    }
  }
  
} //Manages rendering walkthroughs, updating model alpha values, and step incrementation. (n.b. need to make the font scale)

class model_key {
  constructor(visible=true,indexes=["Immune System","Attack","Activate","Communicate","Produce","Morph","Inflame","Pathogens & Parasites","Replicate","Accumilate Resources","Evade Destruction"],colors=[c.black3,c.red0,c.green0,c.blue0,c.gold0,c.purple0,c.orange0,c.black3,c.red1,c.brown1,c.gold1],headings=[true,false,false,false,false,false,false,true,false,false,false,false]) {
    this.visible=visible;
    this.indexes=indexes;
    this.colors=colors;
    this.headings=headings;
  }
  
  render() {
    if (this.visible) {
      fill(c.white3);
      stroke(c.gray3);
      strokeWeight(2);
      rect(0,0,128,191);
      fill(c.silver3);
      stroke(c.gray3);
      rect(0,0,128,16);
      noStroke();
      textSize(12);
      fill(c.black3);
      text("---------- Key: ----------",2,12);
      this.y_counter=28;
      for (let l = 0; l < this.indexes.length; l++) {
        if (this.headings[l]) {
          fill(c.white3);
          stroke(c.gray3);
          strokeWeight(1);
          line(0,this.y_counter-12,128,this.y_counter-12);
          line(0,this.y_counter+4,128,this.y_counter+4);
          fill(this.colors[l]);
          noStroke();
          text(this.indexes[l]+":",2,this.y_counter);
        } else {
          fill(this.colors[l]);
          noStroke();
          text(this.indexes[l],2,this.y_counter);
        }
        fill(c.black3);
        noStroke();
        triangle(115,4,125,4,120,12);
        this.y_counter=this.y_counter+16
      }
      
    } else {
      fill(c.silver3);
      stroke(c.gray3);
      rect(0,0,128,16);
      noStroke();
      textSize(12);
      fill(c.black3);
      text("---------- Key: ----------",2,12);
      fill(c.black3);
      noStroke();
      triangle(115,12,125,12,120,4);
    }
  }
  
  toggle_visibility() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
  
} //Handels rendering and visibility of model key.

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
    
    //Checks bellow will not scale correctly. Fix if gui magnitude scaling is implemented in future.
    
    if (114 < this.x && this.x < 126 && 3 < this.y && this.y < 13) {
      k.toggle_visibility();
    }
    
    if (2 < this.x && this.x < 51 && windowHeight - 73 < this.y && this.y < windowHeight - 64 && display_walkthrough == false) {
      w = new walkthrough(node_opacity.test,node_translucency.test,node_transparency.test,link_opacity.test,link_translucency.test,link_transparency.test,walkthrough_info.test);
    }
    
    if (1 < this.x && this.x < 41 && windowHeight - 128 < this.y && this.y < windowHeight - 112 && display_walkthrough == true) {
      w.default_model();
      w.visible = false;
      display_walkthrough = false;
    }
    
    if (369 < this.x && this.x < 381 && windowHeight - 128 < this.y && this.y < windowHeight - 112 && display_walkthrough == true) {
      w.step_backward();
    }
    
    if (385 < this.x && this.x < 397 && windowHeight - 128 < this.y && this.y < windowHeight - 112 && display_walkthrough == true) {
      w.step_forward();
    }
    
  }

  render() {
    if (options) {
      fill(c.white3);
      stroke(c.gray3);
      strokeWeight(2);
      rect(this.x, this.y, 40, 49);
      strokeWeight(1);
      line(this.x, this.y + 13, this.x + 40, this.y + 13);
      line(this.x, this.y + 25, this.x + 40, this.y + 25);
      line(this.x, this.y + 37, this.x + 40, this.y + 37);
      noStroke();
      if (this.type == "link") {
        fill(c.silver3);
      } else {
        fill(c.black3);
      }
      textSize(12);
      text("Move", this.x + 2, this.y + 11);
      text("Focus", this.x + 2, this.y + 23);
      fill(c.black3);
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
    fill(c.white3);
    stroke(c.gray3);
    strokeWeight(2);
    rect(width - 128, 0, 128, height);
    strokeWeight(1);
    line(width - 128, 13, width, 13);
    fill(c.black3);
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
} //Handels selection of model components, menue rendering, and node movement. (n.b. need to make the font scale and give 'focus' option functionality)

function reset_model() {
  frameRate(0);
  
  next_node_id = 0;
  max_node_id = 0;
  next_link_id = 0;
  max_link_id = 0;
  nodes = {};
  links = [];
  
  new_nodes=[new node(text_box="Pathogens",diameter=5.25*sm+cm,x=2.8*sx,y=3.8*sy,info="test",fill_color=c.grey0,line_color=c.grey0,core_color=c.blank,render_core=false,group_ids=[1,2,3]), //this is here due to a rendering bug that occours with the text of the first node created
            new node(text_box="Bacteria",diameter=2*sm+cm,x=2.55*sx+cx,y=4.1*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1,render_core=true,group_ids=[0,2,3]),
            new node(text_box="Virus",diameter=1*sm+cm,x=3.15*sx+cx,y=4*sy+cy,info="test",fill_color=c.red1,line_color=c.gold1,core_color=c.blank,render_core=false,group_ids=[0,1,3]),
            new node(text_box="Fungi",diameter=1.5*sm+cm,x=2.8*sx+cx,y=3.2*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1,render_core=true,group_ids=[0,1,2]),
            new node(text_box="Neutrophil",diameter=2.5*sm+cm,x=7.5*sx+cx,y=4*sy+cy,info="test",fill_color=c.blue0,line_color=c.orange0,core_color=c.red0),
            new node(text_box="Macrophage",diameter=4*sm+cm,x=4*sx+cx,y=5.25*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blue0),
            new node(text_box="Compliment",diameter=1*sm+cm,x=4.01*sx+cx,y=7.5*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Dendritic Cell",diameter=2.75*sm+cm,x=7.5*sx+cx,y=7*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Infected/Cancerous Cell",diameter=2.25*sm+cm,x=10.25*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold1,core_color=c.pink0),
            new node(text_box="Natural Killer Cell",diameter=2.25*sm+cm,x=7.25*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Monocyte",diameter=3*sm+cm,x=0.75*sx+cx,y=5.25*sy+cy,info="test",fill_color=c.purple0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Eosinophil",diameter=2*sm+cm,x=7.5*sx+cx,y=1*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.orange0),
            new node(text_box="Basophil",diameter=1.5*sm+cm,x=8.75*sx+cx,y=2.5*sy+cy,info="test",fill_color=c.green0,line_color=c.red0,core_color=c.orange0),
            new node(text_box="Mast Cell",diameter=2.25*sm+cm,x=9.25*sx+cx,y=3.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.orange0),
            new node(text_box="Parasites",diameter=6*sm+cm,x=2.75*sx+cx,y=1.25*sy+cy,info="test",fill_color=c.brown1,line_color=c.gold1,core_color=c.red1),
            new node(text_box="Antibodies",diameter=1*sm+cm,x=11*sx+cx,y=1*sy+cy,info="test",fill_color=c.red0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Plasma Cell",diameter=2.75*sm+cm,x=14.5*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.green0,line_color=c.purple0,core_color=c.gold0),
            new node(text_box="B Cell",diameter=1.5*sm+cm,x=13.25*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.green0,core_color=c.gold0),
            new node(text_box="Memory B Cell",diameter=1.5*sm+cm,x=11*sx+cx,y=2.25*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin B Cell",diameter=1.25*sm+cm,x=11*sx+cx,y=3.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Long Lived Plasma Cell",diameter=3*sm+cm,x=14.5*sx+cx,y=1*sy+cy,info="test",fill_color=c.gold0,line_color=c.gold0,core_color=c.blank,render_core=false),
            new node(text_box="Killer T Cell",diameter=2*sm+cm,x=12*sx+cx,y=8.5*sy+cy,info="test",fill_color=c.red0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Memory Killer T Cell",diameter=2*sm+cm,x=14.5*sx+cx,y=9.75*sy+cy,info="test",fill_color=c.red0,line_color=c.red0,core_color=c.blank,render_core=false),
            new node(text_box="Helper T Cell",diameter=1.5*sm+cm,x=11.5*sx+cx,y=5.25*sy+cy,info="test",fill_color=c.green0,line_color=c.purple0,core_color=c.blue0,render_core=true),
            new node(text_box="Memory Helper T Cell",diameter=1.5*sm+cm,x=14.5*sx+cx,y=5.75*sy+cy,info="test",fill_color=c.blue0,line_color=c.green0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin Helper T Cell",diameter=1.5*sm+cm,x=10.75*sx+cx,y=7*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            new node(text_box="Virgin Killer T Cell",diameter=1.75*sm+cm,x=9.75*sx+cx,y=8.5*sy+cy,info="test",fill_color=c.purple0,line_color=c.purple0,core_color=c.blank,render_core=false),
            ];
  
  links=[new link(from_id=4,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15), //0
        new link(from_id=5,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=6,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=9,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=13,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=15,to_id=0,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=11,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=12,to_id=14,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=21,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=22,to_id=8,info="test",line_color=c.red0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=10,to_id=5,info="test",line_color=c.purple0), //10
        new link(from_id=5,to_id=6,info="test",line_color=c.blue0,double_arrows=false,offset=4.9),
        new link(from_id=6,to_id=13,info="test",line_color=c.green0),
        new link(from_id=6,to_id=5,info="test",line_color=c.green0,double_arrows=false,offset=6.5),
        new link(from_id=4,to_id=5,info="test",line_color=c.blue0,double_arrows=false,offset=10),
        new link(from_id=4,to_id=5,info="test",line_color=c.green0,double_arrows=true,offset=-10),
        new link(from_id=9,to_id=5,info="test",line_color=c.blue0,double_arrows=true),
        new link(from_id=11,to_id=4,info="test",line_color=c.green0),
        new link(from_id=12,to_id=4,info="test",line_color=c.green0),
        new link(from_id=12,to_id=13,info="test",line_color=c.green0),
        new link(from_id=15,to_id=13,info="test",line_color=c.green0), //20
        new link(from_id=15,to_id=12,info="test",line_color=c.green0),
        new link(from_id=15,to_id=11,info="test",line_color=c.green0),
        new link(from_id=6,to_id=17,info="test",line_color=c.green0),
        new link(from_id=24,to_id=17,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=23,to_id=17,info="test",line_color=c.blue0),
        new link(from_id=16,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=17,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=18,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=17,to_id=18,info="test",line_color=c.purple0),
        new link(from_id=17,to_id=16,info="test",line_color=c.purple0), //30
        new link(from_id=19,to_id=17,info="test",line_color=c.purple0),
        new link(from_id=20,to_id=15,info="test",line_color=c.gold0),
        new link(from_id=16,to_id=20,info="test",line_color=c.purple0),
        new link(from_id=21,to_id=22,info="test",line_color=c.purple0),
        new link(from_id=24,to_id=16,info="test",line_color=c.blue0,double_arrows=true,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=21,info="test",line_color=c.green0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=22,info="test",line_color=c.green0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=9,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=7,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=24,to_id=5,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15), //40
        new link(from_id=24,to_id=4,info="test",line_color=c.blue0,double_arrows=false,offset=0,alpha_pct=15),
        new link(from_id=23,to_id=9,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=7,info="test",line_color=c.blue0,double_arrows=false,offset=8),
        new link(from_id=4,to_id=7,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=5,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=4,info="test",line_color=c.blue0),
        new link(from_id=23,to_id=16,info="test",line_color=c.blue0,double_arrows=true),
        new link(from_id=23,to_id=21,info="test",line_color=c.green0),
        new link(from_id=23,to_id=22,info="test",line_color=c.green0),
        new link(from_id=23,to_id=24,info="test",line_color=c.purple0), //50
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
  frameRate(90);
  return nodes,links
} //Defines the default baked parameters of the model.

function resize_sub_route() {
  if (windowHeight > 540) { //or 540
    resize_multi = 0;
  } else {
    resize_multi = 1;
  }
  return resize_multi;
} //Sub-routine of init and resize function.

function reset_variables() {
  options = false;
  display_walkthrough = false;
  display_info = false;
  mode = "default";
  next_node_id = 0;
  max_node_id = 0;
  next_link_id = 0;
  max_link_id = 0;
  nodes = {};
  links = [];
  node_previous_alpha_pct = {};
  link_previous_alpha_pct = [];
  sx = 75;
  sy = 50;
  sm = 16;
  cx = 0 * sx;
  cy = 0 * sy;
  cm = 0 * sm;
  max_x = 15;
  max_y = 10;
  x_pct = 90; //or 85
  y_pct = 90;
  start_large = 0;
  resize_sub_route();
  old_width = windowWidth;
  old_height = windowHeight;
  sx = x_pct / 100 * windowWidth / max_x;
  if (resize_multi) {
    sy = y_pct / 100 * (windowHeight - 150) / max_y;
    original_scale = 0;
  } else {
    sy = y_pct / 100 * windowHeight / max_y;
    original_scale = 1;
  }
  sm = (windowWidth * windowHeight / 45000) ^ 0.5;
  sm = sm + (16 / sm);
  
  
} //Defines the default state of constants and state variables.

function resize() {
  if (old_width != windowWidth || old_height != windowHeight) {  
    resize_sub_route(); 
    sm = (windowWidth * windowHeight / 45000) ^ 0.5;
    sm = sm + (16 / sm);
    sx = x_pct / 100 * windowWidth / max_x;
    sy = y_pct / 100 * windowHeight / max_y;
    for (let l = 0; l <= max_node_id; l++) {
      nodes[l].diameter = nodes_m_scale[l] * sm;
      nodes[l].radius = round(nodes[l].diameter / 2, 0);
      old_x_pct = nodes[l].x / old_width;
      nodes[l].x = windowWidth * old_x_pct;
      old_y_pct = nodes[l].scale_y / windowHeight;
      nodes[l].scale_y = windowHeight * old_y_pct;
      if (resize_multi) {
        if (original_scale) {
          nodes[l].y = nodes[l].scale_y * 0.6;
        } else {
          nodes[l].y = nodes[l].scale_y;
        }
      } else {
        if (original_scale) {
          nodes[l].y = nodes[l].scale_y;
        } else {
          nodes[l].y = nodes[l].scale_y * 5 /3;
        }
      }
    }
    old_width = windowWidth;
    old_height = windowHeight;
    return sx, sy, sm, old_width, old_height;
  }
} //Resizes and scales the model in a way to make it easier to view on different screen sizes. (n.b. scaler not 100% perfect)

function setup() {
  reset_variables();
  c = new colors();
  k = new model_key();
  m = new menu();
  w = new walkthrough();
  w.visible = false;
  display_walkthrough=false;
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  reset_model();
  s = new selector((x = -1), (y = -1));
  //w = new walkthrough(node_opacity.test,node_translucency.test,node_transparency.test,link_opacity.test,link_translucency.test,link_transparency.test,walkthrough_info.test); // TEMPORARY! Remove once dedicated system for viewing walkthroughs is in place.
  frameRate(90);
} //In-built function: Sets and defines variables for main loop (runs before draw function). (n.b. remove test objects before final release)

function draw() {
  resizeCanvas(windowWidth, windowHeight);

  resize();
  
  background(c.background);

  if (mode == "move") {
    s.move();
  }

  for (let l = 0; l < links.length; l++) {
    links[l].render();
  }
  for (let n = 0; n <= max_node_id; n++) {
    nodes[n].render();
  }
  
  k.render();
  
  if (display_walkthrough) {
    w.render();
  } else {
    m.render();
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
