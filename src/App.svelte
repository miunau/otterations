<script>
	import List2List from "./components/List2List.svelte";
	import Case2Case from "./components/Case2Case.svelte";
import { onMount } from "svelte";

	let ops = [
		{
			name: "Case2Case",
			title: "Case to Case",
			component: Case2Case
		},
		{
			name: "List2List",
			title: "List to List",
			component: List2List
		}
	];

	let currentOp = "List2List";

	onMount(() => {
		if(window.location.hash) {
			console.log(window.location.hash);
			const op = ops.find(o => window.location.hash.endsWith(o.name));
			if(op) {
				currentOp = op.name;
			}
		}
	});

	let ott = 'https://miunau.com/ul/Miunau43287564378524378534687346523.png';
	let over = false;

	function mover() {
		ott = 'https://miunau.com/ul/Miunau43287564378524378534687346523alt.png';
		over = true;
	}

	function mout() {
		ott = 'https://miunau.com/ul/Miunau43287564378524378534687346523.png';
		over = false;
	}

</script>

<style>
	main {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		min-height: 100%;
	}

	.Otterations {
		width: 280px;
		background: #e9eff0;
		flex-shrink: 0;
	}

	.Otterations .OtterationLinks a {
		padding: 24px;
		display: block;
		border-bottom: 1px solid #ccc;
	}

	.Otterations p {
		margin-bottom: 0;
	}

	.Otterations .OtterationLinks a:first-of-type {
		border-top: 1px solid #ccc;
	}

	.Otterations .OtterationLinks a:hover {
		background: #d6e1e3;
		text-decoration: none;
	}

	.Otteration {
		padding: 24px 36px;
		flex-grow: 1;
	}

	.Logo {
		width: 100%;
		padding: 24px;
		text-align: center;
	}

	.Logo img {
		background-color: white;
		width: 100%;
		max-width: 180px;
		margin: 0 auto;
		display: block;
		border-radius: 50%;
		border: 2px solid #666;
		box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.185);
		transition: all 0.2s;
	}

	.Logo img.over {
		background: red;
		background: radial-gradient(#ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
		background-size: 1800% 1800%;

		-webkit-animation: rainbow 3s infinite;
		-z-animation: rainbow 3s infinite;
		-o-animation: rainbow 3s infinite;
			animation: rainbow 3s infinite;
	}


	@-webkit-keyframes rainbow {
			0%{background-position:0% 82%}
			100%{background-position:100% 19%}
	}
	@-moz-keyframes rainbow {
		0%{background-position:0% 82%}
			100%{background-position:100% 19%}
	}
	@-o-keyframes rainbow {
		0%{background-position:0% 82%}
			100%{background-position:100% 19%}
	}
	@keyframes rainbow { 
		0%{background-position:0% 82%}
			100%{background-position:100% 19%}
	}


</style>

<main>
	<div class="Otterations">

		<div class="Logo">
			<img src="{ott}" alt="Sticker of miunau on a computer" class:over on:mouseover={mover} on:mouseout={mout} />
			<h1>Otterations</h1>
			<p>Ottery operations</p>
			<p>
				<a href="https://github.com/miunau/otterations">Github</a><br>
				<a href="https://twitter.com/miuott">Twitter</a><br>
			</p>
		</div>
		
		<div class="OtterationLinks">
			{#each ops as op, i}
				<a href="#{op.name}" on:click={(e) => { currentOp = op.name; }}>{op.title}</a>
			{/each}
		</div>

	</div>

	<div class="Otteration">
		<svelte:component this={ops.find(o => o.name === currentOp).component} />
	</div>

</main>
