
window.app = {}

// SVG-Viewer Component
Vue.component('svg-viewer', {
  props: ['svgUrl', 'height', 'width'],
  template: `
    <embed
      :src="srcUrl"
      type="image/svg+xml"
      class="border-light"
      :style="'height: ' + height + 'px'"
      :width="width + 'px'"
    >
      Your browser does not support SVG
    </embed>
  `,
  computed: {
    srcUrl () {
      return "https://kzjcn50yd2.execute-api.eu-central-1.amazonaws.com/dev/embed?svgUrl=" + this.svgUrl
    }
  }
})

// Layout Component definition
window.app.layout = {
  template: `
    <div class='row mt-2 pt-4'>

      <div class='col-sm-12'>
        <h4>Embeddy</h4>
        <p class="lead mb-0">The diagrams describe the five sub-ontologies that complete the FRMA Ontology</p>
        <small>You may zoom and pan each diagram.</small>
      </div>


      <div class='col-sm-12'>
        <div class='form-group'>
          <label>SVG URL</label>
          <input class="form-control" v-model="svgUrl" />

          <input class="form-control" type="number" v-model="width" />
          <input class="form-control" type="number" v-model="height" />

          <button class="btn btn-success" @click="showing = !showing">load<button/>
        </div>
      </div>

      <div class='col-sm-12 mt-3'>
        <svg-viewer :svgUrl="svgUrl" :width="width" :height="height" v-if="showing" />
      </div>

    </div>
  `,
  data () {
    return {
      showing: true,
      height: 400,
      width: 400,
      svgUrl: 'https://raw.githubusercontent.com/FRMA-Ontology/diagrams/master/concept-maps/oe_12/svg/OE_X_HairOntology-full.svg'
    }
  }
};

window.app.splash = {
  template: `
    <div class='row h-100 mt-4 pt-4 align-items-center justify-content-center'>
      <div class='col-lg-12 text-center'>
        <h1 class='my-3'>
          <strong>FRMA Ontology</strong>
        </h1>
        <p class='lead my-3 text-muted'>
          Conceptual Diagrams
        </p>

        <a href='#/map' class='btn btn-lg btn-outline-primary my-3'>
          <i class='fa fa-map mr-2'></i>
          Let's get started
        </a>
      </div>
    </div>
  `
}