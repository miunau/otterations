<script>
import { onMount, tick } from 'svelte';

  import List2JSON from '../lib/List2JSON';

  let input = 'foo,bar,baz';
  let output = '';
  let delimiter = ',';
  let type = 'enum';
  let types = [
    'array',
    'enum',
    'collection',
    'dictionary'
  ];
  let structure = '{\n  "id": "[KEY]",\n  "index": "[INDEX]"\n}';
  let keyAttr = 'id';

  function transform() {
    output = JSON.stringify(List2JSON({ input, delimiter, type, structure, keyAttr, inputOptions }), null, 2);
  }

  async function showme(e) {
    e.preventDefault();
    input = 'foo,\nbar,\n\n   baz';
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
    flex-grow: 1;
    padding-right: 12px;
  }
  .io .output {
    flex-grow: 1;
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
        <label for="l2e-structure">Structure (put in <span>"[KEY]"</span> to replace with key, or <span>"[INDEX]"</span> with index)</label>
        <textarea bind:value={structure} id="l2e-structure" on:keyup={transform}></textarea>
      {/if}
    
    </div>
  </div>

</div>