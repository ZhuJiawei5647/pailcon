<template>
	<section v-loading="loading" class="pail-info">
		<el-form v-if="pail" label-width="80px">
			<el-form-item label="桩">
				<span>{{ pail.name }}</span>
			</el-form-item>
			<el-form-item label="电压">
				<span>{{ pail.vol }} V</span>
			</el-form-item>
			<el-form-item label="电流">
				<span>{{ pail.cur }} A</span>
			</el-form-item>
			<el-form-item label="电量">
				<span>{{ pail.kwh }} kwh</span>
			</el-form-item>
			<el-form-item label="金额">
				<span :style="{color: pail.money < 1000 ? 'red' : 'black'}">{{ pail.money }} 元</span>
			</el-form-item>
			<el-form-item label="状态">
				<span>{{ statusText }}</span>
			</el-form-item>
			<el-form-item>
				<el-button v-if="ready" type="primary" size="small" disabled>
					请等待...
				</el-button>
				<el-button v-else @click="pailOpenOrClose" type="primary" size="small" :disabled="pail.status !== 5 && pail.status !== 1">
					{{ pail.status === 1? '关闭' : '开启' }}
				</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				pail: null,
				loading: true,
				ready: false
			}
		},
		computed: {
			statusText () {
				if (this.pail && this.pail.status) {
					switch (this.pail.status) {
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
			poleId: String
		},
		watch: {
			load (value) {
				if (value) {
					console.log(this.poleId)
					this.getPail().then(data => this.pail = data)
				}
			}
		},
		methods: {
			getPail () {
				console.log('getPail')
				return new Promise((resolve, reject) => {
					this.$axios.get('/oooants/pail/info', {params: {id: this.poleId}}).then(res => {
						console.log(res)
						var status = res.data.status,
							pailinfo = res.data.data;
						if (!pailinfo.success) {
							this.$message.error({
								message: pailinfo.message
							})
							// reject(new Error(pailinfo.message))
						} else {
							resolve(pailinfo.poleReal)
						}
						this.loading = false
						this.$emit('update:load', false)
					})
				})
			},
			pailOpenOrClose () {
				this.ready = true
				if (this.pail.status === 1) {
					this.$axios.get('/oooants/pail/close', {params: {poleId: this.poleId}}).then(res => {
						this.getPailCurrentInfo()
					})
				} else {
					this.$axios.get('/oooants/pail/open', {params: {poleId:this.poleId, type: 3, value: 0.05, intFaceType: 3}}).then(res => {
						this.getPailCurrentInfo()
					})
				}
			},
			getPailCurrentInfo: (() => {
				var num = 0;
				return function () {
					this.$axios.get('/oooants/pail/currentinfo', {params: {poleId: this.poleId}}).then(res => {
						num++
						var status = res.data.status,
							currentinfo = res.data.data;
						if (currentinfo.list.length === 0 || !currentinfo.success) {
							if (num < 10) {
								setTimeout(() => {
									this.getPailCurrentInfo();
								}, 500);
								return
							} else {
								this.$message.error({
									message: '桩开启失败'
								});
								this.ready = false;
							}
						} else {
							
							this.getPail().then(data => {
								this.pail = data;
								var msg = currentinfo.list[0]
								this.$message({
									message: msg.info,
									type: 'success'
								})
								this.ready = false;
								this.$axios.get('/oooants/order/record', {params: {
									pageSize: 1,
									poleId: this.poleId
								}}).then(res => console.log(res.data))
							})
						}
						num = 0
					})
				}
			})()
		}
	}
</script>
<style>
	.pail-info {
		min-height: 300px;
	}

	.pail-info .el-form-item {
		margin-bottom: 0;
	}
</style>