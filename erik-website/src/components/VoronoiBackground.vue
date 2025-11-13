<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "VoronoiBackground",
  data() {
    return {
      points: [],
      numPoints: 40,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        
        // Initialize random points with velocities
        for (let i = 0; i < this.numPoints; i++) {
          this.points.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-1, 1),
            vy: p.random(-1, 1),
            hue: p.random(360),
          });
        }
        
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(255);
        p.loadPixels();

        // Update point positions
        for (let point of this.points) {
          point.x += point.vx;
          point.y += point.vy;
          
          // Bounce off walls
          if (point.x < 0 || point.x > p.width) {
            point.vx *= -1;
            point.x = p.constrain(point.x, 0, p.width);
          }
          if (point.y < 0 || point.y > p.height) {
            point.vy *= -1;
            point.y = p.constrain(point.y, 0, p.height);
          }
          
          // Slowly change hue
          point.hue = (point.hue + 0.5) % 360;
        }

        // Draw Voronoi diagram by computing nearest point for each pixel
        // Sample every nth pixel for performance
        let step = 3;
        for (let x = 0; x < p.width; x += step) {
          for (let y = 0; y < p.height; y += step) {
            let minDist = Infinity;
            let closestPoint = null;
            
            // Find closest point
            for (let point of this.points) {
              let d = p.dist(x, y, point.x, point.y);
              if (d < minDist) {
                minDist = d;
                closestPoint = point;
              }
            }
            
            if (closestPoint) {
              // Color based on distance and point's hue
              p.colorMode(p.HSB);
              let brightness = p.map(minDist, 0, 100, 255, 180);
              brightness = p.constrain(brightness, 180, 255);
              let color = p.color(closestPoint.hue, 70, brightness);
              
              // Fill the step x step area
              p.colorMode(p.RGB);
              p.fill(color);
              p.noStroke();
              p.rect(x, y, step, step);
            }
          }
        }

        // Draw the points themselves
        p.colorMode(p.HSB);
        for (let point of this.points) {
          p.fill(point.hue, 100, 50);
          p.noStroke();
          p.ellipse(point.x, point.y, 8, 8);
          
          // Draw a white border
          p.noFill();
          p.stroke(255);
          p.strokeWeight(2);
          p.ellipse(point.x, point.y, 8, 8);
        }
        
        p.colorMode(p.RGB);

        // Draw cell boundaries by finding pixels near edges
        p.stroke(40, 40, 40, 100);
        p.strokeWeight(1);
        for (let x = 0; x < p.width - step; x += step) {
          for (let y = 0; y < p.height - step; y += step) {
            // Check if this pixel is near a boundary
            let closestPoints = this.getClosestPoints(x, y, 2);
            if (closestPoints.length >= 2) {
              let d1 = p.dist(x, y, closestPoints[0].x, closestPoints[0].y);
              let d2 = p.dist(x, y, closestPoints[1].x, closestPoints[1].y);
              
              // If distances are similar, we're near a boundary
              if (Math.abs(d1 - d2) < 5) {
                p.point(x, y);
              }
            }
          }
        }
      };
    },
    getClosestPoints(x, y, n) {
      let distances = this.points.map(point => ({
        point: point,
        dist: Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2)
      }));
      distances.sort((a, b) => a.dist - b.dist);
      return distances.slice(0, n).map(d => d.point);
    },
  },
};
</script>

<style scoped>
.div {
  border: 1px solid black;
}
</style>
