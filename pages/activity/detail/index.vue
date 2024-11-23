<template>
	<view>
		活动ID：{{id}}
	</view>
</template>

<script setup>
	import { ref } from "vue";
	import { onLoad } from "@dcloudio/uni-app";
	const id = ref('');
	onLoad((options)=>{
		console.log("options", options);
		id.value = options.id;
	})
</script>

<style>

</style>
