<template>
	<section v-loading="loading" class="card-info">
		<el-form v-if="card" label-width="80px">
			<el-form-item label="卡号">
				<span>{{ card.cardno }}</span>
			</el-form-item>
			<el-form-item label="类型">
				<span>{{ card.type }} V</span>
			</el-form-item>
			<el-form-item label="余额">
				<span>{{ card.haveMoney }} 元</span>
			</el-form-item>
			<el-form-item label="状态">
				<span>{{ statusText }}</span>
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				card: null,
				loading: true
			}
		},
		computed: {
			statusText () {
				if (this.card && this.card.status) {
					switch (this.card.status) {
						case 1: return '充电中';
						case 2: return '空闲';
						case 3: return '故障';
						case 4: return '离线';
						case 5: return '就绪';
						case 6: return '预约';
						default: break;
					}
				}
				return '未知'
			}
		},
		props: {
			load: Boolean,
			cardId: String,
			cardNo: String
		},
		watch: {
			load (value) {
				if (value) {
					console.log(this.cardId)
					this.getPail().then(list => {
						list.forEach(card => {
							if (this.cardId === card.cardno) {
								this.card = card
							}
						})
					})
				}
			}
		},
		methods: {
			getPail () {
				return new Promise((resolve, reject) => {
					this.$axios.get('/oooants/card/info', {params: {cardId: this.cardId, cardNo: this.cardNo}}).then(res => {
						var status = res.data.status,
							cardinfo = res.data.data;
						if (!cardinfo.success) {
							this.$message.error({
								message: cardinfo.message
							})
						} else {
							resolve(cardinfo.list)
						}
						this.loading = false
						this.$emit('update:load', false)
					})
				})
			}
		}
	}
</script>
<style>
	.card-info {
		min-height: 160px;
	}

	.card-info .el-form-item {
		margin-bottom: 0;
	}
</style>