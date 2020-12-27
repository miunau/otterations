<script>
  import { onMount, tick } from 'svelte';
  import List2List, { types } from '../lib/List2List';

  let input = 'foo,bar,baz';
  let otherInputs = [];
  let output = '';
  let delimiter = ',';
  let type = 'json: enum';
  let inputOptions = ['removeWhitespace', 'removeQuotes'];
  let structure = `{
  id: "key_"+key,
  index: index
}`

  function transform() {
    output = List2List({ input, delimiter, type, structure, otherInputs, inputOptions });
  }

  function addInput(e) {
    otherInputs = otherInputs.concat([""]);
  }

  async function showme(e) {
    structure = `{
  id: key,
  index: index,
  otter: otter: inputs[0][index] !== undefined,
  otter_image: inputs[0][index]
}`;
    input = 'foo,\nbar,\n\n   baz\n,\n\ntest\n\ntest,';
    if(e === 'json') {
      otherInputs = ['cute_otter.png, another_otter.png, otters_holding_hands.png'];
      type = 'json: collection';
    }
    else if (e === 'matlab') {
      otherInputs = [];
      type = 'matlab: list';
    }
    await tick();
    transform();
  }

  onMount(() => {
    transform();
  });

  function removeInput(idx) {
    const c = window.confirm("Are you sure you want to remove input "+idx+"?");
    if(c) {
      otherInputs = otherInputs.filter((o, i) => {
        return i !== idx;
      })
    }
  }

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
    border-top: 1px solid #ccc;
    padding-top: 24px;
    margin-top: 24px;
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
    resize: vertical;
  }
  .remove {
    float: right;
  }
</style>

<div class="List2Enum">

  <h1>List to List</h1>

  <p>Turns a plain list into:</p>
  <ul>
    <li>A JSON array, enum, collection or dictionary. <a on:click={(e) => { e.preventDefault(); showme('json'); }}>Show me!</a></li>
    <li>A MatLab list. <a on:click={(e) => { e.preventDefault(); showme('matlab'); }}>Show me!</a></li>
  </ul>

  <p><a href="https://github.com/miunau/otterations">Github</a></p>

  <div class="io">
    <div class="input">

      <label for="l2e-input">Main input</label>
      <textarea bind:value={input} on:keyup={transform} id="l2e-input"></textarea>

      {#each otherInputs as oInput, idx}
        <label for="l2e-input-{idx}">Input {idx} <a class="remove" on:click={(e) => { e.preventDefault(); removeInput(idx) }}>remove</a></label> 
        <textarea bind:value={oInput} on:keyup={transform} id="l2e-input-{idx}"></textarea>
      {/each}

      <button on:click={addInput}>Add input</button>

      <label for="l2e-delimiter">Delimiter</label>
      <input bind:value={delimiter} on:keyup={transform} id="l2e-delimiter" />

      <div class="checkboxes">
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="removeWhitespace" id="l2e-remove-whitespace" on:change={transform} />
          <label for="l2e-remove-whitespace">Remove leading and trailing whitespace</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="removeAllWhitespace" id="l2e-remove-all-whitespace" on:change={transform} />
          <label for="l2e-remove-all-whitespace">Remove all whitespace</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="removeQuotes" id="l2e-remove-quotes" on:change={transform} />
          <label for="l2e-remove-quotes">Remove quotes from input</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" bind:group={inputOptions} value="sort" id="l2e-sort" on:change={transform} />
          <label for="l2e-sort">Sort input alphabetically</label>
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
    
      {#if type === 'json: collection' || type === 'json: dictionary'}
        <label for="l2e-structure">Structure (in JS)</label>
        <textarea bind:value={structure} id="l2e-structure" on:keyup={transform}></textarea>
        <small>
          <b>This gets run through <code>eval()</code>.</b> Use <code>"key"</code> to replace with the current list item, or <code>"index"</code> with the index of the current list item.<br>
          {#if otherInputs.length}
            <b>You have added other inputs.</b> Access them with <code>input[0][index]</code>, <code>input[1][index]</code> etc.
          {/if}
        </small>
      {/if}
    
    </div>
  </div>

</div>