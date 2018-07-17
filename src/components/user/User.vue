<template>
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
</template>
<script>
	export default {
		data () {
			return {
				
			}
		}
	}
</script>