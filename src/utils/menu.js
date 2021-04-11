
//解析基础数据返回树结构数据
export function getTree(data,rootPid,id,pid){
  let treeData = [];
  data.forEach((item,index) => {
    if(item[pid] === rootPid){
      let myNode=getMyNode(item);
      getSubNode(id,pid,myNode,data);
      treeData.push(myNode);
    }
  });
  return treeData;
}

//解析基础数据返回树结构数据
function getSubNode(id,pid,myNode,data) {
  data.forEach((item,index) => {
    if(item[pid]===myNode[id]){
      let mySubnode=getMyNode(item);
      myNode.children.push(mySubnode)
    }
  });
  if(myNode.children.length!==0){
    myNode.children.forEach((subitem,subindex) => {
      getSubNode(id,pid,subitem,data);
    });
  }
}

function getMyNode(item) {
  item["children"]=[];
  return item;
}


