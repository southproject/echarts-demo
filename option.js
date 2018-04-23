//var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
//这部分模拟数据库传来的数据，只是无法交互更新
var categories = [{
	name: 0,

}, {
	name: 1,

}, {
	name: 2,

}, {
	name: 3,

}, {
	name: 4,

}, {
	name: 5,

}]
var graph = {
	data: [{
		name: '梯度下降',
		category: 0,
		number: 0,
		itemStyle: {
			normal: {
				//	color: "#009800",
				opacity: 1

			}
		}
	}, {
		name: '形式',
		number: 1,
		category: 1,

		itemStyle: {
			normal: {
				opacity: 1
			}
		}
	}, {
		name: '批梯度下降',

		category: 2,
		// draggable: true,
	}, {
		name: '随机梯度下降',

		category: 2,
		// draggable: true,
	}, {
		name: '小批量梯度下降',

		category: 2,
		// draggable: true,
	}, {
		name: '更新量优化',

		category: 1,
		//  draggable: true,
	}, {
		name: '动量法',

		category: 2,
		// draggable: true,
	}, {
		name: 'NAG',

		category: 2,
		//  draggable: true,
	}, {
		name: '学习率优化',

		category: 1,
		// draggable: true,
	}, {
		name: 'Adagrad',

		category: 2,
		// draggable: true,
	}, {
		name: 'Adadelta',

		category: 2,
		// draggable: true,
	}, {
		name: 'RMSprop',

		category: 2,
		// draggable: true,
	}, {
		name: 'Adam',

		category: 2,
		//  draggable: true,
	}],
	links: [{
		source: '形式',
		target: '批梯度下降',

	}, {
		source: '形式',
		target: '随机梯度下降',
	}, {
		source: '形式',
		target: '小批量梯度下降',
	}, {
		source: '更新量优化',
		target: '动量法',

	}, {
		source: '更新量优化',
		target: 'NAG',
	}, {
		source: '学习率优化',
		target: 'Adagrad',
	}, {
		source: '学习率优化',
		target: 'Adadelta',

	}, {
		source: '学习率优化',
		target: 'Adam',
	}, {
		source: '学习率优化',
		target: 'RMSprop',
	}, {
		source: '梯度下降',
		target: '形式',

	}, {
		source: '梯度下降',
		target: '更新量优化',
	}, {
		source: '梯度下降',
		target: '学习率优化',
	}]
}

var optionFromDB = {
	series: [{
		color: ['#9ccc65', '#f2b368', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		draggable: true,
		label: {
			show: true,
			position: 'bottom',
			formatter: '{b}'
		},
		force: {
			repulsion: 140
		},
		data: graph.data,
		links: graph.links,
		categories: categories,
		roam: true,
		//   type: 'graph',      
		//   layout: 'force',
		//  symbolSize: 34,
		//   animationDurationUpdate: 750

	}]
}