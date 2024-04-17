<!-- <template>
		<my-tree
			:isSelect="true"
			:list="list"
			:multiple="true"
			:defaultExpandAll="false"
			@change="change"
			rowId="id"
			:optionKey="optionKey"/>
</template>
<script lang="ts" setup>
	import { ref, reactive } from 'vue'
	const list = ref([{
		name: '院落A',
		id: 0,
		childList: [{
			name: '楼栋A',
			id: 1,
			childList: [{
				name: '楼层A',
				id: 3,
				childList: [{
					name: '房间A',
					id: 4,
				}, {
					name: '房间B',
					id: 5,
				}]
			}, {
				name: '楼层B',
				id: 6,
			}]
		}, {
			name: '楼栋B',
			id: 7,
		}]
	}, {
		name: '院落B',
		id: 10,
		childList: [{
			name: '楼栋B-A',
			id: 12,
			childList: [{
				name: '楼层B-A',
				id: 13,
				childList: [{
					name: '房间B-A',
					id: 14,
				}, {
					name: '房间B-B',
					id: 15,
				}]
			}, {
				name: '楼层B-B',
				id: 16,
			}]
		}, {
			name: '楼栋B-B',
			id: 17,
		}]
	}])
	const optionKey = reactive({
		nameKey: 'name',
		valueKey: 'id',
		childKey: 'childList',
	}) 
	const isSelect = ref(false)
	const change = (e) => {
		console.log(e);
	}
</script>
<style lang="scss" scoped></style> -->