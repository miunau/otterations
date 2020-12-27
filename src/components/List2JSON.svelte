<script>
import { onMount, tick } from 'svelte';

  import List2JSON from '../lib/List2JSON';

  let input = 'foo,bar,baz';
  let otherInputs = [];
  let output = '';
  let delimiter = ',';
  let type = 'enum';
  let types = [
    'array',
    'enum',
    'collection',
    'dictionary'
  ];
  let structure = `{
  id: "[KEY]",
  index: [INDEX],
  foo: 6
}`

  let keyAttr = 'id';

  function transform() {
    output = JSON.stringify(List2JSON({ input, delimiter, type, structure, keyAttr, inputOptions }), null, 2);
  }

  async function showme(e) {
    e.preventDefault();
    structure = `{
  id: "[KEY]",
  index: [INDEX],
  arr1d: ["arr1d_[KEY]", [INDEX], {
    "key": "arr1d_obj_[KEY]",
    "index": "arr1d_obj_[INDEX]"
  }],
  "arr2d": [
    ["arr2d_[KEY]"],
    ["arr2d_[INDEX]"],
    [{
      "key": "arr2d_obj_[KEY]",
      "index": "arr2d_obj_[INDEX]"
    }]
  ],
  "obj": {
    "key": "obj_[KEY]",
    "index": [INDEX],
    "obj_arr1d": ["obj_arr1d_[KEY]", "obj_arr1d_[INDEX]"],
    "obj_arr2d": [
      ["obj_arr2d_[KEY]"],
      ["obj_arr2d_[INDEX]"]
    ]
  }
}`;
    input = 'foo,\nbar,\n\n   baz\n,\n\ntest\n\ntest,';
    type = 'collection';
    transform();
  }

  let inputOptions = ['removeWhitespace'];

  onMount(() => {
    transform();
  });

</script>

<style>
  .List2Enum {
    width: 100%;
  }
  .io {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 12px;
  }
  .io .input {
    flex: 1 1;
    width: 50%;
    padding-right: 12px;
  }
  .io .output {
    flex: 1 1;
    width: 50%;
    padding-left: 12px;
  }
  .io textarea {
    display: block;
    width: 100%;
    min-height: 320px;
    margin: 0;
  }
</style>

<div class="List2Enum">

  <h1>List to JSON</h1>

  <p>Turns a plain list into an array, an enum, a collection or a dictionary.<br/><a on:click={showme}>Show me!</a></p>

  <div class="io">
    <div class="input">

      <label for="l2e-input">Input</label>
      <textarea bind:value={input} on:keyup={transform} id="l2e-input"></textarea>

      <label for="l2e-delimiter">Delimiter</label>
      <input bind:value={delimiter} on:keyup={transform} id="l2e-delimiter" />

      <div class="checkboxes">
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="removeWhitespace" id="l2e-remove-whitespace" on:change={transform} />
          <label for="l2e-remove-whitespace">Remove whitespace from beginning and end</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="removeQuotes" id="l2e-remove-quotes" on:change={transform} />
          <label for="l2e-remove-quotes">Remove quotes from input</label>
        </div>
      </div>
    
    </div>
    <div class="output">

      <label for="l2e-output">Output</label>
      <textarea id="l2e-output">{output}</textarea>

      <label for="l2e-type">Output type</label>
      <!-- svelte-ignore a11y-no-onchange -->
      <select bind:value={type} id="l2e-type" on:change={transform}>
        {#each types as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
    
      {#if type === 'collection' || type === 'dictionary'}
        <label for="l2e-structure">Structure (in JS)</label>
        <textarea bind:value={structure} id="l2e-structure" on:keyup={transform}></textarea>
        <small>
          Put in <code>"[KEY]"</code> to replace with key, or <code>"[INDEX]"</code> with index).<br>
          This does not need to be valid JSON as it gets run through <code>eval()</code>- you can use <code>[KEY]</code> and <code>[INDEX]</code> without quotes, if you like.
        </small>
      {/if}
    
    </div>
  </div>

</div>