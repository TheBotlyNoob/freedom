<script lang="ts">
	import type { ActionData } from "./$types"
	export let form: ActionData | null;
</script>

<div class="form-container">
	<h1>Log In</h1>
	{#if form?.message}
		<div color="red">{form.message}</div>
	{/if}
	<form method="POST">
		<input required name="email_or_username" type="text" placeholder="Email or Username" />
		<input required name="password" type="password" placeholder="Password" />
		<input type="submit" value="Log In" />
	</form>
</div>

<style lang="scss">
	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: "Josefin Sans", sans-serif;
	}

	h1 {
		margin-top: 50px;
		font-size: 64px;
		font-family: "Josefin Sans", sans-serif;
	}

	form {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: "Josefin Sans", sans-serif;
	}

	input {
		margin-top: 15px;
		padding-left: 15px;
		width: 450px;
		height: 50px;
		font-size: 24px;
		border: none;
		border-radius: 15px;
		font-family: "Josefin Sans", sans-serif;
	}

	input[type="submit"] {
		width: 150px;
		padding: 0;
		font-size: 24px;
		background: #4169e1;
		height: 75px;
		font-family: "Josefin Sans", sans-serif;
		border-radius: 10px;
		border: none;
		color: white;
		text-decoration: none;
		cursor: pointer;
	}
</style>
