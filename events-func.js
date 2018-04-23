 function addNode() {
 	let options = myChart.getOption();
 	let nodesOption = options.series[0].data;
 	let linksOption = options.series[0].links;
 	if (document.getElementById("input1").value === "") {
 		alert("Please input name of newNode")
 		return false
 	}
 	if (!selectInfo.state) {
 		alert("Please choose a node")
 		return false
 	}
 	let newNode = {
 		name: null
 		//other information if necessary
 	}
 	newNode.name = document.getElementById("input1").value
 	if (isDuplicate()) {
 		alert("you could not have duplicate name")
 		return false
 	}
 	let newLink = {
 		source: selectInfo.name,
 		target: newNode.name
 	}
 	linksOption.push(newLink)
 	nodesOption.push(newNode)
 	//choose to add or not 
 	optionFromDB.series[0].data.push(newNode)
 	optionFromDB.series[0].links.push(newLink)
 	console.log(optionFromDB)
 	//
 	selectInfo.state = false

 	myChart.setOption(options);
 }

 function isDuplicate() {
 	let searchName = document.getElementById("input1").value
 	let nodes = optionFromDB.series[0].data
 	for (let m in optionFromDB.series[0].data) {
 		if (nodes[m].name === searchName) {

 			return true
 		}
 	}

 	return false
 }

 function deleteNode() {
 	if (!selectInfo.state) {
 		alert("Please choose a node")

 	} else {
 		let options = myChart.getOption();
 		let nodesOption = options.series[0].data
 		let linksOption = options.series[0].links

 		let newsource = ''
 		let tempLinks = optionFromDB.series[0].links

 		if (selectInfo.index == 0) { //advise you put the root first in the options or do something to judge 
 			alert("could not delete the root")
 		} else {

 			for (let m in linksOption) {
 				if (linksOption[m].target === selectInfo.name) {
 					newsource = linksOption[m].source
 					linksOption.splice(m, 1)
 					tempLinks.splice(m, 1)
 				}
 			}

 			for (let m in linksOption) {
 				if (linksOption[m].source === selectInfo.name) {
 					linksOption[m].source = newsource
 					tempLinks[m].source = newsource

 					let count = 0
 					let searchName = linksOption[m].target
 					for (let t in nodesOption) {
 						if (nodesOption[t].name === searchName) {
 							count++
 							break
 						}
 					}
 					if (count === 0) { //it will occur when tree contract it's up to you whether use the ”completeness“
 						for (let s in tempData) {
 							if (tempData[s].name === searchName) {
 								nodesOption.push(tempData[s])
 							}
 						}
 					}
 					// linksNodes.push(linksOption[m].target);
 				}
 			}
 			nodesOption.splice(selectInfo.index, 1)
 			optionFromDB.series[0].data = optionFromDB.series[0].data.filter(node => node.name !== selectInfo.name)
 			//	console.log(tempData)
 			options.series[0].itemStyle.opacity = 1
 			options.series[0].lineStyle.opacity = 1
 			selectInfo.state = false
 			console.log(optionFromDB)
 			myChart.setOption(options)

 		}
 	}
 }

 function editNode() {
 	alert("しばらくご利用いただけません")
 	return true

 }

 function selectEle(params) {
 	clearTimeout(TimeFn)
 	TimeFn = setTimeout(() => {
 		let options = myChart.getOption()
 		let nodesOption = options.series[0].data
 		let name = params.data.name
 		options.series[0].itemStyle.opacity = 0.4
 		options.series[0].lineStyle.opacity = 0.4
 		for (let m in nodesOption) {
 			nodesOption[m].itemStyle = {}
 			if (nodesOption[m].name === name) {
 				console.log(nodesOption[m])
 				selectInfo.name = name
 				selectInfo.index = m
 				if (name === preName) {
 					selectInfo.state = false
 					options.series[0].itemStyle.opacity = 1
 					options.series[0].lineStyle.opacity = 1
 					preName = ""
 					//break
 				} else {
 					selectInfo.state = true
 					nodesOption[m].itemStyle.opacity = 1 //Generally，should break loop once target get ，but for opacity init every time
 					preName = name //i.e. nodesOption[m].itemStyle = {} enable default opacity=1 
 					//break                                     //could locate by setting preM ，and just recover that node with a large number of nodes
 				}
 			}
 		}
 		myChart.setOption(options);
 	}, 300)
 }

 function preProcess() {
 	let data = optionFromDB.series[0].data
 	let links = optionFromDB.series[0].links
 	data.forEach(function(node) {
 		node.isSpread = true
 	})
 	//other init operation you want
 }



 function spreadAndcontract(params) {
 	clearTimeout(TimeFn)
 	let options = myChart.getOption()
 	let nodesOption = options.series[0].data
 	let linksOption = options.series[0].links
 	let tempLinks = optionFromDB.series[0].links
 	let tempData = optionFromDB.series[0].data
 	let name = params.data.name
 	let count = 0

 	function hasChild(tempName) {

 		linksOption.forEach(function(node) {
 			if (node.source === tempName) {
 				for (let m in nodesOption) {
 					if (nodesOption[m].name === node.target) { //hasChild=>contract
 						count++
 						nodesOption.splice(m, 1)
 						hasChild(node.target)

 					}

 				}
 			}
 		})
 		if (!count) { // noChild=>spread
 			let tempTarget = []
 			tempLinks.forEach(function(node) {
 				if (node.source === name) {
 					tempTarget.push(node.target) //no use
 					for (let m in tempData) {
 						if (tempData[m].name === node.target) {

 							let n = 0
 							for (let m in nodesOption) {
 								if (nodesOption[m].name === node.target) { //no use
 									n++
 								}
 							}
 							if (n === 0) {
 								nodesOption.push(tempData[m])
 							}
 						}
 					}
 				}
 			})
 		}

 	}
 	hasChild(name)
 	myChart.setOption(options)
 }