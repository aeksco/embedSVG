
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
        <p class="lead mb-0">Enter a URL to an SVG image you would like to embed</p>
      </div>


      <div class='col-sm-12'>
        <div class='form-group'>
          <label>SVG URL</label>
          <input class="form-control" tyoe="url" v-model="svgUrl" />
        </div>
      </div>

      <div class='col-sm-4'>
        <input class="form-control" type="number" v-model="width" />
      </div>
      <div class='col-sm-4'>
        <input class="form-control" type="number" v-model="height" />
      </div>
      <div class='col-sm-4'>
        <button class="btn btn-success btn-block" @click="reload()">
          <i class="fa fa-refresh"></i>
          Reload
        </button>
      </div>

      <div class='col-sm-12 mt-3 d-flex justify-content-center'>
        <svg-viewer :svgUrl="svgUrl" :width="width" :height="height" v-if="showing" />
      </div>

      <div class='col-sm-12 mt-3 d-flex justify-content-center'>
        <pre class="bg-dark text-light border-light">{{embedCode}}</pre>
      </div>

    </div>
  `,
  data () {
    return {
      showing: true,
      height: 200,
      width: 600,
      svgUrl: 'https://raw.githubusercontent.com/FRMA-Ontology/diagrams/master/concept-maps/oe_12/svg/OE_X_HairOntology-full.svg'
    }
  },
  computed: {
    embedCode () {
      return `<embed
        src="https://embedSvg.com/embed?svgUrl=${this.svgUrl}"
        type="image/svg+xml"
        class="border-light"
        style="height: ${this.width}px"
        width="${this.width}px"
      >
        Your browser does not support SVG
      </embed>
      `
    }
  },
  methods: {
    reload () {
      this.showing = false;
      setTimeout(() => {
        this.showing = true
      }, 100)
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