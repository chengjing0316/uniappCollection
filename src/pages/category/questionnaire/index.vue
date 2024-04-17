<template>
	<view class="container">
		<view v-for="(question, index) in questions" :key="question.id">
			<view class="question">{{ question.id }} 、{{ question.issue }}</view>
			<view class="options">
				<checkbox-group @change="onOptionChange($event, question.id)">
					<checkbox v-for="(answer, oIndex) in question.answers" :key="answer.id" :value="answer.id">
						{{ answer.answerContent }}
					</checkbox>
				</checkbox-group>
			</view>
			<!-- 立即渲染该主问题的子问题 -->
			<template v-if="answers[question.id] && answers[question.id].length">
				<view v-for="selectedAnswerId in answers[question.id]" :key="selectedAnswerId">
					<template v-if="findSubQuestion(question, selectedAnswerId)">
						<view class="question">{{ findSubQuestion(question, selectedAnswerId).id }} 、{{ findSubQuestion(question, selectedAnswerId).issue }}</view>
						<view class="options">
							<checkbox-group @change="onOptionChange($event, findSubQuestion(question, selectedAnswerId).id, true, question.id)">
								<checkbox v-for="subAnswer in findSubQuestion(question, selectedAnswerId).answers" :key="subAnswer.id" :value="subAnswer.id">
									{{ subAnswer.answerContent }}
								</checkbox>
							</checkbox-group>
						</view>
					</template>
				</view>
			</template>
		</view>
		<button @tap="submit">提交问卷</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			questions: [], // 初始化为空，后续通过API获取或直接赋值
			answers: {} // 存储用户的答案
		};
	},
	methods: {
		onOptionChange(event, questionId, isSubQuestion = false, parentQuestionId = null) {
			// 更新主问题或子问题的答案
			this.$set(this.answers, questionId, event.detail.value);
			if (!isSubQuestion) {
				// 如果是主问题的答案更改，重置所有相关子问题的答案
				this.questions.forEach((q) => {
					if (q.parent === questionId) {
						if (this.answers[q.id]) {
							this.$delete(this.answers, q.id);
						}
					}
				});
			}
		},
		findSubQuestion(question, selectedAnswerId) {
			return question.answers.find((a) => a.id == selectedAnswerId)?.sonGdIssues || null;
		},
		submit() {
			// 提交问卷的逻辑
			console.log('提交的答案:', this.answers);
			// 进行提交前的验证等操作...
		}
	},
	mounted() {
		// 示例中直接初始化了questions数据，实际使用时可能需要从API获取
		this.questions = [
			{
				id: 8, //8
				parent: 0,
				issue: '问题1',
				industry: '2',
				type: '1',
				createTime: '2024-04-11 20:24:53',
				updateTime: '2024-04-12 17:30:22',
				create_by: null,
				update_by: null,
				answerId: null,
				gdOrIssue: null,
				yesOrNo: '1',
				sort: '0',
				answers: [
					{
						//8-1A
						id: 16,
						issueId: 8,
						subIssue: null,
						guidelinesId: null,
						answerId: '1',
						answerContent: '答案1',
						createTime: '2024-04-11 17:52:16',
						updateTime: '2024-04-12 17:30:22',
						createBy: null,
						updateBy: null,
						guidelines: null,
						sonGdIssues: {
							//8-1A-1Q
							id: 9,
							parent: 8,
							issue: '子问题1',
							industry: null,
							type: '1',
							createTime: '2024-04-11 17:52:16',
							updateTime: '2024-04-12 17:30:22',
							create_by: null,
							update_by: null,
							answerId: 16,
							gdOrIssue: '2',
							yesOrNo: null,
							sort: null,
							answers: [
								{
									//8-1A-1Q-1A
									id: 17,
									issueId: 9,
									subIssue: null,
									guidelinesId: 7,
									answerId: '1',
									answerContent: '答案1-1',
									createTime: '2024-04-11 17:52:16',
									updateTime: '2024-04-12 17:30:22',
									createBy: null,
									updateBy: null,
									guidelines: {
										id: 4,
										title: '指引1-1',
										guidelines: '<p>指引1-1</p>',
										answerId: 17,
										createTime: '2024-04-11 17:52:16',
										updateTime: '2024-04-11 17:52:16',
										createById: null,
										updateById: null,
										pngUrl: null,
										mvUrl: null
									},
									sonGdIssues: null,
									gdOrIssue: '1'
								},
								{
									//8-1A-1Q-2A
									id: 18,
									issueId: 9,
									subIssue: null,
									guidelinesId: 4,
									answerId: '2',
									answerContent: '答案1-2',
									createTime: '2024-04-11 17:52:16',
									updateTime: '2024-04-12 17:30:22',
									createBy: null,
									updateBy: null,
									guidelines: {
										id: 5,
										title: '指引1-2',
										guidelines: '<p>指引1-2</p>',
										answerId: 18,
										createTime: '2024-04-11 17:52:16',
										updateTime: '2024-04-11 17:52:16',
										createById: null,
										updateById: null,
										pngUrl: null,
										mvUrl: null
									},
									sonGdIssues: null,
									gdOrIssue: '1'
								}
							]
						},
						gdOrIssue: '2'
					},
					{
						//8-2A
						id: 19,
						issueId: 8,
						subIssue: null,
						guidelinesId: 7,
						answerId: '2',
						answerContent: '答案2',
						createTime: '2024-04-11 17:52:16',
						updateTime: 'to-be-continued'
					}
				]
			}
		];
	}
};
</script>

<style>
.question {
	margin-bottom: 10px;
}
.options view {
	margin: 5px 0;
	cursor: pointer;
}
button {
	margin-top: 20px;
}
</style>
