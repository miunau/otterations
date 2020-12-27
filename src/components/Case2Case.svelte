<script>
  import { tick } from 'svelte';
  
    import List2List from '../lib/List2List';
  
    let input = '';
    let output = '';
    let delimiter = ',';
    let type = 'enum';
    let types = [
      'camelCase',
      'under_score',
      'PascalCase',
      'UPPERCASE',
      'lowercase'
    ];
  
    function transform() {
      output = JSON.stringify(List2List({ input, delimiter, type, structure }), null, 2);
    }
  
    function showme(e) {
      e.preventDefault();
      input = 'foo,\nbar,\nbaz';
      transform();
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
  
    <h1>Case2Case</h1>
  
    <p>Turn from one_type ofCase ToAnother.<br/><a on:click={showme}>Show me!</a></p>
  
    <div class="io">
      <div class="input">
  
        <label for="l2e-input">Input</label>
        <textarea bind:value={input} on:keyup={transform} id="l2e-input"></textarea>
  
        <label for="l2e-delimiter">Delimiter</label>
        <input bind:value={delimiter} on:change={transform} id="l2e-delimiter" />
      
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
      
      </div>
    </div>
  
  </div>