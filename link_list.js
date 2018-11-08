function Node(data){
	this.next = undefined;
	this.msg = data;
}

function LinkList(){
	this.head = new Node("head");
	this.length = 0;
}

function push(list, data){
	var node = new Node(data);
	var t = list.head;
	while(t.next != undefined){
		t = t.next;
	}
	t.next = node;
	list.length ++;
	return list;
}

function show(list){
	var t = list.head;
	while(t != undefined){
		console.log(t.msg);
		t = t.next;
	}
}

function main(){
	var list = new LinkList();
	list = push(list, "secode");
	show(list);
}

main();