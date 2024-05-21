Rework the wording in the to just have the most
<template>
  <div>
    <h1>Gödel's Ontological Proof</h1>
    <div v-html="renderedLatex" class="katex"></div>
  </div>
</template>

<script>
import katex from "katex";
import "katex/dist/katex.min.css";

export default {
  data() {
    return {
      latexString: `
        \\begin{aligned}
        &1. \\text{Axiom 1: } \\forall x (P(x) \\rightarrow P(\\neg x)) \\\\
        &2. \\text{Axiom 2: } \\exists x P(x) \\\\
        &3. \\text{Axiom 3: } \\forall x (P(x) \\rightarrow \\exists y (P(y) \\land x \\rightarrow y)) \\\\
        &4. \\text{Axiom 4: } \\forall x (P(x) \\rightarrow \\square P(x)) \\\\
        &5. \\text{Theorem 1: } \\square \\exists x P(x) \\\\
        &6. \\text{Definition 1: } G(x) \\leftrightarrow \\forall \\phi (P(\\phi) \\rightarrow \\phi(x)) \\\\
        &7. \\text{Axiom 5: } P(G) \\\\
        &8. \\text{Lemma 1: } \\square \\exists x G(x)
        \\end{aligned}
      `,
    };
  },
  computed: {
    renderedLatex() {
      return katex.renderToString(this.latexString, {
        throwOnError: false,
        displayMode: true,
      });
    },
  },
};
</script>

<style scoped>
.katex {
  font-size: 1.2em;
  margin: 10px 0;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
