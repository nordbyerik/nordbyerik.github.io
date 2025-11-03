<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "LSystemBackground",
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      let axiom = "F";
      let sentence = axiom;
      let len = 150;
      let angle;
      let rules = [
        {
          a: "F",
          b: "FF+[+F-F-F]-[-F+F+F]",
        },
      ];

      function generate() {
        len *= 0.5;
        let nextSentence = "";
        for (let i = 0; i < sentence.length; i++) {
          let current = sentence.charAt(i);
          let found = false;
          for (let j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
              found = true;
              nextSentence += rules[j].b;
              break;
            }
          }
          if (!found) {
            nextSentence += current;
          }
        }
        sentence = nextSentence;
      }

      function turtle() {
        p.background(255);
        p.resetMatrix();
        p.translate(p.width / 2, p.height);
        p.stroke(0);
        p.strokeWeight(3);
        for (let i = 0; i < sentence.length; i++) {
          let current = sentence.charAt(i);

          if (current == "F") {
            p.line(0, 0, 0, -len);
            p.translate(0, -len);
          } else if (current == "+") {
            p.rotate(angle);
          } else if (current == "-") {
            p.rotate(-angle);
          } else if (current == "[") {
            p.push();
          } else if (current == "]") {
            p.pop();
          }
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        angle = p.radians(25);
        p.background(255);
        for (let i = 0; i < 4; i++) {
          generate();
        }
        turtle();
        p.noLoop();
      };

      p.draw = () => {
        // Static drawing, so no need for continuous draw
      };
    },
  },
};
</script>

<style scoped>
.div {
  border: 1px solid black;
}
</style>
