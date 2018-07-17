<template>
	<el-container>
		<el-aside width="300px" style="background-color: rgb(238, 241, 246)">
			<el-form ref="form" status-icon :model="form" :rules="rules" label-width="50px" style="padding: 10px">
				<el-form-item label="桩ID" prop="poleId">
				    <el-input v-model="form.poleId"></el-input>
				</el-form-item>
				<el-form-item label="卡号" prop="cardId">
				    <el-input v-model="form.cardId"></el-input>
				</el-form-item>
				<el-form-item label="用户" prop="cardNo">
				    <el-input v-model="form.cardNo"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
				    <el-input v-model="form.pass"></el-input>
				</el-form-item>
				<!-- <el-form-item label="金额" prop="money">
				    <el-input v-model.number="form.money"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
					<el-button type="primary" @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-main>
			<el-table v-loading="loading" :data="pails" border>
				<el-table-column label="桩ID" width="240">
					<template slot-scope="scope">
						<el-popover placement="right" width="340" trigger="click">
							<pail-info :load.sync="scope.row.pailload" :poleId="scope.row.poleId"></pail-info>
							<el-button slot="reference" type="text" @click="pailLoad(scope.row)">{{ scope.row.poleId }}</el-button>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="卡号" width="180">
					<template slot-scope="scope">
						<el-popover placement="right" width="260" trigger="click">
							<card-info :load.sync="scope.row.cardload" :cardId="scope.row.cardId" :cardNo="scope.row.cardNo"></card-info>
							<el-button slot="reference" type="text" @click="cardLoad(scope.row)">{{ scope.row.cardId }}</el-button>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="用户" prop="cardNo" width="120">
				</el-table-column>
				<el-table-column label="密码" prop="pass" width="120"></el-table-column>
				<el-table-column label="余额" prop="money" width="120"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<!-- <el-button @click="openPail(scope.row.poleId)" type="primary" size="mini">开启</el-button>
						<el-button @click="closePail(scope.row.poleId, scope)" type="primary" size="mini">关闭</el-button> -->
						<el-button @click="removePail(scope.row._id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
	</el-container>
</template>
<script>
	import PailInfo from './PailInfo'
	import CardInfo from './CardInfo'

	export default {
		data() {
			var checkNumber = (rule, value, callback) => {
				console.log(value)
				if (value) {
					setTimeout(() => {
						if (!Number.isInteger(value)) {
							callback(new Error('请输入数字值'));
						} else {
							callback()
						}
					}, 50);
				}
				callback()
			};
			return {
				form: {
					poleId: '',
					cardId: '',
					cardNo: '',
					pass: '',
					// money: 0
				},
				rules: {
					poleId: [{
						required: true,
						message: '桩ID不能为空',
						trigger: 'blur'
					}],
					cardId: [{
						required: true,
						message: '卡号不能为空',
						trigger: 'blur'
					}],
					cardNo: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
					// money: [{ validator: checkNumber, trigger: 'blur' }]
				},
				pails: [],
				loading: false
			}
		},
		components: {PailInfo, CardInfo},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$axios.get('/web/pail/create', {
							params: this.form
						}).then(data => {
							console.log(data)
							this.$message({
					          	message: '充电桩创建成功',
					          	type: 'success'
					        });
							this.getPails()
							this.resetForm.call(this, formName)
						})
					} else {
					}
				})
			},
			resetForm (formName) {
				this.$refs[formName].resetFields()
			},
			removePail (_id) {
				this.$axios.get('/web/pail/remove', {params: {_id}}).then(res => {
					console.log(res.data)
					this.$message({
			          	message: '充电桩删除成功',
			          	type: 'success'
			        });
					this.getPails();
				})
			},
			openPail (poleId) {
				this.$axios.get('/oooants/pail/open', {params: {poleId}}).then(res => {
					console.log(res.data)
					this.getPailCurrentInfo(poleId)
				})
			},
			closePail (poleId) {
				this.$axios.get('/oooants/pail/close', {params: {poleId}}).then(res => {
					console.log(res.data)
					this.getPailCurrentInfo(poleId)
				})
			},
			getPailCurrentInfo (poleId) {
				this.$axios.get('/oooants/pail/currentinfo', {params: {poleId}}).then(res => {
					console.log(res.data)
					console.log(this.pails)
				})
			},
			getPailInfo (id) {
				this.$axios.get('/oooants/pail/info', {params: {id}}).then(res => {
					console.log(res.data)
				})
			},
			getPails () {
				this.loading = true;
				this.$axios.get('/web/pail/list').then(res => {
					var arr = []
					res.data.data.forEach( function(pail, index) {
						pail.pailload = false;
						pail.cardload = false;
						arr.push(pail)
					});
					this.pails = arr;
					this.loading = false;
				})
			},
			pailLoad (row) {
				this.$set(row, 'pailload', true)
			},
			cardLoad (row) {
				this.$set(row, 'cardload', true)
			}
		},
		mounted () {
			this.getPails()
		}
	}
</script>
<style>
	
</style>