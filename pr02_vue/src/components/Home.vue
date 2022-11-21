<template>
	<div>
		<div id="fw">Framework <el-button id="addBtn" type="primary" icon="el-icon-circle-plus" round @click="addDialog()">Add</el-button></div>
		  <el-table
			:data="tableData"
			stripe
			:row-class-name="tableRowClassName"
			style="width: 100%">
			<el-table-column
			  prop="title"
			  label="Title"
			  width="width: 15%">
			</el-table-column>
			<el-table-column
			  prop="description"
			  label="Description"
			  width="width: 15%">
			</el-table-column>
			<el-table-column
			  prop="deadline"
			  label="Deadline"
			  width="width: 15%">
			</el-table-column>
			<el-table-column
				prop="priority"
			  label="Priority"
			  width="width: 15%">
			</el-table-column>
			<el-table-column
			  label="Is Complete"
			  width="width: 15%">
			  <el-checkbox prop="checked"></el-checkbox>
			</el-table-column>

			<el-table-column
			  label="Action"
			  width="width: 25%">
				<template slot-scope="scope">
					<el-button
					  size="mini"
					  icon="el-icon-edit" 
					  @click="editFunc(scope.$index, scope.row)">Update</el-button>
					<el-button
					  size="mini"
					  type="danger"
					  icon="el-icon-delete"
					  @click="delFunc(scope.$index, scope.row)">Delete</el-button>
				</template>
			</el-table-column>
		  </el-table>

      <el-dialog
              title="Add Task"
              :visible.sync="dialogVisible"
              width="30%"
              >
   
          <el-form ref="form" :model="addForm" label-width="100px" :label-position="left">
              <el-form-item label="Title">
                  <el-input v-model="addForm.title"></el-input>
              </el-form-item>

              <el-form-item label="Description">
                  <el-input v-model="addForm.description"></el-input>
              </el-form-item>

              <el-form-item label="Deadline">
				  		<el-date-picker
					        v-model="addForm.deadline"
					        type="date"
									value-format='yyyy-MM-dd'
					        placeholder="chooseDeadline">
				      </el-date-picker>
              </el-form-item>

              <el-form-item label="Priority">
								  <el-radio v-model="addForm.priority" label="low">Low</el-radio>
								  <el-radio v-model="addForm.priority" label="med">Med</el-radio>
								  <el-radio v-model="addForm.priority" label="high">High</el-radio>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="addSubmit">ADD</el-button>
                  <el-button @click="dialogVisible = false">CANCEL</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

		   <el-dialog
		           title="Edit Task"
		           :visible.sync="updateVisible"
		           width="30%"
		           >

		       <el-form ref="form" :model="editForm" label-width="100px" :label-position="left">
		           <el-form-item label="Description">
		               <el-input v-model="editForm.description"></el-input>
		           </el-form-item>

		           <el-form-item label="Deadline">
								  <el-date-picker
								        v-model="editForm.deadline"
								        type="date"
										value-format='yyyy-MM-dd'
								        placeholder="chooseDeadline">
								      </el-date-picker>
		           </el-form-item>

		           <el-form-item label="Priority">
								  <el-radio v-model="editForm.priority" label="low">Low</el-radio>
								  <el-radio v-model="editForm.priority" label="med">Med</el-radio>
								  <el-radio v-model="editForm.priority" label="high">High</el-radio>
		           </el-form-item>

		           <el-form-item>
		               <el-button type="primary" icon="el-icon-edit"  @click="editSubmit">EDIT</el-button>
		               <el-button @click="updateVisible = false">CANCEL</el-button>
		           </el-form-item>
		       </el-form>
		   </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
        return {
			dialogVisible: false,
			updateVisible:false,
			upId:0,
			delId:0,
          tableData: [{
            title: 'title01',
            description: 'description01',
            deadline: '2010/01/01',
			priority:'low',
			checked:true
          }, {
            title: 'title02',
            description: 'description02',
            deadline: '2015/11/01',
            priority:'high',
			checked:true
          }, {
           title: 'title03',
           description: 'description03',
           deadline: '2022/12/01',
           priority:'low',
			checked:false
          }, {
           title: 'title04',
           description: 'description04',
           deadline: '2022/12/01',
           priority:'low',
			checked:false
          }, {
           title: 'title05',
           description: 'description05',
           deadline: '2022/12/01',
           priority:'low',
			checked:false
          }],

		  addForm: {
				title:'',
				description:'',
				deadline:'',
				priority:''
			},

			editForm: {
				title:'',
				description:'',
				deadline:'',
				priority:''
			},

        }
      },
	mounted(){
		
	},
	methods:{

	tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },

		editFunc:function(id,row){
			this.updateVisible=true;
			this.upId=id;
			console.log(this.tableData[id]);
			this.editForm.title=this.tableData[id].title;
			this.editForm.description = this.tableData[id].description;
			this.editForm.deadline = this.tableData[id].deadline;
			this.editForm.priority = this.tableData[id].priority;
		},

		delFunc:function(id,row){
			this.delId=id;
			this.tableData.splice(this.delId,1);
		},


		addSubmit:function(){
			let temp={
				title:this.addForm.title,
				description:this.addForm.description,
				deadline:this.addForm.deadline,
				priority:this.addForm.priority
			};
			console.log(temp);
			this.tableData.push(temp);
			this.dialogVisible=false;
		},


		editSubmit:function(){
			this.tableData[this.upId].title=this.editForm.title;
			this.tableData[this.upId].description=this.editForm.description;
			this.tableData[this.upId].deadline=this.editForm.deadline;
			this.tableData[this.upId].priority=this.editForm.priority;
			this.updateVisible=false;
		},


		addDialog:function(){
			this.dialogVisible=true;
		}
	}
	  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#fw{
	width: 100%;
	height: 50px;
	background-color: #C6E2FF;
	text-align: center;
	line-height: 50px;
}
#addBtn{
  color: #303133;
	margin-left: 60%;
}
</style>
