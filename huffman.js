function Node(data){
	this.leftChild = undefined;
	this.rightChild = undefined;
	this.huffmanCode = "";
	this.char = data.char;
	this.count = data.count;
}
//
function sign(r, code){
	if(!r){
		return ;
	}
	r.huffmanCode = code;
	if(r.leftChild){
		sign(r.leftChild, code + "0");
	}
	if(r.rightChild){
		sign(r.rightChild, code + "1");
	}
}

function HuffmanTree(bucket){
	// console.log(bucket.list)
	while(bucket.list.length > 1){
		let data_1 = bucket.list.shift();
		let data_2 = bucket.list.shift();
		// console.log("merge:" + data_1.char + " and " + data_2.char);
		let parent = new Node({
			char : "parent",
			count : data_1.count + data_2.count
		})
		parent.leftChild = data_1;
		parent.rightChild = data_2;
		bucket.list.push(parent);

		bucket.list.sort((a, b)=>{
			return a.count > b.count;
		})
	}
	sign(bucket.list[0].leftChild, "0");
	sign(bucket.list[0].rightChild, "1");
	this.head = bucket.list[0];
	let that = this;
	function show(r){
		if(!r){
			return ;
		}
		if(r.char != "parent"){
			console.log(r.char + ":" + r.huffmanCode);
		}
		if(r.leftChild){
			show(r.leftChild);
		}
		if(r.rightChild){
			show(r.rightChild);
		}
	}

	this.show = ()=>{
		show(that.head);
	}
}

function Bucket(str){
	this.content = {};
	this.list = [];
	this.length = 0;
	for(var i=0;i<str.length;i++){
		if(this.content[str[i]] == undefined){
			this.content[str[i]] = 1;
			this.length ++ ;
		} else {
			this.content[str[i]] ++;
		}
	}

	for(var i in this.content){
		this.list.push(new Node({
			char : i,
			count : this.content[i]
		}));
	}
	this.list.sort((a, b)=>{
		return a.count > b.count;
	})
}

function encode(str, dic){
	var code = "";
	for(var i=0;i<str.length;i++){
		code = code + "" + dic[str[i]];
	}
	return code;
}

function buildDic(tree){
	var temp = [];
	var node = tree.head;
	var dic = {};
	while(node || temp.length > 0){
		if(node){
			temp.push(node);
			node = node.leftChild;
		} else {
			let n = temp.pop();
			if(n.char != "parent"){
				dic[n.char] = n.huffmanCode;
			} else {
				// console.log("parent : " + n.count);
			}
			node = n.rightChild;
		}
	}

	return dic;
}

function Huffman(str){
	this.str = str;
	var bucket = new Bucket(str);
	var huffmantree = new HuffmanTree(bucket);
	this.tree = huffmantree;
	this.dic = buildDic(this.tree);
	this.encodeStr = encode(this.str, this.dic);
}

function main(){
	var str = "florria";
	console.log("input string : " + str);
	var huffman = new Huffman(str);
	huffman.tree.show();
	console.log(huffman.encodeStr)
}

main();