const Benchmark = require ('benchmark');
const $ = require ('sanctuary-def');
const {create} = require ('../dist/index');

const defCheck = create ({
  $,
  checkTypes: true,
  env: $.env,
  typeClasses: [],
});

const defNoCheck = create ({
  $,
  checkTypes: false,
  env: $.env,
  typeClasses: [],
});

const suite = new Benchmark.Suite ();

suite.add ('checkTypes: true', () => {
  defCheck
    ('foo :: Number -> Number -> Number -> String')
    (x => y => z => `${x}${y}${z}`);
})
.add ('checkTypes: false', () => {
  defNoCheck
    ('foo :: Number -> Number -> Number -> String')
    (x => y => z => `${x}${y}${z}`);
})
.on ('complete', function() {
  console.log (this.filter ('fastest').map ('name'));
})
.run ({async: true});
