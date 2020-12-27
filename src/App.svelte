<script>
	import List2List from "./components/List2List.svelte";
	import Case2Case from "./components/Case2Case.svelte";
import { onMount } from "svelte";

	let ops = [
		{
			name: "Case2Case",
			component: Case2Case
		},
		{
			name: "List2List",
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

	.Otterations a {
		padding: 24px;
		display: block;
		border-bottom: 1px solid #ccc;
	}

	.Otterations p {
		margin-bottom: 0;
	}

	.Otterations a:first-of-type {
		border-top: 1px solid #ccc;
	}

	.Otterations a:hover {
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

	.Otterations img {
		background-color: white;
		width: 100%;
		max-width: 180px;
		margin: 0 auto;
		display: block;
		border-radius: 50%;
		border: 2px solid #666;
		box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.185);
	}


</style>

<main>

	<!--
	<div class="Otterations">
		<div class="Logo">
			<img src="https://miunau.com/ul/Miunau43287564378524378534687346523.png" alt="Sticker of miunau on a computer" />
			<h1>Otterations</h1>
			<p>Ottery operations</p>
		</div>
		{#each ops as op, i}
			<a href="#{op.name}" on:click={(e) => { currentOp = op.name; }}>{op.name}</a>
		{/each}
	</div>
	-->

	<div class="Otteration">
		<svelte:component this={ops.find(o => o.name === currentOp).component} />
	</div>

</main>
