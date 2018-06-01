<template>
	<el-container>
		<el-aside width="300px">
			<el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
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
				<el-form-item label="金额" prop="money">
				    <el-input v-model.number="form.money"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
				</el-form-item>
			</el-form>
		</el-aside>
		<el-main>Main</el-main>
	</el-container>
</template>
<script>
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
			};
			return {
				form: {
					poleId: '',
					cardId: '',
					cardNo: '',
					pass: '',
					money: 0
				},
				rules: {
					poleId: [{
						required: true,
						message: '桩ID不能为空',
						trigger: 'submit'
					}],
					cardId: [{
						required: true,
						message: '卡号不能为空',
						trigger: 'submit'
					}],
					cardNo: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'submit'
					}],
					pass: [{
						required: true,
						message: '密码不能为空',
						trigger: 'submit'
					}],
					money: [{ validator: checkNumber, trigger: 'blur' }]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$axios.get('/web/pail/create', {
							params: this.form
						}).then(data => {
							console.log(data)
						})
					} else {

					}
				})
			}
		}
	}
</script>
<style>
	
</style>