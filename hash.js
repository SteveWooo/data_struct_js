function hash(key){
	let toNum = "";
	key = key.toString();
	for(var i=0;i<key.length;i++){
		toNum += key[i].charCodeAt();
	}
	return toNum % 5;
}

function Node(key, value){
	this.key = key;
	this.value = value;
	this.hash = hash(key);
	this.next = undefined;
}

function HashMap(){
	this.nodes = [];
}

function put(hashmap, key, value){
	let hashCode = hash(key);
	// console.log(hashCode);
	for(var i=0;i<hashmap.nodes.length;i++){
		if(hashmap.nodes[i].hash == hashCode){
			let t = hashmap.nodes[i];
			while(t.next != undefined){
				t = t.next;
			}
			t.next = new Node(key, value);
			return hashmap;
		}
	}

	let newNode = new Node(key, value);
	hashmap.nodes.push(newNode);
	return hashmap;
}

function get(hashmap, key){
	let hashCode = hash(key);
	console.log(hashCode)
	for(var i=0;i<hashmap.nodes.length;i++){
		if(hashmap.nodes[i].hash == hashCode){
			let t = hashmap.nodes[i];
			while(t != undefined){
				if(t.key == key){
					return t;
				}
				t = t.next;
			}

			return undefined;
		}
	}

	return undefined;
}

function main(){
	var hashmap = new HashMap();
	hashmap = put(hashmap, 12.4121, "test_1");
	hashmap = put(hashmap, 6, "test_2");
	var res = get(hashmap, 12.4121);
	console.log(res);
}

main();