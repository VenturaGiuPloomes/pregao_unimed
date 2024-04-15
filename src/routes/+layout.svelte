<script>
	import './styles.css';
	import "../app.css";
	import medalhaoPregao from "$lib/images/medalha-Pregao-de-Vendas.png";
	import Header from './widgets/Header.svelte';
	import { _activeItemMenu } from './+page';
	import { page } from '$app/stores';

	_activeItemMenu()
</script>

<div class="app">
	
	<Header />
	
	<main class="bg-base-200">
		<div class="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col ">
				
				<div class="container-jula">
					<div class="grid-jula">
						<slot />
					</div>
				</div>
				
				<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
				
			</div> 
			<div class="drawer-side shadow-lg">
				
				<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
				<div class="topo_navbar_logo2">
					<img alt="Medalhão Pregão de Vendas" src="{medalhaoPregao}" />
					<h3 class="text-lg font-bold" >Pregão de Vendas <p class="text-base font-normal">Santa Catarina</p></h3>
					<svg viewBox="1.079 9.764 218.216 86.0821" xmlns="http://www.w3.org/2000/svg">
						<path style="stroke: rgb(0, 78, 76); fill: rgb(0, 78, 76);" d="M 2.005 86.287 C 2.005 86.287 43.663 110.995 92.738 80.964 C 141.813 50.934 152.743 56.623 171.18 60.915 C 189.617 65.208 219.175 71.555 219.175 39.381 C 219.175 7.205 219.295 9.957 219.295 9.957 L 1.079 9.764 L 2.005 86.287 Z" transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"/>
					</svg>
				</div>
				<ul class="menu p-5 w-80 text-base">
					<li  aria-current={$page.url.pathname === '/' ? 'page' : undefined} >
						<a href="/" class="bg-primary text-white" on:click={_activeItemMenu} >Meta Global</a>
					</li>
					<li>
						<details open>
							<summary>Vendedores</summary>
							<ul>
								<li>
									<details open>
										<summary>Pequeno Porte</summary>
										<ul>
											<li><a on:click={_activeItemMenu} >Pessoa Física</a></li>
											<li><a on:click={_activeItemMenu} >Pessoa Jurídica</a></li>
										</ul>
									</details>
								</li>
								<li>
									<details open>
										<summary>Médio Porte</summary>
										<ul>
											<li><a on:click={_activeItemMenu} >Pessoa Física</a></li>
											<li><a on:click={_activeItemMenu} >Pessoa Jurídica</a></li>
										</ul>
									</details>
								</li>
								<li>
									<details open>
										<summary>Grande Porte</summary>
										<ul>
											<li><a on:click={_activeItemMenu} >Pessoa Física</a></li>
											<li><a on:click={_activeItemMenu} >Pessoa Jurídica</a></li>
										</ul>
									</details>
								</li>
							</ul>
						</details>
					</li>
					<li><a>Equipes</a></li>
					<li>
						<details open>
							<summary>Unimeds</summary>
							<ul>
								<li><a>Pequeno Porte</a></li>
								<li><a>Médio Porte</a></li>
								<li><a>Grande Porte</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
		
	</main>
	
	<footer>
		
	</footer>
	
</div>

<style>

	.topo_navbar_logo2 {
		margin-bottom: 18%;
	}
	
	.topo_navbar_logo2 img {
		width: 48%;
		position: absolute;
	}	

	.topo_navbar_logo2 h3 {
		width: 52%;
		position: absolute;
		right: 0;
		bottom: -20%;
	}	
</style>
