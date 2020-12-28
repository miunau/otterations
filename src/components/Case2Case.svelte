<script>
import { onMount } from 'svelte';

  
    import Case2Case, { Type } from '../lib/Case2Case';
  
    let input = 'fooBar,\nBAR_BAZ,\nBazBoo';
    let output = '';
    let type = 'camelCase';
    let normalizeType = 'pascalCase';
    let delimiter = '';
    let stripRegexp = '/[^A-Z0-9]/gi';
    let splitRegexp = '';
    let inputOptions = [];
  
    function transform() {
      output = Case2Case({ input, type, normalizeType, delimiter, splitRegexp, stripRegexp, inputOptions });
    }
  
    function showme(e) {
      e.preventDefault();
      input = `foo_bar_baz
Foo_Bar_BAZ
_foo_BAR
fooBarBaz
FooBarBaz
FOO_BAR_BAZ`;
      type = 'constantCase';
      inputOptions = ['joinUnderscores', 'normalize'];
      console.log(type);
      transform();
    }

    onMount(() => {
      transform();
    });
  
  </script>
  
  <style>
    .Case2Case {
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
  
  <div class="Case2Case">
  
    <h1>Case to Case</h1>
  
    <p>Turn from one_type ofCase ToAnother. This uses <a href="https://github.com/blakeembrey/change-case">change-case</a> under the hood. Each line is processed separately.<br/><a on:click={showme}>Show me!</a></p>
  
    <div class="io">
      <div class="input">
  
        <label for="c2e-input">Input</label>
        <textarea bind:value={input} on:keyup={transform} id="c2e-input"></textarea>
  
        <label for="c2e-split-regexp">Split regexp</label>
        <input bind:value={splitRegexp} on:keyup={transform} id="c2e-split-regexp" placeholder="(default)" />

        <label for="c2e-strip-regexp">Strip regexp</label>
        <input bind:value={stripRegexp} on:keyup={transform} id="c2e-strip-regexp" placeholder="(default)" />

        <div class="checkboxes">
          <div class="checkbox">
            <input type="checkbox" bind:group={inputOptions} value="normalize" id="c2e-normalize" on:change={transform} />
            <label for="c2e-normalize">Pre-process through.. </label>
            <!-- svelte-ignore a11y-no-onchange -->
            <select bind:value={normalizeType} id="c2e-normalizeType" on:change={transform}>
              {#each Object.keys(Type) as t}
                <option value={t}>{Type[t]}</option>
              {/each}
            </select>
          </div>
          <div class="checkbox">
            <input type="checkbox" bind:group={inputOptions} value="joinUnderscores" id="c2e-joinUnderscores" on:change={transform} />
            <label for="c2e-joinUnderscores">Join underscores</label>
          </div>
        </div>
      
      </div>
      <div class="output">
        <label for="c2e-output">Output</label>
        <textarea id="c2e-output">{output}</textarea>

        <label for="c2e-type">Output type</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select bind:value={type} id="c2e-type" on:change={transform}>
          {#each Object.keys(Type) as t}
            <option value={t}>{Type[t]}</option>
          {/each}
        </select>

        <label for="c2e-delimiter">Delimiter</label>
        <input bind:value={delimiter} on:keyup={transform} id="c2e-delimiter" placeholder="(default)" />
      
      </div>
    </div>
  
  </div>